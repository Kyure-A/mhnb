"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('edit')
        .setDescription('指定した課題の内容を編集します'),
    execute: async function (interaction) {
    },
    modal: async function (interaction) {
    }
};
