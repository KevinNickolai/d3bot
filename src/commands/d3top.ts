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
    usage: `<(d)ay | (w)eek | (m)onth> <-u>`,
    args: true,
    execute(message: Discord.Message, args: string[]){

        let tOsrs = new TempleOSRS();

        const timeframe = args.shift()?.toLowerCase();

        const mentionsOn = args.shift()?.toLowerCase() === "-u";

        let endpoint : TempleCompetitiveCommunityEndpointEnum;

        switch(timeframe){
            case "day":
            case "d":
                endpoint = TempleCompetitiveCommunityEndpointEnum.CurrentTopDay;
                break;

            case "week":
            case "w":
                endpoint = TempleCompetitiveCommunityEndpointEnum.CurrentTopWeek;
                break;

            case "month":
            case "m":
                endpoint = TempleCompetitiveCommunityEndpointEnum.CurrentTopMonth;
                break;

            default:
                message.reply(`Unknown timeframe argument. Valid timeframes: (day | d) (week | w) (month | m)`);
                return;
        }

        tOsrs.QueryCurrentTop(endpoint, DISTRICT3_TEMPLE_GROUPID)
            .then(async (resultingJSON) => {
                let result = resultingJSON as IBaseTopTimeframe;

                let discordUsersFound : Array<Discord.Collection<string, Discord.GuildMember>> = [];

                /*
                * Determine and cache the top 10 discord users based on display name to be listed on the message command results
                */
                if(mentionsOn){

                    let discordUsersSearch : Array<Promise<Discord.Collection<string, Discord.GuildMember>>> = [];
                    
                    for(let i = 1; typeof result[result.info.duration][i] !== 'undefined' && i <= 10; ++i){
                    
                        let indexedPlayerData = result[result.info.duration][i];
    
                        let cachedPlayer = message.guild?.members.cache.find(user => user.displayName === indexedPlayerData.player);
    
                        if(cachedPlayer){
                            discordUsersSearch.push(Promise.resolve(new Discord.Collection((new Map<string, Discord.GuildMember>()).set(cachedPlayer.displayName!, cachedPlayer))));
                        }
                        else{
                            discordUsersSearch.push(message.guild?.members.search({query: indexedPlayerData.player, cache: true, limit: 5})??Promise.resolve(new Discord.Collection<string, Discord.GuildMember>()));
                        }
                    }

                    discordUsersFound = await Promise.all(discordUsersSearch);
                }

                const padLimit = mentionsOn ? 13 : 12;

                let formattedResponse = mentionsOn ? "" : "```";

                /*
                * Generate the formatted response based on the mentionsOn flag
                */
                for(let i = 1; typeof result[result.info.duration][i] !== 'undefined' && ((!mentionsOn && i <= 25) || (mentionsOn && i <= 10)); ++i){
                    
                    let indexedPlayerData = result[result.info.duration][i];
                    
                    let player;
                    if(mentionsOn) player = discordUsersFound[i-1]?.find(user => user.displayName === indexedPlayerData.player);

                    formattedResponse += `${indexedPlayerData.rank.toString().padStart(2)} ` +
                    `(${indexedPlayerData.xp.slice(0, 5)}): ` +
                    `${ player ? `<@${player.id}>` : indexedPlayerData.player.padEnd(padLimit)}\t`;
                
                    if(mentionsOn || i % 5 === 0){
                        formattedResponse+="\n";
                    }
                }

                formattedResponse += mentionsOn ? "" : "```";

                message.reply({"content": `Top D3 ${result.info.duration} ${result.info.skill}:\n` + formattedResponse, "allowedMentions": {
                    "parse": []
                }});
            })
            .catch((error) => {

            });

    }
}