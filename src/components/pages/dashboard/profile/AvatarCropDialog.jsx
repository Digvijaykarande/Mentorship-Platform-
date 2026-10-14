"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  Contrast,
  FlipHorizontal2,
  Loader2,
  RefreshCw,
  RotateCcw,
  RotateCw,
  Sun,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const VIEW = 280; // crop viewport size in CSS px
const OUTPUT = 512; // exported image size in px
const MIN_ZOOM = 1;
const MAX_ZOOM = 4;

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

const DEFAULTS = {
  zoom: 1,
  rotation: 0,
  flip: false,
  brightness: 100,
  contrast: 100,
  offset: { x: 0, y: 0 },
};

/** Scale (screen px per image px) that always keeps the crop square fully covered by the image. */
function getScale(w, h, rotation, zoom) {
  const rad = (rotation * Math.PI) / 180;
  const spread = Math.abs(Math.cos(rad)) + Math.abs(Math.sin(rad));
  return ((VIEW * spread) / Math.min(w, h)) * zoom;
}

/** Keeps the pan offset inside the image so no empty corners ever show up. */
function constrain(offset, { w, h, rotation, zoom }) {
  const rad = (rotation * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const spread = Math.abs(cos) + Math.abs(sin);
  const s = getScale(w, h, rotation, zoom);
  const e = ((VIEW / 2) * spread) / s; // half-extent of the crop square in image space

  // screen offset -> image space
  const px = (cos * offset.x + sin * offset.y) / s;
  const py = (-sin * offset.x + cos * offset.y) / s;
  const cx = clamp(px, -Math.max(0, w / 2 - e), Math.max(0, w / 2 - e));
  const cy = clamp(py, -Math.max(0, h / 2 - e), Math.max(0, h / 2 - e));

  // image space -> screen offset
  return { x: s * (cos * cx - sin * cy), y: s * (sin * cx + cos * cy) };
}

function SliderRow({ icon: Icon, label, value, min, max, step = 1, onChange, suffix = "", endIcon: EndIcon }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
      <input
        type="range"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer accent-indigo-600"
      />
      {EndIcon ? (
        <EndIcon className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
      ) : (
        <span className="w-12 shrink-0 text-right text-[11px] font-medium tabular-nums text-slate-500 dark:text-slate-400">
          {value}
          {suffix}
        </span>
      )}
    </div>
  );
}

