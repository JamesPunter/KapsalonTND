/** Minimal CSV row stringify; escapes quotes. */
export function stringifyRows(headers, rows) {
  const esc = (v) => {
    const s = v == null ? "" : String(v);
    if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const line = (cells) => cells.map(esc).join(",");
  return [line(headers), ...rows.map((r) => line(r))].join("\n") + "\n";
}
