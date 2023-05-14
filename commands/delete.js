"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const axios_1 = __importDefault(require("axios"));
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('delete')
        .setDescription('指定した課題を削除します')
        .addIntegerOption(option => option.setName("task_number")
        .setDescription("課題の番号")
        .setRequired(true)),
    execute: async function (interaction) {
        if (!interaction.isChatInputCommand())
            return;
        if (interaction.commandName == "delete") {
            const task_number = await interaction.options.getInteger("task_number");
            const json = {
                "command": "delete",
                "task_number": task_number
            };
            await axios_1.default.post(process.env.gas_url, json)
                .then(response => {
                console.log(response.data);
                interaction.reply(`課題 [${task_number}] が削除されました！`);
                console.log("Modal is send.");
            })
                .catch(error => {
                console.error(error);
            });
        }
    }
};
