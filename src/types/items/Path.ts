import { Item } from "./Item.js";

export interface PathStyle {
  fillColor: string;
  fillOpacity: number;
  strokeColor: string;
  strokeOpacity: number;
  strokeWidth: number;
  strokeDash: number[];
}

export enum Command {
  MOVE,
  LINE,
  QUAD,
  CONIC,
  CUBIC,
  CLOSE,
}

export type MoveCommand = [Command.MOVE, number, number];

export type LineCommand = [Command.LINE, number, number];

export type QuadCommand = [Command.QUAD, number, number, number, number];

export type ConicCommand = [
  Command.CONIC,
  number,
  number,
  number,
  number,
  number,
];

export type CubicCommand = [
  Command.CUBIC,
  number,
  number,
  number,
  number,
  number,
  number,
];

export type CloseCommand = [Command.CLOSE];

export type PathCommand =
  | MoveCommand
  | LineCommand
  | QuadCommand
  | ConicCommand
  | CubicCommand
  | CloseCommand;

export interface Path extends Item {
  type: "PATH";
  commands: PathCommand[];
  style: PathStyle;
  fillRule: string;
}

export function isPath(item: Item): item is Path {
  return item.type === "PATH";
}
