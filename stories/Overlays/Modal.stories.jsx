import React, { useState } from "react";

import Button from "components/Button";
import Input from "components/Input";
import Modal from "components/Modal";
import Typography from "components/Typography";

const description = `
\`import { Modal } from "@bigbinary/neetoui";\`

The \`Modal\` temporarily overlays the main content of a web page to display
supplementary information, prompt user actions, or present messages, and
requires user interaction before the main content can be accessed again.
`;

const metadata = {
  title: "Overlays/Modal",
  component: Modal,
  subcomponents: {
    "Modal.Header": Modal.Header,
    "Modal.Body": Modal.Body,
    "Modal.Footer": Modal.Footer,
  },
  parameters: {
    layout: "padded",
    docs: { description: { component: description } },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/zhdsnPzXzr264x1WUeVdmA/02-Components?node-id=104%3A20",
    },
  },
  argTypes: {
    onClose: {
      table: {
        type: { summary: "func" },
        defaultValue: { summary: "(event) => void" },
      },
    },
  },
};

const Default = args => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full">
      <div className="space-y-6">
        <div className="space-y-8">
          <div className="flex flex-row flex-wrap items-center justify-start gap-6">
            <Button label="Show Modal" onClick={() => setShowModal(true)} />
          </div>
        </div>
      </div>
      <Modal {...args} isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header description="Short description">
          <Typography id="dialog1Title" style="h3">
            They're creepy & they're kooky
          </Typography>
        </Modal.Header>
        <Modal.Body className="space-y-2">
          <Typography lineHeight="normal" style="body1">
            Somewhere out in space live the Herculoids! Zok, the laser-ray
            dragon! Igoo, the giant rock ape! Tundro, the tremendous! Gloop and
            Gleep, the formless, fearless wonders! With Zandor, their leader,
            and his wife, Tara, and son, Dorno, they team up to protect their
            planet from sinister invaders! All-strong! All-brave! All-heroes!
            They're the Herculoids!
          </Typography>
        </Modal.Body>
        <Modal.Footer className="flex items-center justify-end gap-x-2">
          <Button
            label="Cancel"
            style="text"
            onClick={() => setShowModal(false)}
          />
          <Button label="Continue" onClick={() => setShowModal(false)} />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const Sizes = args => {
  const [showModalExtraSmall, setShowModalExtraSmall] = useState(false);
  const [showModalMedium, setShowModalMedium] = useState(false);
  const [showModalLarge, setShowModalLarge] = useState(false);
  const [showModalFullScreen, setShowModalFullScreen] = useState(false);

  return (
    <div className="w-full">
      <div className="space-y-6">
        <div className="space-y-8">
          <div className="flex flex-row flex-wrap items-center justify-start gap-6">
            <Button
              label="Small"
              onClick={() => setShowModalExtraSmall(true)}
            />
            <Button label="Medium" onClick={() => setShowModalMedium(true)} />
            <Button label="Large" onClick={() => setShowModalLarge(true)} />
            <Button
              label="Full screen"
              onClick={() => setShowModalFullScreen(true)}
            />
          </div>
        </div>
      </div>
      <Modal
        {...args}
        isOpen={showModalExtraSmall}
        size="small"
        onClose={() => setShowModalExtraSmall(false)}
      >
        <Modal.Header>
          <Typography style="h3">They're creepy & they're kooky</Typography>
        </Modal.Header>
        <Modal.Body>
          <Typography lineHeight="normal" style="body2">
            Somewhere out in space live the Herculoids! Zok, the laser-ray
            dragon! Igoo, the giant rock ape! Tundro, the tremendous!
          </Typography>
        </Modal.Body>
        <Modal.Footer className="flex items-center justify-end gap-x-2">
          <Button
            label="Cancel"
            style="text"
            onClick={() => setShowModalExtraSmall(false)}
          />
          <Button
            label="Continue"
            onClick={() => setShowModalExtraSmall(false)}
          />
        </Modal.Footer>
      </Modal>
      <Modal
        {...args}
        isOpen={showModalMedium}
        size="medium"
        onClose={() => setShowModalMedium(false)}
      >
        <Modal.Header>
          <Typography style="h3">They're creepy & they're kooky</Typography>
        </Modal.Header>
        <Modal.Body>
          <Typography lineHeight="normal" style="body2">
            Somewhere out in space live the Herculoids! Zok, the laser-ray
            dragon! Igoo, the giant rock ape! Tundro, the tremendous!
          </Typography>
        </Modal.Body>
        <Modal.Footer className="flex items-center justify-end gap-x-2">
          <Button
            label="Cancel"
            style="text"
            onClick={() => setShowModalMedium(false)}
          />
          <Button label="Continue" onClick={() => setShowModalMedium(false)} />
        </Modal.Footer>
      </Modal>
      <Modal
        {...args}
        isOpen={showModalLarge}
        size="large"
        onClose={() => setShowModalLarge(false)}
      >
        <Modal.Header>
          <Typography style="h3">They're creepy & they're kooky</Typography>
        </Modal.Header>
        <Modal.Body>
          <Typography lineHeight="normal" style="body2">
            Somewhere out in space live the Herculoids! Zok, the laser-ray
            dragon! Igoo, the giant rock ape! Tundro, the tremendous! Gloop and
            Gleep, the formless, fearless wonders! With Zandor, their leader,
            and his wife, Tara, and son, Dorno, they team up to protect their
            planet from sinister invaders! All-strong! All-brave! All-heroes!
            They're the Herculoids!
          </Typography>
        </Modal.Body>
        <Modal.Footer className="flex items-center justify-end gap-x-2">
          <Button
            label="Cancel"
            style="text"
            onClick={() => setShowModalLarge(false)}
          />
          <Button label="Continue" onClick={() => setShowModalLarge(false)} />
        </Modal.Footer>
      </Modal>
      <Modal
        {...args}
        isOpen={showModalFullScreen}
        size="fullScreen"
        onClose={() => setShowModalFullScreen(false)}
      >
        <Modal.Header>
          <Typography style="h3">They're creepy & they're kooky</Typography>
        </Modal.Header>
        <Modal.Body>
          <Typography lineHeight="normal" style="body2">
            Somewhere out in space live the Herculoids! Zok, the laser-ray
            dragon! Igoo, the giant rock ape! Tundro, the tremendous! Gloop and
            Gleep, the formless, fearless wonders! With Zandor, their leader,
            and his wife, Tara, and son, Dorno, they team up to protect their
            planet from sinister invaders! All-strong! All-brave! All-heroes!
            They're the Herculoids!
          </Typography>
        </Modal.Body>
        <Modal.Footer className="flex items-center justify-end gap-x-2">
          <Button
            label="Cancel"
            style="text"
            onClick={() => setShowModalFullScreen(false)}
          />
          <Button
            label="Continue"
            onClick={() => setShowModalFullScreen(false)}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const ModalFocusTrapping = args => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full">
      <div className="space-y-6">
        <div className="space-y-8">
          <div className="flex flex-row flex-wrap items-center justify-start gap-6">
            <Button label="Show Modal" onClick={() => setShowModal(true)} />
          </div>
        </div>
      </div>
      <Modal {...args} isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header
          description="Try pressing tab or shift + tab on your keyboard. You would realise
            that the focus is trapped to within the Modal. This is done
            inherently by the Modal component."
        >
          <Typography id="dialog1Title" style="h3">
            They're creepy & they're kooky
          </Typography>
        </Modal.Header>
        <Modal.Body className="space-y-2">
          <Typography lineHeight="normal" style="body2">
            Somewhere out in space live the Herculoids! Zok, the laser-ray
            dragon! Igoo, the giant rock ape! Tundro, the tremendous! Gloop and
            Gleep, the formless, fearless wonders! With Zandor, their leader,
            and his wife, Tara, and son, Dorno, they team up to protect their
            planet from sinister invaders! All-strong! All-brave! All-heroes!
            They're the Herculoids!
          </Typography>
          <Input label="First name" />
          <Input label="Last name" />
          <Input label="Email" type="email" />
        </Modal.Body>
        <Modal.Footer className="flex items-center justify-end gap-x-2">
          <Button
            label="Cancel"
            style="text"
            onClick={() => setShowModal(false)}
          />
          <Button label="Continue" onClick={() => setShowModal(false)} />
        </Modal.Footer>
      </Modal>
    </div>
  );
};
ModalFocusTrapping.storyName = "Modal focus trapping";

