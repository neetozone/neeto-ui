import React, { useEffect, useRef } from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

const itemClassName = "neeto-ui-dropdown__popup-menu-item-btn";

const Menu = ({ children, className, ...otherProps }) => {
  const activeIndexRef = useRef(-1);
  const menuRef = useRef(null);

  const onKeyDown = event => {
    const menu = menuRef.current;
    const key = event.key?.toLowerCase();
    let activeIndex = activeIndexRef.current;
    let eventHandled = false;

    const items = menu.getElementsByClassName(itemClassName);
    const itemsCount = items.length;
    if (itemsCount === 0) return;


    if (key === "arrowdown") {
      activeIndex = activeIndex >= itemsCount - 1 ? 0 : activeIndex + 1;
      items[activeIndex].focus();
      eventHandled = true;
    } else if (key === "arrowup") {
      activeIndex = activeIndex <= 0 ? itemsCount - 1 : activeIndex - 1;
      items[activeIndex].focus();
      eventHandled = true;
    } else if (key === "enter" && activeIndex >= 0) {
      items[activeIndex]?.click();
      eventHandled = true;
    }

    if (!eventHandled) return;
    activeIndexRef.current = activeIndex;
    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(() => {
    const menu = menuRef.current;
    if (menu) menu.focus();
  }, [menuRef]);

  return (
    <ul
      {...{ onKeyDown }}
      className={classnames("neeto-ui-dropdown__popup-menu", className)}
      ref={menuRef}
      tabIndex={0}
      {...otherProps}
    >
      {children}
    </ul>
  );
};

Menu.propTypes = {
  /**
   * To specify className to be applied to the Menu.
   */
  className: PropTypes.string,
  /**
   * To specify the content to be rendered inside the Menu.
   */
  children: PropTypes.node,
};

export default Menu;
