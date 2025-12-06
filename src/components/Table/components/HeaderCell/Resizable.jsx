import React from "react";
import i18next from "i18next";
import { Resizable as ReactResizable } from "react-resizable";

const direction = i18next.dir();

const Resizable = ({ resizeHandles, ...rest }) => (
  <ReactResizable
    {...rest}
    resizeHandles={direction === "rtl" ? ["w"] : resizeHandles}
  />
);

export default Resizable;
