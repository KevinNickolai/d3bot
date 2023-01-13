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
const TempleOSRS_1 = __importStar(require("../classes/TempleOSRS"));
const config_1 = require("../config");
module.exports = {
    name: 'd3top',
    aliases: ['d3t'],
    description: "See top District 3 players over the past Month, Week, or Day",
    usage: `${config_1.prefix}d3top <day | week | month>`,
    args: true,
    execute(message, args) {
        let tOsrs = new TempleOSRS_1.default();
        let timeframe = args.shift()?.toLowerCase();
        switch (timeframe) {
            case "day":
            case "d":
                tOsrs.QueryCurrentTop(TempleOSRS_1.TempleCompetitiveCommunityEndpointEnum.CurrentTopDay, config_1.DISTRICT3_TEMPLE_GROUPID)
                    .then((resultingJSON) => {
                    let result = resultingJSON;
                    let formattedResponse = "```";
                    for (var i = 1; typeof result.Day[i] !== 'undefined' && i <= 25; ++i) {
                        formattedResponse += `${result.Day[i].rank.toString().padStart(2)} (${result.Day[i].xp.slice(0, 5)}): ${result.Day[i].nickname.padEnd(12)}\t`;
                        if (i % 5 === 0) {
                            formattedResponse += "\n";
                        }
                    }
                    formattedResponse.trimEnd();
                    formattedResponse += "```";
                    message.reply(`Top D3 ${result.info.duration} ${result.info.skill}:\n` + formattedResponse);
                });
                break;
            case "week":
            case "w":
                tOsrs.QueryCurrentTop(TempleOSRS_1.TempleCompetitiveCommunityEndpointEnum.CurrentTopWeek, config_1.DISTRICT3_TEMPLE_GROUPID)
                    .then((resultingJSON) => {
                    let result = resultingJSON;
                    let formattedResponse = "```";
                    for (var i = 1; typeof result.Week[i] !== 'undefined' && i <= 25; ++i) {
                        formattedResponse += `${result.Week[i].rank.toString().padStart(2)} (${result.Week[i].xp.slice(0, 5)}): ${result.Week[i].nickname.padEnd(12)}\t`;
                        if (i % 5 === 0) {
                            formattedResponse += "\n";
                        }
                    }
                    formattedResponse.trimEnd();
                    formattedResponse += "```";
                    message.reply(`Top D3 ${result.info.duration} ${result.info.skill}:\n` + formattedResponse);
                });
                break;
            case "month":
            case "m":
                tOsrs.QueryCurrentTop(TempleOSRS_1.TempleCompetitiveCommunityEndpointEnum.CurrentTopMonth, config_1.DISTRICT3_TEMPLE_GROUPID)
                    .then((resultingJSON) => {
                    let result = resultingJSON;
                    let formattedResponse = "```";
                    for (var i = 1; typeof result.Month[i] !== 'undefined' && i <= 25; ++i) {
                        formattedResponse += `${result.Month[i].rank.toString().padStart(2)} (${result.Month[i].xp.slice(0, 5)}): ${result.Month[i].nickname.padEnd(12)}\t`;
                        if (i % 5 === 0) {
                            formattedResponse += "\n";
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
};