export default function AvatarCropDialog({ open, src, onCancel, onApply }) {
  const [img, setImg] = useState(null);
  const [error, setError] = useState("");
  const [applying, setApplying] = useState(false);
  const [zoom, setZoom] = useState(DEFAULTS.zoom);
  const [rotation, setRotation] = useState(DEFAULTS.rotation);
  const [flip, setFlip] = useState(DEFAULTS.flip);
  const [brightness, setBrightness] = useState(DEFAULTS.brightness);
  const [contrast, setContrast] = useState(DEFAULTS.contrast);
  const [offset, setOffset] = useState(DEFAULTS.offset);
  const drag = useRef(null);

  const reset = useCallback(() => {
    setZoom(DEFAULTS.zoom);
    setRotation(DEFAULTS.rotation);
    setFlip(DEFAULTS.flip);
    setBrightness(DEFAULTS.brightness);
    setContrast(DEFAULTS.contrast);
    setOffset(DEFAULTS.offset);
  }, []);

  // Load the picked image and reset the editor whenever a new file arrives.
  useEffect(() => {
    if (!src) return;
    let cancelled = false;
    setImg(null);
    setError("");
    reset();
    const image = new Image();
    image.onload = () => !cancelled && setImg(image);
    image.onerror = () => !cancelled && setError("This image could not be loaded. Try a different file.");
    image.src = src;
    return () => {
      cancelled = true;
    };
  }, [src, reset]);

  const geometry = useMemo(
    () => (img ? { w: img.naturalWidth, h: img.naturalHeight, rotation, zoom } : null),
    [img, rotation, zoom],
  );
  const pos = geometry ? constrain(offset, geometry) : offset;
  const scale = geometry ? getScale(geometry.w, geometry.h, rotation, zoom) : 1;

  const onPointerDown = (e) => {
    if (!img) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, start: pos };
  };
  const onPointerMove = (e) => {
    if (!drag.current || !geometry) return;
    const next = {
      x: drag.current.start.x + (e.clientX - drag.current.x),
      y: drag.current.start.y + (e.clientY - drag.current.y),
    };
    setOffset(constrain(next, geometry));
  };
  const endDrag = () => {
    drag.current = null;
  };
  const onWheel = (e) => setZoom((z) => clamp(z - e.deltaY * 0.002, MIN_ZOOM, MAX_ZOOM));

  const rotateBy = (deg) => {
    setRotation((r) => {
      let next = r + deg;
      if (next > 180) next -= 360;
      if (next < -180) next += 360;
      return next;
    });
  };

  const handleApply = () => {
    if (!img || !geometry) return;
    setApplying(true);

    const canvas = document.createElement("canvas");
    canvas.width = OUTPUT;
    canvas.height = OUTPUT;
    const ctx = canvas.getContext("2d");
    const k = OUTPUT / VIEW;

    ctx.imageSmoothingQuality = "high";
    ctx.translate(OUTPUT / 2 + pos.x * k, OUTPUT / 2 + pos.y * k);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale * k * (flip ? -1 : 1), scale * k);
    ctx.drawImage(img, -geometry.w / 2, -geometry.h / 2);

    if (brightness !== 100 || contrast !== 100) {
      const data = ctx.getImageData(0, 0, OUTPUT, OUTPUT);
      const b = brightness / 100;
      const c = contrast / 100;
      const px = data.data;
      for (let i = 0; i < px.length; i += 4) {
        for (let j = 0; j < 3; j++) {
          px[i + j] = clamp((px[i + j] * b - 128) * c + 128, 0, 255);
        }
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.putImageData(data, 0, 0);
    }

    canvas.toBlob(
      (blob) => {
        setApplying(false);
        if (!blob) {
          setError("Could not process the image. Please try again.");
          return;
        }
        onApply(blob);
      },
      "image/jpeg",
      0.92,
    );
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && !applying && onCancel()}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit profile photo</DialogTitle>
          <DialogDescription>Drag to reposition. Zoom, rotate and adjust before saving.</DialogDescription>
        </DialogHeader>

        <div className="flex justify-center">
          <div
            className="relative touch-none select-none overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 dark:border-slate-700"
            style={{ width: VIEW, height: VIEW, cursor: img ? (drag.current ? "grabbing" : "grab") : "default" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onWheel={onWheel}
          >
            {img && (
              <img
                src={src}
                alt="Crop preview"
                draggable={false}
                className="pointer-events-none absolute max-w-none"
                style={{
                  width: geometry.w,
                  height: geometry.h,
                  left: "50%",
                  top: "50%",
                  marginLeft: -geometry.w / 2,
                  marginTop: -geometry.h / 2,
                  transform: `translate(${pos.x}px, ${pos.y}px) rotate(${rotation}deg) scale(${scale * (flip ? -1 : 1)}, ${scale})`,
                  transformOrigin: "center",
                  filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                }}
              />
            )}
            {!img && !error && (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
              </div>
            )}
            {error && <p className="absolute inset-0 flex items-center justify-center p-6 text-center text-xs text-rose-400">{error}</p>}
            {/* rule-of-thirds grid */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-y-0 left-1/3 w-px bg-white/25" />
              <div className="absolute inset-y-0 left-2/3 w-px bg-white/25" />
              <div className="absolute inset-x-0 top-1/3 h-px bg-white/25" />
              <div className="absolute inset-x-0 top-2/3 h-px bg-white/25" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <SliderRow icon={ZoomOut} endIcon={ZoomIn} label="Zoom" value={zoom} min={MIN_ZOOM} max={MAX_ZOOM} step={0.01} onChange={setZoom} />

          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => rotateBy(-90)} aria-label="Rotate left 90 degrees" className="h-8 gap-1.5 text-xs">
              <RotateCcw className="h-3.5 w-3.5" /> 90°
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => rotateBy(90)} aria-label="Rotate right 90 degrees" className="h-8 gap-1.5 text-xs">
              <RotateCw className="h-3.5 w-3.5" /> 90°
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setFlip((f) => !f)}
              aria-pressed={flip}
              aria-label="Flip horizontally"
              className={`h-8 gap-1.5 text-xs ${flip ? "border-indigo-400 text-indigo-600 dark:text-indigo-300" : ""}`}
            >
              <FlipHorizontal2 className="h-3.5 w-3.5" /> Flip
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={reset} className="ml-auto h-8 gap-1.5 text-xs">
              <RefreshCw className="h-3.5 w-3.5" /> Reset
            </Button>
          </div>

          <SliderRow icon={RotateCw} label="Straighten" value={Math.round(rotation)} min={-180} max={180} onChange={setRotation} suffix="°" />
          <SliderRow icon={Sun} label="Brightness" value={brightness} min={50} max={150} onChange={setBrightness} suffix="%" />
          <SliderRow icon={Contrast} label="Contrast" value={contrast} min={50} max={150} onChange={setContrast} suffix="%" />
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={applying}>
            Cancel
          </Button>
          <Button type="button" onClick={handleApply} disabled={!img || applying} className="gap-1.5 bg-blue-600 text-white hover:bg-blue-700">
            {applying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            Use photo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
