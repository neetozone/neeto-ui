import React from "react";

import classnames from "classnames";
import { Down } from "neetoicons";
import PropTypes from "prop-types";

import { TARGET_SIZES } from "./constants";

const Target = ({ size, showHexValue, color, colorValue }) => (
  <button
    data-cy="color-picker-target"
    data-testid="neeto-color-picker"
    type="button"
    className={classnames("neeto-ui-colorpicker__target", {
      "neeto-ui-colorpicker__target-size--large": size === TARGET_SIZES.large,
      "neeto-ui-colorpicker__target-size--medium": size === TARGET_SIZES.medium,
      "neeto-ui-colorpicker__target-size--small": size === TARGET_SIZES.small,
    })}
  >
    {showHexValue && (
      <span className="neeto-ui-colorpicker-target__code">{color}</span>
    )}
    <span className="neeto-ui-colorpicker-target__color-wrapper">
      <span
        className="neeto-ui-colorpicker-target__color neeto-ui-border-gray-200"
        style={{ backgroundColor: colorValue }}
      />
      <span className="neeto-ui-colorpicker-target__icon">
        <Down size={16} />
      </span>
    </span>
  </button>
);

Target.propTypes = {
  size: PropTypes.oneOf(Object.values(TARGET_SIZES)),
  showHexValue: PropTypes.bool,
  color: PropTypes.string,
  colorValue: PropTypes.string,
};

export default Target;
