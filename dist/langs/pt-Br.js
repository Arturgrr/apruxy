// src/langs/pt-Br.json
var botClient = {
  invalidInteraction: "\u274C Intera\xE7\xE3o inv\xE1lida!",
  errorInCommand: "\u274C Ocorreu um erro durante a execu\xE7\xE3o deste comando!"
};
var bot = {
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
};
var corals = "\u{1F41A} ``{{person}}`` tem **{{quantity}}** corais!";
var pt_Br_default = {
  botClient,
  bot,
  corals
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  bot,
  botClient,
  corals
});
