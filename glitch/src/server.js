import { Client, Events, GatewayIntentBits } from "discord.js";
import { token } from "../.config.json";
const create = require("commands/create");
const list = require("commands/list");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.once(Events.ClientReady, c => {
    console.log(`$Logined {c.user.tag}`);
});
client.login(token);
