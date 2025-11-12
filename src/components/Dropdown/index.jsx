import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Button from "components/Button";
import {
  useFloating,
  autoUpdate,
  useClick,
  useInteractions,
  useDismiss,
  useHover,
  FloatingPortal,
  autoPlacement,
  safePolygon,
} from "@floating-ui/react";

import { Down } from "neetoicons";
import { hyphenize } from "utils";

import Divider from "./Divider";
import Menu from "./Menu";
import MenuItem from "./MenuItem";

const TRIGGERS = {
  click: "click",
  hover: "hover",
  all: "all",
  manual: "manual",
};

const BTN_STYLES = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary",
  danger: "danger",
  danger_text: "danger-text",
  text: "text",
  link: "link",
};

const BTN_SIZES = {
  small: "small",
  medium: "medium",
  large: "large",
};

const STRATEGY = { absolute: "absolute", fixed: "fixed" };

const PLACEMENT = {
  auto: "auto",
  top: "top",
  topStart: "top-start",
  topEnd: "top-end",
  bottom: "bottom",
  bottomStart: "bottom-start",
  bottomEnd: "bottom-end",
  right: "right",
  rightStart: "right-start",
  rightEnd: "right-end",
  left: "left",
  leftStart: "left-start",
  leftEnd: "left-end",
};

const allowedPlacements = [
  PLACEMENT.top,
  PLACEMENT.bottom,
  PLACEMENT.rightStart,
  PLACEMENT.rightEnd,
  PLACEMENT.leftStart,
  PLACEMENT.leftEnd,
];

const Dropdown = ({
  label,
  icon,
  disabled,
  strategy,
  customTarget,
  buttonStyle,
  buttonSize,
  className,
  buttonProps,
  dropdownProps,
  children,
  trigger = TRIGGERS.click,
  placement = PLACEMENT.bottom,
  closeOnOutsideClick = true,
  closeOnEsc = true,
  closeOnSelect = true,
  isOpen: isOpenProp,
  onClose: onCloseProp,
}) => {
  const [isOpenState, setIsOpenState] = useState(false);
  // eslint-disable-next-line eqeqeq
  const isControlled = isOpenProp != null;
  const isOpen = isControlled ? isOpenProp : isOpenState;

  const middleware = [];

  if (placement === "auto") {
    middleware.push(autoPlacement({ allowedPlacements }));
  }

  const onOpenChange = open => {
    if (!isControlled) setIsOpenState(open);

    if (!open) onCloseProp?.();
  };

  const { refs, floatingStyles, context, middlewareData } = useFloating({
    open: isOpen,
    whileElementsMounted: autoUpdate,
    onOpenChange,
    strategy,
    placement,
    middleware,
  });

  const clickable = trigger === TRIGGERS.all || trigger === TRIGGERS.click;
  const hoverable = trigger === TRIGGERS.all || trigger === TRIGGERS.hover;
  const dismissable = isOpen && (closeOnEsc || closeOnOutsideClick);
  const hidden = middlewareData.hide?.referenceHidden;
  const onClose = () => context.onOpenChange(false);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context, {
      enabled: !disabled && clickable,
      event: "mousedown",
    }),
    useHover(context, {
      enabled: !disabled && hoverable,
      handleClose: safePolygon(),
    }),
    useDismiss(context, {
      enabled: dismissable,
      escapeKey: dismissable && closeOnEsc,
      outsidePress: dismissable && closeOnOutsideClick,
    }),
  ]);

  const triggerProps = {
    ...getReferenceProps(),
    ref: refs.setReference,
    onClick: event => event.stopPropagation(),
  };

  return (
    <>
      {customTarget ? (
        <span
          className={classNames({ "neeto-ui-cursor-not-allowed": disabled })}
          {...triggerProps}
        >
          {typeof customTarget === "function" ? customTarget() : customTarget}
        </span>
      ) : (
        <Button
          data-cy={`${hyphenize(label)}-dropdown-icon`}
          icon={icon || Down}
          iconPosition="right"
          size={buttonSize}
          style={buttonStyle}
          {...{ disabled, label, ...buttonProps, ...triggerProps }}
        />
      )}
      {isOpen && (
        <FloatingPortal>
          <div
            {...getFloatingProps()}
            className={classNames("neeto-ui-dropdown", className)}
            data-cy={`${hyphenize(label)}-dropdown-container`}
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              visibility: hidden ? "hidden" : "visible",
            }}
            onClick={closeOnSelect ? onClose : undefined}
          >
            <div
              className={classNames(
                "neeto-ui-dropdown__popup",
                dropdownProps?.className,
                dropdownProps?.classNames
              )}
            >
              {children}
            </div>
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

Dropdown.Menu = Menu;
Dropdown.MenuItem = MenuItem;
Dropdown.Divider = Divider;

Dropdown.propTypes = {
  /**
   * To specify the icon to be rendered in the Dropdown target.
   */
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  /**
   * To specify the label for Dropdown target button.
   */
  label: PropTypes.string,
  /**
   * To specify whether the Dropdown is open or not.
   */
  isOpen: PropTypes.bool,
  /**
   * To specify the action to be triggered on closing the Dropdown.
   */
  onClose: PropTypes.func,
  /**
   * To specify the triggering action for Dropdown.
   */
  trigger: PropTypes.oneOf(Object.keys(TRIGGERS)),
  /**
   * To specify the positioning strategy to use. By default, it is absolute, which in the simplest cases does not require repositioning of the Dropdown.
   *
   * If your reference element is in a fixed container, use the fixed strategy
   */
  strategy: PropTypes.oneOf(Object.values(STRATEGY)),
  /**
   * To specify the classes to be passed to the Dropdown menu.
   */
  dropdownProps: PropTypes.object,
  /**
   * To specify the position of the Dropdown menu.
   */
  position: PropTypes.oneOf(Object.values(PLACEMENT)),
  /**
   * To specify the content to be rendered inside the Dropdown.
   */
  children: PropTypes.node,
  /**
   * To provide external classnames to Dropdown target wrapper.
   */
  className: PropTypes.string,
  /**
   * <div class="neeto-ui-tag neeto-ui-tag--size-small neeto-ui-tag--style-outline neeto-ui-tag--style-success mb-2">
   * New
   * </div>
   * To specify the size of the button to be rendered as the Dropdown target.
   */
  buttonSize: PropTypes.oneOf(Object.values(BTN_SIZES)),
  /**
   * To specify the style of the button to be rendered as the Dropdown target.
   */
  buttonStyle: PropTypes.oneOf(Object.values(BTN_STYLES)),
  /**
   * To specify the props to be passed to the Dropdown target button.
   */
  buttonProps: PropTypes.object,
  /**
   * To provide a custom target to be rendered instead of the default button target.
   */
  customTarget: PropTypes.node,
  /**
   * To specify whether the Dropdown is disabled or not.
   */
  disabled: PropTypes.bool,
  /**
   * To specify whether the Dropdown should close on pressing esc key.
   */
  closeOnEsc: PropTypes.bool,
  /**
   * To specify whether the Dropdown should close on selecting an option.
   */
  closeOnSelect: PropTypes.bool,
  /**
   * To specify whether the Dropdown should close on clicking outside the Dropdown content. (will not have any effect if the component is controlled.)
   */
  closeOnOutsideClick: PropTypes.bool,
};

export default Dropdown;
