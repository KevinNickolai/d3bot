"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (client) => {
    if (client.user) {
        console.log(`Logged in as ${client.user.tag}!`);
    }
    console.log(`Starting game across ${client.guilds.cache.size} servers.`);
};
