import React from "react";

import { AnimatePresence, motion } from "framer-motion";

import { usePrefersReducedMotion } from "src/hooks";

const Collapse = ({
  open = false,
  children,
  className = "",
  ...otherProps
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          initial={{ opacity: 0, height: 0, overflow: "hidden" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
          {...otherProps}
        >
          <div {...{ className }}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Collapse;
