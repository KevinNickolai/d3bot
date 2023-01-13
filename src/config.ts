require('dotenv').config()

export const prefix = ">"
export const botToken = process.env.BOT_TOKEN;
export const testBotToken = process.env.TEST_BOT_TOKEN;

export const DISTRICT3_TEMPLE_GROUPID = 226;

export const SKILL_NAMES = ['Attack', 'Strength', 'Defence', 'Ranged',
'Prayer', 'Magic', 'Runecraft', 'Construction',
'Hitpoints', 'Agility', 'Herblore', 'Thieving',
'Crafting', 'Fletching', 'Slayer', 'Hunter',
'Mining', 'Smithing', 'Fishing', 'Cooking',
'Firemaking', 'Woodcutting', 'Farming'];

class BaseAccountGamemodeEnum {
    public gamemode :string;

    constructor(mode: string){
        this.gamemode=mode;
    }
}

export class AccountGamemodeEnum extends BaseAccountGamemodeEnum{
    static Normal = new AccountGamemodeEnum("0");
    static Ironman = new AccountGamemodeEnum("1");
    static UltimateIronman = new AccountGamemodeEnum("2");
    static HardcoreIronman = new AccountGamemodeEnum("3");
    static FreshStartWorld = new AccountGamemodeEnum("fsw");
}

class BaseAccountBuildEnum {

    public buildName : string;

    constructor(build : string){
        this.buildName = build;
    }

}

export class AccountBuildEnum extends BaseAccountBuildEnum {
    static FreeToPlay = new AccountBuildEnum("F2p");
    static Level3 = new AccountBuildEnum("lvl3");
    static OneDefence = new AccountBuildEnum("1def");
    static TenHP = new AccountBuildEnum("10hp");
    static OneDefenceNoLevel3 = new AccountBuildEnum("1defnolvl3");
    static Gingbino = new AccountBuildEnum("gingbino");
}