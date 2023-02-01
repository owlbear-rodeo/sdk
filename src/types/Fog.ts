export interface FogStyle {
  color: string;
  strokeWidth?: number;
}

export interface Fog {
  filled: boolean;
  style: FogStyle;
}
