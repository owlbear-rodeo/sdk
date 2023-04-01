import MessageBus from "../messages/MessageBus";
import { BoundingBox } from "../types";
import { Vector2 } from "../types/Vector2";
import { ViewportTransform } from "../types/ViewportTransform";

class ViewportApi {
  private messageBus: MessageBus;

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
  }

  async reset(): Promise<ViewportTransform> {
    const { transform } = await this.messageBus.sendAsync<{
      transform: ViewportTransform;
    }>("OBR_VIEWPORT_RESET", {});
    return transform;
  }

  async animateTo(transform: ViewportTransform): Promise<void> {
    await this.messageBus.sendAsync("OBR_VIEWPORT_ANIMATE_TO", { transform });
  }

  async animateToBounds(bounds: BoundingBox): Promise<void> {
    await this.messageBus.sendAsync("OBR_VIEWPORT_ANIMATE_TO_BOUNDS", {
      bounds,
    });
  }

  async getPosition(): Promise<Vector2> {
    const { position } = await this.messageBus.sendAsync<{ position: Vector2 }>(
      "OBR_VIEWPORT_GET_POSITION",
      {},
    );
    return position;
  }

  async setPosition(position: Vector2): Promise<void> {
    await this.messageBus.sendAsync("OBR_VIEWPORT_SET_POSITION", { position });
  }

  async getScale(): Promise<number> {
    const { scale } = await this.messageBus.sendAsync<{ scale: number }>(
      "OBR_VIEWPORT_GET_SCALE",
      {},
    );
    return scale;
  }

  async setScale(scale: number): Promise<void> {
    await this.messageBus.sendAsync("OBR_VIEWPORT_SET_SCALE", { scale });
  }

  async getWidth(): Promise<number> {
    const { width } = await this.messageBus.sendAsync<{ width: number }>(
      "OBR_VIEWPORT_GET_WIDTH",
      {},
    );
    return width;
  }

  async getHeight(): Promise<number> {
    const { height } = await this.messageBus.sendAsync<{ height: number }>(
      "OBR_VIEWPORT_GET_HEIGHT",
      {},
    );
    return height;
  }

  async transformPoint(point: Vector2): Promise<Vector2> {
    const { point: transformed } = await this.messageBus.sendAsync<{
      point: Vector2;
    }>("OBR_VIEWPORT_TRANSFORM_POINT", { point });
    return transformed;
  }

  async inverseTransformPoint(point: Vector2): Promise<Vector2> {
    const { point: transformed } = await this.messageBus.sendAsync<{
      point: Vector2;
    }>("OBR_VIEWPORT_INVERSE_TRANSFORM_POINT", { point });
    return transformed;
  }
}

export default ViewportApi;
