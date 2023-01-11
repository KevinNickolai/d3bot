import https from 'https';

export class BaseEndpointEnum {

    public path : string;

    constructor(path : string){
        this.path = path;
    }

}

export class TemplePlayerEndpointEnum extends BaseEndpointEnum {

    static PlayerInfo = new TemplePlayerEndpointEnum("player_info");
    static PlayerNames = new TemplePlayerEndpointEnum("player_names");
    static PlayerStats = new TemplePlayerEndpointEnum("player_stats");
    static PlayerGains = new TemplePlayerEndpointEnum("player_gains");
    static PlayerDatapoints = new TemplePlayerEndpointEnum("player_datapoints");
}

export class TempleGroupEndpointEnum extends BaseEndpointEnum {
    static GroupMembers = new TempleGroupEndpointEnum("groupmembers")
}

export default class TempleOSRS {

    private defaultHttpOptions: Object;

    constructor() {
        this.defaultHttpOptions = {
            hostname: "templeosrs.com",
            port: 443,
            headers: {
                'Accept': 'application/json'
            }
        }
    }

    QueryGroupMembers(groupID : number, endpoint : TempleGroupEndpointEnum) : Promise<Object>{
        return new Promise((resolve, reject) => {
            let options = {
                hostname: "templeosrs.com",
                port: 443,
                path: `/api/${endpoint.path}.php?id=${groupID}`,
                headers: {
                    'Accept': 'application/json'
                }
            };

            let req = https.get(options, res => {
                console.log(res.statusCode);

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
                    }
                });
            });
        })
    }

    AddDataPoint(rsn: string) {
        if(this.ValidateRSN(rsn)){
            let options = {
                hostname: "templeosrs.com",
                port: 443,
                path: `/php/add_datapoint.php?player=${encodeURI(rsn)}`
            };
            https.get(options, res => {
                console.log(`Status Code ${res.statusCode} for RSN ${rsn} on AddDataPoint.`);
            });
        }
    }

    QueryPlayerRSN(rsn : string, endpoint : TemplePlayerEndpointEnum) : Promise<Object>{

        return new Promise((resolve, reject) => {
            if(this.ValidateRSN(rsn)) {
                let options = {
                    hostname: "templeosrs.com",
                    port: 443,
                    path: `/api/${endpoint.path}.php?player=${encodeURI(rsn)}`,
                    headers: {
                        'Accept': 'application/json'
                    }
                };
    
                let req = https.get(options, res => {
                    console.log(res.statusCode);
    
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
                        }
                    });
                });
            }
            else{
                reject("Invalid RSN Provided.");
            }

            
        });


    }

    ValidateRSN(rsn: string) : boolean {

        if(rsn.length === 0 || rsn.length > 12) return false;

        return /^([a-zA-Z0-9 _-]{1,12})$/.test(rsn);

    }

}