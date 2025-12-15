import React, { useEffect, useState } from "react";

import { action } from "storybook/actions";

import ColorPicker from "components/ColorPicker";

import { PALETTE_PICKER_CODE } from "./constants";

const DEFAULT_COLORS = [
  { hex: "#f22d2d" },
  { hex: "#f57c00" },
  { hex: "#00ba88" },
  { hex: "#276ef1" },
  { hex: "#4c6ef5" },
  { hex: "#7c3aed" },
  { hex: "#4558F9" },
  { hex: "#f22d9e" },
  { hex: "#6b7280" },
  { hex: "#4b5563" },
  { hex: "#374151" },
  { hex: "#1f2937" },
  { hex: "#111827" },
];

const description = `
\`import { ColorPicker } from "@bigbinary/neetoui";\`

\`ColorPicker\` allows users to select and choose colors.
`;

const metadata = {
  title: "Components/ColorPicker",
  component: ColorPicker,
  parameters: {
    layout: "padded",
    docs: { description: { component: description } },
  },
  argTypes: {
    color: {
      description: "To specify the color value.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    size: {
      description: "To set the size of the target.",
      control: "radio",
      options: Object.values({
        large: "large",
        medium: "medium",
        small: "small",
      }),
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "large" },
        category: "New",
      },
    },
    colorPaletteProps: {
      description:
        "To specify the props to be passed to the Palette component.",
      control: "object",
      table: {
        type: {
          summary: "shape",
          detail: `{
  color: {
    from: string,
    to: string
  },
  colorList: Array<{
    from: string,
    to: string
  }>,
  onChange: func
}`,
        },
      },
    },
    showEyeDropper: {
      description: "Shows eye dropper to pick color.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
    },
    showHexValue: {
      description:
        "To show hex value near to the color in the dropdown. By default it will be hidden.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
    },
    showTransparencyControl: {
      description:
        "To show transparency control. By default it will be hidden.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
    },
    showPicker: {
      description:
        "To show the color picker. Used to hide the picker in cases where only palette is required. By default it will be true.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: true },
      },
    },
    showHexPicker: {
      description:
        "To show the hex color picker (color pointer). Used to hide the picker while keeping the hex input and eye dropper. By default it will be true.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: true },
      },
    },
    portalProps: {
      description: "To specify the props to be passed to the dropdown portal.",
      control: "object",
      table: { type: { summary: "object" } },
    },
    onChange: {
      table: {
        type: { summary: "func" },
        defaultValue: { summary: "(event) => void" },
      },
    },
  },
};

const Default = ({ color, ...args }) => {
  const [currentColor, setCurrentColor] = useState("#4558F9");

  const onChange = value => {
    action("onChange")(value);
    setCurrentColor(value.hex);
  };

  useEffect(() => {
    setCurrentColor(color || "#4558F9");
  }, [color]);

  return (
    <div className="h-96 w-40">
      <ColorPicker {...{ ...args, onChange }} color={currentColor} />
    </div>
  );
};

Default.args = { color: "#4558F9" };

const Sizes = args => {
  const [color, setColor] = useState("#4558F9");

  const onChange = value => {
    action("onChange")(value);
    setColor(value.hex);
  };

  useEffect(() => {
    setColor(args.color || "#4558F9");
  }, [args.color]);

  return (
    <div className="flex h-60 w-40 flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span>Small</span>
        <ColorPicker {...{ color, onChange }} size="small" />
      </div>
      <div className="flex flex-col gap-2">
        <span>Medium</span>
        <ColorPicker {...{ color, onChange }} size="medium" />
      </div>
      <div className="flex flex-col gap-2">
        <span>Large</span>
        <ColorPicker {...{ color, onChange }} size="large" />
      </div>
    </div>
  );
};

Sizes.storyName = "Sizes";
Sizes.args = { color: "#4558F9" };

const WithCustomColorPalette = args => {
  const [activeColor] = DEFAULT_COLORS;
  const [selectedColor, setSelectedColor] = useState(activeColor);

  const onChange = value => {
    action("onChange")(value);
    setSelectedColor(value);
  };

  useEffect(() => {
    setSelectedColor({ hex: args.color });
  }, [args.color]);

  return (
    <div className="h-60 w-40">
      <ColorPicker
        {...{ onChange }}
        color={selectedColor.hex}
        colorPalette={DEFAULT_COLORS}
      />
    </div>
  );
};
WithCustomColorPalette.storyName = "With custom color palette";
WithCustomColorPalette.args = { color: "#4558F9" };

