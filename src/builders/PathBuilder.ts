import PlayerApi from "../api/PlayerApi";
import { Path, PathCommand, PathStyle } from "../types/items/Path";
import { Vector2 } from "../types/Vector2";
import { GenericItemBuilder } from "./GenericItemBuilder";

export class PathBuilder extends GenericItemBuilder<PathBuilder> {
  private _commands: PathCommand[];
  private _fillRule: string;
  private _style: PathStyle;

  constructor(player: PlayerApi) {
    super(player);
    this._commands = [];
    this._fillRule = "nonzero";
    this._style = {
      fillColor: "black",
      fillOpacity: 1,
      strokeColor: "white",
      strokeOpacity: 1,
      strokeWidth: 5,
      strokeDash: [],
    };
    this._item.name = "Path";
    this._item.layer = "DRAWING";
  }

  commands(commands: PathCommand[]): PathBuilder {
    this._commands = commands;
    return this.self();
  }

  fillRule(fillRule: string): PathBuilder {
    this._fillRule = fillRule;
    return this.self();
  }

  style(style: PathStyle): PathBuilder {
    this._style = style;
    return this.self();
  }

  fillColor(fillColor: string): PathBuilder {
    this._style.fillColor = fillColor;
    return this.self();
  }

  fillOpacity(fillOpacity: number): PathBuilder {
    this._style.fillOpacity = fillOpacity;
    return this.self();
  }

  strokeColor(strokeColor: string): PathBuilder {
    this._style.strokeColor = strokeColor;
    return this.self();
  }

  strokeOpacity(strokeOpacity: number): PathBuilder {
    this._style.strokeOpacity = strokeOpacity;
    return this.self();
  }

  strokeWidth(strokeWidth: number): PathBuilder {
    this._style.strokeWidth = strokeWidth;
    return this.self();
  }

  strokeDash(strokeDash: number[]): PathBuilder {
    this._style.strokeDash = strokeDash;
    return this.self();
  }

  build(): Path {
    return {
      ...this._item,
      type: "PATH",
      commands: this._commands,
      fillRule: this._fillRule,
      style: this._style,
    };
  }
}
