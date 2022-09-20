import { Item } from "./items/Item";

type ItemFilterArray = string[];
type ItemTypeFilterFunction<ItemType extends Item> = (
  item: Item,
) => item is ItemType;
type ItemFilterFunction = (item: Item) => boolean;

export type ItemFilter<ItemType extends Item> =
  | ItemFilterArray
  | ItemTypeFilterFunction<ItemType>
  | ItemFilterFunction;
