import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import * as FlexLayout from "flexlayout-react";
import { useEditableTab } from "./useEditableTab";
import { createInitialModel } from "../lib/flexModel";

describe("useEditableTab", () => {
   it("begins, commits, and cancels editing", () => {
     const model = createInitialModel();
     const tabset = model.getRoot().getChildren()[0] as FlexLayout.TabSetNode;
     const tab = tabset.getChildren()[0] as FlexLayout.TabNode;

     const { result } = renderHook(() => useEditableTab(model));

     act(() => {
       result.current.beginEdit(tab);
     });
     expect(result.current.editingTabId).toBe(tab.getId());
     expect(result.current.editingValue).toBe(tab.getName());

     act(() => {
       result.current.setEditingValue("New Name");
       result.current.commitEdit(tab, "New Name");
     });
     expect(tab.getName()).toBe("New Name");

     act(() => {
       result.current.beginEdit(tab);
       result.current.cancelEdit();
     });
     expect(result.current.editingTabId).toBe(null);
   });
 });
