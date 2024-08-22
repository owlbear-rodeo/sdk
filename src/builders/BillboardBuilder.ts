import PlayerApi from "../api/PlayerApi";
import { Billboard, BillboardStyle, ImageContent, ImageGrid } from "../types";
import { GenericItemBuilder } from "./GenericItemBuilder";

export class BillboardBuilder extends GenericItemBuilder<BillboardBuilder> {
  private _image: ImageContent;
  private _grid: ImageGrid;
  private _style: BillboardStyle;

  constructor(player: PlayerApi, image: ImageContent, grid: ImageGrid) {
    super(player);
    this._image = image;
    this._grid = grid;
    this._item.name = "Billboard";
    this._style = {};
  }

  maxViewScale(maxViewScale: number): BillboardBuilder {
    this._style.maxViewScale = maxViewScale;
    return this.self();
  }

  minViewScale(minViewScale: number): BillboardBuilder {
    this._style.minViewScale = minViewScale;
    return this.self();
  }

  build(): Billboard {
    return {
      ...this._item,
      type: "BILLBOARD",
      image: this._image,
      grid: this._grid,
      style: this._style,
    };
  }
}
