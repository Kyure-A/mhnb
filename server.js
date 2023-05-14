"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const discord_js_1 = require("discord.js");
const create = require("./commands/create");
const list = require("./commands/list");
const del = require("./commands/delete"); // yoyakugo datta
const edit = require("./commands/edit");
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages, discord_js_1.GatewayIntentBits.MessageContent] });
client.once(discord_js_1.Events.ClientReady, () => {
    console.log("Ready");
});
// slash commands 
client.on(discord_js_1.Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand())
        return; // isSlashCommand 
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
    else {
        console.error(`${interaction.commandName} is not found`);
    }
});
// create (modal)
client.on(discord_js_1.Events.InteractionCreate, async (interaction) => {
    if (!interaction.isModalSubmit())
        return;
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
client.login(process.env.token);
