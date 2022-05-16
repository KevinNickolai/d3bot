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
const SKILL_NAMES = ['Attack', 'Strength', 'Defence', 'Ranged',
    'Prayer', 'Magic', 'Runecraft', 'Construction',
    'Hitpoints', 'Agility', 'Herblore', 'Thieving',
    'Crafting', 'Fletching', 'Slayer', 'Hunter',
    'Mining', 'Smithing', 'Fishing', 'Cooking',
    'Firemaking', 'Woodcutting', 'Farming'];
module.exports = {
    name: 'skill',
    aliases: ['s'],
    description: "See a player's skill status",
    args: true,
    execute(message, args) {
        let tOsrs = new TempleOSRS_1.default();
        let typedSkill = args.shift();
        let skillName = typedSkill?.charAt(0).toUpperCase() + typedSkill?.slice(1).toLowerCase();
        let indexOf = SKILL_NAMES.indexOf(skillName);
        if (indexOf !== -1) {
            let playerName = args.shift() ?? message.author.username;
            while (args.length !== 0) {
                playerName += " " + args.shift();
            }
            tOsrs.Query(playerName, TempleOSRS_1.TempleEndpointEnum.PlayerStats)
                .then((resultingJSON) => {
                let pstats = resultingJSON;
                const skill = (SKILL_NAMES[indexOf]);
                const skillRank = (SKILL_NAMES[indexOf] + "_rank");
                const skillLevel = (SKILL_NAMES[indexOf] + "_level");
                const skillEhp = (SKILL_NAMES[indexOf] + "_ehp");
                console.log(pstats.data);
                message.reply(`${playerName} | ${skill}:
                Experience: ${pstats.data[skill]}
                Rank: ${pstats.data[skillRank]}
                Level: ${pstats.data[skillLevel]}
                EHP: ${pstats.data[skillEhp]}`);
            })
                .catch((error) => {
                console.log(error);
            });
        }
        else {
            message.reply(`Unknown skill ${skillName}.`);
        }
    }
};
