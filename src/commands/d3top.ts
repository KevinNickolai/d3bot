import * as Discord from "discord.js";
import CommandClient from "../classes/CommandClient";
import TempleOSRS, { TemplePlayerEndpointEnum } from "../classes/TempleOSRS";
import https from 'https';
import { IRawData } from "../classes/IRawData";


module.exports = {
    name: 'd3top',
    aliases: ['top', 'd3rank'],
    description: "See top District 3 players over the past Month, Week, or Day",
    args: true,
    execute(message: Discord.Message, args: string[]){

        // let tOsrs = new TempleOSRS();

        // let playerName = args.shift();

        // while(args.length !== 0){
        //     playerName += " " + args.shift();
        // }

        // tOsrs.Query(playerName!, TempleEndpointEnum.PlayerStats)
        // .then((resultingJSON) => {

        // })
        // .catch((error) => {
        //     console.log(error);
        // });
    }
}