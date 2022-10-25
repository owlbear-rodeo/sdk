import { Draft } from "immer";
import { Item } from "./items/Item";
import { Vector2 } from "./Vector2";

export type ItemInteraction = Item[];

export interface ViewportInteraction {
  topLeft: Vector2;
  bottomRight: Vector2;
  scale: number;
}

export type StopInteraction = () => void;
export type UpdateInteraction<State> = (draft: Draft<State>) => void;
export type DispatchInteractionUpdate<State> = (
  update: UpdateInteraction<State>,
) => State;

export type InteractionManager<State> = [
  DispatchInteractionUpdate<State>,
  StopInteraction,
];

export type ItemInteractionManager = InteractionManager<ItemInteraction>;

export type ViewportInteractionManager =
  InteractionManager<ViewportInteraction>;
