import { ImageContent } from "../types/items/ImageContent";
import { ImageGrid } from "../types/items/ImageGrid";
import { TextContent, TextItemType } from "../types/items/TextContent";
import { Image } from "../types/items/Image";
import { GenericItemBuilder } from "./GenericItemBuilder";

export class ImageBuilder extends GenericItemBuilder<ImageBuilder> {
  private _image: ImageContent;
  private _grid: ImageGrid;
  private _text: TextContent;
  private _textItemType: TextItemType;

  constructor(image: ImageContent, grid: ImageGrid) {
    super();
    this._image = image;
    this._grid = grid;
    this._item.name = "Image";
    this._text = {
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
        fontSize: 16,
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
    };
    this._textItemType = "LABEL";
  }

  text(text: TextContent): ImageBuilder {
    this._text = text;
    return this.self();
  }

  textItemType(textItemType: TextItemType): ImageBuilder {
    this._textItemType = textItemType;
    return this.self();
  }

  build(): Image {
    return {
      ...this._item,
      type: "IMAGE",
      image: this._image,
      grid: this._grid,
      text: this._text,
      textItemType: this._textItemType,
    };
  }
}
