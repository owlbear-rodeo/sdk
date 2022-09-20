export interface Message {
  id: string;
  data: unknown;
}

export function isMessage(message: any): message is Message {
  return typeof message.id === "string";
}
