import React from "react";

import classnames from "classnames";
import { motion } from "framer-motion";
import { Right } from "neetoicons";
import PropTypes from "prop-types";

import { usePrefersReducedMotion } from "src/hooks";

import Collapse from "./Collapse";

const Item = ({
  id,
  title = "",
  isOpen = false,
  onClick = () => {},
  children,
  className = "",
  titleProps = {},
  iconProps = {},
  iconPosition = "right",
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isIconLeft = iconPosition === "left";

  const onKeyDown = e => {
    switch (e.key) {
      case " ":
        e.preventDefault();
        onClick();
        break;
      case "Enter":
        onClick();
        break;
      default:
    }
  };

  const icon = (
    <motion.div
      animate={isOpen ? "open" : "collapsed"}
      aria-hidden="true"
      className="neeto-ui-accordion__item-toggle-icon neeto-ui-flex-grow-0"
      transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
      variants={{ open: { rotate: 90 }, collapsed: { rotate: 0 } }}
    >
      <Right size={20} {...iconProps} aria-hidden="true" />
    </motion.div>
  );

  return (
    <div
      className={classnames("neeto-ui-accordion__wrapper", {
        "neeto-ui-accordion__wrapper--icon-left": isIconLeft,
        "neeto-ui-accordion__wrapper--icon-right": !isIconLeft,
        [className]: className,
      })}
      style={
        iconProps?.size
          ? { "--neeto-ui-accordion-icon-size": `${iconProps.size}px` }
          : undefined
      }
    >
      <div
        {...{ onClick, onKeyDown }}
        aria-controls={`neeto-ui-accordion-section-${id}`}
        aria-expanded={isOpen}
        id={`neeto-ui-accordion-item-${id}`}
        role="button"
        tabIndex={0}
        className={classnames(
          "neeto-ui-accordion__item neeto-ui-flex neeto-ui-items-center",
          {
            "neeto-ui-justify-between": !isIconLeft,
            "neeto-ui-accordion__item--icon-left": isIconLeft,
          },
          { "neeto-ui-accordion__item--open": isOpen }
        )}
      >
        {isIconLeft && icon}
        <div
          {...titleProps}
          className="neeto-ui-accordion__item-handle neeto-ui-flex neeto-ui-flex-grow neeto-ui-items-center neeto-ui-break-words"
        >
          {title}
        </div>
        {!isIconLeft && icon}
      </div>
      <Collapse
        aria-labelledby={`neeto-ui-accordion-item-${id}`}
        className="neeto-ui-accordion__drop antialiased"
        id={`neeto-ui-accordion-section-${id}`}
        open={isOpen}
        role="region"
      >
        {children}
      </Collapse>
    </div>
  );
};

Item.displayName = "Accordion.Item";

Item.propTypes = {
  /**
   * To specify a unique ID to the AccordionItem.
   */
  id: PropTypes.number,
  /**
   * To add title to the AccordionItem.
   */
  title: PropTypes.string,
  /**
   * To specify whether the Accordion item is open or not.
   */
  isOpen: PropTypes.bool,
  /**
   * To specify the action to be triggered on click of the AccordionItem.
   */
  onClick: PropTypes.func,
  /**
   * To specify the content to be rendered inside the AccordionItem.
   */
  children: PropTypes.node,
  /**
   * To pass props to Accordion title.
   */
  titleProps: PropTypes.object,
  /**
   * To pass props to Accordion toggle icon.
   */
  iconProps: PropTypes.object,
  /**
   * To specify the position of the toggle icon.
   */
  iconPosition: PropTypes.oneOf(["left", "right"]),
  /**
   * To provide external classnames to Accordion item.
   */
  className: PropTypes.string,
};

export default Item;
