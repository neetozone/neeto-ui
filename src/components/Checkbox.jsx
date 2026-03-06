import React, { forwardRef } from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import { useId } from "hooks";
import { hyphenize } from "utils";

import Label from "./Label";

const SIZES = { small: "small", medium: "medium" };

const Checkbox = forwardRef(
  (
    {
      label = "",
      error = "",
      className = "",
      required = false,
      size = SIZES.small,
      labelProps,
      children,
      ...otherProps
    },
    ref
  ) => {
    const id = useId(otherProps.id);
    const errorId = `error_${id}`;
    const renderLabel = label || children;

    return (
      <div
        className={classnames(["neeto-ui-checkbox__wrapper", className], {
          "neeto-ui-checkbox__wrapper--size-small": size === SIZES.small,
          "neeto-ui-checkbox__wrapper--size-medium": size === SIZES.medium,
        })}
      >
        <div
          className="neeto-ui-checkbox__container"
          data-testid="nui-checkbox-container"
        >
          <input
            {...{ id, ref, required }}
            aria-describedby={error ? errorId : undefined}
            aria-invalid={!!error}
            aria-required={required}
            className="neeto-ui-checkbox"
            data-testid={`${hyphenize(renderLabel)}-checkbox-input`}
            name={id}
            type="checkbox"
            {...otherProps}
          />
          <span aria-hidden="true" className="neeto-ui-checkbox__indicator">
            <svg
              fill="none"
              overflow="visible"
              viewBox="0 0 11 8"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline
                className="neeto-ui-checkbox__checkmark"
                points="1.333 4 4 6.667 9.667 1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {renderLabel && (
            <Label
              {...{ required }}
              data-testid={`${hyphenize(renderLabel)}-checkbox-label`}
              htmlFor={id}
              {...labelProps}
            >
              {renderLabel}
            </Label>
          )}
        </div>
        {!!error && (
          <p
            className="neeto-ui-input__error"
            data-testid={`${hyphenize(renderLabel)}-checkbox-error`}
            id={errorId}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

Checkbox.propTypes = {
  /**
   * To specify a unique ID to the Checkbox component.
   */
  id: PropTypes.string,
  /**
   * To specify the text to be displayed next to the Checkbox.
   */
  label: PropTypes.string,
  /**
   * To specify the label props to be passed to the Label component.
   */
  labelProps: PropTypes.object,
  /**
   * To specify the error message to be shown.
   */
  error: PropTypes.string,
  /**
   * To set the size of the Checkbox.
   */
  size: PropTypes.oneOf(Object.values(SIZES)),
  /**
   * To provide external classnames to Checkbox component.
   */
  className: PropTypes.string,
  /**
   * To specify whether the Checkbox is a required field or not.
   */
  required: PropTypes.bool,
  /**
   *  To specify the children label to be rendered inside the Checkbox.
   */
  children: PropTypes.string,
};

export default Checkbox;
