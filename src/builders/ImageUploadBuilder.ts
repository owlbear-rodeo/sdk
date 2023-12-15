import {
  ImageGrid,
  RichText,
  TextContent,
  TextContentType,
  TextItemType,
  TextSize,
  Vector2,
} from "../types/index.js";
import { ImageUpload } from "../types/Assets.js";

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
      text: {
        richText: [
          {
            type: "paragraph",
            children: [{ text: "" }],
          },
        ],
        plainText: "",
        style: {
          padding: 8,
          fontFamily: "Roboto",
          fontSize: 24,
          fontWeight: 400,
          textAlign: "CENTER",
          textAlignVertical: "BOTTOM",
          fillColor: "white",
          fillOpacity: 1,
          strokeColor: "white",
          strokeOpacity: 1,
          strokeWidth: 0,
          lineHeight: 1.5,
        },
        type: "PLAIN",
        width: "AUTO",
        height: "AUTO",
      },
      locked: false,
      textItemType: "LABEL",
      visible: true,
    };
  }

  grid(grid: ImageGrid): ImageUploadBuilder {
    this._upload.grid = grid;
    return this;
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

  description(description: string): ImageUploadBuilder {
    this._upload.description = description;
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

  locked(locked: boolean): ImageUploadBuilder {
    this._upload.locked = locked;
    return this;
  }

  visible(visible: boolean): ImageUploadBuilder {
    this._upload.visible = visible;
    return this;
  }

  text(text: TextContent): ImageUploadBuilder {
    this._upload.text = text;
    return this;
  }

  textItemType(textItemType: TextItemType): ImageUploadBuilder {
    this._upload.textItemType = textItemType;
    return this;
  }

  textWidth(width: TextSize): ImageUploadBuilder {
    this._upload.text.width = width;
    return this;
  }

  textHeight(height: TextSize): ImageUploadBuilder {
    this._upload.text.height = height;
    return this;
  }

  richText(richText: RichText): ImageUploadBuilder {
    this._upload.text.richText = richText;
    return this;
  }

  plainText(plainText: string): ImageUploadBuilder {
    this._upload.text.plainText = plainText;
    return this;
  }

  textType(textType: TextContentType): ImageUploadBuilder {
    this._upload.text.type = textType;
    return this;
  }

  textPadding(padding: number): ImageUploadBuilder {
    this._upload.text.style.padding = padding;
    return this;
  }

  fontFamily(fontFamily: string): ImageUploadBuilder {
    this._upload.text.style.fontFamily = fontFamily;
    return this;
  }

  fontSize(fontSize: number): ImageUploadBuilder {
    this._upload.text.style.fontSize = fontSize;
    return this;
  }

  fontWeight(fontWeight: number): ImageUploadBuilder {
    this._upload.text.style.fontWeight = fontWeight;
    return this;
  }

  textAlign(textAlign: "LEFT" | "CENTER" | "RIGHT"): ImageUploadBuilder {
    this._upload.text.style.textAlign = textAlign;
    return this;
  }

  textAlignVertical(
    textAlignVertical: "BOTTOM" | "MIDDLE" | "TOP",
  ): ImageUploadBuilder {
    this._upload.text.style.textAlignVertical = textAlignVertical;
    return this;
  }

  textFillColor(fillColor: string): ImageUploadBuilder {
    this._upload.text.style.fillColor = fillColor;
    return this;
  }

  textFillOpacity(fillOpacity: number): ImageUploadBuilder {
    this._upload.text.style.fillOpacity = fillOpacity;
    return this;
  }

  textStrokeColor(strokeColor: string): ImageUploadBuilder {
    this._upload.text.style.strokeColor = strokeColor;
    return this;
  }

  textStrokeOpacity(strokeOpacity: number): ImageUploadBuilder {
    this._upload.text.style.strokeOpacity = strokeOpacity;
    return this;
  }

  textStrokeWidth(strokeWidth: number): ImageUploadBuilder {
    this._upload.text.style.strokeWidth = strokeWidth;
    return this;
  }

  textLineHeight(lineHeight: number): ImageUploadBuilder {
    this._upload.text.style.lineHeight = lineHeight;
    return this;
  }

  build(): ImageUpload {
    return this._upload;
  }
}
