"use client";

import React, { useMemo, useState } from "react";

export default function CalendarHeatmap({
  data = [],
  startDate = null,
  weeks = 53,
  onClick,
}) {
  const [tooltip, setTooltip] = useState(null);

  const parseDate = (iso) => {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d));
  };

  const formatDate = (d) => d.toISOString().slice(0, 10);

  // Build map for fast lookup
  const dataMap = useMemo(() => {
    const m = new Map();
    for (const item of data) m.set(item.date, item.count || 0);
    return m;
  }, [data]);

  // Start date aligned to Sunday
  const computedStart = useMemo(() => {
    const today = new Date();
    const defaultStart = startDate ? parseDate(startDate) : new Date(today);
    if (!startDate)
      defaultStart.setUTCDate(defaultStart.getUTCDate() - weeks * 7 + 1);
    const day = defaultStart.getUTCDay();
    defaultStart.setUTCDate(defaultStart.getUTCDate() - day);
    defaultStart.setUTCHours(0, 0, 0, 0);
    return defaultStart;
  }, [startDate, weeks]);

  // Generate grid
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

  // Generate month labels
  const months = useMemo(() => {
    const labels = [];
    let lastMonth = -1;
    grid.forEach((col, idx) => {
      const month = col[0].getUTCMonth();
      const year = col[0].getUTCFullYear();
      if (month !== lastMonth) {
        labels.push({
          idx,
          name: `${col[0].toLocaleString("default", {
            month: "short",
          })} ${year}`,
        });
        lastMonth = month;
      }
    });
    return labels;
  }, [grid]);

  // Compute color level dynamically
  const maxCount = Math.max(...data.map((d) => d.count || 0), 0);
  const colorLevel = (count) => {
    if (!count || count <= 0) return 0;
    const thresholds = [
      0,
      1,
      Math.ceil(maxCount / 3),
      Math.ceil((2 * maxCount) / 3),
      maxCount,
    ];
    if (count <= thresholds[1]) return 1;
    if (count <= thresholds[2]) return 2;
    if (count <= thresholds[3]) return 3;
    return 4;
  };

  const palette = [
    "bg-transparent border border-gray-800",
    "bg-green-100",
    "bg-green-300",
    "bg-green-500",
    "bg-green-700",
  ];

  return (
    <div className="w-full">
      {/* Month labels */}
      <div className="flex gap-1 ml-6 text-xs text-gray-400 overflow-x-auto">
        {grid.map((_, idx) => {
          const monthLabel = months.find((m) => m.idx === idx);
          return monthLabel ? (
            <span key={monthLabel.idx} className="absolute text-xs">
              {monthLabel.name}
            </span>
          ) : null;
        })}
      </div>

      <div className="flex items-start gap-2 mt-4">
        {/* Weekday labels */}
        <div className="hidden md:flex flex-col text-xs text-gray-400 mr-2 h-full justify-between py-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <span key={day} className="h-3">
              {day}
            </span>
          ))}
        </div>

        {/* Grid */}
        <div className="overflow-x-auto relative">
          <div className="flex gap-1">
            {grid.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-1">
                {col.map((day) => {
                  const dateStr = formatDate(day);
                  const count = dataMap.get(dateStr) || 0;
                  const lvl = colorLevel(count);
                  const cls = palette[lvl];
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
                      aria-label={`${dateStr}: ${count} tasks`}
                      disabled={isFuture}
                      className={`w-3 h-3 md:w-4 md:h-4 rounded-sm transition-all duration-150 ${cls} ${
                        isFuture
                          ? "opacity-30 cursor-not-allowed"
                          : "cursor-pointer hover:scale-110"
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

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed pointer-events-none z-50 text-xs bg-gray-900 text-white px-3 py-1 rounded shadow"
          style={{
            left: tooltip.x + 12,
            top: tooltip.y + 12,
            maxWidth: "200px",
            wordWrap: "break-word",
          }}
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
