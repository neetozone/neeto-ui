import React, { useEffect, useId, useRef } from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

const itemClassName = "neeto-ui-dropdown__popup-menu-item-btn";
let activeMenuId = null;

const Menu = ({ children, className, ...otherProps }) => {
  const menuId = useId();
  const activeIndexRef = useRef(-1);
  const menuRef = useRef(null);

  const onKeyDown = event => {
    const menu = menuRef.current;
    if (!menu || menuId !== activeMenuId) return;

    const key = event.key?.toLowerCase();
    let activeIndex = activeIndexRef.current;
    let eventHandled = false;

    const items = menu.getElementsByClassName(itemClassName);
    const itemsCount = items.length;
    if (itemsCount === 0) return;

    const forChildAtIndex = (index, callback) => {
      if (index < 0 || index >= items.length) return;
      callback(items[index]);
      eventHandled = true;
    };

    if (key === "arrowdown") {
      activeIndex = (activeIndex + 1) % itemsCount;
      forChildAtIndex(activeIndex, child => child.focus());
    } else if (key === "arrowup") {
      activeIndex = (activeIndex - 1 + itemsCount) % itemsCount;
      forChildAtIndex(activeIndex, child => child.focus());
    } else if (key === "enter") {
      forChildAtIndex(activeIndex, child => child.click());
    }

    if (!eventHandled) return;
    activeIndexRef.current = activeIndex;
    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(() => {
    const prevActiveMenuId = activeMenuId;
    activeMenuId = menuId;
    document.addEventListener("keydown", onKeyDown);

    return () => {
      activeMenuId = prevActiveMenuId;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuId]);

  return (
    <ul
      className={classnames("neeto-ui-dropdown__popup-menu", className)}
      ref={menuRef}
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
