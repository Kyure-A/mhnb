"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('delete')
        .setDescription('指定した課題を削除します'),
    execute: async function (interaction) {
        if (!interaction.isChatInputCommand())
            return;
        if (interaction.commandName == "delete") {
        }
    }
};
