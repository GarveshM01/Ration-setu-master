#!/usr/bin/env python3
import json
import re
from collections import defaultdict
from datetime import datetime, timedelta, timezone
from pathlib import Path

import requests
from bs4 import BeautifulSoup

USERNAME = "GarveshM01"
URL = f"https://github.com/users/{USERNAME}/contributions"


def parse_count(cell, tooltip_text: str | None) -> int:
    count_raw = cell.get("data-count")
    if count_raw is not None and count_raw.isdigit():
        return int(count_raw)

    fields = [cell.get("aria-label"), cell.get("data-original-title"), cell.get("title"), tooltip_text]
    for field in fields:
        if not field:
            continue
        if "No contributions" in field:
            return 0
        m = re.search(r"(\d+)\s+contribution", field)
        if m:
            return int(m.group(1))
    return 0


def main() -> None:
    headers = {"User-Agent": "profile-readme-art-generator/1.0"}
    response = requests.get(URL, headers=headers, timeout=30)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")
    day_cells = soup.select("rect[data-date], td[data-date]")
    if not day_cells:
        raise RuntimeError("No contribution day cells found in fetched HTML")

    tooltips = {
        tip.get("for"): tip.get_text(" ", strip=True)
        for tip in soup.select("tool-tip[for]")
        if tip.get("for")
    }

    days = []
    for cell in day_cells:
        date = cell.get("data-date")
        level = int(cell.get("data-level", "0"))
        count = parse_count(cell, tooltips.get(cell.get("id")))
        days.append({"date": date, "count": count, "level": level})

    days.sort(key=lambda d: d["date"])
    total = sum(d["count"] for d in days)

    longest = 0
    current = 0
    run = 0
    prev_date = None
    for day in days:
        d = datetime.strptime(day["date"], "%Y-%m-%d").date()
        if day["count"] > 0:
            if prev_date is not None and d == prev_date + timedelta(days=1):
                run += 1
            else:
                run = 1
            longest = max(longest, run)
        else:
            run = 0
        prev_date = d

    for day in reversed(days):
        if day["count"] > 0:
            current += 1
        else:
            break

    best = max(days, key=lambda d: d["count"])
    monthly = defaultdict(int)
    for day in days:
        monthly[day["date"][:7]] += day["count"]

    payload = {
        "username": USERNAME,
        "generated_at": datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
        "days": days,
        "stats": {
            "total_last_year": total,
            "current_streak": current,
            "longest_streak": longest,
            "best_day": {"date": best["date"], "count": best["count"]},
            "monthly_totals": dict(sorted(monthly.items())),
        },
    }

    out_path = Path("data/contributions.json")
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()
