import { Draft } from "immer";
import { Item } from "./items/Item";

export type ItemInteraction = Item[];

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
