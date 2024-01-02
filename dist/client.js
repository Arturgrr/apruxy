"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client.ts
var client_exports = {};
__export(client_exports, {
  ApruxyClient: () => ApruxyClient
});
module.exports = __toCommonJS(client_exports);
var import_discord = require("discord.js");
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  // log: env.NODE_ENV === 'dev' ? ['query'] : [],
});

// src/env/index.ts
var import_zod = require("zod");
var import_config = require("dotenv/config");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["dev", "test", "prod"]).default("dev"),
  BOT_TOKEN: import_zod.z.string(),
  DATABASE_URL: import_zod.z.string(),
  CLIENT_ID: import_zod.z.string(),
  GUILD_ID: import_zod.z.string(),
  OWNER_ID: import_zod.z.string()
});
var _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.log(process.env.NODE_ENV);
  console.error("\u274C Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables");
}
var env = _env.data;

// src/client.ts
var ApruxyClient = class extends import_discord.Client {
  constructor() {
    super({
      intents: [
        import_discord.GatewayIntentBits.Guilds,
        import_discord.GatewayIntentBits.GuildMessages,
        import_discord.GatewayIntentBits.MessageContent,
        import_discord.GatewayIntentBits.GuildMembers
      ],
      partials: [
        import_discord.Partials.Channel,
        import_discord.Partials.GuildMember,
        import_discord.Partials.GuildScheduledEvent,
        import_discord.Partials.Message,
        import_discord.Partials.Reaction,
        import_discord.Partials.ThreadMember,
        import_discord.Partials.User
      ]
    });
    this.commands = new import_discord.Collection();
    this.db = prisma;
    this.registerCommands();
    this.registerEvents();
  }
  async registerEvents() {
    const eventsPath = import_path.default.join(__dirname, "events");
    const eventFiles = import_fs.default.readdirSync(eventsPath).filter((file) => file.endsWith(".ts"));
    for (const file of eventFiles) {
      const filePath = import_path.default.join(eventsPath, file);
      const { default: EventClass } = await import(filePath);
      const event = new EventClass(this);
      if (event.constructor.once) {
        this.once(
          event.constructor.eventName,
          (...args) => event.execute(...args)
        );
      } else {
        this.on(
          event.constructor.eventName,
          (...args) => event.execute(...args)
        );
      }
    }
  }
  async registerCommands() {
    const foldersPath = import_path.default.join(__dirname, "commands");
    const commandFolders = import_fs.default.readdirSync(foldersPath);
    const commandsList = [];
    for (const folder of commandFolders) {
      const commandPath = import_path.default.join(foldersPath, folder);
      const commandFiles = import_fs.default.readdirSync(commandPath).filter((file) => file.endsWith(".ts"));
      for (const file of commandFiles) {
        const filePath = import_path.default.join(commandPath, file);
        const { default: CommandClass } = await import(filePath);
        this.commands.set(CommandClass.data.name, new CommandClass(this));
        commandsList.push(CommandClass.data);
      }
    }
    const rest = new import_discord.REST({ version: "10" }).setToken(env.BOT_TOKEN);
    try {
      console.log(
        `\u{1F914} Started refreshing ${commandsList.length} application (/) commands.`
      );
      if (env.NODE_ENV === "dev") {
        await rest.put(
          import_discord.Routes.applicationGuildCommands(env.CLIENT_ID, env.GUILD_ID),
          {
            body: commandsList
          }
        );
      } else {
        await rest.put(import_discord.Routes.applicationCommands(env.CLIENT_ID), {
          body: commandsList
        });
      }
      console.log(
        `\u2705 Successfully reloaded ${commandsList.length} application (/) commands.`
      );
    } catch (error) {
      console.error(error);
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ApruxyClient
});
