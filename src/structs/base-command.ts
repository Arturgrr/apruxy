import { ApruxyClient } from '@/client'
import {
  ChatInputCommandInteraction,
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
    interaction: CommandInteraction | ChatInputCommandInteraction,
  ): Promise<void | InteractionResponse<true | false>>
}
