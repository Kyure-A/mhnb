import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
<<<<<<< HEAD
require("dotenv").config();
=======
import { application_id, guild_id, token } from "../.config.json"
>>>>>>> a12db89e35ba6182b4c8baa249785316e4f48410

const create = require("commands/create")
const list = require("commands/list")
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
    console.log(`$Logined {c.user.tag}`);
});

<<<<<<< HEAD
client.login(process.env.token!);
=======
client.login(token);
>>>>>>> a12db89e35ba6182b4c8baa249785316e4f48410
