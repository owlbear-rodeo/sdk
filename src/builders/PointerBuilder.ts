import { Pointer } from "../types/items/Pointer";
import { GenericItemBuilder } from "./GenericItemBuilder";

export class PointerBuilder extends GenericItemBuilder<PointerBuilder> {
  private _color: string;
  private _radius: number;

  constructor() {
    super();
    this._color = "black";
    this._radius = 20;
    this._item.layer = "POINTER";
    this._item.name = "Pointer";
  }

  color(color: string): PointerBuilder {
    this._color = color;
    return this.self();
  }

  radius(radius: number): PointerBuilder {
    this._radius = radius;
    return this.self();
  }

  build(): Pointer {
    return {
      ...this._item,
      type: "POINTER",
      color: this._color,
      radius: this._radius,
    };
  }
}
