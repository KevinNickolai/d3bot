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
        let endpoint;
        switch (timeframe) {
            case "day":
            case "d":
                endpoint = TempleOSRS_1.TempleCompetitiveCommunityEndpointEnum.CurrentTopDay;
                break;
            case "week":
            case "w":
                endpoint = TempleOSRS_1.TempleCompetitiveCommunityEndpointEnum.CurrentTopWeek;
                break;
            case "month":
            case "m":
                endpoint = TempleOSRS_1.TempleCompetitiveCommunityEndpointEnum.CurrentTopMonth;
                break;
            default:
                message.reply(`Unknown timeframe argument. Valid timeframes: (day | d) (week | w) (month | m)`);
                return;
        }
        tOsrs.QueryCurrentTop(endpoint, config_1.DISTRICT3_TEMPLE_GROUPID)
            .then(async (resultingJSON) => {
            let result = resultingJSON;
            let discordUsersFound = [];
            /*
            * Determine and cache the top 10 discord users based on display name to be listed on the message command results
            */
            if (mentionsOn) {
                let discordUsersSearch = [];
                for (let i = 1; typeof result[result.info.duration][i] !== 'undefined' && i <= 10; ++i) {
                    let indexedPlayerData = result[result.info.duration][i];
                    let cachedPlayer = message.guild?.members.cache.find(user => user.displayName === indexedPlayerData.player);
                    if (cachedPlayer) {
                        discordUsersSearch.push(Promise.resolve(new Discord.Collection((new Map()).set(cachedPlayer.displayName, cachedPlayer))));
                    }
                    else {
                        discordUsersSearch.push(message.guild?.members.search({ query: indexedPlayerData.player, cache: true, limit: 5 }) ?? Promise.resolve(new Discord.Collection()));
                    }
                }
                discordUsersFound = await Promise.all(discordUsersSearch);
            }
            const padLimit = mentionsOn ? 13 : 12;
            let formattedResponse = mentionsOn ? "" : "```";
            /*
            * Generate the formatted response based on the mentionsOn flag
            */
            for (let i = 1; typeof result[result.info.duration][i] !== 'undefined' && ((!mentionsOn && i <= 25) || (mentionsOn && i <= 10)); ++i) {
                let indexedPlayerData = result[result.info.duration][i];
                let player;
                if (mentionsOn)
                    player = discordUsersFound[i - 1]?.find(user => user.displayName === indexedPlayerData.player);
                formattedResponse += `${indexedPlayerData.rank.toString().padStart(2)} ` +
                    `(${indexedPlayerData.xp.slice(0, 5)}): ` +
                    `${player ? `<@${player.id}>` : indexedPlayerData.player.padEnd(padLimit)}\t`;
                if (mentionsOn || i % 5 === 0) {
                    formattedResponse += "\n";
                }
            }
            formattedResponse += mentionsOn ? "" : "```";
            message.reply({ "content": `Top D3 ${result.info.duration} ${result.info.skill}:\n` + formattedResponse, "allowedMentions": {
                    "parse": []
                } });
        })
            .catch((error) => {
        });
    }
};
