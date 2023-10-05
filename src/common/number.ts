export function roundTo(x: number, to: number): number {
  return Math.round(x / to) * to;
}

export function floorTo(x: number, to: number): number {
  return Math.floor(x / to) * to;
}

export function toRadians(angle: number): number {
  return angle * (Math.PI / 180);
}

export function toDegrees(angle: number): number {
  return angle * (180 / Math.PI);
}

export function lerp(from: number, to: number, alpha: number): number {
  return from * (1 - alpha) + to * alpha;
}
