#!/usr/bin/env python3
import json
from datetime import date, datetime, timedelta
from pathlib import Path

PALETTE = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353", "#69f0a0"]


def fmt_int(n: int) -> str:
    return f"{n:,}"


def main() -> None:
    data_path = Path("data/contributions.json")
    payload = json.loads(data_path.read_text(encoding="utf-8"))

    days = payload["days"]
    stats = payload["stats"]
    by_date = {d["date"]: d for d in days}
    parsed = [datetime.strptime(d["date"], "%Y-%m-%d").date() for d in days]
    start_raw = min(parsed)
    end = max(parsed)

    start = start_raw - timedelta(days=(start_raw.weekday() + 1) % 7)
    total_days = (end - start).days + 1
    cols = (total_days + 6) // 7

    cell = 12
    gap = 4
    grid_x = 84
    grid_y = 36
    grid_w = cols * (cell + gap) - gap
    grid_h = 7 * (cell + gap) - gap

    vb_w = 860
    vb_h = 240

    month_labels = []
    seen_month = set()
    cur = start
    while cur <= end:
        if cur.day == 1:
            col = (cur - start).days // 7
            key = (cur.year, cur.month)
            if key not in seen_month:
                seen_month.add(key)
                month_labels.append((col, cur.strftime("%b")))
        cur += timedelta(days=1)

    weekday_labels = [(1, "Mon"), (3, "Wed"), (5, "Fri")]

    cells = []
    cur = start
    while cur <= end:
        col = (cur - start).days // 7
        row = (cur.weekday() + 1) % 7
        key = cur.isoformat()
        level = int(by_date.get(key, {"level": 0})["level"])
        level = max(0, min(5, level))
        x = grid_x + col * (cell + gap)
        y = grid_y + row * (cell + gap)
        delay = (col + row) * 0.015
        cells.append(
            f'<rect class="cell" style="animation-delay:{delay:.3f}s" x="{x}" y="{y}" width="{cell}" height="{cell}" rx="3" fill="{PALETTE[level]}"/>'
        )
        cur += timedelta(days=1)

    legend_x = grid_x + grid_w - 210
    legend_y = grid_y + grid_h + 24
    legend = [f'<text x="{legend_x}" y="{legend_y+10}" fill="#8b949e" font-size="12">Less</text>']
    lx = legend_x + 36
    for c in PALETTE:
        legend.append(f'<rect x="{lx}" y="{legend_y}" width="12" height="12" rx="3" fill="{c}"/>')
        lx += 18
    legend.append(f'<text x="{lx+4}" y="{legend_y+10}" fill="#8b949e" font-size="12">More</text>')

    footer = (
        f'{fmt_int(int(stats["total_last_year"]))} contributions in the last year · '
        f'current streak {stats["current_streak"]} days · '
        f'longest streak {stats["longest_streak"]} days · '
        f'best day {stats["best_day"]["date"]} ({stats["best_day"]["count"]})'
    )

    month_text = "".join(
        f'<text x="{grid_x + col * (cell + gap)}" y="24" fill="#8b949e" font-size="11">{label}</text>'
        for col, label in month_labels
    )
    weekday_text = "".join(
        f'<text x="{44}" y="{grid_y + row*(cell+gap) + 10}" fill="#8b949e" font-size="11">{label}</text>'
        for row, label in weekday_labels
    )

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="860" viewBox="0 0 {vb_w} {vb_h}" role="img" aria-label="GitHub contribution heatmap">
  <style>
    @keyframes drop {{ from {{ opacity: 0; transform: translateY(-6px); }} to {{ opacity: 1; transform: translateY(0); }} }}
    .cell {{ opacity: 0; animation: drop .35s ease forwards; }}
    text {{ font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace; }}
  </style>
  <rect x="0" y="0" width="{vb_w}" height="{vb_h}" rx="14" fill="#0d1117"/>
  {month_text}
  {weekday_text}
  <g>{''.join(cells)}</g>
  <g>{''.join(legend)}</g>
  <text x="84" y="220" fill="#c9d1d9" font-size="13">{footer}</text>
</svg>
'''

    Path("contrib-heatmap.svg").write_text(svg, encoding="utf-8")
    print("Wrote contrib-heatmap.svg")


if __name__ == "__main__":
    main()
