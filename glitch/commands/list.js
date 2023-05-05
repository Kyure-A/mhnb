"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = void 0;
const discord_js_1 = require("discord.js");
exports.list = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('list')
        .setDescription('課題管理リストを表示します'),
    execute: async function (interaction) {
        if (!interaction.isChatInputCommand())
            return;
        if (interaction.commandName == "list") {
        }
    }
};
