import { translator } from '@/langs'
import BaseCommand from '@/structs/base-command'
import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandNumberOption,
  SlashCommandUserOption,
  User,
} from 'discord.js'

export default class PayCommand extends BaseCommand {
  public static data: SlashCommandBuilder = <SlashCommandBuilder>(
    new SlashCommandBuilder()
      .setName('pay')
      .setNameLocalizations({
        'pt-BR': 'pagar',
      })
      .setDescription('Send conchs to someone')
      .setDescriptionLocalizations({
        'pt-BR': 'Envie conchas para alguém',
      })
      .addUserOption(
        new SlashCommandUserOption()
          .setName('user')
          .setNameLocalizations({
            'pt-BR': 'usuário',
          })
          .setDescription('The user to send conchs')
          .setDescriptionLocalizations({
            'pt-BR': 'O usuário para enviar conchas',
          })
          .setRequired(true),
      )
      .addNumberOption(
        new SlashCommandNumberOption()
          .setName('amount')
          .setNameLocalizations({
            'pt-BR': 'quantidade',
          })
          .setDescription('The amount of conchs to send')
          .setDescriptionLocalizations({
            'pt-BR': 'A quantidade de conchas para enviar',
          })
          .setRequired(true),
      )
  )

  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const txt = translator.getFixedT(interaction.locale)
    const userOpt: User | null = interaction.options.getUser('user')
    const amount: number | null = interaction.options.getNumber('amount')

    if (!userOpt || !amount) {
      return interaction.reply({
        content: txt('botClient.errorInCommand'),
        ephemeral: true,
      })
    }

    await this.client.db.user
      .findUnique({
        where: { id: parseInt(interaction.user.id) },
      })
      .then(async (user) => {
        if (!user) {
          user = await this.client.db.user.create({
            data: {
              id: parseInt(interaction.user.id),
            },
          })
        }

        if (user.money < amount) {
          return interaction.reply({
            content: txt('pay.notEnoughConchs'),
            ephemeral: true,
          })
        }

        await this.client.db.user.update({
          where: { id: parseInt(interaction.user.id) },
          data: {
            money: user.money - amount,
          },
        })
      })

    await this.client.db.user
      .findUnique({
        where: { id: parseInt(userOpt.id) },
      })
      .then(async (user) => {
        if (!user) {
          user = await this.client.db.user.create({
            data: {
              id: parseInt(userOpt.id),
            },
          })
        }

        await this.client.db.user.update({
          where: { id: parseInt(userOpt.id) },
          data: {
            money: user.money + amount,
          },
        })
      })

    interaction.reply({
      content: txt('pay.success', {
        sender: interaction.user.username,
        amount,
        receiver: userOpt.username,
      }),
    })
  }
}
