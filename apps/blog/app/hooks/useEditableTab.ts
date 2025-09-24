import * as FlexLayout from "flexlayout-react";
import { useCallback, useState } from "react";
import { renameTab } from "../lib/flexModel";

export function useEditableTab(model: FlexLayout.Model) {
  const [editingTabId, setEditingTabId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>("");

  const beginEdit = useCallback((tabNode: FlexLayout.TabNode) => {
    setEditingTabId(tabNode.getId());
    setEditingValue(tabNode.getName());
  }, []);

  const commitEdit = useCallback(
    (tabNode: FlexLayout.TabNode, value: string, onAfter?: () => void) => {
      const trimmed = value.trim();
      if (trimmed && trimmed !== tabNode.getName()) {
        renameTab(model, tabNode.getId(), trimmed);
      }
      setTimeout(() => {
        setEditingTabId(null);
        onAfter?.();
      }, 0);
    },
    [model]
  );

  const cancelEdit = useCallback(() => {
    setEditingTabId(null);
  }, []);

  return {
    editingTabId,
    editingValue,
    setEditingValue,
    beginEdit,
    commitEdit,
    cancelEdit,
  } as const;
}


