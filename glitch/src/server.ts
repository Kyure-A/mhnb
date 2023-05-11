import * as dotenv from "dotenv";
dotenv.config();

import { Client, Collection, Events, GatewayIntentBits } from "discord.js";

const create = require("./commands/create");
const list = require("./commands/list");
const del = require("./commands/delete"); // yoyakugo datta

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once(Events.ClientReady, () => {
    console.log("Ready");
});


// slash commands 
client.on(Events.InteractionCreate, async interaction => {

    if (!interaction.isChatInputCommand()) return; // isSlashCommand 

    if (interaction.commandName === create.data.name) {

        try {
            await create.execute(interaction);
        }

        catch (error) {

            console.error(error);

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: "error", ephemeral: true });
            }

            else {
                await interaction.reply({ content: "error", ephemeral: true });
            }
        }
    }

    else if (interaction.commandName === list.data.name) {

        try {
            await list.execute(interaction);
        }

        catch (error) {

            console.error(error);

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: "error", ephemeral: true });
            }

            else {
                await interaction.reply({ content: "error", ephemeral: true });
            }
        }
    }

    else if (interaction.commandName === del.data.name) {

        try {
            await del.execute(interaction);
        }

        catch (error) {

            console.error(error);

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: "error", ephemeral: true });
            }

            else {
                await interaction.reply({ content: "error", ephemeral: true });
            }
        }
    }

    else {
        console.error(`${interaction.commandName} is not found`);
    }
});


// create (modal)
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isModalSubmit()) return;

    try {
        await create.modal(interaction);
        console.log("Modal is send.")
    }

    catch (error) {
        console.error(error);
    }
});

client.login(process.env.token!);
