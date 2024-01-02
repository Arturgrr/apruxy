// src/langs/en-US.json
var botClient = {
  invalidInteraction: "\u274C Invalid interaction!",
  errorInCommand: "\u274C An error occurred while executing the command!"
};
var bot = {
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
};
var user = {
  info: {
    name: "\u{1F464} Name:",
    id: "\u{1FAAA} Discord id:",
    created: "\u{1F4C6} Created at:",
    joined: "\u{1F4C6} Joined at:"
  }
};
var corals = "\u{1F41A} ``{{person}}`` has **{{quantity}}** corals!";
var en_US_default = {
  botClient,
  bot,
  user,
  corals
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  bot,
  botClient,
  corals,
  user
});
