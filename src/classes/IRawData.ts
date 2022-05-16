export interface IRawData
{
    data: PlayerStats;
}

interface PlayerInfo {

}

interface PlayerStats
{ 
    info: PlayerInfo
    date: string;
    
    Attack: number;
    Attack_rank : number;
    Attack_level : number;
    Attack_ehp : number;

    defence: number;
    defence_rank : number;
    defence_level : number;
    defence_ehp : number;

    strength: number;
    strength_rank : number;
    strength_level : number;
    strength_ehp : number;

    hitpoints: number;
    hitpoints_rank : number;
    hitpoints_level : number;
    hitpoints_ehp : number;

    ranged: number;
    ranged_rank : number;
    ranged_level : number;
    ranged_ehp : number;

    prayer: number;
    prayer_rank : number;
    prayer_level : number;
    prayer_ehp : number;

    magic: number;
    magic_rank : number;
    magic_level : number;
    magic_ehp : number;

    cooking: number;
    cooking_rank : number;
    cooking_level : number;
    cooking_ehp : number;

    woodcutting: number;
    woodcutting_rank : number;
    woodcutting_level : number;
    woodcutting_ehp : number;

    fletching: number;
    fletching_rank : number;
    fletching_level : number;
    fletching_ehp : number;

    fishing: number;
    fishing_rank : number;
    fishing_level : number;
    fishing_ehp : number;

    firemaking: number;
    firemaking_rank : number;
    firemaking_level : number;
    firemaking_ehp : number;

    crafting: number;
    crafting_rank : number;
    crafting_level : number;
    crafting_ehp : number;

    smithing: number;
    smithing_rank : number;
    smithing_level : number;
    smithing_ehp : number;

    mining: number;
    mining_rank : number;
    mining_level : number;
    mining_ehp : number;

    herblore: number;
    herblore_rank : number;
    herblore_level : number;
    herblore_ehp : number;

    agility: number;
    agility_rank : number;
    agility_level : number;
    agility_ehp : number;

    thieving: number;
    thieving_rank : number;
    thieving_level : number;
    thieving_ehp : number;

    slayer: number;
    slayer_rank : number;
    slayer_level : number;
    slayer_ehp : number;

    farming: number;
    farming_rank : number;
    farming_level : number;
    farming_ehp : number;

    runecraft: number;
    runecraft_rank : number;
    runecraft_level : number;
    runecraft_ehp : number;

    hunter: number;
    hunter_rank : number;
    hunter_level : number;
    hunter_ehp : number;

    construction: number;
    construction_rank : number;
    construction_level : number;
    construction_ehp : number;

    Ehp : number;
    Ehp_rank : number;
    Im_ehp : number;
    Lvl3_ehp : number;
    F2p_ehp : number;
}
