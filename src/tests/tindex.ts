import { MessageComponentInteraction } from "discord.js";
import client from "../client";
import * as config from '../config'

main();

async function main() {
    Promise.all([client.login(config.testBotToken)]).then(() => {
        console.log("Logged in as Test Bot!");
    });
}