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
    name: "d3overall",
    aliases: ['d3o', 'overall', 'summary'],
    description: "See a summary of the overall District 3 stats.",
    usage: ``,
    args: false,
    execute(message, args) {
        let tOsrs = new TempleOSRS_1.default();
        tOsrs.QueryGroupEndpoint(config_1.DISTRICT3_TEMPLE_GROUPID, TempleOSRS_1.TempleGroupEndpointEnum.GroupInfo)
            .then((resultingJSON) => {
            const result = resultingJSON.data;
            if (result.info) {
                const formatter = Intl.NumberFormat("en-US", {
                    notation: "compact",
                    compactDisplay: "short"
                });
                const totalColumnPad = Math.max("Total".length, formatter.format(result.info.total_xp).length, formatter.format(result.info.total_ehp).length, formatter.format(result.info.total_ehb).length);
                const avgColumnPad = Math.max("Average".length, formatter.format(result.info.average_xp).length, formatter.format(result.info.average_ehp).length, formatter.format(result.info.average_ehb).length);
                message.reply(`${result.info.name}:
Clan Type: ${result.info.clan_type} with ${result.info.member_count} members.
\`\`\`${"".padEnd(4)}\t${"Total".padEnd(totalColumnPad)}\t${"Average".padEnd(avgColumnPad)}
${"XP:".padStart(4)}\t${formatter.format(result.info.total_xp).padEnd(totalColumnPad)}\t${formatter.format(result.info.average_xp).padEnd(avgColumnPad)}
${"EHP:"}\t${formatter.format(result.info.total_ehp).padEnd(totalColumnPad)}\t${formatter.format(result.info.average_ehp).padEnd(avgColumnPad)}
${"EHB:"}\t${formatter.format(result.info.total_ehb).padEnd(totalColumnPad)}\t${formatter.format(result.info.average_ehb).padEnd(avgColumnPad)}\`\`\``);
            }
        });
    }
};
