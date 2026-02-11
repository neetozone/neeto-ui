import React, { useRef } from "react";

import { InfoRound } from "neetoicons";

import Popover from "components/Popover";
import Typography from "components/Typography";

const TitleWithInfoIcon = ({ title, description, ...rest }) => {
  const popoverRef = useRef();

  return (
    <span className="neeto-ui-pr-5 neeto-ui-inline-flex relative">
      {typeof title === "function" ? title(rest) : title}
      {description && (
        <>
          <span
            className="neeto-ui-table__column-title-info-icon"
            data-testid="column-info-icon"
            ref={popoverRef}
          >
            <InfoRound color="currentColor" size={14} />
          </span>
          <Popover
            appendTo={() => document.body}
            className="max-h-64 overflow-y-auto"
            position="bottom"
            reference={popoverRef}
          >
            <Typography lineHeight="normal" style="body2">
              {description}
            </Typography>
          </Popover>
        </>
      )}
    </span>
  );
};

export default React.memo(TitleWithInfoIcon);
