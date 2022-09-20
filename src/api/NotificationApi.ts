import MessageBus from "../messages/MessageBus";

class NotificationApi {
  private messageBus: MessageBus;

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
  }

  async show(
    message: string,
    variant?: "DEFAULT" | "ERROR" | "INFO" | "SUCCESS" | "WARNING",
  ): Promise<string> {
    const { id } = await this.messageBus.sendAsync<{ id: string }>(
      "OBR_NOTIFICATION_SHOW",
      { message, variant },
    );
    return id;
  }

  async close(id: string): Promise<void> {
    await this.messageBus.sendAsync("OBR_NOTIFICATION_CLOSE", { id });
  }
}

export default NotificationApi;
