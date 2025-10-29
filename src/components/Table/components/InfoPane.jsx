import React, { useEffect, useState } from "react";
import { Pane, Typography, Button, Textarea } from "components";
import { modifyBy } from "neetocist";
import { useTableStore } from "src/stores/tableStore";
import { mergeLeft } from "ramda";
import { getLocale } from "utils";
import { useTranslation } from "react-i18next";

const TableInfoPane = ({ onColumnUpdate }) => {
  const { t, i18n } = useTranslation();
  const [description, setDescription] = useState("");
  const { infoPaneState, setInfoPaneState } = useTableStore.pick();
  const { isOpen, column } = infoPaneState;

  const onUpdateColumn = changes => {
    if (!column) return;
    const modifyColumn = mergeLeft(changes);
    const modifyColumns = modifyBy({ key: column.key }, modifyColumn);
    onColumnUpdate(modifyColumns);
  };

  const onClose = () => {
    setInfoPaneState({ isOpen: false, column: null });
  };

  const onSubmit = () => {
    onUpdateColumn({ description });
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    setDescription(column?.description || "");

    return () => {
      setDescription("");
    };
  }, [isOpen]);

  return (
    <Pane {...{ onClose }} isOpen={infoPaneState.isOpen}>
      <Pane.Header>
        <Typography style="h3">{column?.title}</Typography>
      </Pane.Header>
      <Pane.Body>
        <Textarea
          className="neeto-ui-w-full"
          label={getLocale(i18n, t, "neetoui.common.description")}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </Pane.Body>
      <Pane.Footer className="neeto-ui-flex neeto-ui-justify-between">
        <Button style="secondary" onClick={onClose}>
          {getLocale(i18n, t, "neetoui.actionBlock.cancel")}
        </Button>
        <Button onClick={onSubmit}>
          {getLocale(i18n, t, "neetoui.actionBlock.saveChanges")}
        </Button>
      </Pane.Footer>
    </Pane>
  );
};

export default TableInfoPane;
