"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('create')
        .setDescription('課題管理リストを作成します'),
    execute: async function (interaction) {
        if (!interaction.isChatInputCommand())
            return;
        if (interaction.commandName == "create") {
            const modal = new discord_js_1.ModalBuilder()
                .setCustomId("modal")
                .setTitle("課題入力フォーム");
            const homework_name = new discord_js_1.TextInputBuilder()
                .setCustomId("homework_name")
                .setLabel("課題名")
                .setStyle(discord_js_1.TextInputStyle.Short);
            const subject_name = new discord_js_1.TextInputBuilder()
                .setCustomId("subject_name")
                .setLabel("教科名 (シラバスに載っている正式名称で入力してください)")
                .setStyle(discord_js_1.TextInputStyle.Short);
            const date = new discord_js_1.TextInputBuilder()
                .setCustomId("date")
                .setLabel("期日 (mm/dd 形式で入力してください)")
                .setStyle(discord_js_1.TextInputStyle.Short);
            modal.addComponents(new discord_js_1.ActionRowBuilder().addComponents(homework_name), new discord_js_1.ActionRowBuilder().addComponents(subject_name), new discord_js_1.ActionRowBuilder().addComponents(date));
            await interaction.showModal(modal);
        }
    }
};
