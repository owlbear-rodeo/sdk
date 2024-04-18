import MessageBus from "../messages/MessageBus";

class BroadcastApi {
  private messageBus: MessageBus;

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
  }

  async sendMessage(
    channel: string,
    data: unknown,
    options?: { destination: "REMOTE" | "LOCAL" | "ALL" },
  ): Promise<void> {
    await this.messageBus.sendAsync("OBR_BROADCAST_SEND_MESSAGE", {
      channel,
      data,
      options,
    });
  }

  onMessage(
    channel: string,
    callback: (event: { data: unknown; connectionId: string }) => void,
  ) {
    this.messageBus.send("OBR_BROADCAST_SUBSCRIBE", { channel });
    this.messageBus.on(`OBR_BROADCAST_MESSAGE_${channel}`, callback);
    return () => {
      this.messageBus.send("OBR_BROADCAST_UNSUBSCRIBE", { channel });
      this.messageBus.off(`OBR_BROADCAST_MESSAGE_${channel}`, callback);
    };
  }
}

export default BroadcastApi;
