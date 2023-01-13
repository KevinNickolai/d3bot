"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountBuildEnum = exports.AccountGamemodeEnum = exports.SKILL_NAMES = exports.DISTRICT3_TEMPLE_GROUPID = exports.testBotToken = exports.botToken = exports.prefix = void 0;
require('dotenv').config();
exports.prefix = ">";
exports.botToken = process.env.BOT_TOKEN;
exports.testBotToken = process.env.TEST_BOT_TOKEN;
exports.DISTRICT3_TEMPLE_GROUPID = 226;
exports.SKILL_NAMES = ['Attack', 'Strength', 'Defence', 'Ranged',
    'Prayer', 'Magic', 'Runecraft', 'Construction',
    'Hitpoints', 'Agility', 'Herblore', 'Thieving',
    'Crafting', 'Fletching', 'Slayer', 'Hunter',
    'Mining', 'Smithing', 'Fishing', 'Cooking',
    'Firemaking', 'Woodcutting', 'Farming'];
class BaseAccountGamemodeEnum {
    constructor(mode) {
        this.gamemode = mode;
    }
}
class AccountGamemodeEnum extends BaseAccountGamemodeEnum {
}
exports.AccountGamemodeEnum = AccountGamemodeEnum;
AccountGamemodeEnum.Normal = new AccountGamemodeEnum("0");
AccountGamemodeEnum.Ironman = new AccountGamemodeEnum("1");
AccountGamemodeEnum.UltimateIronman = new AccountGamemodeEnum("2");
AccountGamemodeEnum.HardcoreIronman = new AccountGamemodeEnum("3");
AccountGamemodeEnum.FreshStartWorld = new AccountGamemodeEnum("fsw");
class BaseAccountBuildEnum {
    constructor(build) {
        this.buildName = build;
    }
}
class AccountBuildEnum extends BaseAccountBuildEnum {
}
exports.AccountBuildEnum = AccountBuildEnum;
AccountBuildEnum.FreeToPlay = new AccountBuildEnum("F2p");
AccountBuildEnum.Level3 = new AccountBuildEnum("lvl3");
AccountBuildEnum.OneDefence = new AccountBuildEnum("1def");
AccountBuildEnum.TenHP = new AccountBuildEnum("10hp");
AccountBuildEnum.OneDefenceNoLevel3 = new AccountBuildEnum("1defnolvl3");
AccountBuildEnum.Gingbino = new AccountBuildEnum("gingbino");
