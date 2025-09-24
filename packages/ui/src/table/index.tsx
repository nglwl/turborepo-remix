import * as React from "react";

function cx(...classes: Array<string | undefined | false | null>): string {
  return classes.filter(Boolean).join(" ");
}

export function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <table
      className={cx(
        "w-full border-collapse text-sm text-gray-700",
        className
      )}
      {...props}
    />
  );
}

export function TableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cx("bg-gray-50 text-xs uppercase text-gray-500", className)}
      {...props}
    />
  );
}

export function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cx("divide-y divide-gray-100", className)} {...props} />;
}

export function TableFooter({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tfoot className={cx("bg-gray-50", className)} {...props} />;
}

export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cx("hover:bg-gray-50", className)} {...props} />;
}

export function TableHead({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cx(
        "px-4 py-3 text-left font-medium tracking-wide first:rounded-l-md last:rounded-r-md",
        className
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cx("px-4 py-3 align-middle", className)} {...props} />;
}

export type Column<TData> = {
  key: string;
  header: React.ReactNode;
  accessorKey?: keyof TData;
  cell?: (row: TData) => React.ReactNode;
  className?: string;
};

export type DataTableProps<TData> = {
  columns: Array<Column<TData>>;
  data: Array<TData>;
  className?: string;
  emptyText?: string;
};

export function DataTable<TData>({ columns, data, className, emptyText = "No data" }: DataTableProps<TData>) {
  return (
    <div className={cx("w-full overflow-x-auto rounded-md border border-gray-200", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(col => (
              <TableHead key={col.key} className={col.className}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell className="text-center text-gray-500" colSpan={columns.length}>
                {emptyText}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, idx) => (
              <TableRow key={idx}>
                {columns.map(col => {
                  const content =
                    col.cell ? col.cell(row) : col.accessorKey ? (row as any)[col.accessorKey] : null;
                  return (
                    <TableCell key={col.key} className={col.className}>
                      {content as React.ReactNode}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
