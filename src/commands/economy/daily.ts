import { translator } from '@/langs'
import BaseCommand from '@/structs/base-command'
import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js'

export default class DailyCommand extends BaseCommand {
  public static data: SlashCommandBuilder = <SlashCommandBuilder>(
    new SlashCommandBuilder()
      .setName('daily')
      .setNameLocalizations({
        'pt-BR': 'diário',
      })
      .setDescription('Receive a daily amount of conch')
      .setDescriptionLocalizations({
        'pt-BR': 'Receba uma quantia diária de conchas',
      })
  )

  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const txt = translator.getFixedT(interaction.locale)

    await this.client.db.user
      .findUnique({
        where: { id: parseInt(interaction.user.id) },
      })
      .then(async (user) => {
        if (!user) {
          return interaction.reply({
            content: txt('botClient.errorInCommand'),
            ephemeral: true,
          })
        }

        if (
          user.lastDaily &&
          user.lastDaily.getTime() > Date.now() - 86400000
        ) {
          const time = `<t:${Math.floor(
            user.lastDaily.getTime() / 1000 + 86400,
          )}:R>`
          return interaction.reply({
            content: txt('daily.fail') + time,
          })
        }
        const value = Math.floor(Math.random() * (3000 - 1499 + 1)) + 1499

        await this.client.db.user.update({
          where: { id: parseInt(interaction.user.id) },
          data: {
            money: user.money + value,
            lastDaily: new Date(),
          },
        })

        interaction.reply({
          content: txt('daily.success', {
            quantity: value,
          }),
        })
      })
  }
}
