import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
require("dotenv").config();

const create = require("commands/create")
const list = require("commands/list")
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
    console.log(`$Logined {c.user.tag}`);
});

client.login(process.env.token!);


