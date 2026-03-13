import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import Title from "./Title";

import { POPOVER_THEMES } from "./constants";
import Tooltip from "../Tooltip";

const Popover = ({
  children,
  className = "",
  theme = POPOVER_THEMES.light,
  ...otherProps
}) => (
  <Tooltip
    arrow
    interactive
    content={children}
    offset={[0, 24]}
    theme={theme === POPOVER_THEMES.beige ? POPOVER_THEMES.light : theme}
    className={classnames(
      "neeto-ui-popover",
      { "neeto-ui-popover--beige": theme === POPOVER_THEMES.beige },
      className
    )}
    {...otherProps}
  />
);

Popover.propTypes = {
  /**
   * The content to be rendered inside the popup.
   */
  children: PropTypes.node,
  /**
   * The popover will be positioned next to the specified element.
   */
  reference: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  /**
   * To display Popover in dark, light, or beige theme. By default the theme is light.
   */
  theme: PropTypes.oneOf(Object.values(POPOVER_THEMES)),
  /**
   * To specify whether the Popover is disabled or not.
   */
  disabled: PropTypes.bool,
  /**
   * To specify the position of the Popover.
   */
  position: PropTypes.string,
  /**
   * To auto-hide the Popover after n-milliseconds. Negative values to this prop disables this feature. <br />By default it's disabled.
   */
  hideAfter: PropTypes.number,
  /**
   * To auto-hide the Popover on when target leaves the screen. <br />By default it's disabled.
   */
  hideOnTargetExit: PropTypes.bool,
};

Popover.Title = Title;

export default Popover;
