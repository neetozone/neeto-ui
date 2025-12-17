import React from "react";

import { Slider as AntdSlider, ConfigProvider } from "antd";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { ANTD_LOCALE } from "components/constants";
import Label from "components/Label";
import { useId } from "hooks";
import {
  ANT_DESIGN_GLOBAL_TOKEN_OVERRIDES,
  hyphenize,
  noop,
  getContentDir,
} from "utils";

const Slider = ({
  min = 0,
  max = 100,
  defaultValue = 0,
  onChange = noop,
  value = undefined,
  label,
  required = false,
  labelProps = {},
  error,
  helpText,
  ...otherProps
}) => {
  const id = useId(otherProps.id);
  const errorId = `error_${id}`;
  const helpTextId = `helpText_${id}`;

  const { i18n } = useTranslation();

  const describedByIds = [
    ...(error ? [errorId] : []),
    ...(helpText ? [helpTextId] : []),
  ].join(" ");

  return (
    <ConfigProvider
      direction={getContentDir()}
      locale={ANTD_LOCALE[i18n.language || "en"]}
      theme={{
        token: { ...ANT_DESIGN_GLOBAL_TOKEN_OVERRIDES },
        components: {
          Slider: {
            dotActiveBorderColor: "rgb(var(--neeto-ui-primary-500))",
            dotBorderColor: "rgb(var(--neeto-ui-gray-500))",
            handleActiveColor: "rgb(var(--neeto-ui-primary-600))",
            handleColor: "rgb(var(--neeto-ui-primary-500))",
            railBg: "rgb(var(--neeto-ui-gray-200))",
            railHoverBg: "rgb(var(--neeto-ui-gray-300))",
            trackBg: "rgb(var(--neeto-ui-primary-500))",
            trackBgDisabled: "rgb(var(--neeto-ui-gray-100))",
            trackHoverBg: "rgb(var(--neeto-ui-primary-600))",

            // Global overrides
            colorFillContentHover: "rgb(var(--neeto-ui-gray-600))",
          },
        },
      }}
    >
      <div className="neeto-ui-input__wrapper">
        <div className="neeto-ui-input__label-wrapper">
          {label && (
            <Label
              {...{ required }}
              data-cy={`${hyphenize(label)}-slider-label`}
              htmlFor={id}
              {...labelProps}
            >
              {label}
            </Label>
          )}
        </div>
        <AntdSlider
          className="neeto-ui-w-full"
          tooltip={{ formatter: null }}
          {...{
            ...(describedByIds && { "aria-describedby": describedByIds }),
            "aria-invalid": !!error,
            "aria-label": label || undefined,
            "aria-required": required,
            defaultValue,
            max,
            min,
            onChange,
            value,
            ...otherProps,
            id,
          }}
        />
        {!!error && (
          <p
            className="neeto-ui-input__error"
            data-cy={`${hyphenize(label)}-input-error`}
            id={errorId}
          >
            {error}
          </p>
        )}
        {helpText && (
          <p
            className="neeto-ui-input__help-text"
            data-cy={`${hyphenize(label)}-input-help`}
            id={helpTextId}
          >
            {helpText}
          </p>
        )}
      </div>
    </ConfigProvider>
  );
};

Slider.propTypes = {
  /**
   * To specify the minimum value the slider can slide to.
   */
  min: PropTypes.number,
  /**
   * To specify the maximum value the slider can slide to.
   */
  max: PropTypes.number,
  /**
   * Callback function that is fired when the user changes the slider's value.
   */
  onChange: PropTypes.func,
  /**
   * To specify the value of slider. When `range` is false, use number, otherwise, use [number, number]
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  /**
   * To specify the default value of slider. When `range` is false, use number, otherwise, use [number, number]
   */
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  /**
   * To specify the text to be displayed above the Slider.
   */
  label: PropTypes.string,
  /**
   * To specify the label props to be passed to the Label component.
   */
  labelProps: PropTypes.object,
  /**
   * To specify the error message to be displayed in the Slider component.
   */
  error: PropTypes.string,
  /**
   * To specify whether the Slider is required or not.
   */
  required: PropTypes.bool,
  /**
   * To specify the help text that appears below the Slider component.
   */
  helpText: PropTypes.string,
};

export default Slider;
