"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateRSN = exports.TempleGroupEndpointEnum = exports.TemplePlayerEndpointEnum = exports.TempleCompetitiveCommunityEndpointEnum = void 0;
const https_1 = __importDefault(require("https"));
var TempleCompetitiveCommunityEndpointEnum;
(function (TempleCompetitiveCommunityEndpointEnum) {
    TempleCompetitiveCommunityEndpointEnum["CurrentTopDay"] = "current_top/day";
    TempleCompetitiveCommunityEndpointEnum["CurrentTopWeek"] = "current_top/week";
    TempleCompetitiveCommunityEndpointEnum["CurrentTopMonth"] = "current_top/month";
    TempleCompetitiveCommunityEndpointEnum["TopRecords"] = "records";
})(TempleCompetitiveCommunityEndpointEnum = exports.TempleCompetitiveCommunityEndpointEnum || (exports.TempleCompetitiveCommunityEndpointEnum = {}));
var TemplePlayerEndpointEnum;
(function (TemplePlayerEndpointEnum) {
    TemplePlayerEndpointEnum["PlayerInfo"] = "player_info";
    TemplePlayerEndpointEnum["PlayerNames"] = "player_names";
    TemplePlayerEndpointEnum["PlayerStats"] = "player_stats";
    TemplePlayerEndpointEnum["PlayerGains"] = "player_gains";
    TemplePlayerEndpointEnum["PlayerDatapoints"] = "player_datapoints";
})(TemplePlayerEndpointEnum = exports.TemplePlayerEndpointEnum || (exports.TemplePlayerEndpointEnum = {}));
var TempleGroupEndpointEnum;
(function (TempleGroupEndpointEnum) {
    TempleGroupEndpointEnum["GroupMembers"] = "groupmembers";
    TempleGroupEndpointEnum["GroupInfo"] = "group_info";
})(TempleGroupEndpointEnum = exports.TempleGroupEndpointEnum || (exports.TempleGroupEndpointEnum = {}));
function ValidateRSN(rsn) {
    return /^([a-zA-Z0-9 _-]{1,12})$/.test(rsn);
}
exports.ValidateRSN = ValidateRSN;
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
    async GetRequest(options) {
        return new Promise((resolve, reject) => {
            https_1.default.get(options, res => {
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
                        reject(e.message);
                    }
                });
            });
        });
    }
    async QueryCurrentTop(endpoint, groupID, skill = "ehp") {
        let queryString = `?skill=${skill}`;
        if (typeof groupID !== 'undefined') {
            queryString += `&group=${groupID}`;
        }
        const options = { ...this.defaultHttpOptions, ...{ path: `/api/${endpoint}.php${queryString}` } };
        return this.GetRequest(options);
    }
    async QueryGroupEndpoint(groupID, endpoint) {
        const options = { ...this.defaultHttpOptions, ...{ path: `/api/${endpoint}.php?id=${groupID}` } };
        return this.GetRequest(options);
    }
    AddDataPoint(rsn) {
        if (ValidateRSN(rsn)) {
            const options = { ...this.defaultHttpOptions, ...{ path: `/php/add_datapoint.php?player=${encodeURI(rsn)}` } };
            https_1.default.get(options, res => {
                console.log(`Status Code ${res.statusCode} for RSN ${rsn} on AddDataPoint.`);
            });
        }
    }
    QueryPlayerRSN(rsn, endpoint) {
        if (ValidateRSN(rsn)) {
            const options = { ...this.defaultHttpOptions, ...{ path: `/api/${endpoint}.php?player=${encodeURI(rsn)}` } };
            return this.GetRequest(options);
        }
        return Promise.resolve({});
    }
}
exports.default = TempleOSRS;
