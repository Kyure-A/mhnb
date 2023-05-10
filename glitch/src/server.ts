import * as dotenv from "dotenv";
dotenv.config();

import { Client, Collection, Events, GatewayIntentBits } from "discord.js";

const create = require("./commands/create");
const list = require("./commands/list");
const cdelete = require("./commands/delete"); // yoyakugo datta
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

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

    else if (interaction.commandName === cdelete.data.name) {

        try {
            await cdelete.execute(interaction);
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
client.on(Events.InteractionCreate, interaction => {
    if (!interaction.isModalSubmit()) return;

    // Get the data entered by the user
    const homework: string = interaction.fields.getTextInputValue("homework_name");
    const subject: string = interaction.fields.getTextInputValue("subject_name");
    const month: string = interaction.fields.getTextInputValue("month");
    const day: string = interaction.fields.getTextInputValue("day");

    const month_num: number = parseInt(month);
    const day_num: number = parseInt(day);

    const json = {
        "command": "create",
        "homework": homework,
        "subject": subject,
        "month": month_num,
        "day": day_num
    }
});

client.login(process.env.token!);
