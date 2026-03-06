import React, { useState } from "react";

import { Formik, Form } from "formik";

import Button from "components/Button";
import Radio from "components/Radio";
import Typography from "components/Typography";
import { Radio as FormikRadio } from "formikcomponents";

const description = `
\`import { Radio } from "@bigbinary/neetoui";\`

\`Radio\` button allows users to select one option from a set of mutually
exclusive choices.

`;

const metadata = {
  title: "Components/Radio",
  component: Radio,
  subcomponents: { Item: Radio.Item },
  parameters: {
    layout: "padded",
    docs: { autodocs: true, description: { component: description } },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/zhdsnPzXzr264x1WUeVdmA/02-Components?node-id=104%3A10",
    },
  },
  argTypes: {
    label: {
      description: "To specify the label to be displayed for Radio component.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    labelProps: {
      description:
        "To specify the label props to be passed to the Label component.",
      control: "object",
      table: { type: { summary: "object" } },
    },
    children: {
      description:
        "To specify the content to be rendered inside the Radio component.",
      control: "object",
      table: { type: { summary: "node" } },
    },
    stacked: {
      description:
        "To specify whether the Radio items should be stacked vertically or not.",
      control: "boolean",
      table: { type: { summary: "boolean" } },
    },
    className: {
      description:
        "To specify external classnames as overrides to the Radio component.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    containerClassName: {
      description:
        "To specify external classnames for the container of Radio component.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    error: {
      description:
        "To specify the error message to be displayed when the Radio input is invalid.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    size: {
      description: "To set the size of the Radio.",
      control: "select",
      options: ["small", "medium"],
      table: { type: { summary: "string" } },
    },
  },
};

const Default = args => (
  <Radio {...args}>
    <Radio.Item label="Option 1" name="default" value="Option1" />
    <Radio.Item label="Option 2" name="default" value="Option2" />
  </Radio>
);

Default.args = { label: "Radio options", size: "small" };

const Sizes = args => (
  <div className="w-full">
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-wrap items-start gap-4">
        <Radio {...args} label="Small" size="small">
          <Radio.Item label="Option 1" name="sizeSmall" value="Option1" />
          <Radio.Item label="Option 2" name="sizeSmall" value="Option2" />
        </Radio>
      </div>
      <div className="flex flex-wrap items-start gap-4">
        <Radio {...args} label="Medium" size="medium">
          <Radio.Item label="Option 1" name="sizeMedium" value="Option1" />
          <Radio.Item label="Option 2" name="sizeMedium" value="Option2" />
        </Radio>
      </div>
    </div>
  </div>
);

const WithDescription = args => (
  <Radio {...args}>
    <Radio.Item
      description="First option description"
      label="Option 1"
      name="desc"
      value="Option1"
    />
    <Radio.Item
      description="Second option description"
      label="Option 2"
      name="desc"
      value="Option2"
    />
  </Radio>
);
WithDescription.args = { label: "Radio with descriptions" };
WithDescription.storyName = "With description";

const Options = args => (
  <Radio {...args}>
    <Radio.Item label="Option 1" name="options" value="Option1" />
    <Radio.Item label="Option 2" name="options" value="Option2" />
  </Radio>
);

Options.args = { label: "Radio options" };

const OptionsStacked = args => (
  <Radio {...args}>
    <Radio.Item label="Option 1" name="stackedOptions" value="Option1" />
    <Radio.Item label="Option 2" name="stackedOptions" value="Option2" />
  </Radio>
);

OptionsStacked.args = {
  label: "Radio options stacked",
  stacked: true,
};
OptionsStacked.storyName = "Options stacked";

const ControlledRadio = args => {
  const [value, setValue] = React.useState("");

  return (
    <Radio {...{ ...args, value }} onChange={e => setValue(e.target.value)}>
      <Radio.Item label="Option 1" name="controlledOptions" value="Option1" />
      <Radio.Item label="Option 2" name="controlledOptions" value="Option2" />
      <Radio.Item label="Option 3" name="controlledOptions" value="Option3" />
      <Radio.Item label="Option 4" name="controlledOptions" value="Option4" />
      <Radio.Item label="Option 5" name="controlledOptions" value="Option5" />
    </Radio>
  );
};

