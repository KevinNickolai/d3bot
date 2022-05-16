import https from 'https';

export class TempleEndpointEnum {

    static PlayerInfo = new TempleEndpointEnum("player_info");
    static PlayerNames = new TempleEndpointEnum("player_names");
    static PlayerStats = new TempleEndpointEnum("player_stats");
    static PlayerGains = new TempleEndpointEnum("player_gains");
    static PlayerDatapoints = new TempleEndpointEnum("player_datapoints");

    public path: string;

    constructor(path : string){
        this.path = path;
    }
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

    Query(rsn : string, endpoint : TempleEndpointEnum) : Promise<Object>{

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