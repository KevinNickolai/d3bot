import * as Discord from "discord.js";
import CommandClient from "../classes/CommandClient";
import TempleOSRS, { TempleCompetitiveCommunityEndpointEnum, TemplePlayerEndpointEnum } from "../classes/TempleOSRS";
import https from 'https';
import { IBaseTopTimeframe, IRecordTopTimeframe } from "../classes/IRawData";
import { DISTRICT3_TEMPLE_GROUPID, prefix } from "../config";


module.exports = {
    name: 'd3record',
    aliases: ['d3r', 'record', 'records', 'r'],
    description: "See top District 3 records for 6h, Day, Week, Month, and Year",
    usage: `${prefix}d3record <(6)h | (d)ay | (w)eek | (m)onth | (y)ear> <-u>`,
    args: true,
    execute(message: Discord.Message, args: string[]){
        let tOsrs = new TempleOSRS();

        const timeframe = args.shift()?.toLowerCase();

        const timeframes = ["6", "6h", "d", "day",
                            "w", "week", "m", "month",
                            "y", "year"];

        if(typeof timeframe !== 'undefined' && timeframes.includes(timeframe)){

            const mentionsOn = args.shift()?.toLowerCase() === "-u";

            tOsrs.QueryCurrentTop(TempleCompetitiveCommunityEndpointEnum.TopRecords, DISTRICT3_TEMPLE_GROUPID)
                 .then(async (resultingJSON) => {

                    let result = resultingJSON as IRecordTopTimeframe;

                    let duration = "6h";
                    let playerList = result["6h"];
                    let sliceCount = 5;
                    switch(timeframe){
                        case "d":
                        case "day":
                            playerList = result.Day;
                            duration = "Day";
                            break;
                        case "w":
                        case "week":
                            playerList = result.Week;
                            duration = "Week";
                            break;
                        case "m":
                        case "month":
                            playerList = result.Month;
                            duration = "Month";
                            break;
                        case "y":
                        case "year":
                            playerList = result.Year;
                            duration = "Year";
                            sliceCount = 6;
                            break;
                    }

                    let discordUsersFound : Array<Discord.Collection<string, Discord.GuildMember>> = [];

                    if(mentionsOn){

                        let discordUsersSearch = new Array<Promise<Discord.Collection<string, Discord.GuildMember>>>();

                        for(let i = 1; typeof playerList[i] !== 'undefined' && i <= 10; ++i){

                            let cachedPlayer = message.guild?.members.cache.find(user => user.displayName === playerList[i].player);

                            if(cachedPlayer){
                                discordUsersSearch.push(Promise.resolve(new Discord.Collection((new Map<string, Discord.GuildMember>()).set(cachedPlayer.displayName!, cachedPlayer))));
                            }
                            else{
                                discordUsersSearch.push(message.guild?.members.search({query: playerList[i].player, cache: true, limit: 1})??Promise.resolve(new Discord.Collection<string, Discord.GuildMember>()));
                            }
                        }

                        discordUsersFound = await Promise.all(discordUsersSearch);
                    }

                    let formattedResponse = mentionsOn ? "" : "```";
                    for(let i = 1; typeof playerList[i] !== 'undefined' && ((!mentionsOn && i <= 25) || (mentionsOn && i<=10)); ++i){

                        let player;
                        if(mentionsOn) player = discordUsersFound[i-1]?.find(user => user.displayName === playerList[i].player);

                        let date = playerList[i].date.split(" ")[0];

                        formattedResponse += `${playerList[i].rank.toString().padStart(2)}` +
                                             `(${playerList[i].xp.slice(0,sliceCount)}): ` +
                                             `${player ? `<@${player.id}>` : (playerList[i].player)} on ${date}`.padEnd(26) + "\t";
                        if(mentionsOn || i % 3 === 0){
                            formattedResponse += "\n";
                        }
                    }

                    formattedResponse += mentionsOn ? "" : "```";

                    message.reply({"content": `Top D3 ${duration} Ehp Records:\n` + formattedResponse, "allowedMentions": {
                        "parse": []
                    }});
                 })
                 .catch((error) => {

                 });

        }
        else{
            message.reply(`Unknown timeframe argument. Valid timeframes: (6h | 6) (day | d) (week | w) (month | m) (year | y)`);
        }



    }
}