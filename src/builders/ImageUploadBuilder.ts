import { Vector2 } from "../types";
import { ImageUpload } from "../types/Assets";

export class ImageUploadBuilder {
  private _upload: ImageUpload;

  constructor(file: File | Blob) {
    this._upload = {
      file,
      grid: {
        dpi: 150,
        offset: { x: 0, y: 0 },
      },
      name: "",
      rotation: 0,
      scale: { x: 1, y: 1 },
    };
  }

  dpi(dpi: number): ImageUploadBuilder {
    this._upload.grid.dpi = dpi;
    return this;
  }

  offset(offset: Vector2): ImageUploadBuilder {
    this._upload.grid.offset = offset;
    return this;
  }

  name(name: string): ImageUploadBuilder {
    this._upload.name = name;
    return this;
  }

  rotation(rotation: number): ImageUploadBuilder {
    this._upload.rotation = rotation;
    return this;
  }

  scale(scale: Vector2): ImageUploadBuilder {
    this._upload.scale = scale;
    return this;
  }

  build(): ImageUpload {
    return this._upload;
  }
}
