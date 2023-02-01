import * as Discord from "discord.js";
import TempleOSRS, { TemplePlayerEndpointEnum } from "../classes/TempleOSRS";
import { IRawData } from "../classes/IRawData";

enum Rank {
    Marshal = "Marshal",
    Commander = "Commander",
    Officer = "Officer",
    General = "General",
    Captain = "Captain",
    Lieutenant = "Lieutenant",
    Sergeant = "Sergeant",
    Corporal = "Corporal",
    Pawn = "Pawn",
    Recruit = "Recruit",
    NoRank = "No Rank"
}

const F2P_CMB3_MAX_LEVEL = 808;
const F2P_10HP_MAX_LEVEL = 906;
const P2P_10HP_MAX_LEVEL = 2090;
const P2P_CMB3_MAX_LEVEL = 1502


module.exports = {
    name: 'rank',
    aliases: ['r'],
    description: "See a player's rank in District 3.",
    args: true,
    execute(message: Discord.Message, args: string[]) {

        let tOsrs = new TempleOSRS();

        let playerName = args.shift() ?? message.author.username;

        while (args.length !== 0) {
            playerName += " " + args.shift();
        }

        tOsrs.QueryPlayerRSN(playerName!, TemplePlayerEndpointEnum.PlayerStats)
            .then((resultingJSON) => {
                let pstats = (resultingJSON as IRawData);
                let ehp = -1;
                let totalLevel = pstats.data.Overall_level;

                if(pstats.data.Hitpoints_level > 10) return undefined;

                let cmb3: boolean = pstats.data.info["Cb-3"] === 1;
                let f2p: boolean = pstats.data.info.F2p === 1;
                let ironman: boolean = pstats.data.info["Game mode"] > 0;

                // prayer only; Prayer > 1 and other combats all = 1
                let prayerOnly: boolean = (pstats.data.Prayer_level > 1) &&
                                            (pstats.data.Attack_level === 1) &&
                                            (pstats.data.Defence_level === 1) &&
                                            (pstats.data.Strength_level === 1) &&
                                            (pstats.data.Ranged_level === 1) &&
                                            (pstats.data.Magic_level === 1);

                console.log(`cmb3:${cmb3}, f2p:${f2p}, ironman:${ironman}, prayerOnly:${prayerOnly}`);

                if (cmb3) {
                    if (f2p) {
                        if (ironman) { // cmb3 f2p iron

                            let ehp = Math.max(pstats.data.Im_ehp, pstats.data.Lvl3_ehp, pstats.data.F2p_ehp)

                            if (ehp >= 2500) {
                                return Rank.Marshal;
                            }
                            else if (ehp >= 2000) {
                                return Rank.Commander;
                            }
                            else if (ehp >= 1500) {
                                return Rank.Officer;
                            }
                            else if(totalLevel >= F2P_CMB3_MAX_LEVEL){
                                return Rank.General
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

                            let ehp = Math.max(pstats.data.Lvl3_ehp, pstats.data.F2p_ehp)

                            if (ehp >= 2500) {
                                return Rank.Marshal;
                            }
                            else if (ehp >= 2000) {
                                return Rank.Commander;
                            }
                            else if (ehp >= 1500) {
                                return Rank.Officer;
                            }
                            else if(totalLevel >= F2P_CMB3_MAX_LEVEL){
                                return Rank.General
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
                    } else {
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
                            else if(totalLevel >= P2P_CMB3_MAX_LEVEL){
                                return Rank.General
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
                        else {   // cmb3 p2p

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
                            else if(totalLevel >= P2P_CMB3_MAX_LEVEL){
                                return Rank.General
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
                            else if(totalLevel >= F2P_10HP_MAX_LEVEL){
                                return Rank.General
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
                        else {   // 10hp f2p

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
                            else if(totalLevel >= F2P_10HP_MAX_LEVEL){
                                return Rank.General
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
                    } else {
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
                            else if(totalLevel >= P2P_10HP_MAX_LEVEL){
                                return Rank.General
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
                        else {   // 10hp p2p

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
                            else if(totalLevel >= P2P_10HP_MAX_LEVEL){
                                return Rank.General
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
            .then((ranking: Rank | undefined) => {

                switch(ranking){
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
}