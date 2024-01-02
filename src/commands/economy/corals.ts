import { translator } from '@/langs'
import BaseCommand from '@/structs/base-command'
import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandUserOption,
  User,
} from 'discord.js'

export default class ConchsCommand extends BaseCommand {
  public static data: SlashCommandBuilder = <SlashCommandBuilder>(
    new SlashCommandBuilder()
      .setName('conchs')
      .setNameLocalizations({
        'pt-BR': 'conchas',
      })
      .setDescription('See how many conchs you or others have')
      .setDescriptionLocalizations({
        'pt-BR': 'Veja quantos conchas você, ou outras pessoas tem',
      })
      .addUserOption(
        new SlashCommandUserOption()
          .setName('user')
          .setNameLocalizations({
            'pt-BR': 'usuário',
          })
          .setDescription('The user to see how many conchs they have')
          .setDescriptionLocalizations({
            'pt-BR': 'O usuário para ver quantos conchas ele tem',
          })
          .setRequired(false),
      )
  )

  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const txt = translator.getFixedT(interaction.locale)
    const userOpt: User =
      interaction.options.getUser('user') || interaction.user

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

        interaction.reply({
          content: txt('conchs', {
            person: userOpt.username,
            quantity: user.money,
          }),
        })
      })
  }
}
