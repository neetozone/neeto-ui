import React, { useRef } from "react";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Popover, Typography, Button } from "components";

const waitForPopover = callback => waitFor(callback, { timeout: 400 });

describe("Popover", () => {
  const PopoverExample = ({ popoverProps, children }) => {
    const popoverReferenceElement = useRef(null);

    return (
      <div>
        <div>
          <Button
            label="Show Popover"
            ref={popoverReferenceElement}
            style="secondary"
          />
        </div>
        <div>
          <Popover reference={popoverReferenceElement} {...popoverProps}>
            <Popover.Title>Popover Title</Popover.Title>
            {children}
          </Popover>
        </div>
      </div>
    );
  };

  it("should render on hover ", async () => {
    render(<PopoverExample />);
    const text = screen.getByText("Show Popover");
    await userEvent.hover(text);
    await waitForPopover(() =>
      expect(screen.getByText("Popover Title")).toBeInTheDocument()
    );
  });

  it("should not render when user stops hovering", async () => {
    render(<PopoverExample />);
    const text = screen.getByText("Show Popover");
    await userEvent.hover(text);
    await userEvent.click(document.body);

    await waitForPopover(() =>
      expect(screen.queryByText("Popover Title")).not.toBeInTheDocument()
    );
  });

  it("should auto hide after 20ms", async () => {
    render(<PopoverExample popoverProps={{ hideAfter: 2000 }} />);
    const text = screen.getByText("Show Popover");
    await userEvent.hover(text);
    await waitForPopover(() =>
      expect(screen.getByText("Popover Title")).toBeInTheDocument()
    );

    await waitFor(
      () => expect(screen.queryByText("Popover Title")).not.toBeInTheDocument(),
      { timeout: 3000 }
    );
  });

  it("should render a disabled popover", async () => {
    render(<PopoverExample popoverProps={{ disabled: true }} />);
    const text = screen.getByText("Show Popover");
    await userEvent.hover(text);
    const popover = screen.queryByText("Popover Title");
    expect(popover).not.toBeInTheDocument();
  });

  it("should render popover title", async () => {
    render(<PopoverExample />);
    const text = screen.getByText("Show Popover");
    await userEvent.hover(text);
    await waitForPopover(() =>
      expect(screen.getByText("Popover Title")).toBeInTheDocument()
    );
  });

  it("should render children", async () => {
    render(
      <PopoverExample>
        <Typography>Popover Content</Typography>
      </PopoverExample>
    );
    const text = screen.getByText("Show Popover");
    await userEvent.hover(text);
    await waitForPopover(() =>
      expect(screen.getByText("Popover Content")).toBeInTheDocument()
    );
  });
});
