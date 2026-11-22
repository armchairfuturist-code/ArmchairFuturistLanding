#!/usr/bin/env python3
"""Instance the site's variable woff2 faces to the static TTFs the OG card uses.

    python3 scripts/og-card/fonts.py        # needs fontTools + brotli

The card is a file:// page, so it cannot lean on next/font. Pinning one static
instance per role keeps the card's type identical to the site's.
"""
from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "src" / "app" / "fonts"
OUT = Path(__file__).resolve().parent / "fonts"

JOBS = [
    ("SpaceGrotesk-Variable", "display-500", {"wght": 500}),
    ("Manrope-Variable", "body-400", {"wght": 400}),
    ("DMMono-Regular", "mono-400", None),
    ("DMMono-Medium", "mono-500", None),
]


def main() -> None:
    OUT.mkdir(exist_ok=True)
    for name, out, axes in JOBS:
        font = TTFont(SRC / f"{name}.woff2")
        if axes:
            instantiateVariableFont(font, axes, inplace=True)
        font.flavor = None  # woff2 -> plain TTF
        font.save(OUT / f"{out}.ttf")
        print(f"wrote {OUT / (out + '.ttf')}")


if __name__ == "__main__":
    main()
