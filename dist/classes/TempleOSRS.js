"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempleEndpointEnum = void 0;
const https_1 = __importDefault(require("https"));
class TempleEndpointEnum {
    constructor(path) {
        this.path = path;
    }
}
exports.TempleEndpointEnum = TempleEndpointEnum;
TempleEndpointEnum.PlayerInfo = new TempleEndpointEnum("player_info");
TempleEndpointEnum.PlayerNames = new TempleEndpointEnum("player_names");
TempleEndpointEnum.PlayerStats = new TempleEndpointEnum("player_stats");
TempleEndpointEnum.PlayerGains = new TempleEndpointEnum("player_gains");
TempleEndpointEnum.PlayerDatapoints = new TempleEndpointEnum("player_datapoints");
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
    Query(rsn, endpoint) {
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