const WithEyeDropper = args => {
  const [color, setColor] = useState("#4558F9");

  const onChange = value => {
    action("onChange")(value);
    setColor(value.hex);
  };

  useEffect(() => {
    setColor(args.color || "#4558F9");
  }, [args.color]);

  return (
    <div className="h-60 w-40">
      <ColorPicker {...{ color, onChange }} showEyeDropper />
    </div>
  );
};
WithEyeDropper.storyName = "With eye dropper";
WithEyeDropper.args = { color: "#4558F9" };

const ShowHexValue = args => {
  const [color, setColor] = useState("#4558F9");

  const onChange = value => {
    action("onChange")(value);
    setColor(value.hex);
  };

  useEffect(() => {
    setColor(args.color || "#4558F9");
  }, [args.color]);

  return (
    <div className="h-60 w-40">
      <ColorPicker {...{ color, onChange }} showHexValue />
    </div>
  );
};
ShowHexValue.storyName = "Show hex value";
ShowHexValue.args = { color: "#4558F9" };

const ShowTransparencyControl = args => {
  const [color, setColor] = useState("#4558F9");

  const onChange = value => {
    action("onChange")(value);
    setColor(value.hex);
  };

  useEffect(() => {
    setColor(args.color || "#4558F9c9");
  }, [args.color]);

  return (
    <div className="h-60 w-40">
      <ColorPicker {...{ color, onChange }} showTransparencyControl />
    </div>
  );
};
ShowTransparencyControl.storyName = "Show transparency control";
ShowTransparencyControl.args = { color: "#4558F9c9" };

const WithoutHexPicker = args => {
  const [color, setColor] = useState("#4558F9");

  const onChange = value => {
    action("onChange")(value);
    setColor(value.hex);
  };

  useEffect(() => {
    setColor(args.color || "#4558F9");
  }, [args.color]);

  return (
    <div className="h-60 w-40">
      <ColorPicker {...{ color, onChange }} showHexPicker={false} />
    </div>
  );
};
WithoutHexPicker.storyName = "Without hex picker";
WithoutHexPicker.args = { color: "#4558F9" };

const OnlyPalettePicker = args => {
  const [selectedColor, setSelectedColor] = useState("#00ba88");

  useEffect(() => {
    setSelectedColor(args.color ?? "#00ba88");
  }, [args.color]);

  const onChange = value => {
    action("onChange")(value);
    setSelectedColor(value.hex);
  };

  return (
    <div className="h-60 w-40">
      <ColorPicker
        {...{ onChange }}
        color={selectedColor}
        colorPalette={DEFAULT_COLORS}
        showPicker={false}
      />
    </div>
  );
};

OnlyPalettePicker.storyName = "Show only palette picker";
OnlyPalettePicker.args = { color: "#00ba88" };
OnlyPalettePicker.parameters = {
  docs: { source: { code: PALETTE_PICKER_CODE } },
};

const CSSCustomization = ({ color, ...args }) => {
  const [currentColor, setCurrentColor] = useState("#4558F9");

  const onChange = value => {
    action("onChange")(value);
    setCurrentColor(value.hex);
  };

  useEffect(() => {
    setCurrentColor(color || "#4558F9");
  }, [color]);

  return (
    <div className="h-60 w-40">
      <div className="neetix-colorpicker">
        <ColorPicker {...{ ...args, onChange }} color={currentColor} />
      </div>
    </div>
  );
};

