import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TablePanel, generateRandomRows } from "./TablePanel";

vi.mock("@repo/ui/table", () => {
  return {
    DataTable: ({ columns, data }: any) => (
      <table>
        <thead>
          <tr>
            {columns.map((c: any) => (
              <th key={c.key}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((r: any, i: number) => (
            <tr key={i}>
              <td>{r.id}</td>
              <td>{r.title}</td>
              <td>{r.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ),
  };
});

describe("TablePanel", () => {
   it("renders a table with rows and headers", () => {
     render(<TablePanel />);
     expect(screen.getByText("ID")).toBeInTheDocument();
     expect(screen.getByText("Title")).toBeInTheDocument();
     expect(screen.getByText("Count")).toBeInTheDocument();
   });

  it("generates random rows (size and value range)", () => {
    const rows = generateRandomRows();
    expect(rows.length).toBeGreaterThanOrEqual(5);
    expect(rows.length).toBeLessThanOrEqual(12);
    for (const r of rows) {
      expect(r.count).toBeGreaterThanOrEqual(0);
      expect(r.count).toBeLessThanOrEqual(100);
    }
  });
 });