const FormikRadioStory = args => {
  const [values, setValues] = useState({});

  return (
    <Formik
      initialValues={{ reaction: "Happy" }}
      onSubmit={values => setValues(values)}
    >
      <Form className="space-y-4">
        <FormikRadio {...args} name="reaction">
          {[
            { label: "Happy", value: "Happy" },
            { label: "Sad", value: "Sad" },
            { label: "Neutral", value: "Neutral" },
          ].map(option => (
            <FormikRadio.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </FormikRadio>
        <Button label="Submit" type="submit" />
        <Typography>Reaction: {values.reaction} </Typography>
      </Form>
    </Formik>
  );
};

FormikRadioStory.storyName = "Formik Radio";
FormikRadioStory.parameters = {
  docs: {
    description: {
      story:
        "`import { Radio as FormikRadio } from '@bigbinary/neetoui/formik';`",
    },
  },
};

const Error = args => (
  <Radio {...args}>
    <Radio.Item label="Option 1" name="errorOptions" value="Option1" />
    <Radio.Item label="Option 2" name="errorOptions" value="Option2" />
  </Radio>
);

Error.args = {
  label: "Radio options",
  error: "Please select an option",
  value: "",
  disabled: true,
};
Error.storyName = "Error";

const CSSCustomization = args => (
  <Radio {...args}>
    <Radio.Item label="Option 1" name="options" value="Option1" />
    <Radio.Item label="Option 2" name="options" value="Option2" />
  </Radio>
);

CSSCustomization.storyName = "Radio CSS Customization";

CSSCustomization.args = {
  label: "Custom Radio options",
  className: "neetix-radio",
};

const RadioCSSCustomization = `
Starting from v6, neeto-ui supports enhanced customization of components using
CSS variables. These are the variables that are being used in the \`Radio\`
component.

\`\`\`css
--neeto-ui-radio-size: 16px;
--neeto-ui-radio-color: rgb(var(--neeto-ui-primary-500));
--neeto-ui-radio-border-width: 2px;
--neeto-ui-radio-border-color: rgb(var(--neeto-ui-gray-400));

// Disabled
--neeto-ui-radio-disabled-opacity: 0.5;

// Hover
--neeto-ui-radio-hover-border-color: rgb(var(--neeto-ui-gray-500));

// Focus
--neeto-ui-radio-focus-outline: transparent;
--neeto-ui-radio-focus-outline-offset: 0px;

// Focus Visible
--neeto-ui-radio-focus-visible-outline: 3px solid rgba(var(--neeto-ui-primary-500), 50%);
--neeto-ui-radio-focus-visible-outline-offset: 1px;
--neeto-ui-radio-focus-visible-box-shadow: none;

// Checked
--neeto-ui-radio-checked-border-color: rgb(var(--neeto-ui-primary-500));

// Error
--neeto-ui-radio-error-border-color: rgb(var(--neeto-ui-error-600));
--neeto-ui-radio-error-color: rgb(var(--neeto-ui-error-600));
--neeto-ui-radio-error-description-color: rgb(var(--neeto-ui-error-400));
--neeto-ui-radio-error-font-size: var(--neeto-ui-text-xs);

// Margin
--neeto-ui-radio-wrapper-label-margin: 12px;
--neeto-ui-radio-wrapper-error-margin: 4px;
--neeto-ui-radio-label-margin: 8px;
--neeto-ui-radio-margin: 16px;

// Label
--neeto-ui-radio-label-line-height: 1.2;

// Description
--neeto-ui-radio-description-color: rgb(var(--neeto-ui-gray-500));
--neeto-ui-radio-description-font-size: 0.688rem;
\`\`\`

You can use these variables to customize the component to your liking. Here is
an example:

\`\`\`css
.neetix-radio {
  --neeto-ui-radio-color: rgb(var(--neeto-ui-gray-800));
  --neeto-ui-radio-focus-visible-outline: 3px solid rgba(var(--neeto-ui-gray-800), 50%);
  --neeto-ui-radio-checked-border-color: rgb(var(--neeto-ui-gray-800));
}
\`\`\`

#### Output
`;

CSSCustomization.parameters = {
  docs: { description: { story: RadioCSSCustomization } },
};

export {
  Default,
  Sizes,
  WithDescription,
  Options,
  OptionsStacked,
  Error,
  ControlledRadio,
  FormikRadioStory,
  CSSCustomization,
};

export default metadata;
