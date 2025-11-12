import React, { useRef, useState } from "react";
import {
  autoUpdate,
  FloatingPortal,
  useFloating,
  useHover,
  useInteractions,
  FloatingArrow,
  arrow,
  offset,
  autoPlacement,
  hide,
  safePolygon,
} from "@floating-ui/react";
import PropTypes from "prop-types";
import useAutoHide from "./hooks/useAutoHide";

const Tooltip = ({
  disabled,
  theme = "dark",
  content,
  position = "auto",
  hideOnTargetExit,
  hideAfter,
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
    whileElementsMounted: autoUpdate,
    placement: position,
    middleware,
  });

  useAutoHide(context, { enabled: !disabled && !!hideAfter, delay: hideAfter });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      enabled: !disabled,
      restMs: 300,
      handleClose: safePolygon(),
    }),
  ]);

  if (disabled) return children;

  const hidden = middlewareData.hide?.referenceHidden;

  return (
    <>
      <span {...getReferenceProps()} ref={refs.setReference}>
        {children}
      </span>
      {isOpen && (
        <FloatingPortal>
          <div
            data-theme={theme}
            {...getFloatingProps()}
            className="neeto-ui-tooltip"
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              visibility: hidden ? "hidden" : "visible",
            }}
          >
            {content}
            <FloatingArrow
              {...{ context }}
              className="neeto-ui-tooltip-arrow"
              height={5}
              ref={arrowRef}
              width={10}
            />
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

Tooltip.propTypes = {
  /**
   * The component to be rendered inside the popup.
   */
  content: PropTypes.node,
  /**
   * Tooltip popup will be shown when mouse is hovered over this component.
   */
  children: PropTypes.node,
  /**
   * To display Tooltip in dark or light theme. By default the theme is dark.
   */
  theme: PropTypes.oneOf(["dark", "light"]),
  /**
   * To specify whether the Tooltip is disabled or not.
   */
  disabled: PropTypes.bool,
  /**
   * To specify the position of the Tooltip.
   */
  position: PropTypes.string,
  /**
   * To auto-hide the Tooltip after n-milliseconds.
   * Negative values to this prop disables this feature.
   * By default it's disabled.
   */
  hideAfter: PropTypes.number,
  /**
   * To auto-hide the Tooltip on when target leaves the screen.
   * By default it's disabled.
   */
  hideOnTargetExit: PropTypes.bool,
};

export default Tooltip;
