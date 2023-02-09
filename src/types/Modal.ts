export interface Modal {
  id: string;
  url: string;
  width?: number;
  height?: number;
  fullScreen?: boolean;
  hideBackdrop?: boolean;
  hidePaper?: boolean;
  disablePointerEvents?: boolean;
}
