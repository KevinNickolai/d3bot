import { Client, ClientOptions } from "discord.js";

export default class CommandClient extends Client {
    public commands: Map<string, any>;

    constructor(options: ClientOptions){
        super(options);
        this.commands = new Map<string, any>();
    }
}