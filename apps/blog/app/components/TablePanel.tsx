import { DataTable, type Column } from "@repo/ui/table";
import { useMemo } from "react";

type Row = { id: number; title: string; count: number };

export function generateRandomRows(): Row[] {
  const size = Math.floor(Math.random() * 8) + 5; // 5 - 12 rows
  return Array.from({ length: size }).map((_, i) => ({
    id: i,
    title: `Row ${i + 1}`,
    count: Math.floor(Math.random() * 101), // 0 - 100
  }));
}

const columns: Column<Row>[] = [
  { key: "id", header: "ID", accessorKey: "id", className: "w-[80px] font-medium text-slate-900 dark:text-slate-100" },
  { key: "title", header: "Title", accessorKey: "title" },
  { key: "count", header: "Count", accessorKey: "count", className: "text-right" },
];

export function TablePanel() {
  const rows = useMemo(() => generateRandomRows(), []);
  return (
    <div className="h-full w-full p-3">
      <DataTable<Row> columns={columns} data={rows} />
    </div>
  );
}


