import * as dotenv from "dotenv";
dotenv.config();

import { Client, Collection, Events, GatewayIntentBits } from "discord.js";

const create = require("commands/create");
const list = require("commands/list");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, () => {
    console.log("Ready");
});

client.login(process.env.token!);


