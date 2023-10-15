import * as Discord from "discord.js";
import TempleOSRS, { TemplePlayerEndpointEnum, ValidateRSN } from "../classes/TempleOSRS";
import { IRawData } from "../classes/IRawData";

module.exports = {
  name: "ehp",
  aliases: [],
  description: "See effective hours played.",
  usage: `<player name>`,
  args: false,
  execute(message: Discord.Message, args: string[]) {
    let tOsrs = new TempleOSRS();

    let playerName = args.shift()??(message.inGuild() ? message.member?.displayName : message.author.username);

    while (args.length !== 0) {
      playerName += " " + args.shift();
    }

    tOsrs
      .QueryPlayerRSN(playerName!, TemplePlayerEndpointEnum.PlayerStats)
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
        } else if(ValidateRSN(playerName!)) {
          message.reply(`Could not find info in TempleOSRS database for player ${playerName}...\nRequesting update...`)
          .then((replyMsg) => {
              tOsrs.AddDataPoint(playerName!)
              .then((success) => {
                  if(success) {
                      tOsrs.QueryPlayerRSN(playerName!, TemplePlayerEndpointEnum.PlayerStats)
                      .then((resultingJSON) => {
                        let pstats = resultingJSON as IRawData;
                
                        if (pstats.data) {
                          replyMsg.edit(
                            `${playerName}:` +
                `\n\t\tMain EHP: ${pstats.data.Ehp}` +
                `\n\t\t${pstats.data.Lvl3_ehp > 0 ? `Level 3 EHP: ${pstats.data.Lvl3_ehp}` : ""}`.trimEnd() +
                `\n\t\t${pstats.data.F2p_ehp > 0 ? `F2P EHP: ${pstats.data.F2p_ehp}` : "" }`.trimEnd() +
                `\n\t\t${pstats.data.Im_ehp > 0 ? `IM EHP: ${pstats.data.Im_ehp}` : "" }`.trimEnd() +
                `\n\t\t${pstats.data.Uim_ehp > 0 ? `UIM EHP ${pstats.data.Uim_ehp}` : "" }`.trimEnd()
                          );
                        } else {
                          replyMsg.edit(`Could not find info in TempleOSRS database for player ${playerName}.\nRequested update failed.`);
                        }
                      });
                  }
                  else{
                    replyMsg.edit(`Could not find info in TempleOSRS database for player ${playerName}.\nRequested update failed.`);
                  }
              });
          });
        } else {
          message.reply(`Could not validate RSN ${playerName}.`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
