import { enablePatches, produceWithPatches } from "immer";
import MessageBus from "../messages/MessageBus";
import { ObjectOrArray } from "../types";
import {
  DispatchInteractionUpdate,
  InteractionManager,
  ItemInteraction,
  ItemInteractionManager,
  StopInteraction,
} from "../types/Interaction";

enablePatches();

class InteractionApi {
  private messageBus: MessageBus;

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
  }

  async startItemInteraction(
    baseState: ItemInteraction,
  ): Promise<ItemInteractionManager> {
    const { id } = await this.messageBus.sendAsync<{ id: string }>(
      "OBR_INTERACTION_START_ITEM_INTERACTION",
      { baseState },
    );

    let prev = baseState;
    const dispatcher: DispatchInteractionUpdate<ItemInteraction> = (update) => {
      const [next, patches] = produceWithPatches(prev, update);
      prev = next;
      this.messageBus.send("OBR_INTERACTION_UPDATE_ITEM_INTERACTION", {
        id,
        patches,
      });
      return next;
    };

    const stop: StopInteraction = () => {
      this.messageBus.send("OBR_INTERACTION_STOP_ITEM_INTERACTION", { id });
    };

    return [dispatcher, stop, id];
  }

  async startCustomInteraction<T extends ObjectOrArray>(
    baseState: T,
  ): Promise<InteractionManager<T>> {
    const { id } = await this.messageBus.sendAsync<{ id: string }>(
      "OBR_INTERACTION_START_CUSTOM_INTERACTION",
      { baseState },
    );

    let prev = baseState;
    const dispatcher: DispatchInteractionUpdate<T> = (update) => {
      const [next, patches] = produceWithPatches(prev, update);
      prev = next;
      this.messageBus.send("OBR_INTERACTION_UPDATE_CUSTOM_INTERACTION", {
        id,
        patches,
      });
      return next;
    };

    const stop: StopInteraction = () => {
      this.messageBus.send("OBR_INTERACTION_STOP_CUSTOM_INTERACTION", { id });
    };

    return [dispatcher, stop, id];
  }

  onCustomInteraction<T extends ObjectOrArray>(
    id: string,
    callback: (state: T) => void,
  ) {
    const handleChange = (data: { state: T }) => {
      callback(data.state);
    };
    this.messageBus.send("OBR_INTERACTION_CUSTOM_SUBSCRIBE", { id });
    this.messageBus.on(`INTERACTION_${id}`, handleChange);
    return () => {
      this.messageBus.send("OBR_INTERACTION_CUSTOM_UNSUBSCRIBE", { id });
      this.messageBus.off(`INTERACTION_${id}`, handleChange);
    };
  }
}

export default InteractionApi;
