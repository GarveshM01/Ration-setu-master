#!/usr/bin/env python3
import argparse
from pathlib import Path

import cv2
import numpy as np
from PIL import Image


def _remove_bg_with_rembg(image_bgr: np.ndarray) -> tuple[np.ndarray, bool]:
    try:
        from rembg import remove

        rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
        pil_input = Image.fromarray(rgb)
        rgba = np.array(remove(pil_input).convert("RGBA"))
        alpha = rgba[:, :, 3]
        mask = (alpha > 10).astype(np.uint8) * 255
        return mask, True
    except Exception:
        return _remove_bg_with_grabcut(image_bgr), False


def _remove_bg_with_grabcut(image_bgr: np.ndarray) -> np.ndarray:
    h, w = image_bgr.shape[:2]
    mask = np.zeros((h, w), np.uint8)
    bgd_model = np.zeros((1, 65), np.float64)
    fgd_model = np.zeros((1, 65), np.float64)
    rect = (max(1, w // 20), max(1, h // 20), w - max(2, w // 10), h - max(2, h // 10))
    cv2.grabCut(image_bgr, mask, rect, bgd_model, fgd_model, 5, cv2.GC_INIT_WITH_RECT)
    mask2 = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype(np.uint8)
    return mask2


def _tight_crop(image_bgr: np.ndarray, mask: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    ys, xs = np.where(mask > 0)
    if len(xs) == 0 or len(ys) == 0:
        return image_bgr, mask
    x0, x1 = xs.min(), xs.max()
    y0, y1 = ys.min(), ys.max()
    w = x1 - x0 + 1
    h = y1 - y0 + 1
    pad_x = int(w * 0.12)
    pad_top = int(h * 0.12)
    pad_bottom = int(h * 0.2)
    x0 = max(0, x0 - pad_x)
    x1 = min(image_bgr.shape[1] - 1, x1 + pad_x)
    y0 = max(0, y0 - pad_top)
    y1 = min(image_bgr.shape[0] - 1, y1 + pad_bottom)
    return image_bgr[y0 : y1 + 1, x0 : x1 + 1], mask[y0 : y1 + 1, x0 : x1 + 1]


def _enhance_subject(crop_bgr: np.ndarray, mask: np.ndarray) -> np.ndarray:
    gray = cv2.cvtColor(crop_bgr, cv2.COLOR_BGR2GRAY)
    clahe = cv2.createCLAHE(clipLimit=2.8, tileGridSize=(8, 8))
    enhanced = clahe.apply(gray)
    fg = mask > 0
    if np.any(fg):
        subject_pixels = enhanced[fg].astype(np.float32)
        p10 = np.percentile(subject_pixels, 10)
        p98 = np.percentile(subject_pixels, 98)
        scale = 255.0 / max(1.0, p98 - p10)
        stretched = np.clip((enhanced.astype(np.float32) - p10) * scale, 0, 255)
        lifted = np.clip(stretched * 0.88 + 28, 0, 255).astype(np.uint8)
        enhanced = np.where(fg, lifted, 255).astype(np.uint8)
    else:
        enhanced = np.clip(enhanced.astype(np.float32) * 0.9 + 20, 0, 255).astype(np.uint8)
    return enhanced


def main() -> None:
    parser = argparse.ArgumentParser(description="Prepare portrait image for ASCII rendering")
    parser.add_argument("source", type=Path, help="Path to source photo")
    args = parser.parse_args()

    source = args.source
    image = cv2.imread(str(source))
    if image is None:
        raise FileNotFoundError(f"Could not read image: {source}")

    mask, used_rembg = _remove_bg_with_rembg(image)
    crop_bgr, crop_mask = _tight_crop(image, mask)
    out_gray = _enhance_subject(crop_bgr, crop_mask)

    out_path = source.with_name(f"{source.stem}-prepped.png")
    cv2.imwrite(str(out_path), out_gray)

    mode = "rembg" if used_rembg else "grabcut-fallback"
    print(f"Wrote {out_path} using {mode}")


if __name__ == "__main__":
    main()
