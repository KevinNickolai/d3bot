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
    name: 'd3top',
    aliases: ['d3t'],
    description: "See top District 3 players over the past Month, Week, or Day",
    usage: `<(d)ay | (w)eek | (m)onth> <-u>`,
    args: true,
    execute(message, args) {
        let tOsrs = new TempleOSRS_1.default();
        const timeframe = args.shift()?.toLowerCase();
        const mentionsOn = args.shift()?.toLowerCase() === "-u";
        switch (timeframe) {
            case "day":
            case "d":
                tOsrs.QueryCurrentTop(TempleOSRS_1.TempleCompetitiveCommunityEndpointEnum.CurrentTopDay, config_1.DISTRICT3_TEMPLE_GROUPID)
                    .then(async (resultingJSON) => {
                    let result = resultingJSON;
                    let discordUsersFound = [];
                    for (let i = 1; typeof result.Day[i] !== 'undefined' && i <= 10; ++i) {
                        let cachedPlayer = message.guild?.members.cache.find(user => user.displayName === result.Day[i].player);
                        if (cachedPlayer) {
                            discordUsersFound.push(Promise.resolve(new Discord.Collection((new Map()).set(cachedPlayer.displayName, cachedPlayer))));
                        }
                        else {
                            discordUsersFound.push(message.guild?.members.search({ query: result.Day[i].player, cache: true, limit: 5 }));
                        }
                    }
                    if (mentionsOn)
                        await Promise.all(discordUsersFound);
                    let formattedResponse = mentionsOn ? "" : "```";
                    for (let i = 1; typeof result.Day[i] !== 'undefined' && ((!mentionsOn && i <= 25) || (mentionsOn && i <= 10)); ++i) {
                        let player;
                        const padLimit = mentionsOn ? 13 : 12;
                        if (mentionsOn)
                            player = (await discordUsersFound[i - 1])?.find(user => user.displayName === result.Day[i].player);
                        formattedResponse += `${result.Day[i].rank.toString().padStart(2)} ` +
                            `(${result.Day[i].xp.slice(0, 5)}): ` +
                            `${player ? `<@${player.id}>` : result.Day[i].player.padEnd(padLimit)}\t`;
                        if (mentionsOn || i % 5 === 0) {
                            formattedResponse += "\n";
                        }
                    }
                    formattedResponse.trimEnd();
                    if (!mentionsOn)
                        formattedResponse += "```";
                    message.reply({ "content": `Top D3 ${result.info.duration} ${result.info.skill}:\n` + formattedResponse, "allowedMentions": {
                            "parse": []
                        } });
                });
                break;
            case "week":
            case "w":
                tOsrs.QueryCurrentTop(TempleOSRS_1.TempleCompetitiveCommunityEndpointEnum.CurrentTopWeek, config_1.DISTRICT3_TEMPLE_GROUPID)
                    .then(async (resultingJSON) => {
                    let result = resultingJSON;
                    let discordUsersFound = [];
                    for (let i = 1; typeof result.Week[i] !== 'undefined' && i <= 10; ++i) {
                        let cachedPlayer = message.guild?.members.cache.find(user => user.displayName === result.Week[i].player);
                        if (cachedPlayer) {
                            discordUsersFound.push(Promise.resolve(new Discord.Collection((new Map()).set(cachedPlayer.displayName, cachedPlayer))));
                        }
                        else {
                            discordUsersFound.push(message.guild?.members.search({ query: result.Week[i].player, cache: true, limit: 5 }));
                        }
                    }
                    if (mentionsOn)
                        await Promise.all(discordUsersFound);
                    let formattedResponse = mentionsOn ? "" : "```";
                    for (let i = 1; typeof result.Week[i] !== 'undefined' && ((!mentionsOn && i <= 25) || (mentionsOn && i <= 10)); ++i) {
                        let player;
                        const padLimit = mentionsOn ? 13 : 12;
                        if (mentionsOn)
                            player = (await discordUsersFound[i - 1])?.find(user => user.displayName === result.Week[i].player);
                        formattedResponse += `${result.Week[i].rank.toString().padStart(2)} ` +
                            `(${result.Week[i].xp.slice(0, 5)}): ` +
                            `${player ? `<@${player.id}>` : result.Week[i].player.padEnd(padLimit)}\t`;
                        if (mentionsOn || i % 5 === 0) {
                            formattedResponse += "\n";
                        }
                    }
                    formattedResponse.trimEnd();
                    if (!mentionsOn)
                        formattedResponse += "```";
                    message.reply({ "content": `Top D3 ${result.info.duration} ${result.info.skill}:\n` + formattedResponse, "allowedMentions": {
                            "parse": []
                        } });
                });
                break;
            case "month":
            case "m":
                tOsrs.QueryCurrentTop(TempleOSRS_1.TempleCompetitiveCommunityEndpointEnum.CurrentTopMonth, config_1.DISTRICT3_TEMPLE_GROUPID)
                    .then(async (resultingJSON) => {
                    let result = resultingJSON;
                    let discordUsersFound = [];
                    for (let i = 1; typeof result.Month[i] !== 'undefined' && i <= 10; ++i) {
                        let cachedPlayer = message.guild?.members.cache.find(user => user.displayName === result.Month[i].player);
                        if (cachedPlayer) {
                            discordUsersFound.push(Promise.resolve(new Discord.Collection((new Map()).set(cachedPlayer.displayName, cachedPlayer))));
                        }
                        else {
                            discordUsersFound.push(message.guild?.members.search({ query: result.Month[i].player, cache: true, limit: 5 }));
                        }
                    }
                    if (mentionsOn)
                        await Promise.all(discordUsersFound);
                    let formattedResponse = mentionsOn ? "" : "```";
                    for (let i = 1; typeof result.Month[i] !== 'undefined' && ((!mentionsOn && i <= 25) || (mentionsOn && i <= 10)); ++i) {
                        let player;
                        const padLimit = mentionsOn ? 13 : 12;
                        if (mentionsOn)
                            player = (await discordUsersFound[i - 1])?.find(user => user.displayName === result.Month[i].player);
                        formattedResponse += `${result.Month[i].rank.toString().padStart(2)} ` +
                            `(${result.Month[i].xp.slice(0, 5)}): ` +
                            `${player ? `<@${player.id}>` : result.Month[i].player.padEnd(padLimit)}\t`;
                        if (mentionsOn || i % 5 === 0) {
                            formattedResponse += "\n";
                        }
                    }
                    formattedResponse.trimEnd();
                    if (!mentionsOn)
                        formattedResponse += "```";
                    message.reply({ "content": `Top D3 ${result.info.duration} ${result.info.skill}:\n` + formattedResponse, "allowedMentions": {
                            "parse": []
                        } });
                });
                break;
            default:
                message.reply(`Unknown timeframe argument. Valid timeframes: (day | d) (week | w) (month | m)`);
                break;
        }
    }
};
