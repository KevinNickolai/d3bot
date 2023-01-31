import * as Discord from "discord.js";
import { ValidateRSN } from "../classes/TempleOSRS";

module.exports = {
    name: "name",
    aliases: ["rsn", "user"],
    description: "Change your Discord nickname to your Runescape Name (RSN)",
    usage: `<Runescape Name>`,
    args: true,
    execute(message: Discord.Message, args: string[]) {

        let playerName = args.shift()??message.author.username;

        while(args.length !== 0){
            playerName += " " + args.shift();
        }

        if(message.inGuild() && ValidateRSN(playerName)){
            if(message.member?.moderatable) message.member?.setNickname(playerName, "User Requested RSN Name Change");
            else message.reply("Unmoderatable user requested name change.");
        }
        else{
            message.reply("Invalid RSN provided.");
        }

    }
};
