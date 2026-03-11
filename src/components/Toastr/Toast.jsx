import React from "react";

import Linkify from "linkify-react";

import { noop } from "utils";
import Button from "../Button";

const Toast = ({ type, message, buttonLabel = "", onClick = noop }) => (
  <div data-testid={`toastr-${type}-container`}>
    <Linkify
      options={{
        defaultProtocol: "https",
        rel: "noreferrer",
        target: "_blank",
      }}
    >
      <p>{message}</p>
    </Linkify>
    {buttonLabel && (
      <div className="toastr-message-container__btn-wrapper">
        <Button
          data-testid={`toastr-${type}-button`}
          label={buttonLabel}
          size="small"
          style="secondary"
          onClick={e => {
            e.stopPropagation();
            onClick();
          }}
        />
      </div>
    )}
  </div>
);

export default Toast;
