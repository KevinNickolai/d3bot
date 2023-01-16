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
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = __importStar(require("discord.js"));
const TempleOSRS_1 = __importStar(require("../classes/TempleOSRS"));
const config_1 = require("../config");
module.exports = {
    name: 'd3record',
    aliases: ['d3r', 'record', 'records', 'r'],
    description: "See top District 3 records for 6h, Day, Week, Month, and Year",
    usage: `<(6)h | (d)ay | (w)eek | (m)onth | (y)ear> <-u>`,
    args: true,
    execute(message, args) {
        let tOsrs = new TempleOSRS_1.default();
        const timeframe = args.shift()?.toLowerCase();
        const timeframes = ["6", "6h", "d", "day",
            "w", "week", "m", "month",
            "y", "year"];
        if (typeof timeframe !== 'undefined' && timeframes.includes(timeframe)) {
            const mentionsOn = args.shift()?.toLowerCase() === "-u";
            tOsrs.QueryCurrentTop(TempleOSRS_1.TempleCompetitiveCommunityEndpointEnum.TopRecords, config_1.DISTRICT3_TEMPLE_GROUPID)
                .then(async (resultingJSON) => {
                let result = resultingJSON;
                let duration = "6h";
                let playerList = result["6h"];
                let sliceCount = 5;
                switch (timeframe) {
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
                let discordUsersFound = [];
                if (mentionsOn) {
                    let discordUsersSearch = new Array();
                    for (let i = 1; typeof playerList[i] !== 'undefined' && i <= 10; ++i) {
                        let cachedPlayer = message.guild?.members.cache.find(user => user.displayName === playerList[i].player);
                        if (cachedPlayer) {
                            discordUsersSearch.push(Promise.resolve(new Discord.Collection((new Map()).set(cachedPlayer.displayName, cachedPlayer))));
                        }
                        else {
                            discordUsersSearch.push(message.guild?.members.search({ query: playerList[i].player, cache: true, limit: 1 }) ?? Promise.resolve(new Discord.Collection()));
                        }
                    }
                    discordUsersFound = await Promise.all(discordUsersSearch);
                }
                let formattedResponse = mentionsOn ? "" : "```";
                for (let i = 1; typeof playerList[i] !== 'undefined' && ((!mentionsOn && i <= 25) || (mentionsOn && i <= 10)); ++i) {
                    let player;
                    if (mentionsOn)
                        player = discordUsersFound[i - 1]?.find(user => user.displayName === playerList[i].player);
                    let date = playerList[i].date.split(" ")[0];
                    formattedResponse += `${playerList[i].rank.toString().padStart(2)}` +
                        `(${playerList[i].xp.slice(0, sliceCount)}): ` +
                        `${player ? `<@${player.id}>` : (playerList[i].player)} on ${date}`.padEnd(26) + "\t";
                    if (mentionsOn || i % 3 === 0) {
                        formattedResponse += "\n";
                    }
                }
                formattedResponse += mentionsOn ? "" : "```";
                message.reply({ "content": `Top D3 ${duration} Ehp Records:\n` + formattedResponse, "allowedMentions": {
                        "parse": []
                    } });
            })
                .catch((error) => {
            });
        }
        else {
            message.reply(`Unknown timeframe argument. Valid timeframes: (6h | 6) (day | d) (week | w) (month | m) (year | y)`);
        }
    }
};
