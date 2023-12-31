import BaseCommand from '@/structs/base-command'
import { CacheType, CommandInteraction, SlashCommandBuilder } from 'discord.js'

export default class PingCommand extends BaseCommand {
  public static data: SlashCommandBuilder = <SlashCommandBuilder>(
    new SlashCommandBuilder().setName('ping').setDescription('Ping!')
  )

  async execute(interaction: CommandInteraction<CacheType>) {
    await interaction.reply('Pong!')
  }
}
