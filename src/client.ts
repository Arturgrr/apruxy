import {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  Interaction,
  Partials,
  REST,
  Routes,
} from 'discord.js'
import fs from 'fs'
import path from 'path'
import BaseCommand from './structs/base-command'
import { PrismaClient } from '@prisma/client'
import { prisma } from './lib/prisma'
import { env } from './env'

export class ApruxyClient extends Client {
  public commands = new Collection()
  public readonly db: PrismaClient = prisma
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
      ],
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User,
      ],
    })

    this.registerCommands()

    this.on(Events.InteractionCreate, async (interaction: Interaction) => {
      if (!interaction.isCommand()) return

      const command = this.commands.get(interaction.commandName)

      if (!command) return

      try {
        this.db.user
          .findUnique({ where: { id: parseInt(interaction.user.id) } })
          .then(async (user) => {
            if (user) {
              await this.db.user.update({
                where: { id: parseInt(interaction.user.id) },
                data: {
                  commandsCounter: user.commandsCounter + 1,
                },
              })
            } else {
              console.log('Creating new user')
              await this.db.user.create({
                data: {
                  id: parseInt(interaction.user.id),
                  commandsCounter: 1,
                },
              })
              console.log('Created new user')
            }
          })

        await (command as BaseCommand).execute(interaction)
      } catch (e) {
        console.error(e)
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            content: 'There was an error while executing this command!',
            ephemeral: true,
          })
        } else {
          await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true,
          })
        }
      }
    })

    this.once('ready', () => {
      console.log(`🤖 Bot is ready as ${this.user?.tag}`)
    })
  }

  async registerCommands() {
    const foldersPath = path.join(__dirname, 'commands')
    const commandFolders = fs.readdirSync(foldersPath)
    const commandsList = []

    for (const folder of commandFolders) {
      const commandPath = path.join(foldersPath, folder)
      const commandFiles = fs
        .readdirSync(commandPath)
        .filter((file) => file.endsWith('.ts' || '.js'))
      for (const file of commandFiles) {
        const filePath = path.join(commandPath, file)
        const { default: CommandClass } = await import(filePath)
        this.commands.set(CommandClass.data.name, new CommandClass(this))
        commandsList.push(CommandClass.data.toJSON())
      }
    }

    const rest = new REST({ version: '10' }).setToken(env.BOT_TOKEN)

    try {
      console.log(
        `🤔 Started refreshing ${commandsList.length} application (/) commands.`,
      )

      if (env.NODE_ENV === 'dev') {
        await rest.put(
          Routes.applicationGuildCommands(env.CLIENT_ID, env.GUILD_ID),
          {
            body: commandsList,
          },
        )
      } else {
        await rest.put(Routes.applicationCommands(env.CLIENT_ID), {
          body: commandsList,
        })
      }

      console.log(
        `✅ Successfully reloaded ${commandsList.length} application (/) commands.`,
      )
    } catch (error) {
      console.error(error)
    }
  }
}
