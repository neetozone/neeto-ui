import React from "react";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Tooltip, Typography } from "components";

const waitForTooltip = callback => waitFor(() => callback(), { timeout: 400 });

describe("Tooltip", () => {
  it("should render on hover", async () => {
    render(
      <Tooltip content="Tooltip">
        <Typography>Text</Typography>
      </Tooltip>
    );
    const text = screen.getByText("Text");
    await userEvent.hover(text);
    await waitForTooltip(() =>
      expect(screen.getByText("Tooltip")).toBeInTheDocument()
    );
  });

  it("should render properly when string is passed as children", async () => {
    render(<Tooltip content="Tooltip">Text</Tooltip>);
    const text = screen.getByText("Text");
    await userEvent.hover(text);
    await waitForTooltip(() =>
      expect(screen.getByText("Tooltip")).toBeInTheDocument()
    );
  });

  it("should render properly when array of nodes is passed as children", async () => {
    render(
      <Tooltip content="Tooltip">
        <span>Hello</span>
        <span>World</span>
      </Tooltip>
    );
    const text1 = screen.getByText("Hello");
    const text2 = screen.getByText("World");
    await userEvent.hover(text1);
    await waitForTooltip(() =>
      expect(screen.getByText("Tooltip")).toBeInTheDocument()
    );
    await userEvent.hover(text2);
    await waitForTooltip(() =>
      expect(screen.getByText("Tooltip")).toBeInTheDocument()
    );
  });

  it("should not render when user stops hovering", async () => {
    render(
      <Tooltip content="Tooltip">
        <Typography>Text</Typography>
      </Tooltip>
    );
    const text = screen.getByText("Text");
    await userEvent.hover(text);
    await userEvent.unhover(text);
    await waitForTooltip(() =>
      expect(screen.queryByText("Tooltip")).not.toBeInTheDocument()
    );
  });

  it("should auto hide tooltip after n milliseconds", async () => {
    render(
      <Tooltip content="Tooltip" hideAfter={2000}>
        <Typography>Text</Typography>
      </Tooltip>
    );

    const text = screen.getByText("Text");
    await userEvent.hover(text);
    await waitForTooltip(() => {
      expect(screen.queryByText("Tooltip")).toBeInTheDocument();
    });

    await waitFor(
      () => {
        expect(screen.queryByText("Tooltip")).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
