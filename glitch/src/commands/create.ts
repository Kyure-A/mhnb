import { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create')
        .setDescription('新しい課題を作成します'),

    execute: async function(interaction: any) {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName == "create") {
            const modal = new ModalBuilder()
                .setCustomId("modal")
                .setTitle("課題入力フォーム");
            const homework_name = new TextInputBuilder()
                .setCustomId("homework_name")
                .setLabel("課題名")
                .setMinLength(1)
                .setMaxLength(30)
                .setStyle(TextInputStyle.Short);
            const subject_name = new TextInputBuilder()
                .setCustomId("subject_name")
                .setLabel("教科名 (シラバスに載っている正式名称で入力してください)")
                .setMinLength(1)
                .setMaxLength(20)
                .setStyle(TextInputStyle.Short);
            const month = new TextInputBuilder()
                .setCustomId("month")
                .setLabel("期限 (月)")
                .setPlaceholder("月を 1 - 12 で入力してください")
                .setMinLength(1)
                .setMaxLength(2)
                .setStyle(TextInputStyle.Short);
            const day = new TextInputBuilder()
                .setCustomId("day")
                .setLabel("期限 (日)")
                .setPlaceholder("日を 1 - 31 で入力してください")
                .setMinLength(1)
                .setMaxLength(2)
                .setStyle(TextInputStyle.Short);


            modal.addComponents(
                new ActionRowBuilder<TextInputBuilder>().addComponents(homework_name),
                new ActionRowBuilder<TextInputBuilder>().addComponents(subject_name),
                new ActionRowBuilder<TextInputBuilder>().addComponents(month),
                new ActionRowBuilder<TextInputBuilder>().addComponents(day),
            )

            await interaction.showModal(modal);
        }
    }
}
