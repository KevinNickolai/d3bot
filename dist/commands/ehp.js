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
module.exports = {
    name: "ehp",
    aliases: [],
    description: "See effective hours played: ",
    usage: `<player name>`,
    args: true,
    execute(message, args) {
        let tOsrs = new TempleOSRS_1.default();
        let playerName = args.shift();
        while (args.length !== 0) {
            playerName += " " + args.shift();
        }
        tOsrs
            .QueryPlayerRSN(playerName, TempleOSRS_1.TemplePlayerEndpointEnum.PlayerStats)
            .then((resultingJSON) => {
            let pstats = resultingJSON;
            if (pstats.data) {
                message.reply(`${playerName}:` +
                    `\n\t\tMain EHP: ${pstats.data.Ehp}` +
                    `\n\t\t${pstats.data.Lvl3_ehp > 0 ? `Level 3 EHP: ${pstats.data.Lvl3_ehp}` : ""}`.trimEnd() +
                    `\n\t\t${pstats.data.F2p_ehp > 0 ? `F2P EHP: ${pstats.data.F2p_ehp}` : ""}`.trimEnd() +
                    `\n\t\t${pstats.data.Im_ehp > 0 ? `IM EHP: ${pstats.data.Im_ehp}` : ""}`.trimEnd() +
                    `\n\t\t${pstats.data.Uim_ehp > 0 ? `UIM EHP ${pstats.data.Uim_ehp}` : ""}`.trimEnd());
            }
            else {
                message.reply(`Could not find info in TempleOSRS database for player ${playerName}.`);
            }
        })
            .catch((error) => {
            console.log(error);
        });
    },
};
