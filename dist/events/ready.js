"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/events/ready.ts
var ready_exports = {};
__export(ready_exports, {
  default: () => ReadyEvent
});
module.exports = __toCommonJS(ready_exports);

// src/structs/base-event.ts
var BaseEvent = class {
  constructor(client) {
    this.client = client;
  }
};

// src/events/ready.ts
var import_discord = require("discord.js");
var ReadyEvent = class extends BaseEvent {
  execute() {
    console.log(`\u{1F916} Bot is ready as ${this.client.user?.tag}`);
  }
};
ReadyEvent.eventName = import_discord.Events.ClientReady;
ReadyEvent.once = true;
