export interface ImageContent {
  width: number;
  height: number;
  /**
   * MIME type
   * @example
   * image/jpeg
   */
  mime: string;
  url: string;
}
