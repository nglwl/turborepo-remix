import { describe, it, expect } from "@jest/globals";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { DataTable, type Column } from "./index";

 type Row = { id: number; name: string };

 describe("DataTable", () => {
   it("renders without crashing and shows headers and cells", () => {
     const columns: Column<Row>[] = [
       { key: "id", header: "ID", accessorKey: "id" },
       { key: "name", header: "Name", accessorKey: "name" },
     ];
     const data: Row[] = [
       { id: 1, name: "Alice" },
       { id: 2, name: "Bob" },
     ];

     const container = document.createElement("div");
     const root = createRoot(container);
     act(() => {
       root.render(<DataTable<Row> columns={columns} data={data} />);
     });
     expect(container.textContent).toContain("ID");
     expect(container.textContent).toContain("Name");
     expect(container.textContent).toContain("Alice");
     expect(container.textContent).toContain("Bob");
     act(() => root.unmount());
   });

   it("renders empty text when no data", () => {
     const columns: Column<Row>[] = [
       { key: "id", header: "ID", accessorKey: "id" },
     ];

     const container = document.createElement("div");
     const root = createRoot(container);
     act(() => {
       root.render(<DataTable<Row> columns={columns} data={[]} emptyText="No rows" />);
     });
     expect(container.textContent).toContain("No rows");
     act(() => root.unmount());
   });
 });
