import React from "react";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import DatePicker from "components/DatePicker";
import { dayjs } from "utils";
import userEvent from "@testing-library/user-event";

const today = dayjs();
const theDate = dayjs(new Date(1999, 7, 16));
const anotherDate = theDate.add(1, "day");

describe("DatePicker", () => {
  it("should render without error", () => {
    render(<DatePicker defaultValue={theDate} />);
    expect(screen.getByRole("textbox")).toHaveValue(
      theDate.format("DD/MM/YYYY")
    );
  });

  it("should show label if label is provided", () => {
    render(<DatePicker label="DatePicker Label" />);
    expect(screen.getByText("DatePicker Label")).toBeInTheDocument();
  });

  it("should show error if error is provided", () => {
    render(<DatePicker error="DatePicker Error" />);
    expect(screen.getByText("DatePicker Error")).toBeInTheDocument();
  });

  it("should render time if showTime is true", async () => {
    render(<DatePicker open showTime defaultValue={theDate} />);
    expect(await screen.findAllByText("00")).toHaveLength(3);
  });

  it("should show only hours if format is HH", async () => {
    render(<DatePicker open showTime defaultValue={today} timeFormat="HH" />);
    expect(await screen.findAllByText("00")).toHaveLength(1);
  });

  it("should show only hours and minutes if format is HH:mm", async () => {
    render(
      <DatePicker open showTime defaultValue={theDate} timeFormat="HH:mm" />
    );
    expect(await screen.findAllByText("00")).toHaveLength(2);
  });

  it("should return date in the given format", () => {
    render(
      <DatePicker
        defaultValue={dayjs("2022-05-24", "YYYY-MM-DD")}
        format="DD/MM/YYYY"
      />
    );
    expect(screen.getByRole("textbox")).toHaveValue("24/05/2022");
  });

  it("should return date time in the given format", () => {
    render(
      <DatePicker
        showTime
        format="DD/MM/YYYY HH:mm"
        defaultValue={dayjs("2022-05-24", "YYYY-MM-DD")
          .hour(12)
          .minute(30)
          .second(0)}
      />
    );
    expect(screen.getByRole("textbox")).toHaveValue("24/05/2022 12:30");
  });

  it("should trigger onChange on selecting a date", () => {
    const onDateChange = jest.fn();
    render(<DatePicker open defaultValue={theDate} onChange={onDateChange} />);
    fireEvent.click(screen.getByText(anotherDate.get("D")));
    expect(onDateChange).toHaveBeenCalled();
  });

  it("should trigger onOk method on clicking on ok button", () => {
    const onOkClick = jest.fn();
    render(
      <DatePicker open showTime defaultValue={theDate} onOk={onOkClick} />
    );
    fireEvent.click(screen.getByText("OK"));
    expect(onOkClick).toHaveBeenCalled();
  });

  it("should show 12 hour format if timeFormat is in 12 hr format", () => {
    render(
      <DatePicker
        open
        showTime
        dateFormat="DD/MM/YYYY"
        defaultValue={dayjs("04/12/2022").hour(14).minute(30)}
        timeFormat="h:mm A"
      />
    );
    expect(screen.getByRole("textbox")).toHaveValue("12/04/2022 2:30 PM");
  });

  it("should be able to select date in a range", () => {
    render(
      <DatePicker
        open
        defaultValue={[dayjs("04/12/2022"), dayjs("04/14/2022")]}
        type="range"
      />
    );
    fireEvent.click(screen.getAllByText("11")[0]);
    fireEvent.click(screen.getAllByText("11")[0]);
    fireEvent.click(screen.getAllByText("16")[1]);
    const dateInputBox = screen.getAllByRole("textbox");
    expect(dateInputBox[0]).toHaveValue("11/04/2022");
    expect(dateInputBox[1]).toHaveValue("16/05/2022");
  });

  it("should render asterisk when required is set to true", () => {
    const { getByText } = render(<DatePicker required label="Input" />);
    const asterisk = getByText("*");
    expect(asterisk).toBeInTheDocument();
  });

  it("should show today button in month and year mode", () => {
    const { getByText } = render(
      <DatePicker open label="Input" mode="month" />
    );
    expect(getByText("Today")).toBeInTheDocument();
  });

  it("onChange should trigger with today date when today is clicked", async () => {
    const onDateChange = jest.fn();
    const { getByText } = render(
      <DatePicker open label="Input" mode="month" onChange={onDateChange} />
    );
    fireEvent.click(getByText("Today"));
    await waitFor(() => {
      expect(onDateChange).toHaveBeenCalledWith(
        expect.anything(),
        // eslint-disable-next-line @bigbinary/neeto/use-standard-date-time-formats
        dayjs().format("DD/MM/YYYY")
      );
    });
  });

  it("if selected date is before minDate then it should round to minDate", async () => {
    const value = dayjs("2024-03-15");
    const minDate = dayjs("2024-03-14");
    const onChangeMock = jest.fn();
    render(
      <DatePicker
        {...{ minDate, value }}
        placeholder="Select date"
        onChange={onChangeMock}
      />
    );

    const input = screen.getByPlaceholderText("Select date");
    fireEvent.change(input, { target: { value: "10/10/2000" } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledWith(
        expect.anything(),
        // eslint-disable-next-line @bigbinary/neeto/use-standard-date-time-formats
        minDate.format("DD/MM/YYYY")
      );
    });
  });

  it("if selected date is after maxDate then it should round to maxDate", async () => {
    const value = dayjs("2024-03-11");
    const maxDate = dayjs("2024-03-14");
    const onChangeMock = jest.fn();
    render(
      <DatePicker
        {...{ maxDate, value }}
        placeholder="Select date"
        onChange={onChangeMock}
      />
    );

    const input = screen.getByPlaceholderText("Select date");
    fireEvent.change(input, { target: { value: "10/10/2025" } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledWith(
        expect.anything(),
        // eslint-disable-next-line @bigbinary/neeto/use-standard-date-time-formats
        maxDate.format("DD/MM/YYYY")
      );
    });
  });

  it("it should render the saved value though it's outside the allowed ranges", () => {
    const value = dayjs("2024-10-25T09:30:00.434Z");
    const expectedValue = value.format("MM/DD/YYYY HH:mm:ss");

    render(
      <DatePicker
        {...{ value }}
        showTime
        dateFormat="MM/DD/YYYY"
        maxDate={dayjs("2024-10-30T09:30:00.434Z")}
        minDate={dayjs()}
        placeholder="Select date"
      />
    );

    const dateInputBox = screen.getByRole("textbox");
    expect(dateInputBox).toHaveValue(expectedValue);
  });

  it("should automatically save selected date when clicking outside the picker", async () => {
    const onChangeMock = jest.fn();

    render(
      <div>
        <DatePicker
          defaultValue={dayjs("2024-06-01")}
          placeholder="Select date"
          onChange={onChangeMock}
        />
        <div data-testid="outside-element">Outside element</div>
      </div>
    );

    const input = screen.getByRole("textbox");
    fireEvent.click(input);

    await waitFor(() => {
      expect(screen.getByText("15")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("15"));

    const outsideElement = screen.getByTestId("outside-element");
    fireEvent.mouseDown(outsideElement);
    fireEvent.click(outsideElement);

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledWith(
        expect.anything(),
        expect.stringMatching(/15\/06\/2024/)
      );
    });
  });

  it("should automatically save selected date and time when clicking outside the picker", async () => {
    const onChangeMock = jest.fn();

    render(
      <div>
        <DatePicker
          showTime
          defaultValue={dayjs("2024-06-01").hour(10).minute(30)}
          placeholder="Select date and time"
          onChange={onChangeMock}
        />
        <div data-testid="outside-element">Outside element</div>
      </div>
    );

    const input = screen.getByRole("textbox");
    fireEvent.click(input);

    let dateCell;

    await waitFor(() => {
      const dateCells = screen.getAllByText("15");
      dateCell = dateCells.find(cell => cell.closest(".ant-picker-date-panel"));
      expect(dateCell).toBeInTheDocument();
    });

    fireEvent.click(dateCell);

    onChangeMock.mockClear();

    const outsideElement = screen.getByTestId("outside-element");
    fireEvent.mouseDown(outsideElement);
    fireEvent.click(outsideElement);

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalled();
    });

    const finalInput = screen.getByRole("textbox");
    expect(finalInput.value).toMatch(/15\/06\/2024.*:/);
  });

  it("should not trigger onChange when calendar receives null date and clicking outside", async () => {
    const onChangeMock = jest.fn();

    render(
      <div>
        <DatePicker open placeholder="Select date" onChange={onChangeMock} />
        <div data-testid="outside-element">Outside element</div>
      </div>
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "" } });

    expect(input.value).toBe("");

    const outsideElement = screen.getByTestId("outside-element");
    fireEvent.mouseDown(outsideElement);
    fireEvent.click(outsideElement);

    await waitFor(() => {
      expect(onChangeMock).not.toHaveBeenCalled();
    });
  });

  it("should render timezone select when onTimezoneChange is provided", () => {
    render(<DatePicker open onTimezoneChange={() => {}} />);
    expect(screen.getByText("Timezone")).toBeInTheDocument();
  });

  it("should change timezone when timezone select is changed", async () => {
    const onTimezoneChange = jest.fn();
    render(<DatePicker {...{ onTimezoneChange }} open />);
    await userEvent.click(screen.getByTestId("timezone-select"));
    await userEvent.click(screen.getByText("UTC"));
    expect(onTimezoneChange).toHaveBeenCalledWith("utc");
  });

  it("should display valid calendar when invalid date is passed", async () => {
    const invalidDate = new Date("invalid");
    render(<DatePicker open value={invalidDate} />);

    await waitFor(() => {
      const dateCells = screen.getAllByText(
        /^[1-9]$|^1[0-9]$|^2[0-9]$|^3[01]$/
      );
      expect(dateCells.length).toBeGreaterThan(0);
    });

    await waitFor(() => {
      const calendarPanel = document.querySelector(".ant-picker-date-panel");
      expect(calendarPanel).toBeInTheDocument();
      const panelText = calendarPanel.textContent || "";
      expect(panelText).not.toContain("Invalid Date");
      expect(panelText).toMatch(/([1-9]|1[0-9]|2[0-9]|3[01])/);
    });
  });
});
