#!/usr/bin/env python3
from pathlib import Path

import cv2

RAMP = " .`:-=+*cs#%@"


def esc_xml(text: str) -> str:
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def main() -> None:
    image_path = Path("source-prepped.png")
    gray = cv2.imread(str(image_path), cv2.IMREAD_GRAYSCALE)
    if gray is None:
        raise FileNotFoundError("source-prepped.png not found")

    cols, rows = 100, 53
    sampled = cv2.resize(gray, (cols, rows), interpolation=cv2.INTER_AREA)

    chars = []
    n = len(RAMP) - 1
    for row in sampled:
        line = ""
        for px in row:
            idx = int(round((255 - int(px)) / 255 * n))
            line += RAMP[max(0, min(n, idx))]
        chars.append(esc_xml(line))

    cw, ch = 8, 14
    margin = 12
    text_x = margin
    text_y = margin + ch
    art_w = cols * cw
    art_h = rows * ch
    vb_w = art_w + margin * 2
    vb_h = art_h + margin * 2

    row_dur = 0.9
    stagger = 0.05

    defs = []
    body = []
    cursors = []
    for i, line in enumerate(chars):
        y = text_y + i * ch
        clip_id = f"clip-{i}"
        begin = i * stagger
        defs.append(
            f'''<clipPath id="{clip_id}"><rect x="{text_x}" y="{y-ch+2}" width="0" height="{ch+2}">\
<animate attributeName="width" from="0" to="{art_w}" begin="{begin:.2f}s" dur="{row_dur:.2f}s" fill="freeze" />\
</rect></clipPath>'''
        )
        body.append(
            f'<text x="{text_x}" y="{y}" clip-path="url(#{clip_id})">{line}</text>'
        )
        cursors.append(
            f'''<rect x="{text_x}" y="{y-ch+2}" width="6" height="{ch+2}" class="cursor">\
<animate attributeName="x" from="{text_x}" to="{text_x+art_w-6}" begin="{begin:.2f}s" dur="{row_dur:.2f}s" fill="freeze" />\
<animate attributeName="opacity" from="1" to="0" begin="{begin+row_dur:.2f}s" dur="0.05s" fill="freeze" />\
</rect>'''
        )

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="370" viewBox="0 0 {vb_w} {vb_h}" role="img" aria-label="ASCII portrait of garve">
  <rect x="0" y="0" width="{vb_w}" height="{vb_h}" fill="#0d1117" rx="12"/>
  <defs>{''.join(defs)}</defs>
  <g fill="#c9d1d9" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace" font-size="14" xml:space="preserve">{''.join(body)}</g>
  <g>{''.join(cursors)}</g>
</svg>
'''

    Path("ascii.svg").write_text(svg, encoding="utf-8")
    print("Wrote ascii.svg")


if __name__ == "__main__":
    main()
