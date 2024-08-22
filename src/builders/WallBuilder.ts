import PlayerApi from "../api/PlayerApi";
import { Vector2 } from "../types/Vector2";
import { Wall } from "../types/items/Wall";
import { GenericItemBuilder } from "./GenericItemBuilder";

export class WallBuilder extends GenericItemBuilder<WallBuilder> {
  private _points: Vector2[];
  private _doubleSided: boolean;
  private _blocking: boolean;

  constructor(player: PlayerApi) {
    super(player);
    this._points = [];
    this._doubleSided = true;
    this._blocking = true;
    this._item.name = "Wall";
    this._item.layer = "FOG";
    this._item.zIndex = 0;
  }

  points(points: Vector2[]): WallBuilder {
    this._points = points;
    return this.self();
  }

  doubleSided(doubleSided: boolean): WallBuilder {
    this._doubleSided = doubleSided;
    return this.self();
  }

  blocking(blocking: boolean): WallBuilder {
    this._blocking = blocking;
    return this.self();
  }

  build(): Wall {
    return {
      ...this._item,
      type: "WALL",
      points: this._points,
      doubleSided: this._doubleSided,
      blocking: this._blocking,
    };
  }
}
