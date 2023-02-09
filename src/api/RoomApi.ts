import MessageBus from "../messages/MessageBus";

class RoomApi {
  private messageBus: MessageBus;

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
  }

  get id() {
    return this.messageBus.roomId;
  }
}

export default RoomApi;
