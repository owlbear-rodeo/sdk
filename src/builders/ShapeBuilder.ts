import { Shape, ShapeStyle, ShapeType } from "../types/items/Shape";
import { GenericItemBuilder } from "./GenericItemBuilder";

export class ShapeBuilder extends GenericItemBuilder<ShapeBuilder> {
  private _width: number;
  private _height: number;
  private _shapeType: ShapeType;
  private _style: ShapeStyle;

  constructor() {
    super();
    this._width = 0;
    this._height = 0;
    this._shapeType = "RECTANGLE";
    this._style = {
      fillColor: "black",
      fillOpacity: 1,
      strokeColor: "white",
      strokeOpacity: 1,
      strokeWidth: 5,
      strokeDash: [],
    };
    this._item.layer = "DRAWING";
    this._item.name = "Shape";
  }

  width(width: number): ShapeBuilder {
    this._width = width;
    return this.self();
  }

  height(height: number): ShapeBuilder {
    this._height = height;
    return this.self();
  }

  shapeType(shapeType: ShapeType): ShapeBuilder {
    this._shapeType = shapeType;
    return this.self();
  }

  style(style: ShapeStyle): ShapeBuilder {
    this._style = style;
    return this.self();
  }

  fillColor(fillColor: string): ShapeBuilder {
    this._style.fillColor = fillColor;
    return this.self();
  }

  fillOpacity(fillOpacity: number): ShapeBuilder {
    this._style.fillOpacity = fillOpacity;
    return this.self();
  }

  strokeColor(strokeColor: string): ShapeBuilder {
    this._style.strokeColor = strokeColor;
    return this.self();
  }

  strokeOpacity(strokeOpacity: number): ShapeBuilder {
    this._style.strokeOpacity = strokeOpacity;
    return this.self();
  }

  strokeWidth(strokeWidth: number): ShapeBuilder {
    this._style.strokeWidth = strokeWidth;
    return this.self();
  }

  strokeDash(strokeDash: number[]): ShapeBuilder {
    this._style.strokeDash = strokeDash;
    return this.self();
  }

  build(): Shape {
    return {
      ...this._item,
      type: "SHAPE",
      width: this._width,
      height: this._height,
      shapeType: this._shapeType,
      style: this._style,
    };
  }
}
