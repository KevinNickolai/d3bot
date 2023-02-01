import * as Discord from "discord.js";
import TempleOSRS, { TemplePlayerEndpointEnum } from "../classes/TempleOSRS";
import { IRawData } from "../classes/IRawData";
import { SKILL_NAMES } from "../config";



module.exports = {
    name: 'skill',
    aliases: ['s'],
    description: "See a player's skill status",
    usage: `<skill name> <player name>`,
    args: true,
    execute(message: Discord.Message, args: string[]){

        let tOsrs = new TempleOSRS();

        let typedSkill = args.shift();

        let skillName = typedSkill!?.charAt(0).toUpperCase() + typedSkill!?.slice(1).toLowerCase();

        let indexOf = SKILL_NAMES.indexOf(skillName!);

        if(indexOf !== -1){
            let playerName = args.shift()??message.author.username;

            while(args.length !== 0){
                playerName += " " + args.shift();
            }

            tOsrs.QueryPlayerRSN(playerName!, TemplePlayerEndpointEnum.PlayerStats)
            .then((resultingJSON) => {
                let pstats = (resultingJSON as IRawData);
                
                type ObjectKey = keyof typeof pstats.data;

                const skill = (SKILL_NAMES[indexOf]) as ObjectKey;
                const skillRank = (SKILL_NAMES[indexOf] + "_rank") as ObjectKey;
                const skillLevel = (SKILL_NAMES[indexOf] + "_level") as ObjectKey;
                const skillEhp = (SKILL_NAMES[indexOf] + "_ehp") as ObjectKey;

                console.log(pstats.data)

                message.reply(`${playerName} | ${skill}:
                Experience: ${pstats.data[skill]}
                Rank: ${pstats.data[skillRank]}
                Level: ${pstats.data[skillLevel]}
                EHP: ${pstats.data[skillEhp]}`);
            })
            .catch((error) => {
                console.log(error);
            });
        }
        else{
            message.reply(`Unknown skill ${skillName}.`);
        }


    }
}