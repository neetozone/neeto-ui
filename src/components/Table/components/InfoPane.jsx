import React, { useEffect, useState } from "react";
import { Pane, Typography, Button, Textarea, Label } from "components";
import { modifyBy } from "neetocist";
import { useTableStore } from "src/stores/tableStore";
import { mergeLeft, pick } from "ramda";
import { getLocale } from "utils";
import { useTranslation } from "react-i18next";

const pickStore = pick(["infoPaneState", "setInfoPaneState"]);

const TableInfoPane = ({ onColumnUpdate }) => {
  const { t, i18n } = useTranslation();
  const [description, setDescription] = useState("");
  const { infoPaneState, setInfoPaneState } = useTableStore(pickStore);
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
        <Typography style="h2" weight="semibold">
          {getLocale(i18n, t, "neetoui.table.editColumnInfo")}
        </Typography>
      </Pane.Header>
      <Pane.Body>
        <div className="neeto-ui-w-full space-y-4">
          <div className="neeto-ui-flex neeto-ui-flex-col neeto-ui-gap-1">
            <Label>{getLocale(i18n, t, "neetoui.table.columnName")}</Label>
            <Typography style="body2">{column?.title}</Typography>
          </div>
          <Textarea
            className="neeto-ui-w-full"
            label={getLocale(i18n, t, "neetoui.common.description")}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
      </Pane.Body>
      <Pane.Footer className="neeto-ui-flex neeto-ui-gap-2">
        <Button onClick={onSubmit}>
          {getLocale(i18n, t, "neetoui.actionBlock.saveChanges")}
        </Button>
        <Button style="text" onClick={onClose}>
          {getLocale(i18n, t, "neetoui.actionBlock.cancel")}
        </Button>
      </Pane.Footer>
    </Pane>
  );
};

export default TableInfoPane;
