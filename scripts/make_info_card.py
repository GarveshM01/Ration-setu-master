#!/usr/bin/env python3
import os
from pathlib import Path

DETAILS = {
    "Now": "B.Tech CSE student | learning web dev | doing DSA alongside frontend | open to internships",
    "Edu": "3rd year B.Tech CSE at OIST Bhopal; Web Development and Java DSA courses at Coding Thinker, Bhopal; core: OS, SE, DBMS, TOC, IWT",
    "Stack": "HTML, CSS, JavaScript, Java, C++, SQL, Supabase",
    "Learning": "MERN (MongoDB, Express, React, Node.js), DSA in Java",
    "Highlights": "200+ CodeChef problems solved; built Ration Setu for SIH (selected to represent college); participant at TIT Srijan; organized 3 college events: debate competition, coding competition, mock placement drive",
}


def wrap(text: str, width: int) -> list[str]:
    words = text.split()
    out: list[str] = []
    line = ""
    for word in words:
        candidate = word if not line else f"{line} {word}"
        if len(candidate) <= width:
            line = candidate
        else:
            if line:
                out.append(line)
            line = word
    if line:
        out.append(line)
    return out


def main() -> None:
    static = os.getenv("STATIC") == "1"

    vb_w, vb_h = 980, 766
    line_h = 34
    y = 128

    lines = []
    idx = 0
    for key, value in DETAILS.items():
        first = True
        for chunk in wrap(value, 55):
            key_text = f"{key}:" if first else ""
            value_text = chunk
            lines.append((idx, y, key_text, value_text))
            y += line_h
            idx += 1
            first = False
        y += 6

    styles = ""
    if static:
        styles = ".row{opacity:1;transform:none;}"
    else:
        styles = """
@keyframes reveal {
  from { opacity: 0; transform: translateX(12px); }
  to { opacity: 1; transform: translateX(0); }
}
.row { opacity: 0; animation: reveal .45s ease forwards; }
"""

    row_svg = []
    for i, yy, key, value in lines:
        delay = i * 0.09
        anim = "" if static else f' style="animation-delay:{delay:.2f}s"'
        row_svg.append(
            f'<text x="48" y="{yy}" class="row" fill="#7ee787"{anim}>{key}</text>'
            f'<text x="220" y="{yy}" class="row" fill="#c9d1d9"{anim}>{value}</text>'
        )

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="490" viewBox="0 0 {vb_w} {vb_h}" role="img" aria-label="neofetch style profile card">
  <style>
    text {{ font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace; font-size: 23px; }}
    {styles}
  </style>
  <rect x="0" y="0" width="{vb_w}" height="{vb_h}" rx="18" fill="#0d1117"/>
  <rect x="0" y="0" width="{vb_w}" height="74" rx="18" fill="#161b22"/>
  <circle cx="36" cy="37" r="8" fill="#ff5f56"/>
  <circle cx="62" cy="37" r="8" fill="#ffbd2e"/>
  <circle cx="88" cy="37" r="8" fill="#27c93f"/>
  <text x="130" y="45" fill="#8b949e">garve@github</text>
  {''.join(row_svg)}
</svg>
'''

    Path("info-card.svg").write_text(svg, encoding="utf-8")
    print("Wrote info-card.svg")


if __name__ == "__main__":
    main()
