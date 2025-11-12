import React from "react";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Dropdown } from "components";

const { MenuItem } = Dropdown;

const options = ["option 1", "option 2"].map(option => (
  <li key={option}>{option}</li>
));

const secondOptions = ["option 3", "option 4"].map(option => (
  <li key={option}>{option}</li>
));

const waitForTooltip = callback => waitFor(() => callback(), { timeout: 400 });

describe("Dropdown", () => {
  it("should render without error", () => {
    const { getByText } = render(<Dropdown label="Dropdown" />);
    expect(getByText("Dropdown")).toBeInTheDocument();
  });

  it("should show icon when icon component is provided", () => {
    const { getByTestId } = render(
      <Dropdown icon={() => <svg data-testid="svg-icon" />} />
    );
    expect(getByTestId("svg-icon")).toBeInTheDocument();
  });

  it("should render all the options when clicking dropdown without error", async () => {
    const { getByText } = render(
      <Dropdown label="Dropdown">{options}</Dropdown>
    );
    await userEvent.click(getByText("Dropdown"));
    const listItems = await screen.findAllByText(/option/i);
    expect(listItems.length).toBe(2);
  });

  it("should render all the options if isOpen is true", async () => {
    const { findAllByText } = render(
      <Dropdown isOpen label="Dropdown">
        {options}
      </Dropdown>
    );
    const listItems = await findAllByText(/option/i);
    expect(listItems.length).toBe(2);
  });

  it("should be disabled if disabled is true", () => {
    const { getByRole } = render(<Dropdown disabled label="Dropdown" />);
    expect(getByRole("button")).toBeDisabled();
  });

  it("should close the dropdown on select if closeOnSelect is true", async () => {
    const { getByText, findByText } = render(
      <Dropdown closeOnSelect label="Dropdown">
        {options}
      </Dropdown>
    );
    await userEvent.click(getByText("Dropdown"));
    const listItem = await findByText("option 1");
    await userEvent.click(listItem);
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("should not close the dropdown on select if closeOnSelect is false", async () => {
    const { getByText, findByText } = render(
      <Dropdown closeOnSelect={false} label="Dropdown">
        {options}
      </Dropdown>
    );
    await userEvent.click(getByText("Dropdown"));
    const listItem = await findByText("option 1");
    await userEvent.click(listItem);
    const listItems = await screen.findAllByRole("listitem");
    expect(listItems).toHaveLength(2);
  });

  it("should close the dropdown when Esc key is pressed if closeOnEsc is true", async () => {
    const { getByText } = render(
      <Dropdown closeOnEsc label="Dropdown">
        {options}
      </Dropdown>
    );
    await userEvent.click(getByText("Dropdown"));
    await userEvent.keyboard("{Escape}");
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("should not close the dropdown when Esc key is pressed if closeOnEsc is false", async () => {
    const { getByText } = render(
      <Dropdown closeOnEsc={false} label="Dropdown">
        {options}
      </Dropdown>
    );
    await userEvent.click(getByText("Dropdown"));
    await userEvent.keyboard("{esc}");
    const listItems = await screen.findAllByRole("listitem");
    expect(listItems).toHaveLength(2);
  });

  it("should close dropdown on clicking outside if closeOnOutsideClick is true", async () => {
    const { getByText } = render(
      <Dropdown closeOnOutsideClick label="Dropdown">
        {options}
      </Dropdown>
    );
    await userEvent.click(getByText("Dropdown"));
    await userEvent.click(document.body);
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("should not close on clicking outside if closeOnOutsideClick is false", async () => {
    const { getByText } = render(
      <Dropdown closeOnOutsideClick={false} label="Dropdown">
        {options}
      </Dropdown>
    );
    await userEvent.click(getByText("Dropdown"));
    await userEvent.click(document.body);
    const listItems = await screen.findAllByRole("listitem");
    expect(listItems).toHaveLength(2);
  });

  it("should call onClickOutside when clicking outside the dropdown", async () => {
    const onClickOutside = jest.fn();
    const { getByText } = render(
      <Dropdown {...{ onClickOutside }} closeOnOutsideClick label="Dropdown">
        {options}
      </Dropdown>
    );
    await userEvent.click(getByText("Dropdown"));
    await userEvent.click(document.body);
    expect(onClickOutside).toHaveBeenCalledTimes(1);
    expect(onClickOutside).toHaveBeenCalledWith(expect.any(Object));
  });

  it("should not call onClickOutside when closing via Esc key", async () => {
    const onClickOutside = jest.fn();
    const { getByText } = render(
      <Dropdown
        {...{ onClickOutside }}
        closeOnEsc
        closeOnOutsideClick
        label="Dropdown"
      >
        {options}
      </Dropdown>
    );
    await userEvent.click(getByText("Dropdown"));
    await userEvent.keyboard("{Escape}");
    expect(onClickOutside).not.toHaveBeenCalled();
  });

  it("should not call onClickOutside when closing via selecting an item", async () => {
    const onClickOutside = jest.fn();
    const { getByText, findByText } = render(
      <Dropdown
        {...{ onClickOutside }}
        closeOnOutsideClick
        closeOnSelect
        label="Dropdown"
      >
        {options}
      </Dropdown>
    );
    await userEvent.click(getByText("Dropdown"));
    const listItem = await findByText("option 1");
    await userEvent.click(listItem);
    expect(onClickOutside).not.toHaveBeenCalled();
  });

  it("should not call onClickOutside when closeOnOutsideClick is false", async () => {
    const onClickOutside = jest.fn();
    const { getByText } = render(
      <Dropdown
        {...{ onClickOutside }}
        closeOnOutsideClick={false}
        label="Dropdown"
      >
        {options}
      </Dropdown>
    );
    await userEvent.click(getByText("Dropdown"));
    await userEvent.click(document.body);
    expect(onClickOutside).not.toHaveBeenCalled();
  });

  it("should not open dropdown on click of custom target if disabled", async () => {
    const { getByText } = render(
      <Dropdown disabled customTarget={<span>Click</span>} label="Dropdown">
        {options}
      </Dropdown>
    );

    await userEvent.click(getByText("Click"));
    const listItems = screen.queryAllByRole("listitem");
    expect(listItems).toHaveLength(0);
  });

  it("should open another dropdown on click trigger when it is multilevel ", async () => {
    const { findByText } = render(
      <Dropdown isOpen label="Dropdown">
        {options}
        <Dropdown
          customTarget={<li>Another Dropdown</li>}
          onClick={e => e.stopPropagation()}
        >
          {secondOptions}
        </Dropdown>
      </Dropdown>
    );
    await userEvent.click(await findByText("Another Dropdown"));
    expect(await findByText("option 3")).toBeInTheDocument();
    const listItems = await screen.findAllByRole("listitem");
    expect(listItems).toHaveLength(5);
  });

  it("should open another dropdown on hover trigger when it is multilevel", async () => {
    const { findByText } = render(
      <Dropdown isOpen label="Dropdown">
        {options}
        <Dropdown customTarget={<li>Another Dropdown</li>} trigger="hover">
          {secondOptions}
        </Dropdown>
      </Dropdown>
    );
    await userEvent.hover(await findByText("Another Dropdown"));
    expect(await findByText("option 3")).toBeInTheDocument();
    const listItems = await screen.findAllByRole("listitem");
    expect(listItems).toHaveLength(5);
  });

  it("should call onClose when Dropdown is closed", async () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <Dropdown {...{ onClose }} closeOnOutsideClick label="Dropdown">
        {options}
      </Dropdown>
    );
    await userEvent.click(getByText("Dropdown"));
    await userEvent.click(document.body);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should show tooltip when menuitem is hovered", async () => {
    const { getByText } = render(
      <Dropdown label="Dropdown">
        <MenuItem.Button tooltipProps={{ content: "Enabled button's tooltip" }}>
          Enabled button
        </MenuItem.Button>
        <MenuItem.Button
          isDisabled
          tooltipProps={{ content: "Disabled button's tooltip" }}
        >
          Disabled button
        </MenuItem.Button>
      </Dropdown>
    );
    await userEvent.click(getByText("Dropdown"));
    await userEvent.hover(getByText("Enabled button"));
    await waitForTooltip(() =>
      expect(getByText("Enabled button's tooltip")).toBeInTheDocument()
    );
    await userEvent.hover(getByText("Disabled button"));
    await waitForTooltip(() =>
      expect(getByText("Disabled button's tooltip")).toBeInTheDocument()
    );
  });

  it("should open menu on click and hover when trigger is all", async () => {
    const { findByText } = render(
      <Dropdown closeOnOutsideClick label="Dropdown" trigger="all">
        {options}
      </Dropdown>
    );
    await userEvent.hover(await findByText("Dropdown"));
    expect(await findByText("option 1")).toBeInTheDocument();
    await userEvent.click(document.body);

    await userEvent.click(await findByText("Dropdown"));
    expect(await findByText("option 1")).toBeInTheDocument();
    await userEvent.click(document.body);
  });
});

describe("Dropdown Menu", () => {
  const { Menu, MenuItem } = Dropdown;

  it("should focus buttons when arrow down is pressed", async () => {
    render(
      <Menu>
        <MenuItem.Button>Item 1</MenuItem.Button>
        <MenuItem.Button>Item 2</MenuItem.Button>
        <MenuItem.Button>Item 3</MenuItem.Button>
      </Menu>
    );

    const buttons = screen.getAllByRole("button");
    await userEvent.keyboard("{ArrowDown}");
    expect(buttons[0]).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
    expect(buttons[1]).toHaveFocus();
  });

  it("should focus buttons when arrow up is pressed", async () => {
    render(
      <Menu>
        <MenuItem.Button>Item 1</MenuItem.Button>
        <MenuItem.Button>Item 2</MenuItem.Button>
        <MenuItem.Button>Item 3</MenuItem.Button>
      </Menu>
    );

    const buttons = screen.getAllByRole("button");
    await userEvent.keyboard("{ArrowUp}");
    expect(buttons[2]).toHaveFocus();

    await userEvent.keyboard("{ArrowUp}");
    expect(buttons[1]).toHaveFocus();
  });

  it("should call onClick with the right item data when enter is pressed", async () => {
    const onClick1 = jest.fn();
    const onClick2 = jest.fn();
    const onClick3 = jest.fn();

    render(
      <Menu>
        <MenuItem.Button data-item="item-1" onClick={onClick1}>
          Item 1
        </MenuItem.Button>
        <MenuItem.Button data-item="item-2" onClick={onClick2}>
          Item 2
        </MenuItem.Button>
        <MenuItem.Button data-item="item-3" onClick={onClick3}>
          Item 3
        </MenuItem.Button>
      </Menu>
    );

    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{Enter}");

    expect(onClick2).toHaveBeenCalledTimes(1);
    expect(onClick1).not.toHaveBeenCalled();
    expect(onClick3).not.toHaveBeenCalled();
  });
});
