import BaseEvent from '@/structs/base-event'
import { Events } from 'discord.js'

export default class ReadyEvent extends BaseEvent {
  public static eventName = Events.ClientReady
  public static once = true

  public execute() {
    console.log(`🤖 Bot is ready as ${this.client.user?.tag}`)
  }
}
