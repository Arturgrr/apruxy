import {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
  REST,
  Routes,
} from 'discord.js'
import fs from 'fs'
import path from 'path'
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
    this.registerEvents()
  }

  async registerEvents() {
    const eventsPath = path.join(__dirname, 'events')
    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter((file) => file.endsWith('.ts' || '.js'))

    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file)
      const { default: EventClass } = await import(filePath)
      const event = new EventClass(this)
      if (event.constructor.once) {
        this.once(event.constructor.eventName, (...args) =>
          event.execute(...args),
        )
      } else {
        this.on(event.constructor.eventName, (...args) =>
          event.execute(...args),
        )
      }
    }
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
        commandsList.push(CommandClass.data)
      }
    }

    const rest = new REST({ version: '10' }).setToken(env.BOT_TOKEN)

    try {
      console.log(
        `🤔 Started refreshing ${commandsList.length} application (/) commands.`,
      )

      if (env.NODE_ENV !== 'dev') {
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
