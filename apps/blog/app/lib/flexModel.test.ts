import { describe, it, expect } from "vitest";
import * as FlexLayout from "flexlayout-react";
import { addTableTab, createInitialModel } from "./flexModel";

 describe("flexModel", () => {
   it("creates initial model with two tabsets and three tabs", () => {
     const model = createInitialModel();
     const json = model.toJson();
     const tabsets = (json.layout.children || []).filter((c: any) => c.type === "tabset");
     expect(tabsets.length).toBe(2);
     const totalTabs = tabsets.reduce((acc: number, ts: any) => acc + (ts.children?.length || 0), 0);
     expect(totalTabs).toBe(3);
   });

   it("adds a new table tab to a tabset", () => {
     const model = createInitialModel();
     const firstTabset = model.getRoot().getChildren()[0] as FlexLayout.TabSetNode;
     const before = firstTabset.getChildren().length;
     addTableTab(model, firstTabset);
     const after = firstTabset.getChildren().length;
     expect(after).toBe(before + 1);
   });
 });
