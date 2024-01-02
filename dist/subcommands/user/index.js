"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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

// src/langs/en-US.json
var require_en_US = __commonJS({
  "src/langs/en-US.json"(exports2, module2) {
    module2.exports = {
      botClient: {
        invalidInteraction: "\u274C Invalid interaction!",
        errorInCommand: "\u274C An error occurred while executing the command!"
      },
      bot: {
        info: {
          title: "Hello, I'm Apruxy \u{1F44B}",
          description: " > Hi, my name is Apruxy, I'm an Axolotl Robot and I'm surfing this digital ocean! \u{1F30A}\n\nI am currently present on ``{{serverNumber}}`` servers with ``{{commandsNumber}}`` commands \u{1F973}\n\nMy pure soul was coded in [Typescript](https://www.typescriptlang.org/) using [Discord.js](https://discord.js.org/) \u{1F527}\n\nToday I only know how to speak **Brazilian Portuguese** and **English**, who knows, maybe one day I will be able to learn new languages? \u{1F929}\n\n> Since <t:1703905200:D>, trying to transform the world! \n> I've been used ``{{usedTimes}}`` times \u2B50\uFE0F",
          footer: "Created by arturgrr",
          button: "Invite me!"
        },
        ping: {
          title: "\u{1F3D3} Pong!",
          description: " > My latency is ``{{botPing}}ms`` \u{1F4E1}\n> The Discord API latency is ``{{apiPing}}ms`` \u{1F4E1}"
        }
      },
      user: {
        info: {
          name: "\u{1F464} Name:",
          id: "\u{1FAAA} Discord id:",
          created: "\u{1F4C6} Created at:",
          joined: "\u{1F4C6} Joined at:"
        }
      },
      corals: "\u{1F41A} ``{{person}}`` has **{{quantity}}** corals!"
    };
  }
});

// src/langs/pt-Br.json
var require_pt_Br = __commonJS({
  "src/langs/pt-Br.json"(exports2, module2) {
    module2.exports = {
      botClient: {
        invalidInteraction: "\u274C Intera\xE7\xE3o inv\xE1lida!",
        errorInCommand: "\u274C Ocorreu um erro durante a execu\xE7\xE3o deste comando!"
      },
      bot: {
        info: {
          title: "Ol\xE1, sou a Apruxy \u{1F44B}",
          description: " > Ol\xE1, meu nome \xE9 Apruxy, sou um rob\xF4 Axolote e estou navegando neste oceano digital! \u{1F30A}\n\nAtualmente estou presente em ``{{serverNumber}}`` servidores com ``{{commandsNumber}}`` comandos \u{1F973}\n\nMinha alma pura foi programada com [Typescript](https://www.typescriptlang.org/) usando [Discord.js](https://discord.js.org/) \u{1F527}\n\nHoje s\xF3 sei falar o **Portugu\xEAs do Brasil** e **Ingl\xEAs**, quem sabe um dia conseguirei aprender novos idiomas? \u{1F929}\n\n> Desde <t:1703905200:D>, tentando transformar o mundo! \n> Eu fui usada ``{{usedTimes}}`` vezes \u2B50\uFE0F",
          footer: "Criada por arturgrr",
          button: "Me adicione!"
        },
        ping: {
          title: "\u{1F3D3} Pong!",
          description: " > Minha lat\xEAncia \xE9 de ``{{botPing}}ms`` \u{1F4E1}\n> Lat\xEAncia da Api ``{{apiPing}}ms`` \u{1F4E1}"
        },
        user: {
          info: {
            name: "\u{1F464} Nome:",
            id: "\u{1FAAA} Id do Discord:",
            created: "\u{1F4C6} Criado em:",
            joined: "\u{1F4C6} Entrou em:"
          }
        }
      },
      corals: "\u{1F41A} ``{{person}}`` tem **{{quantity}}** corais!"
    };
  }
});

// src/subcommands/user/index.ts
var user_exports = {};
__export(user_exports, {
  info: () => info
});
module.exports = __toCommonJS(user_exports);

// src/langs/index.ts
var import_i18next = __toESM(require("i18next"));
import_i18next.default.init({
  fallbackLng: "en-US",
  resources: {
    "en-US": {
      translation: require_en_US()
    },
    "pt-BR": {
      translation: require_pt_Br()
    }
  }
});
var translator = import_i18next.default;

// src/subcommands/user/info.ts
var import_discord = require("discord.js");
var info = async (interaction) => {
  const txt = translator.getFixedT(interaction.locale);
  const user = interaction.options.getUser("user") || interaction.user;
  const userEmbed = new import_discord.EmbedBuilder();
  userEmbed.setColor("#5964F1").setThumbnail(user.displayAvatarURL()).addFields(
    {
      name: txt("user.info.name"),
      value: "```" + user.username + "```",
      inline: true
    },
    {
      name: txt("user.info.id"),
      value: "```" + user.id + "```",
      inline: true
    },
    {
      name: txt("user.info.created"),
      value: `<t:${Math.floor(
        user.createdAt.getTime() / 1e3
      )}:D> (<t:${Math.floor(user.createdAt.getTime() / 1e3)}:R>)`,
      inline: false
    }
  );
  if (interaction.guild) {
    await interaction.guild.members.fetch(user.id)?.then((member) => {
      const joinedTimestamp = member.joinedAt?.getTime();
      if (joinedTimestamp) {
        userEmbed.addFields({
          name: txt("user.info.joined"),
          value: `<t:${Math.floor(joinedTimestamp / 1e3)}:D> (<t:${Math.floor(
            joinedTimestamp / 1e3
          )}:R>)`,
          inline: false
        });
      }
      if (member.nickname) {
        userEmbed.setTitle(member.nickname);
      }
    });
  } else {
    userEmbed.setTitle(user.displayName);
  }
  interaction.reply({ embeds: [userEmbed] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  info
});
