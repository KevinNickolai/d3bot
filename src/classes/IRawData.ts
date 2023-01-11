export interface IRawData
{
    data: PlayerStats;
}

export interface IRawPlayerInfo{
    data: PlayerInfo;
}

interface PlayerInfo {
    Username: string;
    Country: string;
    'Game mode': number;
    fresh_start_account: number;
    'Cb-3': number;
    F2p: number;
    Banned: number;
    Disqualified: number;
    'Clan preference': Object;
    'Last checked': string;
    'Last changed': string;
    'Datapoint Cooldown': string;
}

interface PlayerStats
{ 
    info: PlayerInfo;
    date: string;
    
    Overall: number;
    Overall_rank: number;
    Overall_level: number;
    Overall_ehp: number;

    Attack: number;
    Attack_rank : number;
    Attack_level : number;
    Attack_ehp : number;

    Defence: number;
    Defence_rank : number;
    Defence_level : number;
    Defence_ehp : number;

    Strength: number;
    Strength_rank : number;
    Strength_level : number;
    Strength_ehp : number;

    Hitpoints: number;
    Hitpoints_rank : number;
    Hitpoints_level : number;
    Hitpoints_ehp : number;

    Ranged: number;
    Ranged_rank : number;
    Ranged_level : number;
    Ranged_ehp : number;

    Prayer: number;
    Prayer_rank : number;
    Prayer_level : number;
    Prayer_ehp : number;

    Magic: number;
    Magic_rank : number;
    Magic_level : number;
    Magic_ehp : number;

    Cooking: number;
    Cooking_rank : number;
    Cooking_level : number;
    Cooking_ehp : number;

    Woodcutting: number;
    Woodcutting_rank : number;
    Woodcutting_level : number;
    Woodcutting_ehp : number;

    Fletching: number;
    Fletching_rank : number;
    Fletching_level : number;
    Fletching_ehp : number;

    Fishing: number;
    Fishing_rank : number;
    Fishing_level : number;
    Fishing_ehp : number;

    Firemaking: number;
    Firemaking_rank : number;
    Firemaking_level : number;
    Firemaking_ehp : number;

    Crafting: number;
    Crafting_rank : number;
    Crafting_level : number;
    Crafting_ehp : number;

    Smithing: number;
    Smithing_rank : number;
    Smithing_level : number;
    Smithing_ehp : number;

    Mining: number;
    Mining_rank : number;
    Mining_level : number;
    Mining_ehp : number;

    Herblore: number;
    Herblore_rank : number;
    Herblore_level : number;
    Herblore_ehp : number;

    Agility: number;
    Agility_rank : number;
    Agility_level : number;
    Agility_ehp : number;

    Thieving: number;
    Thieving_rank : number;
    Thieving_level : number;
    Thieving_ehp : number;

    Slayer: number;
    Slayer_rank : number;
    Slayer_level : number;
    Slayer_ehp : number;

    Farming: number;
    Farming_rank : number;
    Farming_level : number;
    Farming_ehp : number;

    Runecraft: number;
    Runecraft_rank : number;
    Runecraft_level : number;
    Runecraft_ehp : number;

    Hunter: number;
    Hunter_rank : number;
    Hunter_level : number;
    Hunter_ehp : number;

    Construction: number;
    Construction_rank : number;
    Construction_level : number;
    Construction_ehp : number;

    Ehp : number;
    Ehp_rank : number;
    Im_ehp : number;
    Lvl3_ehp : number;
    F2p_ehp : number;
    Uim_ehp : number;
}
