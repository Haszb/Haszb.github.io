// Build-time helpers for small static SVG charts (no client JavaScript).

export interface Series {
  x: number[];
  y: number[];
}

export interface Frame {
  width: number;
  height: number;
  pad: { top: number; right: number; bottom: number; left: number };
  xDomain: [number, number];
  yDomain: [number, number];
}

export function scale(frame: Frame) {
  const { width, height, pad, xDomain, yDomain } = frame;
  const sx = (v: number) =>
    pad.left + ((v - xDomain[0]) / (xDomain[1] - xDomain[0] || 1)) * (width - pad.left - pad.right);
  const sy = (v: number) =>
    height - pad.bottom - ((v - yDomain[0]) / (yDomain[1] - yDomain[0] || 1)) * (height - pad.top - pad.bottom);
  return { sx, sy };
}

export function linePath(s: Series, frame: Frame): string {
  const { sx, sy } = scale(frame);
  return s.x.map((x, i) => `${i ? 'L' : 'M'}${sx(x).toFixed(1)},${sy(s.y[i]).toFixed(1)}`).join('');
}

export function extent(values: number[], padRatio = 0.04): [number, number] {
  let lo = Infinity;
  let hi = -Infinity;
  for (const v of values) {
    if (v < lo) lo = v;
    if (v > hi) hi = v;
  }
  const pad = (hi - lo) * padRatio;
  return [lo - pad, hi + pad];
}

export const toTime = (iso: string) => new Date(iso.replace(' ', 'T') + (iso.endsWith('Z') ? '' : 'Z')).getTime();
