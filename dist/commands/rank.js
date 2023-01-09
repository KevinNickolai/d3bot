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
var Rank;
(function (Rank) {
    Rank["Marshal"] = "Marshal";
    Rank["Commander"] = "Commander";
    Rank["Officer"] = "Officer";
    Rank["General"] = "General";
    Rank["Captain"] = "Captain";
    Rank["Lieutenant"] = "Lieutenant";
    Rank["Sergeant"] = "Sergeant";
    Rank["Corporal"] = "Corporal";
    Rank["Pawn"] = "Pawn";
    Rank["Recruit"] = "Recruit";
    Rank["NoRank"] = "No Rank";
})(Rank || (Rank = {}));
const F2P_CMB3_MAX_LEVEL = 808;
const F2P_10HP_MAX_LEVEL = 906;
const P2P_10HP_MAX_LEVEL = 2090;
const P2P_CMB3_MAX_LEVEL = 1502;
module.exports = {
    name: 'rank',
    aliases: ['r'],
    description: "See a player's rank in District 3.",
    args: true,
    execute(message, args) {
        let tOsrs = new TempleOSRS_1.default();
        let playerName = args.shift() ?? message.author.username;
        while (args.length !== 0) {
            playerName += " " + args.shift();
        }
        tOsrs.Query(playerName, TempleOSRS_1.TempleEndpointEnum.PlayerStats)
            .then((resultingJSON) => {
            let pstats = resultingJSON;
            let ehp = -1;
            let totalLevel = pstats.data.Overall_level;
            if (pstats.data.Hitpoints_level > 10)
                return undefined;
            let cmb3 = pstats.data.info["Cb-3"] === 1;
            let f2p = pstats.data.info.F2p === 1;
            let ironman = pstats.data.info["Game mode"] > 0;
            // prayer only; Prayer > 1 and other combats all = 1
            let prayerOnly = (pstats.data.Prayer_level > 1) &&
                (pstats.data.Attack_level === 1) &&
                (pstats.data.Defence_level === 1) &&
                (pstats.data.Strength_level === 1) &&
                (pstats.data.Ranged_level === 1) &&
                (pstats.data.Magic_level === 1);
            console.log(`cmb3:${cmb3}, f2p:${f2p}, ironman:${ironman}, prayerOnly:${prayerOnly}`);
            if (cmb3) {
                if (f2p) {
                    if (ironman) { // cmb3 f2p iron
                        let ehp = Math.max(pstats.data.Im_ehp, pstats.data.Lvl3_ehp, pstats.data.F2p_ehp);
                        if (ehp >= 2500) {
                            return Rank.Marshal;
                        }
                        else if (ehp >= 2000) {
                            return Rank.Commander;
                        }
                        else if (ehp >= 1500) {
                            return Rank.Officer;
                        }
                        else if (totalLevel >= F2P_CMB3_MAX_LEVEL) {
                            return Rank.General;
                        }
                        else if (totalLevel >= 650 || ehp >= 600) {
                            return Rank.Captain;
                        }
                        else if (totalLevel >= 550 || ehp >= 450) {
                            return Rank.Lieutenant;
                        }
                        else if (totalLevel >= 450 || ehp >= 200) {
                            return Rank.Sergeant;
                        }
                        else if (totalLevel >= 350 || ehp >= 150) {
                            return Rank.Corporal;
                        }
                        else if (totalLevel >= 250 || ehp >= 100) {
                            return Rank.Pawn;
                        }
                        else if (totalLevel >= 150 || ehp >= 50) {
                            return Rank.Recruit;
                        }
                    }
                    else { // cmb3 f2p
                        let ehp = Math.max(pstats.data.Lvl3_ehp, pstats.data.F2p_ehp);
                        if (ehp >= 2500) {
                            return Rank.Marshal;
                        }
                        else if (ehp >= 2000) {
                            return Rank.Commander;
                        }
                        else if (ehp >= 1500) {
                            return Rank.Officer;
                        }
                        else if (totalLevel >= F2P_CMB3_MAX_LEVEL) {
                            return Rank.General;
                        }
                        else if (totalLevel >= 750 || ehp >= 650) {
                            return Rank.Captain;
                        }
                        else if (totalLevel >= 650 || ehp >= 500) {
                            return Rank.Lieutenant;
                        }
                        else if (totalLevel >= 500 || ehp >= 250) {
                            return Rank.Sergeant;
                        }
                        else if (totalLevel >= 400 || ehp >= 150) {
                            return Rank.Corporal;
                        }
                        else if (totalLevel >= 300 || ehp >= 100) {
                            return Rank.Pawn;
                        }
                        else if (totalLevel >= 200 || ehp >= 25) {
                            return Rank.Recruit;
                        }
                    }
                }
                else {
                    if (ironman) { // cmb3 p2p iron
                        let ehp = Math.max(pstats.data.Im_ehp, pstats.data.Lvl3_ehp);
                        if (ehp >= 2500) {
                            return Rank.Marshal;
                        }
                        else if (ehp >= 2000) {
                            return Rank.Commander;
                        }
                        else if (ehp >= 1500) {
                            return Rank.Officer;
                        }
                        else if (totalLevel >= P2P_CMB3_MAX_LEVEL) {
                            return Rank.General;
                        }
                        else if (totalLevel >= 1300 || ehp >= 800) {
                            return Rank.Captain;
                        }
                        else if (totalLevel >= 1200 || ehp >= 600) {
                            return Rank.Lieutenant;
                        }
                        else if (totalLevel >= 1100 || ehp >= 450) {
                            return Rank.Sergeant;
                        }
                        else if (totalLevel >= 900 || ehp >= 250) {
                            return Rank.Corporal;
                        }
                        else if (totalLevel >= 650 || ehp >= 200) {
                            return Rank.Pawn;
                        }
                        else if (totalLevel >= 400 || ehp >= 50) {
                            return Rank.Recruit;
                        }
                    }
                    else { // cmb3 p2p
                        let ehp = pstats.data.Lvl3_ehp;
                        if (ehp >= 2500) {
                            return Rank.Marshal;
                        }
                        else if (ehp >= 2000) {
                            return Rank.Commander;
                        }
                        else if (ehp >= 1500) {
                            return Rank.Officer;
                        }
                        else if (totalLevel >= P2P_CMB3_MAX_LEVEL) {
                            return Rank.General;
                        }
                        else if (totalLevel >= 1400 || ehp >= 800) {
                            return Rank.Captain;
                        }
                        else if (totalLevel >= 1300 || ehp >= 600) {
                            return Rank.Lieutenant;
                        }
                        else if (totalLevel >= 1200 || ehp >= 450) {
                            return Rank.Sergeant;
                        }
                        else if (totalLevel >= 1000 || ehp >= 250) {
                            return Rank.Corporal;
                        }
                        else if (totalLevel >= 750 || ehp >= 200) {
                            return Rank.Pawn;
                        }
                        else if (totalLevel >= 500 || ehp >= 50) {
                            return Rank.Recruit;
                        }
                    }
                }
            }
            else {
                if (f2p) {
                    if (ironman) { // 10hp f2p iron
                        let ehp = Math.max(pstats.data.Im_ehp, pstats.data.F2p_ehp);
                        if (ehp >= 2500) {
                            return Rank.Marshal;
                        }
                        else if (ehp >= 2000) {
                            return Rank.Commander;
                        }
                        else if (ehp >= 1500) {
                            return Rank.Officer;
                        }
                        else if (prayerOnly && totalLevel - pstats.data.Prayer_level >= F2P_CMB3_MAX_LEVEL) {
                            return Rank.General;
                        }
                        else if (totalLevel >= F2P_10HP_MAX_LEVEL) {
                            return Rank.General;
                        }
                        else if (totalLevel >= 850 || ehp >= 650) {
                            return Rank.Captain;
                        }
                        else if (totalLevel >= 750 || ehp >= 500) {
                            return Rank.Lieutenant;
                        }
                        else if (totalLevel >= 600 || ehp >= 250) {
                            return Rank.Sergeant;
                        }
                        else if (totalLevel >= 500 || ehp >= 150) {
                            return Rank.Corporal;
                        }
                        else if (totalLevel >= 400 || ehp >= 100) {
                            return Rank.Pawn;
                        }
                        else if (totalLevel >= 300 || ehp >= 50) {
                            return Rank.Recruit;
                        }
                    }
                    else { // 10hp f2p
                        let ehp = pstats.data.F2p_ehp;
                        if (ehp >= 2500) {
                            return Rank.Marshal;
                        }
                        else if (ehp >= 2000) {
                            return Rank.Commander;
                        }
                        else if (ehp >= 1500) {
                            return Rank.Officer;
                        }
                        else if (prayerOnly && totalLevel - pstats.data.Prayer_level >= F2P_CMB3_MAX_LEVEL) {
                            return Rank.General;
                        }
                        else if (totalLevel >= F2P_10HP_MAX_LEVEL) {
                            return Rank.General;
                        }
                        else if (totalLevel >= 850 || ehp >= 650) {
                            return Rank.Captain;
                        }
                        else if (totalLevel >= 750 || ehp >= 500) {
                            return Rank.Lieutenant;
                        }
                        else if (totalLevel >= 600 || ehp >= 250) {
                            return Rank.Sergeant;
                        }
                        else if (totalLevel >= 500 || ehp >= 150) {
                            return Rank.Corporal;
                        }
                        else if (totalLevel >= 400 || ehp >= 100) {
                            return Rank.Pawn;
                        }
                        else if (totalLevel >= 300 || ehp >= 50) {
                            return Rank.Recruit;
                        }
                    }
                }
                else {
                    if (ironman) { // 10hp p2p iron
                        let ehp = pstats.data.Im_ehp;
                        if (ehp >= 2500) {
                            return Rank.Marshal;
                        }
                        else if (ehp >= 2000) {
                            return Rank.Commander;
                        }
                        else if (ehp >= 1500) {
                            return Rank.Officer;
                        }
                        else if (prayerOnly && totalLevel - pstats.data.Prayer_level >= P2P_CMB3_MAX_LEVEL) {
                            return Rank.General;
                        }
                        else if (totalLevel >= P2P_10HP_MAX_LEVEL) {
                            return Rank.General;
                        }
                        else if (totalLevel >= 1550 || ehp >= 800) {
                            return Rank.Captain;
                        }
                        else if (totalLevel >= 1450 || ehp >= 600) {
                            return Rank.Lieutenant;
                        }
                        else if (totalLevel >= 1350 || ehp >= 450) {
                            return Rank.Sergeant;
                        }
                        else if (totalLevel >= 1150 || ehp >= 250) {
                            return Rank.Corporal;
                        }
                        else if (totalLevel >= 900 || ehp >= 200) {
                            return Rank.Pawn;
                        }
                        else if (totalLevel >= 650 || ehp >= 50) {
                            return Rank.Recruit;
                        }
                    }
                    else { // 10hp p2p
                        let ehp = pstats.data.Ehp;
                        if (ehp >= 2500) {
                            return Rank.Marshal;
                        }
                        else if (ehp >= 2000) {
                            return Rank.Commander;
                        }
                        else if (ehp >= 1500) {
                            return Rank.Officer;
                        }
                        else if (prayerOnly && (totalLevel - pstats.data.Prayer_level) >= P2P_CMB3_MAX_LEVEL) {
                            return Rank.General;
                        }
                        else if (totalLevel >= P2P_10HP_MAX_LEVEL) {
                            return Rank.General;
                        }
                        else if (totalLevel >= 1550 || ehp >= 800) {
                            return Rank.Captain;
                        }
                        else if (totalLevel >= 1450 || ehp >= 600) {
                            return Rank.Lieutenant;
                        }
                        else if (totalLevel >= 1350 || ehp >= 450) {
                            return Rank.Sergeant;
                        }
                        else if (totalLevel >= 1150 || ehp >= 250) {
                            return Rank.Corporal;
                        }
                        else if (totalLevel >= 900 || ehp >= 200) {
                            return Rank.Pawn;
                        }
                        else if (totalLevel >= 650 || ehp >= 50) {
                            return Rank.Recruit;
                        }
                    }
                }
            }
            return Rank.NoRank;
        })
            .then((ranking) => {
            switch (ranking) {
                case undefined:
                    message.reply(`${playerName} is unqualified to be a District 3 skiller!`);
                    break;
                case Rank.NoRank:
                    message.reply(`${playerName} does not meet requirements!`);
                    break;
                default:
                    message.reply(`${playerName} is a(n) ${ranking}!`);
                    break;
            }
        })
            .catch((error) => {
            console.log(error);
        });
    }
};
