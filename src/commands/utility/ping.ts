import BaseCommand from '@/structs/base-command'
import { CacheType, CommandInteraction, SlashCommandBuilder } from 'discord.js'

export default class PingCommand extends BaseCommand {
  public static data: SlashCommandBuilder = <SlashCommandBuilder>(
    new SlashCommandBuilder().setName('ping').setDescription('Pong!')
  )

  async execute(interaction: CommandInteraction<CacheType>) {
    const text = `🏓 Pong!\n` + '``' + `${this.client.ws.ping}` + '`` ms'
    await interaction.reply({
      content: text,
      ephemeral: true,
    })
  }
}
