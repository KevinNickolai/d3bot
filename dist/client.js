"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = __importStar(require("discord.js"));
const fs_1 = __importDefault(require("fs"));
const CommandClient_1 = __importDefault(require("./classes/CommandClient"));
const util_1 = require("util");
const readdirAsync = (0, util_1.promisify)(fs_1.default.readdir);
const client = new CommandClient_1.default({ intents: [Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGES],
    partials: ["CHANNEL"] /// Required for DMs
});
/*
* Read in commands into the CommandClient
*/
readdirAsync('./dist/commands')
    .then((files) => {
    const commandFiles = files.filter(file => file.endsWith('.js'));
    commandFiles.forEach(file => {
        const command = require(`../dist/commands/${file}`);
        client.commands.set(command.name, command);
    });
})
    .catch((error) => {
    console.log(error);
});
/*
* Read in events to process in Discord
*/
readdirAsync('./dist/events')
    .then((files) => {
    const eventFiles = files.filter(file => file.endsWith('.js'));
    eventFiles.forEach(file => {
        const eventHandler = require(`../dist/events/${file}`);
        const eventName = file.split(".")[0];
        if (eventName === "ready") {
            client.once(eventName, (...args) => eventHandler(client, ...args));
        }
        else {
            client.on(eventName, (...args) => eventHandler(client, ...args));
        }
    });
})
    .catch((error) => {
    console.log(error);
});
exports.default = client;
