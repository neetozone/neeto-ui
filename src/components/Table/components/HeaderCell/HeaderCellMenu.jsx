import React from "react";

import {
  Check,
  MenuHorizontal,
  Ascending,
  Descending,
  Pin,
  InfoRound,
  ColumnToLeft,
  ColumnToRight,
  Hide,
} from "neetoicons";
import { equals, move } from "ramda";
import { useTranslation } from "react-i18next";

import Dropdown from "components/Dropdown";
import {
  COLUMN_ADD_DIRECTION,
  TABLE_SORT_ORDERS,
} from "components/Table/constants";
import { getLocale, hyphenize } from "utils";
import { useTableStore } from "src/stores/tableStore";
import { findIndexBy } from "neetocist";

const { Menu, MenuItem } = Dropdown;

const ActionItem = ({ isActive = false, icon: Icon, label, ...rest }) => (
  <MenuItem.Button
    className="neeto-ui-flex neeto-ui-items-center neeto-ui-justify-between"
    {...rest}
  >
    <div className="neeto-ui-flex neeto-ui-items-center neeto-ui-gap-3">
      {Icon && <Icon className="neeto-ui-text-gray-500" size={18} />}
      <span>{label}</span>
    </div>
    {isActive && <Check className="neeto-ui-text-success-500" size={20} />}
  </MenuItem.Button>
);

// eslint-disable-next-line @bigbinary/neeto/no-dumb-components-with-use-translation
const HeaderCellMenu = ({
  onSort,
  column = {},
  sortedInfo,
  isSortable,
  isAddEnabled,
  isFixedColumn,
  isColumnDeletable,
  isColumnFreezeEnabled,
  isHidable,
  onColumnHide,
  isMoveToLeftEnabled,
  isMoveToRightEnabled,
  onAddColumn,
  onColumnUpdate,
  onColumnDelete,
  onColumnFreeze,
  hasMoreActions,
  onMoreActionClick,
  moreActions = [],
}) => {
  const { t, i18n } = useTranslation();
  const { setInfoPaneState } = useTableStore.pick();

  const onMoveColumn = offset => {
    onColumnUpdate(columns => {
      const index = findIndexBy({ key: column.key }, columns);
      const isValid = index + offset >= 0 && index + offset < columns.length;
      if (!isValid) return columns;

      return move(index, index + offset, columns);
    });
  };

  return (
    <div onClick={event => event.stopPropagation()}>
      <Dropdown
        appendTo={() => document.body}
        className="neeto-ui-flex"
        icon={MenuHorizontal}
        position="bottom"
        strategy="fixed"
        zIndex={99999}
        buttonProps={{
          className: "neeto-ui-min-h-0 neeto-ui-flex-shrink-0",
          style: "text",
          size: "medium",
          "data-testid": "column-menu-button",
          "data-cy": "column-menu-button",
          "data-dropdown-button-style": "more-dropdown",
        }}
      >
        <Menu
          className="neeto-ui-cursor-auto"
          onMouseDown={event => event.preventDefault()}
        >
          {isSortable && (
            <>
              <ActionItem
                data-cy="ascending-column-menu-button"
                icon={Ascending}
                label={getLocale(i18n, t, "neetoui.table.ascending")}
                isActive={
                  sortedInfo.order === TABLE_SORT_ORDERS.asc &&
                  equals(sortedInfo.field, column.dataIndex)
                }
                onClick={() =>
                  onSort({
                    column,
                    columnKey: column.key,
                    field: column.dataIndex || column.key,
                    order: TABLE_SORT_ORDERS.asc,
                  })
                }
              />
              <ActionItem
                data-cy="descending-column-menu-button"
                icon={Descending}
                label={getLocale(i18n, t, "neetoui.table.descending")}
                isActive={
                  sortedInfo.order === TABLE_SORT_ORDERS.desc &&
                  equals(sortedInfo.field, column.dataIndex)
                }
                onClick={() =>
                  onSort({
                    column,
                    columnKey: column.key,
                    field: column.dataIndex,
                    order: TABLE_SORT_ORDERS.desc,
                  })
                }
              />
            </>
          )}
          {isAddEnabled && (
            <>
              <ActionItem
                data-cy="insert-right-column-menu-button"
                label={getLocale(i18n, t, "neetoui.table.insertColRight")}
                onClick={() => onAddColumn(COLUMN_ADD_DIRECTION.right)}
              />
              <ActionItem
                data-cy="insert-left-column-menu-button"
                label={getLocale(i18n, t, "neetoui.table.insertColLeft")}
                onClick={() => onAddColumn(COLUMN_ADD_DIRECTION.left)}
              />
            </>
          )}
          {isHidable && (
            <ActionItem
              icon={Hide}
              label={getLocale(i18n, t, "neetoui.table.hideColumn")}
              onClick={() => onColumnHide(column)}
            />
          )}
          {isColumnDeletable && (
            <ActionItem
              data-cy="delete-column-menu-button"
              label={getLocale(i18n, t, "neetoui.table.deleteColumn")}
              onClick={() => onColumnDelete(column.id)}
            />
          )}
          {isColumnFreezeEnabled && (
            <ActionItem
              data-cy="freeze-unfreeze-column-menu-button"
              icon={Pin}
              label={
                isFixedColumn
                  ? getLocale(i18n, t, "neetoui.table.unFreezeColumn")
                  : getLocale(i18n, t, "neetoui.table.freezeColumn")
              }
              onClick={() => onColumnFreeze(isFixedColumn, column)}
            />
          )}
          <ActionItem
            icon={InfoRound}
            label={getLocale(i18n, t, "neetoui.table.addColumnInfo")}
            onClick={() => {
              setInfoPaneState({ isOpen: true, column });
            }}
          />
          {isMoveToLeftEnabled && (
            <ActionItem
              icon={ColumnToLeft}
              label={getLocale(i18n, t, "neetoui.table.moveColumnLeft")}
              onClick={() => onMoveColumn(-1)}
            />
          )}
          {isMoveToRightEnabled && (
            <ActionItem
              icon={ColumnToRight}
              label={getLocale(i18n, t, "neetoui.table.moveColumnRight")}
              onClick={() => onMoveColumn(1)}
            />
          )}
          {hasMoreActions &&
            moreActions.map((item, index) => (
              <ActionItem
                data-cy={`${hyphenize(item.label)}-column-menu-button`}
                icon={item.icon}
                key={index}
                label={item.label}
                onClick={() => onMoreActionClick(item.type, column)}
              />
            ))}
        </Menu>
      </Dropdown>
    </div>
  );
};

export default React.memo(HeaderCellMenu);
