import { useMemo, useState } from "react";
import * as FlexLayout from "flexlayout-react";
import type { TabNode, TabSetNode, ITabSetRenderValues, BorderNode } from "flexlayout-react";
import "flexlayout-react/style/light.css";
import { TablePanel } from "../components/TablePanel";
import { addTableTab, createInitialModel } from "../lib/flexModel";
import { useEditableTab } from "../hooks/useEditableTab";

export function meta(_: any) {
	return [
		{ title: "FlexLayout + Shadcn Table" },
		{ name: "description", content: "Demo FlexLayout with modern shadcn-styled table" },
	];
}

export default function Index() {
  const initialModel = useMemo(() => createInitialModel(), []);
  const [model, setModel] = useState(initialModel);
  const { editingTabId, editingValue, setEditingValue, beginEdit, commitEdit, cancelEdit } = useEditableTab(model);

  const factory = (node: FlexLayout.TabNode) => {
		const component = node.getComponent();
    if (component === "table") return <TablePanel />;
		return null;
	};

	return (
		<div className="h-screen w-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
			<FlexLayout.Layout
				model={model}
				factory={factory}
				onModelChange={(m) => setModel(m)}
				onRenderTab={(tabNode: TabNode, renderValues) => {
					const isEditing = editingTabId === tabNode.getId();

					const commit = (next: string) => {
            commitEdit(tabNode, next, () => setModel((prev) => FlexLayout.Model.fromJson(prev.toJson())));
					};

					renderValues.content = isEditing ? (
						<input
							autoFocus
							value={editingValue}
							onChange={(e) => setEditingValue(e.target.value)}
							onBlur={(e) => {
								e.stopPropagation();
								commit(editingValue);
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									e.stopPropagation();
									commit(editingValue);
								}
                if (e.key === "Escape") {
                  e.preventDefault();
                  e.stopPropagation();
                  cancelEdit();
                }
							}}
							onMouseDown={(e) => e.stopPropagation()}
							onPointerDown={(e) => e.stopPropagation()}
							className="h-6 w-[12rem] rounded border border-slate-300 bg-white px-2 text-sm text-slate-900 outline-none ring-2 ring-transparent focus:border-slate-400 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-slate-800"
						/>
					) : (
						<span
							className="cursor-text select-none"
            onDoubleClick={() => beginEdit(tabNode)}
						>
							{tabNode.getName()}
						</span>
					);
				}}
				onRenderTabSet={(
					tabSetNode: TabSetNode | BorderNode,
					renderValues: ITabSetRenderValues
				) => {
					renderValues.stickyButtons?.push(
						<button
							key="add-tab"
							className="ml-1 mr-1 inline-flex h-6 w-6 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50 active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
							title="Thêm tab"
							onClick={() => {
              addTableTab(model, tabSetNode);
							}}
						>
							+
						</button>
					);
				}}
			/>
		</div>
	);
}
