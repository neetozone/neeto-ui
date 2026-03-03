import React from "react";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Checkbox } from "components";

describe("Checkbox", () => {
  it("should render without error", () => {
    const { getByRole } = render(<Checkbox label="Checkbox" />);
    expect(getByRole("checkbox")).toBeInTheDocument();
  });

  it("should call onChange when checkbox value is changed", async () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <Checkbox {...{ onChange }} label="Checkbox" />
    );
    await userEvent.click(getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("should display error message", () => {
    const { getByText } = render(
      <Checkbox error="Error message" label="Checkbox" />
    );
    expect(getByText("Error message")).toBeInTheDocument();
  });

  it("should be unchecked by default", () => {
    const { getByRole } = render(<Checkbox label="Checkbox" />);
    expect(getByRole("checkbox")).not.toBeChecked();
  });

  it("should be checked on clicking the checkbox", async () => {
    const { getByRole } = render(<Checkbox label="Checkbox" />);
    const checkbox = getByRole("checkbox");
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("should apply small size class by default", () => {
    const { getByRole } = render(<Checkbox label="Checkbox" />);
    expect(
      getByRole("checkbox").closest(".neeto-ui-checkbox__wrapper")
    ).toHaveClass("neeto-ui-checkbox__wrapper--size-small");
  });

  it("should apply medium size class when size is medium", () => {
    const { getByRole } = render(<Checkbox label="Checkbox" size="medium" />);
    expect(
      getByRole("checkbox").closest(".neeto-ui-checkbox__wrapper")
    ).toHaveClass("neeto-ui-checkbox__wrapper--size-medium");
  });

  it("should apply large size class when size is large", () => {
    const { getByRole } = render(<Checkbox label="Checkbox" size="large" />);
    expect(
      getByRole("checkbox").closest(".neeto-ui-checkbox__wrapper")
    ).toHaveClass("neeto-ui-checkbox__wrapper--size-large");
  });
});
