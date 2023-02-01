import * as Discord from "discord.js";
import { IRawGroupData } from "../classes/IRawData";
import TempleOSRS, { TempleGroupEndpointEnum } from "../classes/TempleOSRS";
import { DISTRICT3_TEMPLE_GROUPID } from "../config";

module.exports = {
    name: "d3overall",
    aliases: ['d3o', 'overall', 'summary'],
    description: "See a summary of the overall District 3 stats.",
    usage: ``,
    args: false,
    execute(message: Discord.Message, args: string[]) {
        let tOsrs = new TempleOSRS();

        tOsrs.QueryGroupEndpoint(DISTRICT3_TEMPLE_GROUPID, TempleGroupEndpointEnum.GroupInfo)
            .then((resultingJSON) => {
                const result = (resultingJSON as IRawGroupData).data;
                
                if(result.info){

                    const formatter = Intl.NumberFormat("en-US", {
                        notation: "compact",
                        compactDisplay: "short"
                    })

                    const totalColumnPad = Math.max("Total".length,
                                                    formatter.format(result.info.total_xp).length,
                                                    formatter.format(result.info.total_ehp).length,
                                                    formatter.format(result.info.total_ehb).length);

                    const avgColumnPad = Math.max("Average".length,
                                                    formatter.format(result.info.average_xp).length,
                                                    formatter.format(result.info.average_ehp).length,
                                                    formatter.format(result.info.average_ehb).length);

                    message.reply(
                        `${result.info.name}:
Clan Type: ${result.info.clan_type} with ${result.info.member_count} members.
\`\`\`${"".padEnd(4)}\t${"Total".padEnd(totalColumnPad)}\t${"Average".padEnd(avgColumnPad)}
${"XP:".padStart(4)}\t${formatter.format(result.info.total_xp).padEnd(totalColumnPad)}\t${formatter.format(result.info.average_xp).padEnd(avgColumnPad)}
${"EHP:"}\t${formatter.format(result.info.total_ehp).padEnd(totalColumnPad)}\t${formatter.format(result.info.average_ehp).padEnd(avgColumnPad)}
${"EHB:"}\t${formatter.format(result.info.total_ehb).padEnd(totalColumnPad)}\t${formatter.format(result.info.average_ehb).padEnd(avgColumnPad)}\`\`\``
                    );
                }
            });
        
    }
};