const NestedModals = args => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  return (
    <div className="w-full">
      <div className="space-y-6">
        <div className="space-y-8">
          <div className="flex flex-row flex-wrap items-center justify-start gap-6">
            <Button label="Show Modal" onClick={() => setShowModal(true)} />
          </div>
        </div>
      </div>
      <Modal {...args} isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header
          description="Try pressing tab or shift + tab on your keyboard. You would realise
            that the focus is trapped to within the Modal. This is done
            inherently by the Modal component."
        >
          <Typography id="dialog1Title" style="h3">
            They're creepy & they're kooky
          </Typography>
        </Modal.Header>
        <Modal.Body className="space-y-2">
          <Typography lineHeight="normal" style="body2">
            Try pressing tab or shift + tab on your keyboard. You would realise
            that the focus is trapped to within the Modal. This is done
            inherently by the Modal component.
          </Typography>
          <Input label="First name" />
          <Input label="Last name" />
          <Input label="Email" type="email" />
        </Modal.Body>
        <Modal.Footer className="flex items-center justify-end gap-x-2">
          <Button
            label="Cancel"
            style="text"
            onClick={() => setShowModal(false)}
          />
          <Button
            label="Open second Modal"
            onClick={() => setShowModal2(true)}
          />
        </Modal.Footer>
      </Modal>
      <Modal {...args} isOpen={showModal2} onClose={() => setShowModal2(false)}>
        <Modal.Header description="Now, you would notice that the focus is trapped inside of the second Modal.">
          <Typography id="dialog1Title" style="h3">
            They're creepy & they're kooky
          </Typography>
        </Modal.Header>
        <Modal.Body>
          <Typography lineHeight="normal" style="body2">
            Somewhere out in space live the Herculoids! Zok, the laser-ray
            dragon! Igoo, the giant rock ape! Tundro, the tremendous! Gloop and
            Gleep, the formless, fearless wonders! With Zandor, their leader,
            and his wife, Tara, and son, Dorno, they team up to protect their
            planet from sinister invaders! All-strong! All-brave! All-heroes!
            They're the Herculoids!
          </Typography>
        </Modal.Body>
        <Modal.Footer className="flex items-center justify-end gap-x-2">
          <Button
            label="Cancel"
            style="text"
            onClick={() => setShowModal2(false)}
          />
          <Button label="Continue" onClick={() => setShowModal2(false)} />
        </Modal.Footer>
      </Modal>
    </div>
  );
};
NestedModals.storyName = "Nested modals";

