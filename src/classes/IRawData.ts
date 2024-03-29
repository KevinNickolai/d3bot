export type IBaseTopTimeframe = {
    [Timeframe in "Day" | "Week" | "Month"]: TopTimeframeList;
} & {
    info: ITopTimeframeInfo;
};

export interface IRecordTopTimeframe{
    Day: TopTimeframeRecordList;
    Week: TopTimeframeRecordList;
    Month: TopTimeframeRecordList;
    "6h": TopTimeframeRecordList;
    Year: TopTimeframeRecordList;
}

export interface IRawGroupData {
    data: IGroupSummary;
}

interface IGroupSummary {
    info: IGroupInfo;
    members: string[];
    leaders: string[];
}

interface IGroupInfo {
    id: number;
    name: string;
    youtube_link?: string;
    twitter_link?: string;
    twitch_link?: string;
    discord_link?: string;
    forum_link?: string;

    total_xp: number;
    average_xp: number;
    total_ehp: number;
    average_ehp: number;
    total_ehb: number;
    average_ehb: number;

    clan_type: string;
    clan_type_id: number;
    member_count: number;
}

interface TopTimeframeList{
    [i: string]: ITopTimeframePlayer;
}

interface TopTimeframeRecordList{
    [i: string]: ITopTimeframeRecordPlayer;
}

export interface IRawData
{
    data: PlayerStats;
}

export interface IRawPlayerInfo{
    data: PlayerInfo;
}

interface ITopTimeframeRecordPlayer extends ITopTimeframePlayer{
    video_url: Object;
    date: string;
}

interface ITopTimeframePlayer{
    player: string;
    nickname: string;
    xp: string;
    rank: number;
    country: string;
    icon_url: Object;
    icon_desc: Object;
    game_mode: number;
}

interface ITopTimeframeInfo{
    skill : string;
    skill_number : string;
    duration: "Day" | "Week" | "Month";
    start_date: number;
    end_date: number;
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
