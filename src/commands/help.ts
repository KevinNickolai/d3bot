import * as Discord from "discord.js";
import CommandClient from "../classes/CommandClient";
import TempleOSRS, { TempleEndpointEnum } from "../classes/TempleOSRS";
import https from 'https';
import { IRawData } from "../classes/IRawData";
import { prefix } from "../config";
import { InteractionResponseType } from "discord-api-types";

module.exports = {
    name: 'help',
    aliases: ['commands', 'cmd', 'cmds', '?'],
    description: "Help command",
    args: false,
    execute(message: Discord.Message, args: string[]){

        let data : string[] = [];

        const commands = (message.client as CommandClient).commands;

        if(!args.length){
            data.push("List of commands: ");
            let cmds = [];

            for(var [key, val] of commands){
                cmds.push(val.name);
            }

            data.push(cmds.join(", "));

            data.push(`\nUse \'${prefix}help <command name>\' for help on specific commands.`);

            return message.reply({ content: data.join('\n') });
        }
        else{
            const name: string = args[0].toLowerCase();

            const command = commands.get(name);

            if(!command) {
                return message.reply(`'${name} is not a valid command.`);
            }

            data.push(`**Name:** ${command.name}`);

            if(command.aliases) data.push(`*Aliases:* ${command.aliases.join(', ')}`);
			if(command.description) data.push(`*Description:* ${command.description}`);
			if(command.usage) data.push(`*Usage:* ${prefix}${command.name} ${command.usage}`);
        
            return message.reply({ content: data.join('\n')});
        }
    }
}