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
    name: 'ehp',
    aliases: [],
    description: "See effective hours played",
    args: true,
    execute(message, args) {
        let tOsrs = new TempleOSRS_1.default();
        let playerName = args.shift();
        while (args.length !== 0) {
            playerName += " " + args.shift();
        }
        tOsrs.Query(playerName, TempleOSRS_1.TempleEndpointEnum.PlayerStats)
            .then((resultingJSON) => {
            let pstats = resultingJSON;
            if (pstats.data) {
                message.reply(`${playerName}:
                Main EHP: ${pstats.data.Ehp}
                IM EHP: ${pstats.data.Im_ehp}
                Level 3 EHP: ${pstats.data.Lvl3_ehp}
                F2P EHP: ${pstats.data.F2p_ehp}`);
            }
            else {
                message.reply(`Could not find info in TempleOSRS database for player ${playerName}.`);
            }
        })
            .catch((error) => {
            console.log(error);
        });
    }
};
