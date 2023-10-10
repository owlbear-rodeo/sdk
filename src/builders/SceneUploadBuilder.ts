import {
  GridColor,
  GridLineType,
  GridMeasurement,
  GridType,
  ImageUpload,
  Item,
  SceneUpload,
} from "../types";

export class SceneUploadBuilder {
  private _upload: SceneUpload;

  constructor() {
    this._upload = {
      name: "New Scene",
      fog: { filled: false, style: { color: "#222222", strokeWidth: 5 } },
      grid: {
        dpi: 150,
        scale: "5ft",
        style: { lineColor: "LIGHT", lineOpacity: 0.4, lineType: "DASHED" },
        measurement: "CHEBYSHEV",
        type: "SQUARE",
      },
      items: [],
    };
  }

  name(name: string): SceneUploadBuilder {
    this._upload.name = name;
    return this;
  }

  gridScale(scale: string): SceneUploadBuilder {
    this._upload.grid.scale = scale;
    return this;
  }

  gridColor(color: GridColor): SceneUploadBuilder {
    this._upload.grid.style.lineColor = color;
    return this;
  }

  gridOpacity(opacity: number): SceneUploadBuilder {
    this._upload.grid.style.lineOpacity = opacity;
    return this;
  }

  gridLineType(type: GridLineType): SceneUploadBuilder {
    this._upload.grid.style.lineType = type;
    return this;
  }

  gridMeasurement(measurement: GridMeasurement): SceneUploadBuilder {
    this._upload.grid.measurement = measurement;
    return this;
  }

  gridType(type: GridType): SceneUploadBuilder {
    this._upload.grid.type = type;
    return this;
  }

  items(items: Item[]): SceneUploadBuilder {
    this._upload.items = items;
    return this;
  }

  baseMap(baseMap: ImageUpload): SceneUploadBuilder {
    this._upload.baseMap = baseMap;
    return this;
  }

  build(): SceneUpload {
    return this._upload;
  }
}
