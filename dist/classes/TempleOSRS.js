"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempleGroupEndpointEnum = exports.TemplePlayerEndpointEnum = exports.TempleCompetitiveCommunityEndpointEnum = exports.BaseEndpointEnum = void 0;
const https_1 = __importDefault(require("https"));
class BaseEndpointEnum {
    constructor(path) {
        this.path = path;
    }
}
exports.BaseEndpointEnum = BaseEndpointEnum;
class TempleCompetitiveCommunityEndpointEnum extends BaseEndpointEnum {
}
exports.TempleCompetitiveCommunityEndpointEnum = TempleCompetitiveCommunityEndpointEnum;
TempleCompetitiveCommunityEndpointEnum.CurrentTopDay = new TempleCompetitiveCommunityEndpointEnum("current_top/day");
TempleCompetitiveCommunityEndpointEnum.CurrentTopWeek = new TempleCompetitiveCommunityEndpointEnum("current_top/week");
TempleCompetitiveCommunityEndpointEnum.CurrentTopMonth = new TempleCompetitiveCommunityEndpointEnum("current_top/month");
TempleCompetitiveCommunityEndpointEnum.TopRecords = new TempleCompetitiveCommunityEndpointEnum("records");
class TemplePlayerEndpointEnum extends BaseEndpointEnum {
}
exports.TemplePlayerEndpointEnum = TemplePlayerEndpointEnum;
TemplePlayerEndpointEnum.PlayerInfo = new TemplePlayerEndpointEnum("player_info");
TemplePlayerEndpointEnum.PlayerNames = new TemplePlayerEndpointEnum("player_names");
TemplePlayerEndpointEnum.PlayerStats = new TemplePlayerEndpointEnum("player_stats");
TemplePlayerEndpointEnum.PlayerGains = new TemplePlayerEndpointEnum("player_gains");
TemplePlayerEndpointEnum.PlayerDatapoints = new TemplePlayerEndpointEnum("player_datapoints");
class TempleGroupEndpointEnum extends BaseEndpointEnum {
}
exports.TempleGroupEndpointEnum = TempleGroupEndpointEnum;
TempleGroupEndpointEnum.GroupMembers = new TempleGroupEndpointEnum("groupmembers");
class TempleOSRS {
    constructor() {
        this.defaultHttpOptions = {
            hostname: "templeosrs.com",
            port: 443,
            headers: {
                'Accept': 'application/json'
            }
        };
    }
    QueryCurrentTop(endpoint, groupID, skill = "ehp") {
        return new Promise((resolve, reject) => {
            let queryString = `?skill=${skill}`;
            if (typeof groupID !== 'undefined') {
                queryString += `&group=${groupID}`;
            }
            let options = {
                hostname: "templeosrs.com",
                port: 443,
                path: `/api/${endpoint.path}.php${queryString}`,
                headers: {
                    'Accept': 'application/json'
                }
            };
            let req = https_1.default.get(options, res => {
                let rawData = '';
                res.on('data', d => { rawData += d; });
                res.on('end', () => {
                    try {
                        const parsedData = JSON.parse(rawData);
                        console.log(parsedData);
                        resolve(JSON.parse(rawData));
                    }
                    catch (e) {
                        console.log(`Error: ${e.message}`);
                    }
                });
            });
        });
    }
    QueryGroupMembers(groupID, endpoint) {
        return new Promise((resolve, reject) => {
            let options = {
                hostname: "templeosrs.com",
                port: 443,
                path: `/api/${endpoint.path}.php?id=${groupID}`,
                headers: {
                    'Accept': 'application/json'
                }
            };
            let req = https_1.default.get(options, res => {
                console.log(res.statusCode);
                let rawData = '';
                res.on('data', d => { rawData += d; });
                res.on('end', () => {
                    try {
                        const parsedData = JSON.parse(rawData);
                        console.log(parsedData);
                        resolve(JSON.parse(rawData));
                    }
                    catch (e) {
                        console.log(`Error: ${e.message}`);
                    }
                });
            });
        });
    }
    AddDataPoint(rsn) {
        if (this.ValidateRSN(rsn)) {
            let options = {
                hostname: "templeosrs.com",
                port: 443,
                path: `/php/add_datapoint.php?player=${encodeURI(rsn)}`
            };
            https_1.default.get(options, res => {
                console.log(`Status Code ${res.statusCode} for RSN ${rsn} on AddDataPoint.`);
            });
        }
    }
    QueryPlayerRSN(rsn, endpoint) {
        return new Promise((resolve, reject) => {
            if (this.ValidateRSN(rsn)) {
                let options = {
                    hostname: "templeosrs.com",
                    port: 443,
                    path: `/api/${endpoint.path}.php?player=${encodeURI(rsn)}`,
                    headers: {
                        'Accept': 'application/json'
                    }
                };
                let req = https_1.default.get(options, res => {
                    console.log(res.statusCode);
                    let rawData = '';
                    res.on('data', d => { rawData += d; });
                    res.on('end', () => {
                        try {
                            const parsedData = JSON.parse(rawData);
                            console.log(parsedData);
                            resolve(JSON.parse(rawData));
                        }
                        catch (e) {
                            console.log(`Error: ${e.message}`);
                        }
                    });
                });
            }
            else {
                reject("Invalid RSN Provided.");
            }
        });
    }
    ValidateRSN(rsn) {
        if (rsn.length === 0 || rsn.length > 12)
            return false;
        return /^([a-zA-Z0-9 _-]{1,12})$/.test(rsn);
    }
}
exports.default = TempleOSRS;
