/* eslint-disable @bigbinary/neeto/file-name-and-export-name-standards */
import React, { useState } from "react";

import { useFormikContext } from "formik";
import PropTypes from "prop-types";
import { isEmpty } from "ramda";

import { useNavPrompt } from "hooks";

import Alert from "./Alert";

const BlockNavigation = ({
  isDirty = false,
  saveAndContinue = false,
  ...otherProps
}) => {
  const [isSaving, setIsSaving] = useState(false);

  const formikContext = useFormikContext();
  const shouldBlock =
    isDirty || (Boolean(formikContext) && Boolean(formikContext.dirty));

  const { isBlocked, continueNavigation, hidePrompt } = useNavPrompt({
    shouldBlock,
  });

  const handleDiscardChanges = () => {
    if (formikContext) formikContext.resetForm();
    hidePrompt();
    continueNavigation();
  };

  const handleSaveAndContinue = async () => {
    if (!formikContext) {
      hidePrompt();

      return;
    }

    setIsSaving(true);
    try {
      const errors = await formikContext.validateForm();
      if (!isEmpty(errors)) {
        await formikContext.submitForm();
        hidePrompt();

        return;
      }

      await formikContext.submitForm();
      continueNavigation();
    } catch {
      hidePrompt();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Alert
      {...{ isSaving, saveAndContinue }}
      isOpen={isBlocked}
      onClose={hidePrompt}
      onDiscardChanges={handleDiscardChanges}
      onSubmit={saveAndContinue ? handleSaveAndContinue : hidePrompt}
      {...otherProps}
    />
  );
};

BlockNavigation.propTypes = {
  isDirty: PropTypes.bool,
  saveAndContinue: PropTypes.bool,
  message: PropTypes.string,
  title: PropTypes.string,
  submitButtonLabel: PropTypes.string,
};

export default BlockNavigation;
