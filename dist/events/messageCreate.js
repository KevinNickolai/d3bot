"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (client, message) => {
    const { prefix } = require("../config.js");
    if (!message.content.startsWith(prefix) || message.author.bot)
        return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || Array.from(client.commands.values()).find((cmd) => cmd.aliases.includes(commandName));
    if (!command) {
        return message.reply(`Command ${commandName} does not exist.`);
    }
    if (command.args && !args.length) {
        return message.reply(`You must provide arguments for the ${commandName} command.`);
    }
    try {
        command.execute(message, args);
    }
    catch (error) {
        console.error(`Error processing command ${commandName}`);
        return message.reply(`Error processing command ${commandName}`);
    }
};
