const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('課題管理リストを表示します'),

    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName == "list") {

        }
    }
}