const ColorPickerCSSCustomization = `
Starting from v6, neeto-ui supports enhanced customization of components using
CSS variables. These are the variables that are being used in the \`ColorPicker\`
component.

\`\`\`css
// Popover
--neeto-ui-colorpicker-popover-width: 224px;
--neeto-ui-colorpicker-popover-padding: 12px;

// Pointer
--neeto-ui-colorpicker-pointer-width: 20px;
--neeto-ui-colorpicker-pointer-height: 20px;

// Palette Wrapper
--neeto-ui-colorpicker-palette-wrapper-margin-top: 12px;

// Palette Item
--neeto-ui-colorpicker-palette-item-width: 32px;
--neeto-ui-colorpicker-palette-item-height: 32px;
--neeto-ui-colorpicker-palette-item-border-width: 1px;
--neeto-ui-colorpicker-palette-item-border-color: transparent;
--neeto-ui-colorpicker-palette-item-border-radius: var(--neeto-ui-rounded-md);
--neeto-ui-colorpicker-palette-item-padding: 2px;
--neeto-ui-colorpicker-palette-item-margin-left: 1.25px;

// Target Wrapper
--neeto-ui-colorpicker-target-wrapper-gap: 8px;

// Target
--neeto-ui-colorpicker-target-bg-color: rgb(var(--neeto-ui-white));
--neeto-ui-colorpicker-target-border-radius: var(--neeto-ui-rounded);
--neeto-ui-colorpicker-target-border-width: 1px;
--neeto-ui-colorpicker-target-border-color: rgb(var(--neeto-ui-gray-400));
--neeto-ui-colorpicker-target-height: 28px;
--neeto-ui-colorpicker-target-padding: 8px;
--neeto-ui-colorpicker-target-gap: 12px;

// Targer: Hover
--neeto-ui-colorpicker-target-hover-border-color: rgb(var(--neeto-ui-gray-700));

// Targer: Focus Visible
--neeto-ui-colorpicker-target-focus-visible-border-color: rgb(
  var(--neeto-ui-primary-500)
);
--neeto-ui-colorpicker-target-focus-visible-box-shadow: 0 0 0 3px rgba(var(--neeto-ui-primary-500), 15%);
--neeto-ui-colorpicker-target-focus-visible-outline: none;

// Target - Color
--neeto-ui-colorpicker-target-color-block-border-radius: var(
  --neeto-ui-rounded
);
--neeto-ui-colorpicker-target-color-block-width: 20px;
--neeto-ui-colorpicker-target-color-block-height: 20px;

// Target - Hexcode
--neeto-ui-colorpicker-target-hexcode-font-size: var(--neeto-ui-text-sm);
--neeto-ui-colorpicker-target-hexcode-color: rgb(var(--neeto-ui-gray-800));
--neeto-ui-colorpicker-target-hexcode-font-weight: var(--neeto-ui-font-medium);
--neeto-ui-colorpicker-target-hexcode-min-width: 72px;
\`\`\`

You can use these variables to customize the component to your liking. Here is
an example:

\`\`\`css
.neetix-colorpicker {
  --neeto-ui-colorpicker-palette-item-border-radius: var(
    --neeto-ui-rounded-full
  );
  --neeto-ui-colorpicker-target-color-block-border-radius: var(
    --neeto-ui-rounded-full
  );
}
\`\`\`

#### Output
`;

CSSCustomization.storyName = "ColorPicker CSS Customization";

CSSCustomization.args = {
  color: "#4558F9",
  className: "neetix-colorpicker",
};

CSSCustomization.parameters = {
  docs: { description: { story: ColorPickerCSSCustomization } },
};

const PortalCustomClassName = ({ color, ...args }) => {
  const [currentColor, setCurrentColor] = useState("#4558F9");

  const onChange = value => {
    action("onChange")(value);
    setCurrentColor(value.hex);
  };

  useEffect(() => {
    setCurrentColor(color ?? "#4558F9");
  }, [color]);

  return (
    <div className="h-60 w-40">
      <ColorPicker {...{ ...args, onChange }} color={currentColor} />
    </div>
  );
};

PortalCustomClassName.storyName =
  "ColorPicker with custom classname for the dropdown menu";

PortalCustomClassName.args = {
  color: "#4558F9",
  portalProps: { classNames: "neeto-ui__color-pallette-wrapper" },
};

export {
  Default,
  Sizes,
  WithCustomColorPalette,
  WithEyeDropper,
  ShowHexValue,
  ShowTransparencyControl,
  WithoutHexPicker,
  OnlyPalettePicker,
  CSSCustomization,
  PortalCustomClassName,
};

export default metadata;
