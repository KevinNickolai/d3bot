import https from 'https';

export enum TempleCompetitiveCommunityEndpointEnum{
    CurrentTopDay = "current_top/day",
    CurrentTopWeek = "current_top/week",
    CurrentTopMonth = "current_top/month",
    TopRecords = "records"
}

export enum TemplePlayerEndpointEnum {
    PlayerInfo = "player_info",
    PlayerNames = "player_names",
    PlayerStats = "player_stats",
    PlayerGains = "player_gains",
    PlayerDatapoints = "player_datapoints"
}

export enum TempleGroupEndpointEnum{
    GroupMembers = "groupmembers",
    GroupInfo = "group_info"
}

export function ValidateRSN(rsn: string) : boolean {
    return /^([a-zA-Z0-9 _-]{1,12})$/.test(rsn);
}

export default class TempleOSRS {

    private defaultHttpOptions: https.RequestOptions;

    constructor() {
        this.defaultHttpOptions = {
            hostname: "templeosrs.com",
            port: 443,
            headers: {
                'Accept': 'application/json'
            }
        }
    }

    private async GetRequest(options: https.RequestOptions) : Promise<Object> {
        return new Promise((resolve, reject) => {
            https.get(options, res => {
                let rawData = '';
    
                res.on('data', d => { rawData += d; });
    
                res.on('end', () => {
                    try {
                        const parsedData = JSON.parse(rawData);
                        console.log(parsedData);
                        resolve(JSON.parse(rawData));
                    }
                    catch (e: any){
                        console.log(`Error: ${e.message}`);
                        reject(e.message);
                    }
                });
            });
        });
    }

    async QueryCurrentTop(endpoint : TempleCompetitiveCommunityEndpointEnum, groupID? : number, skill : string = "ehp" ) : Promise<Object> {

        let queryString : string = `?skill=${skill}`;

        if(typeof groupID !== 'undefined'){
            queryString += `&group=${groupID}`;
        }

        const options = { ...this.defaultHttpOptions, ...{ path: `/api/${endpoint}.php${queryString}` } };

        return this.GetRequest(options);
    }

    async QueryGroupEndpoint(groupID : number, endpoint : TempleGroupEndpointEnum) : Promise<Object>{
        const options = { ...this.defaultHttpOptions, ...{ path: `/api/${endpoint}.php?id=${groupID}` } };

        return this.GetRequest(options);
    }

    AddDataPoint(rsn: string) {
        if(ValidateRSN(rsn)){

            const options = { ...this.defaultHttpOptions, ...{ path: `/php/add_datapoint.php?player=${encodeURI(rsn)}` } };

            https.get(options, res => {
                console.log(`Status Code ${res.statusCode} for RSN ${rsn} on AddDataPoint.`);
            });
        }
    }

    QueryPlayerRSN(rsn: string, endpoint : TemplePlayerEndpointEnum) : Promise<Object>{

        if(ValidateRSN(rsn)){
            const options = { ...this.defaultHttpOptions, ...{ path: `/api/${endpoint}.php?player=${encodeURI(rsn)}` } };

            return this.GetRequest(options);
        }

        return Promise.resolve({});

    }



}