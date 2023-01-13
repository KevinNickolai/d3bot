"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const TempleOSRS_1 = __importStar(require("../classes/TempleOSRS"));
module.exports = (client) => {
    if (client.user) {
        console.log(`Logged in as ${client.user.tag}!`);
    }
    console.log(`Starting game across ${client.guilds.cache.size} servers.`);
    let tOsrs = new TempleOSRS_1.default();
    console.log(`Starting datapoint refresh service for District 3...`);
    setInterval(() => {
        tOsrs.QueryGroupMembers(config_1.DISTRICT3_TEMPLE_GROUPID, TempleOSRS_1.TempleGroupEndpointEnum.GroupMembers)
            .then((groupMembers) => {
            let rsns = Object.values(groupMembers);
            // timeout interval in seconds to execute requests to Temple's API
            const rateLimitInterval = 15000;
            /*
            * Set timeout for each RSN listed in the group
            */
            for (let i = 0; i < rsns.length; ++i) {
                let rsn = rsns[i];
                setTimeout(() => {
                    console.log(`Processing RSN ${rsn} to check updated datapoints...`);
                    // Query the Player's info
                    tOsrs.QueryPlayerRSN(rsn, TempleOSRS_1.TemplePlayerEndpointEnum.PlayerInfo)
                        .then((resultingJSON) => {
                        let pinfo = resultingJSON;
                        if (pinfo.data) {
                            let cooldown = parseInt(pinfo.data["Datapoint Cooldown"]);
                            if (isNaN(cooldown)) {
                                tOsrs.AddDataPoint(rsn);
                            }
                            else {
                                console.log(`Cooldown found on RSN ${rsn}; no update attempted.`);
                            }
                        }
                        else {
                            console.log(`RSN ${rsn} does not exist in temple and Cannot be refreshed.`);
                        }
                    })
                        .catch((error) => {
                        console.log(`Error processing user ${rsn} : ${error}`);
                    });
                }, rateLimitInterval * (i + 1));
            }
        })
            .catch((error) => {
            console.log(`Error processing groupID ${config_1.DISTRICT3_TEMPLE_GROUPID} : ${error}`);
        });
    }, 1000 * 60 * 60 * 24 * 3);
};