const InitialAndFinalFocusRef = args => {
  const [showModal, setShowModal] = useState(false);
  const inputRef = React.useRef(null);
  const buttonRef = React.useRef(null);

  return (
    <div className="w-full">
      <div className="space-y-6">
        <div className="space-y-8">
          <div className="flex flex-row flex-wrap items-center justify-start gap-6">
            <Button label="Show Modal" onClick={() => setShowModal(true)} />
            <Button
              label="Focus here on close"
              ref={buttonRef}
              style="secondary"
            />
          </div>
        </div>
      </div>
      <Modal
        {...args}
        finalFocusRef={buttonRef}
        initialFocusRef={inputRef}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <Modal.Header description="The focous would be on the input field for first name on opening of the Modal and on the secondary button on close.">
          <Typography id="dialog1Title" style="h3">
            They're creepy & they're kooky
          </Typography>
        </Modal.Header>
        <Modal.Body className="space-y-2">
          <Typography lineHeight="normal" style="body2">
            Somewhere out in space live the Herculoids! Zok, the laser-ray
            dragon! Igoo, the giant rock ape! Tundro, the tremendous! Gloop and
            Gleep, the formless, fearless wonders! With Zandor, their leader,
            and his wife, Tara, and son, Dorno, they team up to protect their
            planet from sinister invaders! All-strong! All-brave! All-heroes!
            They're the Herculoids!
          </Typography>
          <Input label="First name" ref={inputRef} />
          <Input label="Last name" />
          <Input label="Email" type="email" />
        </Modal.Body>
        <Modal.Footer className="flex items-center justify-end gap-x-2">
          <Button
            label="Cancel"
            style="text"
            onClick={() => setShowModal(false)}
          />
          <Button label="Continue" onClick={() => setShowModal(false)} />
        </Modal.Footer>
      </Modal>
    </div>
  );
};
InitialAndFinalFocusRef.storyName = "Initial and final focus ref";

