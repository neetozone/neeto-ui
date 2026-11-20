import React from "react";

import Linkify from "linkify-react";

import { noop } from "utils";

const Toast = ({ type, message, buttonLabel = "", onClick = noop }) => (
  <div
    className="neeto-ui-toastr__content"
    data-testid={`toastr-${type}-container`}
  >
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
        <button
          className="neeto-ui-btn neeto-ui-btn--style-tertiary"
          data-testid={`toastr-${type}-button`}
          onClick={e => {
            e.stopPropagation();
            onClick();
          }}
        >
          {buttonLabel}
        </button>
      </div>
    )}
  </div>
);

export default Toast;
