"use client";

import { useState } from "react";
import type { ErgebnisTable } from "@/data/ergebnisse";

type ErgebnisTableCardProps = {
  table: ErgebnisTable;
};

export default function ErgebnisTableCard({ table }: ErgebnisTableCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="ergebnis-card">
      <button
        type="button"
        className="ergebnis-card-header"
        onClick={() => setOpen((open) => !open)}
        aria-expanded={open}
      >
        <span className="ergebnis-card-title">{table.title}</span>
        <span className="ergebnis-card-chevron" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div className="table-wrap">
          <table className="race-table">
            <thead>
              <tr>
                {table.headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
