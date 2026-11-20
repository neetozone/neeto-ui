import React from "react";

import classnames from "classnames";
import { t } from "i18next";
import { CheckCircle, Warning, Info, Close } from "neetoicons";
import { equals } from "ramda";
import { toast, Slide } from "react-toastify";

import { getContentDir } from "utils";

import Toast from "./Toast";

const TOAST_CONFIG = {
  autoClose: 3500,
  transition: Slide,
  hideProgressBar: true,
  closeButton: ({ closeToast, ...props }) => (
    <Close
      className="neeto-ui-toastr__close-button"
      color="currentColor"
      data-testid="toastr-close-button"
      size={16}
      onClick={closeToast}
      {...props}
    />
  ),
  role: "log",
  className: "neeto-ui-toastr",
};

const TOAST_ICON = {
  success: (
    <CheckCircle
      className="neeto-ui-text-white"
      data-testid="success-toast-icon"
    />
  ),
  warning: (
    <Warning className="neeto-ui-text-white" data-testid="warning-toast-icon" />
  ),
  error: (
    <Warning className="neeto-ui-text-white" data-testid="error-toast-icon" />
  ),
  info: <Info className="neeto-ui-text-white" data-testid="info-toast-icon" />,
};

// The toasts on screen, so that the same toast is not shown twice. A toast
// leaves the list when it closes. react-toastify 11 does not call onClose when
// the ToastContainer unmounts, so a toast that opened and is no longer active
// counts as closed too. A toast that has not opened yet still blocks a
// duplicate, because react-toastify 9 registers toasts asynchronously.
let shownToastrs = [];

const isClosed = ({ isOpened, toastId }) =>
  isOpened && !toast.isActive(toastId);

const addShownToastr = key => {
  shownToastrs = shownToastrs.filter(
    shown => !(equals(shown.key, key) && isClosed(shown))
  );
  if (shownToastrs.some(shown => equals(shown.key, key))) return null;

  const shown = { key, isOpened: false, toastId: null };
  shownToastrs.push(shown);

  return shown;
};

const removeShownToastr = shown => {
  shownToastrs = shownToastrs.filter(item => item !== shown);
};

// react-toastify 11 renders only a function, an element or false as the icon;
// it replaces anything else, such as an emoji string, with the default icon.
const toIconProp = icon =>
  typeof icon === "string" || typeof icon === "number" ? () => icon : icon;

const parseToastrConfig = config => {
  if (typeof config[0] === "object") {
    const { buttonLabel, onClick, showIcon, ...customConfig } = config[0];

    return { buttonLabel, onClick, showIcon, customConfig };
  }
  const [buttonLabel, onClick, customConfig, showIcon] = config;

  return { buttonLabel, onClick, customConfig, showIcon };
};

const getToastrMessage = message => {
  if (message?.noticeCode === "custom_message" && "customMessage" in message) {
    return message.customMessage;
  } else if (message && typeof message === "object" && message.noticeCode) {
    return t(message.noticeCode, message);
  } else if (message && typeof message === "object" && message.notice) {
    return message.notice;
  }

  return message;
};

const withUniqueCheck =
  (type, toastFunc) =>
  (message, ...toastrConfig) => {
    message = getToastrMessage(message);
    const {
      buttonLabel,
      onClick,
      showIcon = false,
      customConfig = {},
    } = parseToastrConfig(toastrConfig);

    let toastId = null;

    const shown = addShownToastr({ type, message, buttonLabel });

    if (shown) {
      const config = {
        ...TOAST_CONFIG,
        // The false value of the icon was ignored in the implementations before v9.0.2.
        // After 9.0.2, the implementation is such that the icon is rendered as passed in the config.
        // Since the `false` value used to show the default icon set internally, used a function that returns null
        // which solved the problem.
        // PR which addressed this issue: https://github.com/fkhadra/react-toastify/pull/758
        icon: showIcon ? TOAST_ICON[type] : () => null,
        onOpen: () => {
          shown.isOpened = true;
        },
        onClose: () => removeShownToastr(shown),
        // react-toastify 10 removed toast.POSITION; the plain strings work in
        // every version.
        position: getContentDir() === "rtl" ? "bottom-right" : "bottom-left",
        ...customConfig,
        className: classnames(TOAST_CONFIG.className, customConfig?.className),
      };
      config.icon = toIconProp(config.icon);

      toastId = toastFunc({ message, buttonLabel, onClick, config });
      shown.toastId = toastId;
    }

    return toastId;
  };

