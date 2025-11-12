import React, { useEffect, useRef, useState } from "react";

import PropTypes from "prop-types";

import Title from "./Title";

import {
  arrow,
  autoPlacement,
  autoUpdate,
  FloatingArrow,
  FloatingPortal,
  hide,
  offset,
  safePolygon,
  useFloating,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import useAutoHide from "components/Tooltip/hooks/useAutoHide";

const Popover = ({
  disabled,
  position = "auto",
  theme = "light",
  reference,
  hideAfter,
  hideOnTargetExit,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  const middleware = [offset(10)];
  if (position === "auto") middleware.push(autoPlacement());
  middleware.push(arrow({ element: arrowRef, padding: 3 }));
  if (hideOnTargetExit) middleware.push(hide());

  const { refs, floatingStyles, context, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: position,
    middleware,
    whileElementsMounted: autoUpdate,
  });

  useAutoHide(context, { enabled: !disabled && !!hideAfter, delay: hideAfter });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      enabled: !disabled,
      restMs: 300,
      handleClose: safePolygon(),
    }),
  ]);

  useEffect(() => {
    const element = reference.current;
    if (disabled || !element) return undefined;

    const { onMouseMove, onPointerDown, onPointerEnter } = getReferenceProps();
    const config = { passive: true };

    refs.setReference(element);
    element.addEventListener("mousemove", onMouseMove, config);
    element.addEventListener("pointerdown", onPointerDown, config);
    element.addEventListener("pointerenter", onPointerEnter, config);

    return () => {
      element.removeEventListener("mousemove", onMouseMove, config);
      element.removeEventListener("pointerdown", onPointerDown, config);
      element.removeEventListener("pointerenter", onPointerEnter, config);
      refs.setReference(null);
    };
  }, [disabled, reference]);

  if (disabled || !isOpen) return null;
  const hidden = middlewareData.hide?.referenceHidden;

  return (
    <FloatingPortal>
      <div
        className="neeto-ui-tooltip neeto-ui-popover"
        data-theme={theme}
        ref={refs.setFloating}
        style={{
          ...floatingStyles,
          maxWidth: 350,
          visibility: hidden ? "hidden" : "visible",
        }}
        {...getFloatingProps()}
      >
        {children}
        <FloatingArrow
          {...{ context }}
          className="neeto-ui-tooltip-arrow"
          height={5}
          ref={arrowRef}
          width={10}
        />
      </div>
    </FloatingPortal>
  );
};

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
   * To display Popover in dark or light theme. By default the theme is dark.
   */
  theme: PropTypes.oneOf(["dark", "light"]),
  /**
   * To specify whether the Popover is disabled or not.
   */
  disabled: PropTypes.bool,
  /**
   * To specify the position of the Popover.
   */
  position: PropTypes.string,
  /**
   * To auto-hide the Popover after n-milliseconds.
   * Negative values to this prop disables this feature.
   * By default it's disabled.
   */
  hideAfter: PropTypes.number,
  /**
   * To auto-hide the Popover on when target leaves the screen.
   * By default it's disabled.
   */
  hideOnTargetExit: PropTypes.bool,
};

Popover.Title = Title;

export default Popover;
