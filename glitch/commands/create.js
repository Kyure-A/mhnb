"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('create')
        .setDescription('新しい課題を作成します'),
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
            const month = new discord_js_1.TextInputBuilder()
                .setCustomId("month")
                .setLabel("期限 (月)")
                .setPlaceholder("月を 1 - 12 で入力してください")
                .setStyle(discord_js_1.TextInputStyle.Short);
            const day = new discord_js_1.TextInputBuilder()
                .setCustomId("day")
                .setLabel("期限 (日)")
                .setPlaceholder("日を 1 - 31 で入力してください")
                .setStyle(discord_js_1.TextInputStyle.Short);
            modal.addComponents(new discord_js_1.ActionRowBuilder().addComponents(homework_name), new discord_js_1.ActionRowBuilder().addComponents(subject_name), new discord_js_1.ActionRowBuilder().addComponents(month), new discord_js_1.ActionRowBuilder().addComponents(day));
            await interaction.showModal(modal);
        }
    }
};
