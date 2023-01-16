"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
module.exports = {
    name: 'help',
    aliases: ['commands', 'cmd', 'cmds', '?'],
    description: "Help command",
    args: false,
    execute(message, args) {
        let data = [];
        const commands = message.client.commands;
        if (!args.length) {
            data.push("List of commands: ");
            let cmds = [];
            for (var [key, val] of commands) {
                cmds.push(val.name);
            }
            data.push(cmds.join(", "));
            data.push(`\nUse \'${config_1.prefix}help <command name>\' for help on specific commands.`);
            return message.reply({ content: data.join('\n') });
        }
        else {
            const name = args[0].toLowerCase();
            const command = commands.get(name) || Array.from(commands.values()).find((cmd) => cmd.aliases.includes(name));
            if (!command) {
                return message.reply(`'${name}' is not a valid command.`);
            }
            data.push(`**Name:** ${command.name}`);
            if (command.aliases)
                data.push(`*Aliases:* ${command.aliases.join(', ')}`);
            if (command.description)
                data.push(`*Description:* ${command.description}`);
            if (command.usage)
                data.push(`*Usage:* ${config_1.prefix}${command.name} ${command.usage}`);
            return message.reply({ content: data.join('\n') });
        }
    }
};
