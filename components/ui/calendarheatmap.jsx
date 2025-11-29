"use client";

import React, { useMemo, useState } from "react";

// CalendarHeatmap.jsx
// Front-end-only, Tailwind-friendly implementation of GitHub-like "green boxes".
// Props:
// - data: Array<{ date: 'YYYY-MM-DD', count: number }>
// - startDate (optional): 'YYYY-MM-DD' start of calendar (default: 52 weeks back)
// - weeks (optional): number of weeks to show (default: 53)
// - onClick(day) optional callback when a square is clicked

export default function CalendarHeatmap({
  data = [],
  startDate = null,
  weeks = 53,
  onClick,
}) {
  // Utility: parse YYYY-MM-DD into Date (keeps timezone safe by building UTC)
  function parseDate(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d));
  }

  function formatDate(d) {
    return d.toISOString().slice(0, 10);
  }

  // Build map for fast lookup: dateStr -> count
  const dataMap = useMemo(() => {
    const m = new Map();
    for (const item of data) m.set(item.date, item.count || 0);
    return m;
  }, [data]);

  // Compute start date (beginning of week) — default to 52 weeks ago, aligned to Sunday
  const computedStart = useMemo(() => {
    const today = new Date();
    const defaultStart = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
    );
    defaultStart.setUTCDate(defaultStart.getUTCDate() - (weeks * 7 - 1));

const sample = [
  { date: "2025-11-28", count: 3 },
  { date: "2025-11-27", count: 1 },
  // ...
];

    const base = startDate ? parseDate(startDate) : defaultStart;
    // align to Sunday
    const day = base.getUTCDay();
    base.setUTCDate(base.getUTCDate() - day);
    base.setUTCHours(0, 0, 0, 0);
    return base;
  }, [startDate, weeks]);

  // Generate grid days array: weeks columns x 7 rows
  const grid = useMemo(() => {
    const cols = [];
    for (let w = 0; w < weeks; w++) {
      const col = [];
      for (let d = 0; d < 7; d++) {
        const day = new Date(computedStart);
        day.setUTCDate(day.getUTCDate() + w * 7 + d);
        col.push(day);
      }
      cols.push(col);
    }
    return cols;
  }, [computedStart, weeks]);

  // Compute color level for a count (0..4). You can tweak thresholds.
  function colorLevel(count) {
    if (!count || count <= 0) return 0;
    if (count === 1) return 1;
    if (count <= 3) return 2;
    if (count <= 6) return 3;
    return 4;
  }

  // Tailwind-compatible color classes (4 shades + empty)
  const palette = [
    "bg-transparent border border-gray-800",
    "bg-green-100",
    "bg-green-300",
    "bg-green-500",
    "bg-green-700",
  ];

  // Tooltip state (simple, accessible)
  const [tooltip, setTooltip] = useState(null);

  return (
    <div className="w-full">
      <div className="flex items-start gap-2">
        {/* Weekday labels (Mon/Wed/Fri) on the left for small screens */}
        <div className="hidden md:flex flex-col text-xs text-gray-400 mr-2 h-full justify-between py-1">
          <span className="h-3">Sun</span>
          <span className="h-3">Mon</span>
          <span className="h-3">Tue</span>
          <span className="h-3">Wed</span>
          <span className="h-3">Thu</span>
          <span className="h-3">Fri</span>
          <span className="h-3">Sat</span>
        </div>

        {/* Grid (weeks are columns) */}
        <div className="overflow-x-auto">
          <div className="flex gap-1">
            {grid.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-1">
                {col.map((day) => {
                  const dateStr = formatDate(day);
                  const count = dataMap.get(dateStr) || 0;
                  const lvl = colorLevel(count);
                  const cls = palette[lvl];

                  // Hide future dates (optional)
                  const isFuture = day.getTime() > new Date().getTime();

                  return (
                    <button
                      key={dateStr}
                      onMouseEnter={(e) =>
                        setTooltip({
                          x: e.clientX,
                          y: e.clientY,
                          date: dateStr,
                          count,
                        })
                      }
                      onMouseLeave={() => setTooltip(null)}
                      onClick={() =>
                        onClick && onClick({ date: dateStr, count })
                      }
                      aria-label={`${dateStr}: ${count} contributions`}
                      disabled={isFuture}
                      className={`w-3 h-3 md:w-4 md:h-4 rounded-sm transition-all duration-150 ${cls} ${
                        isFuture
                          ? "opacity-30 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                      title={`${dateStr}: ${count} task(s)`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip (absolutely positioned) */}
      {tooltip && (
        <div
          className="fixed pointer-events-none z-50 text-xs bg-gray-900 text-white px-3 py-1 rounded shadow"
          style={{ left: tooltip.x + 12, top: tooltip.y + 12 }}
        >
          <div className="font-semibold">{tooltip.count} worked</div>
          <div className="text-gray-300">{tooltip.date}</div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
        <span>Less</span>
        <div className="flex gap-1 items-center">
          {palette.map((p, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-sm ${p} border border-gray-800`}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
