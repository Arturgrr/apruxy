import { ApruxyClient } from '@/client'
import {
  CommandInteraction,
  InteractionResponse,
  SlashCommandBuilder,
} from 'discord.js'

export default abstract class BaseCommand {
  public static data: SlashCommandBuilder
  protected client: ApruxyClient
  protected constructor(client: ApruxyClient) {
    this.client = client
  }

  abstract execute(
    interaction: CommandInteraction,
  ): Promise<void | InteractionResponse<true | false>>
}
