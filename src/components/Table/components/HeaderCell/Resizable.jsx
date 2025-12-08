import React from "react";
import { Resizable as ReactResizable } from "react-resizable";
import { getContentDir } from "utils";

const rtlResizeHandles = ["w"];

const Resizable = ({ resizeHandles, ...rest }) => (
  <ReactResizable
    {...rest}
    resizeHandles={getContentDir() === "rtl" ? rtlResizeHandles : resizeHandles}
  />
);

export default Resizable;
