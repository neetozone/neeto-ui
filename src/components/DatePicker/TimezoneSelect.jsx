import React, { useRef } from "react";
import { Typography, Select } from "components";
import { findBy } from "neetocist";
import { useTranslation } from "react-i18next";

import { getLocale } from "utils";

const TIMEZONE_OPTIONS = [
  { label: "Local", value: undefined },
  { label: "UTC", value: "utc" },
];

const TimezoneSelect = ({ value, onChange }) => {
  const containerRef = useRef(null);
  const { t, i18n } = useTranslation();

  return (
    <div className="flex items-center gap-2" ref={containerRef}>
      <Typography style="body3" weight="medium">
        {getLocale(i18n, t, "neetoui.common.timezone")}
      </Typography>
      <Select
        className="w-40 py-1"
        data-testid="timezone-select"
        menuPortalTarget={containerRef.current}
        options={TIMEZONE_OPTIONS}
        size="small"
        strategy="fixed"
        value={findBy({ value }, TIMEZONE_OPTIONS)}
        onChange={option => onChange(option.value)}
      />
    </div>
  );
};

export default TimezoneSelect;