const showSuccessToastr = withUniqueCheck(
  "success",
  ({ message, buttonLabel, onClick, config }) =>
    toast.success(
      <Toast {...{ buttonLabel, message, onClick }} type="success" />,
      config
    )
);

const showInfoToastr = withUniqueCheck(
  "info",
  ({ message, buttonLabel, onClick, config }) =>
    toast.info(
      <Toast {...{ buttonLabel, message, onClick }} type="info" />,
      config
    )
);

const showWarningToastr = withUniqueCheck(
  "warning",
  ({ message, buttonLabel, onClick, config }) =>
    toast.warning(
      <Toast {...{ buttonLabel, message, onClick }} type="warning" />,
      config
    )
);

const isError = e => e && e.stack && e.message;
const isAxiosError = e => e && typeof e === "object" && e.isAxiosError === true;
const isString = s => typeof s === "string" || s instanceof String;
const isArray = a => Array.isArray(a);
const isErrorCodeObject = e =>
  typeof e === "object" && "key" in e && "context" in e;

const errorCodeTranslation = errorCode => {
  if (typeof errorCode === "string") {
    return t(errorCode);
  } else if (isErrorCodeObject(errorCode)) {
    return t(errorCode.key, errorCode.context);
  }

  return undefined;
};

const getErrorMessage = response => {
  const { error = "", errors = [], errorCode = "", errorCodes = [] } = response;

  let errorMessages = "";

  if (error) errorMessages = error;
  else if (isArray(errors)) errorMessages = errors.join("\n");

  const errorCodeTranslations =
    (errorCode && t(errorCode, response)) ||
    errorCodes?.map(errorCodeTranslation).join("\n");

  if (errorMessages && errorCodeTranslations) {
    return [errorMessages, errorCodeTranslations].join("\n");
  }

  return errorMessages || errorCodeTranslations;
};

const withParsedErrorMsg =
  toastrFunc =>
  (errorObject, ...toastrConfig) => {
    let errorMessage;

    errorObject = getToastrMessage(errorObject);

    const responseData = errorObject?.response?.data || {};

    if (
      responseData.noticeCode === "custom_message" &&
      "customMessage" in responseData
    ) {
      errorMessage = responseData.customMessage;
    } else if (responseData?.noticeCode) {
      const { data } = errorObject.response;
      errorMessage = t(data.noticeCode, data);
    } else if (isAxiosError(errorObject)) {
      errorMessage = getErrorMessage(responseData) || errorObject.message;
    } else if (isError(errorObject)) errorMessage = errorObject.message;
    else if (isString(errorObject)) errorMessage = errorObject;
    else errorMessage = "Something went wrong.";

    const { buttonLabel, onClick, customConfig, showIcon } =
      parseToastrConfig(toastrConfig);

    return toastrFunc(errorMessage, {
      buttonLabel,
      onClick,
      role: "alert",
      autoClose: false,
      showIcon,
      ...customConfig,
    });
  };

const showErrorToastr = withParsedErrorMsg(
  withUniqueCheck(
    "error",
    ({ message, buttonLabel, onClick, showIcon, config }) =>
      toast.error(
        <Toast {...{ buttonLabel, message, onClick, showIcon }} type="error" />,
        config
      )
  )
);

const Toastr = {
  info: showInfoToastr,
  show: showInfoToastr,
  success: showSuccessToastr,
  error: showErrorToastr,
  warning: showWarningToastr,
};

export default Toastr;
