import * as Discord from "discord.js";
import CommandClient from "../classes/CommandClient";
import TempleOSRS, { TempleCompetitiveCommunityEndpointEnum, TemplePlayerEndpointEnum } from "../classes/TempleOSRS";
import https from 'https';
import { IBaseTopTimeframe } from "../classes/IRawData";
import { DISTRICT3_TEMPLE_GROUPID, prefix } from "../config";


module.exports = {
    name: 'd3top',
    aliases: ['d3t'],
    description: "See top District 3 players over the past Month, Week, or Day",
    usage: `${prefix}d3top <day | week | month>`,
    args: true,
    execute(message: Discord.Message, args: string[]){

        let tOsrs = new TempleOSRS();

        let timeframe = args.shift()?.toLowerCase();

        switch (timeframe){
            case "day":
            case "d":
                tOsrs.QueryCurrentTop(TempleCompetitiveCommunityEndpointEnum.CurrentTopDay, DISTRICT3_TEMPLE_GROUPID)
                    .then((resultingJSON) => {
                        let result = resultingJSON as IBaseTopTimeframe;
                        
                        let formattedResponse = "```"
                        for(var i = 1; typeof result.Day[i] !== 'undefined' && i <= 25; ++i){

                            formattedResponse += `${result.Day[i].rank.toString().padStart(2)} (${result.Day[i].xp.slice(0, 5)}): ${result.Day[i].nickname.padEnd(12)}\t`;

                            if(i % 5 === 0){
                                formattedResponse+="\n";
                            }

                        }

                        formattedResponse.trimEnd();

                        formattedResponse += "```";

                        message.reply(`Top D3 ${result.info.duration} ${result.info.skill}:\n` + formattedResponse);
                    });
                
                
                break;
            case "week":
            case "w":
                tOsrs.QueryCurrentTop(TempleCompetitiveCommunityEndpointEnum.CurrentTopWeek, DISTRICT3_TEMPLE_GROUPID)
                .then((resultingJSON) => {
                    let result = resultingJSON as IBaseTopTimeframe;
                    
                    let formattedResponse = "```"
                    for(var i = 1; typeof result.Week[i] !== 'undefined' && i <= 25; ++i){

                        formattedResponse += `${result.Week[i].rank.toString().padStart(2)} (${result.Week[i].xp.slice(0, 5)}): ${result.Week[i].nickname.padEnd(12)}\t`;

                        if(i % 5 === 0){
                            formattedResponse+="\n";
                        }

                    }

                    formattedResponse.trimEnd();

                    formattedResponse += "```";

                    message.reply(`Top D3 ${result.info.duration} ${result.info.skill}:\n` + formattedResponse);
                });
                
                break;
            case "month":
            case "m":
                tOsrs.QueryCurrentTop(TempleCompetitiveCommunityEndpointEnum.CurrentTopMonth, DISTRICT3_TEMPLE_GROUPID)
                .then((resultingJSON) => {
                    let result = resultingJSON as IBaseTopTimeframe;
                    
                    let formattedResponse = "```"
                    for(var i = 1; typeof result.Month[i] !== 'undefined' && i <= 25; ++i){

                        formattedResponse += `${result.Month[i].rank.toString().padStart(2)} (${result.Month[i].xp.slice(0, 5)}): ${result.Month[i].nickname.padEnd(12)}\t`;

                        if(i % 5 === 0){
                            formattedResponse+="\n";
                        }

                    }

                    formattedResponse.trimEnd();

                    formattedResponse += "```";

                    message.reply(`Top D3 ${result.info.duration} ${result.info.skill}:\n` + formattedResponse);
                });
                break;
            default:
                message.reply(`Unknown timeframe argument. Valid timeframes: (day | d) (week | w) (month | m)`);
                break;
        }

    }
}