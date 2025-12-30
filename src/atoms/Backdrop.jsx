import React, { forwardRef } from "react";

const Portal = ({ children, ...otherProps }, ref) => (
  <div {...{ ref }} data-testid="neeto-backdrop" {...otherProps}>
    {children}
  </div>
);

export default forwardRef(Portal);
