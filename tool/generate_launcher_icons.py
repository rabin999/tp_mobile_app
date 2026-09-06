#!/usr/bin/env python3
"""Rasterize TrueProfessionalMark.svg into Android and iOS launcher icons.

The mark is a tall pin. Android adaptive icons crop the outer 18% (108dp
canvas, 72dp safe zone). Size the glyph to 50% of the *visible* circle so
it is not cramped after the launcher mask.
"""

from __future__ import annotations

import io
from pathlib import Path

from cairosvg import svg2png
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
SVG = (ROOT / "assets" / "images" / "TrueProfessionalMark.svg").read_text()
ANDROID_RES = ROOT / "android" / "app" / "src" / "main" / "res"
IOS_ICONS = (
    ROOT
    / "ios"
    / "TrueProfessionalApp"
    / "Images.xcassets"
    / "AppIcon.appiconset"
)

WHITE = (255, 255, 255, 255)
VISIBLE_GLYPH = 0.50
ADAPTIVE_SAFE = 72 / 108
MARK_ASPECT = 39.356 / 58.949

DENSITIES = {
    "mdpi": 1.0,
    "hdpi": 1.5,
    "xhdpi": 2.0,
    "xxhdpi": 3.0,
    "xxxhdpi": 4.0,
}

IOS_FILES = {
    "Icon-App-20x20@1x.png": 20,
    "Icon-App-20x20@2x.png": 40,
    "Icon-App-20x20@3x.png": 60,
    "Icon-App-29x29@1x.png": 29,
    "Icon-App-29x29@2x.png": 58,
    "Icon-App-29x29@3x.png": 87,
    "Icon-App-40x40@1x.png": 40,
    "Icon-App-40x40@2x.png": 80,
    "Icon-App-40x40@3x.png": 120,
    "Icon-App-60x60@2x.png": 120,
    "Icon-App-60x60@3x.png": 180,
    "Icon-App-76x76@1x.png": 76,
    "Icon-App-76x76@2x.png": 152,
    "Icon-App-83.5x83.5@2x.png": 167,
    "Icon-App-1024x1024@1x.png": 1024,
}


def render_mark(height_px: int) -> Image.Image:
    height_px = max(1, int(height_px))
    width_px = max(1, round(height_px * MARK_ASPECT))
    png = svg2png(
        bytestring=SVG.encode(),
        output_width=width_px,
        output_height=height_px,
    )
    return Image.open(io.BytesIO(png)).convert("RGBA")


def paste_centered(canvas: Image.Image, mark: Image.Image) -> None:
    x = (canvas.width - mark.width) // 2
    y = (canvas.height - mark.height) // 2
    canvas.alpha_composite(mark, (x, y))


def square_icon(size: int, visible_ratio: float = VISIBLE_GLYPH) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), WHITE)
    paste_centered(canvas, render_mark(round(size * visible_ratio)))
    return canvas


def round_icon(size: int) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    draw.ellipse((0, 0, size - 1, size - 1), fill=WHITE)
    paste_centered(canvas, render_mark(round(size * VISIBLE_GLYPH)))
    return canvas


def adaptive_foreground(size: int) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    glyph_h = round(size * ADAPTIVE_SAFE * VISIBLE_GLYPH)
    paste_centered(canvas, render_mark(glyph_h))
    return canvas


def save(path: Path, image: Image.Image) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, "PNG")


def main() -> None:
    for name, scale in DENSITIES.items():
        folder = ANDROID_RES / f"mipmap-{name}"
        legacy = max(1, round(48 * scale))
        foreground = max(1, round(108 * scale))
        save(folder / "ic_launcher.png", square_icon(legacy))
        save(folder / "ic_launcher_round.png", round_icon(legacy))
        save(folder / "ic_launcher_foreground.png", adaptive_foreground(foreground))

    for filename, size in IOS_FILES.items():
        save(IOS_ICONS / filename, square_icon(size))


if __name__ == "__main__":
    main()
