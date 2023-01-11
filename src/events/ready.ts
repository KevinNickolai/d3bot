import CommandClient from "../classes/CommandClient";
import { IRawPlayerInfo } from "../classes/IRawData";
import TempleOSRS, { TemplePlayerEndpointEnum, TempleGroupEndpointEnum } from "../classes/TempleOSRS";
module.exports = (client: CommandClient) => {

    if(client.user) {
        console.log(`Logged in as ${client.user.tag}!`);
    }

    console.log(`Starting game across ${client.guilds.cache.size} servers.`);

    const D3GroupID = 226;
    let tOsrs = new TempleOSRS();

    console.log(`Starting datapoint refresh service for District 3...`);

    setInterval(() => {
        tOsrs.QueryGroupMembers(D3GroupID, TempleGroupEndpointEnum.GroupMembers)
            .then((groupMembers) => {

                let rsns : string[] = Object.values(groupMembers);

                // timeout interval in seconds to execute requests to Temple's API
                const rateLimitInterval = 15000;

                /*
                * Set timeout for each RSN listed in the group
                */
                for(let i=0; i < rsns.length; ++i){
                    let rsn = rsns[i];
                    
                    setTimeout(() => {

                        console.log(`Processing RSN ${rsn} to check updated datapoints...`);

                        // Query the Player's info
                        tOsrs.QueryPlayerRSN(rsn, TemplePlayerEndpointEnum.PlayerInfo)
                                .then((resultingJSON) => {
                                let pinfo = resultingJSON as IRawPlayerInfo;

                                if(pinfo.data){
                                    let cooldown = parseInt(pinfo.data["Datapoint Cooldown"]);
                                    
                                    if(isNaN(cooldown)){
                                        tOsrs.AddDataPoint(rsn);
                                    }
                                    else{
                                        console.log(`Cooldown found on RSN ${rsn}; no update attempted.`);
                                    }
                                }
                                else{
                                    console.log(`RSN ${rsn} does not exist in temple and Cannot be refreshed.`);
                                }
                                })
                                .catch((error) => {
                                console.log(`Error processing user ${rsn} : ${error}`);
                                })
                    }, rateLimitInterval * (i + 1));
                }
            })
            .catch((error) => {
                console.log(`Error processing groupID ${D3GroupID} : ${error}`);
            });
    }, 1000 * 60 * 60 * 24 * 3)
}