import { move } from "ramda";
import { filterVisibleColumns } from "../utils";

const useReorderColumns = ({
  isEnabled,
  columns,
  setColumns,
  onColumnUpdateWithChanges,
  rowSelection,
}) => {
  if (!isEnabled) return { dragProps: {}, columns };

  const isColumnFixed = column => !!column.fixed;

  const dragProps = {
    onDragEnd: (fromIndex, toIndex) => {
      if (rowSelection) {
        fromIndex--;
        toIndex--;
      }

      if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return;

      const visibleColumns = filterVisibleColumns(columns);

      const fromColumn = visibleColumns[fromIndex];
      const toColumn = visibleColumns[toIndex];

      if (isColumnFixed(fromColumn) || isColumnFixed(toColumn)) return;

      const fromColumnActualIndex = columns.indexOf(fromColumn);
      const toColumnActualIndex = columns.indexOf(toColumn);
      if (fromColumnActualIndex < 0 || toColumnActualIndex < 0) return;

      const newColumns = move(
        fromColumnActualIndex,
        toColumnActualIndex,
        columns
      );

      setColumns(newColumns);
      onColumnUpdateWithChanges(newColumns);
    },
    nodeSelector:
      "th:not(.ant-table-cell-fix-left):not(.ant-table-cell-scrollbar)",
    handleSelector: ".drag-handler",
    ignoreSelector: ".react-resizable-handle",
  };

  return { dragProps, columns };
};

export default useReorderColumns;
