import * as dotenv from "dotenv";
dotenv.config();

import { Client, Events, GatewayIntentBits } from "discord.js";

const create = require("./commands/create");
const list = require("./commands/list");
const del = require("./commands/delete"); // yoyakugo datta
const edit = require("./commands/edit");

const client: Client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

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
                await interaction.followUp({ content: "返信または応答準備中にエラーが発生しました", ephemeral: true });
            }

            else {
                await interaction.reply({ content: "何もできませんでした", ephemeral: true });
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
                await interaction.followUp({ content: "返信または応答準備中にエラーが発生しました", ephemeral: true });
            }

            else {
                await interaction.reply({ content: "何もできませんでした", ephemeral: true });
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
                await interaction.followUp({ content: "返信または応答準備中にエラーが発生しました", ephemeral: true });
            }

            else {
                await interaction.reply({ content: "何もできませんでした", ephemeral: true });
            }
        }
    }

    else if (interaction.commandName === edit.data.name) {

        try {
            await edit.execute(interaction);
        }

        catch (error) {

            console.error(error);

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: "返信または応答準備中にエラーが発生しました", ephemeral: true });
            }

            else {
                await interaction.reply({ content: "何もできませんでした", ephemeral: true });
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

    if (interaction.customId === "create") {
        try {
            await create.modal(interaction);
        }

        catch (error) {
            console.error(error);
        }
    }

    if (interaction.customId === "edit") {
        try {
            await edit.modal(interaction);
        }

        catch (error) {
            console.error(error);
        }
    }
});

client.login(process.env.token!);
