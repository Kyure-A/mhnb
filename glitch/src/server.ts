import * as dotenv from "dotenv";
dotenv.config();

import { Client, Collection, Events, GatewayIntentBits } from "discord.js";

const create = require("commands/create");
const list = require("commands/list");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, () => {
    console.log("Ready");
});

client.on(Events.InteractionCreate, async interaction => {

    if (!interaction.isChatInputCommand()) return; // isSlashCommand 

    if (interaction.commandName === create.data.name) {
        try {
            await create.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: "errored", ephemeral: true });
            } else {
                await interaction.reply({ content: "errored", ephemeral: true });
            }
        }
    }

    if (interaction.commandName === list.data.name) {
        try {
            await list.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: "errored", ephemeral: true });
            } else {
                await interaction.reply({ content: "errored", ephemeral: true });
            }
        }
    }

    else {
        console.error(`${interaction.commandName} is not found`);
    }
});

client.login(process.env.token!);
