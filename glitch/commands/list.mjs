import { SlashCommandBuilder } from "discord.js";
module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('課題管理リストを表示します'),
    execute: async function (interaction) {
        if (!interaction.isChatInputCommand())
            return;
        if (interaction.commandName == "list") {
        }
    }
};