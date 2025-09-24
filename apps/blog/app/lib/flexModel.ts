import * as FlexLayout from "flexlayout-react";

export function createInitialModel(): FlexLayout.Model {
  const json = {
    global: {},
    borders: [],
    layout: {
      type: "row",
      weight: 100,
      children: [
        {
          type: "tabset",
          weight: 50,
          children: [
            { type: "tab", name: "Table A", component: "table" },
            { type: "tab", name: "Table B", component: "table" },
          ],
        },
        {
          type: "tabset",
          weight: 50,
          children: [{ type: "tab", name: "Right Table", component: "table" }],
        },
      ],
    },
  } as const;
  return FlexLayout.Model.fromJson(json as any);
}

export function addTableTab(
  model: FlexLayout.Model,
  tabSetNode: FlexLayout.TabSetNode | FlexLayout.BorderNode
) {
  const newIndex = (tabSetNode.getChildren()?.length || 0) + 1;
  const newNode = { type: "tab", name: `Table ${newIndex}`, component: "table" } as any;
  model.doAction(
    FlexLayout.Actions.addNode(newNode, tabSetNode.getId(), FlexLayout.DockLocation.CENTER, -1, true)
  );
}

export function renameTab(model: FlexLayout.Model, tabId: string, nextName: string) {
  model.doAction(FlexLayout.Actions.renameTab(tabId, nextName));
}