const CSSCustomization = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full">
      <div className="space-y-6">
        <div className="space-y-8">
          <div className="flex flex-row flex-wrap items-center justify-start gap-6">
            <Button label="Show Modal" onClick={() => setShowModal(true)} />
          </div>
        </div>
      </div>
      <Modal
        className="neetix-modal"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <Modal.Header description="Short description">
          <Typography id="dialog1Title" style="h3">
            They're creepy & they're kooky
          </Typography>
        </Modal.Header>
        <Modal.Body className="space-y-2">
          <Typography lineHeight="normal" style="body2">
            Somewhere out in space live the Herculoids! Zok, the laser-ray
            dragon! Igoo, the giant rock ape! Tundro, the tremendous! Gloop and
            Gleep, the formless, fearless wonders! With Zandor, their leader,
            and his wife, Tara, and son, Dorno, they team up to protect their
            planet from sinister invaders! All-strong! All-brave! All-heroes!
            They're the Herculoids!
          </Typography>
        </Modal.Body>
        <Modal.Footer className="flex items-center justify-end gap-x-2">
          <Button
            label="Cancel"
            style="text"
            onClick={() => setShowModal(false)}
          />
          <Button label="Continue" onClick={() => setShowModal(false)} />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

CSSCustomization.storyName = "Modal CSS Customization";

const ModalCSSCustomization = `
Starting from v6, neeto-ui supports enhanced customization of components using
CSS variables. These are the variables that are being used in the \`Modal\`
component.

\`\`\`css
--neeto-ui-modal-spacing: 2rem;

// Backdrop
--neeto-ui-modal-backdrop-z-index: var(--neeto-ui-modal-z-index);
--neeto-ui-modal-backdrop-bg-color: rgba(var(--neeto-ui-black), 0.66);
--neeto-ui-modal-backdrop-backdrop-filter: blur(2px);

// Wrapper
--neeto-ui-modal-wrapper-width: 50%;
--neeto-ui-modal-wrapper-max-width: 100%;
--neeto-ui-modal-wrapper-height: auto;
--neeto-ui-modal-wrapper-bg-color: rgb(var(--neeto-ui-white));
--neeto-ui-modal-wrapper-border-radius: var(--neeto-ui-rounded-xl);
--neeto-ui-modal-wrapper-backdrop-filter: blur(2px);

// Close Button
--neeto-ui-modal-close-btn-top: 1rem;
--neeto-ui-modal-close-btn-right: 1rem;

// Header
--neeto-ui-modal-header-padding-top: var(--neeto-ui-modal-spacing);
--neeto-ui-modal-header-padding-right: 4rem;
--neeto-ui-modal-header-padding-bottom: 1rem;
--neeto-ui-modal-header-padding-left: var(--neeto-ui-modal-spacing);

// Header Description
--neeto-ui-modal-header-description-margin-y: 0.5rem;
--neeto-ui-modal-header-description-color: rgb(var(--neeto-ui-gray-500));

// Body
--neeto-ui-modal-body-padding-top: 0;
--neeto-ui-modal-body-padding-bottom: var(--neeto-ui-modal-spacing);
--neeto-ui-modal-body-padding-x: var(--neeto-ui-modal-spacing);
--neeto-ui-modal-body-font-size: var(--neeto-ui-text-sm);
--neeto-ui-modal-body-line-height: 1.5;

// Footer
--neeto-ui-modal-footer-padding-y: 1rem;
--neeto-ui-modal-footer-padding-x: var(--neeto-ui-modal-spacing);
--neeto-ui-modal-footer-bg: rgb(var(--neeto-ui-beige-100));
--neeto-ui-modal-footer-border-radius: var(--neeto-ui-rounded-xl);
\`\`\`

You can use these variables to customize the component to your liking. Here is
an example:

\`\`\`css
.neetix-modal {
  --neeto-ui-modal-close-btn-top: 2rem;
  --neeto-ui-modal-close-btn-right: 2rem;
  --neeto-ui-modal-header-padding-top: 2rem;
  --neeto-ui-modal-header-padding-left: 2rem;
  --neeto-ui-modal-body-padding-bottom: 2rem;
  --neeto-ui-modal-body-padding-x: 2rem;
  --neeto-ui-modal-footer-padding-y: 2rem;
  --neeto-ui-modal-footer-padding-x: 2rem;
  --neeto-ui-modal-wrapper-border-radius: var(--neeto-ui-rounded-none);
}
\`\`\`

#### Output
`;

CSSCustomization.parameters = {
  docs: { description: { story: ModalCSSCustomization } },
};

export {
  Default,
  Sizes,
  ModalFocusTrapping,
  NestedModals,
  InitialAndFinalFocusRef,
  CSSCustomization,
};

export default metadata;
