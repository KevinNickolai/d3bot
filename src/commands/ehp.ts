import * as Discord from "discord.js";
import CommandClient from "../classes/CommandClient";
import TempleOSRS, { TempleEndpointEnum } from "../classes/TempleOSRS";
import https from "https";
import { IRawData } from "../classes/IRawData";

module.exports = {
  name: "ehp",
  aliases: [],
  description: "See effective hours played: ",
  args: true,
  execute(message: Discord.Message, args: string[]) {
    let tOsrs = new TempleOSRS();

    let playerName = args.shift();

    while (args.length !== 0) {
      playerName += " " + args.shift();
    }

    tOsrs
      .Query(playerName!, TempleEndpointEnum.PlayerStats)
      .then((resultingJSON) => {
        let pstats = resultingJSON as IRawData;

        if (pstats.data) {
          message.reply(
            `${playerName}:` +
`\n\t\tMain EHP: ${pstats.data.Ehp}` +
`\n\t\t${pstats.data.Lvl3_ehp > 0 ? `Level 3 EHP: ${pstats.data.Lvl3_ehp}` : ""}`.trimEnd() +
`\n\t\t${pstats.data.F2p_ehp > 0 ? `F2P EHP: ${pstats.data.F2p_ehp}` : "" }`.trimEnd() +
`\n\t\t${pstats.data.Im_ehp > 0 ? `IM EHP: ${pstats.data.Im_ehp}` : "" }`.trimEnd() +
`\n\t\t${pstats.data.Uim_ehp > 0 ? `UIM EHP ${pstats.data.Uim_ehp}` : "" }`.trimEnd()
          );
        } else {
          message.reply(
            `Could not find info in TempleOSRS database for player ${playerName}.`
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
