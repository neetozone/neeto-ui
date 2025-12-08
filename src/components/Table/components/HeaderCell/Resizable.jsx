import React from "react";
import { Resizable as ReactResizable } from "react-resizable";
import { getContentDir } from "utils";

const Resizable = ({ resizeHandles, ...rest }) => (
  <ReactResizable
    {...rest}
    resizeHandles={getContentDir() === "rtl" ? ["w"] : resizeHandles}
  />
);

export default Resizable;
