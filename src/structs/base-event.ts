import { ApruxyClient } from '@/client'
import { ClientEvents, Events } from 'discord.js'

export default abstract class BaseEvent {
  public static eventName: Events
  public static once: boolean
  protected readonly client: ApruxyClient
  protected constructor(client: ApruxyClient) {
    this.client = client
  }

  abstract execute(
    ...args: ClientEvents[keyof ClientEvents]
  ): void | Promise<void>
}
