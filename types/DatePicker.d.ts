import React from "react";
import { LabelProps } from "./Label";

export type DatePickerProps = {
  value: any;
  defaultValue?: any;
  className?: string;
  popupClassName?: string;
  label?: string;
  size?: "small" | "medium" | "large";
  dropdownClassName?: string;
  dateFormat?: string;
  timeFormat?: string;
  placeholder?: string;
  picker?: "date" | "week" | "month" | "quarter" | "year";
  showTime?: boolean;
  timePickerProps?: any;
  timezone?: string;
  type?: "range" | "date";
  nakedInput?: boolean;
  error?: string;
  id?: string;
  disabled?: boolean;
  labelProps?: LabelProps;
  allowClear?: boolean;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  onOk?: () => void;
  onChange?: (date: any, dateString: string) => void;
  onOpenChange?: (open: boolean) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onTimezoneChange?: (timezone: string) => void;
  [key: string]: any;
};

const DatePicker: React.FC<DatePickerProps>;
export default DatePicker;
