const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create')
        .setDescription('課題管理リストを作成します'),

    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName == "create") {
            const modal = new ModalBuilder()
                .setCustomId("modal")
                .setTitle("課題入力フォーム");
            const homework_name = new TextInputBuilder()
                .setCustomId("homework_name")
                .setLabel("課題名")
                .setStyle(TextInputStyle.Short);
            const subject_name = new TextInputBuilder()
                .setCustomId("subject_name")
                .setLabel("教科名 (シラバスに載っている正式名称で入力してください)")
                .setStyle(TextInputStyle.Short);
            const date = new TextInputBuilder()
                .setCustomId("date")
                .setLabel("期日 (mm/dd 形式で入力してください)")
                .setStyle(TextInputStyle.Short);

            modal.addComponents(
                new ActionRowBuilder().addComponents(homework_name),
                new ActionRowBuilder().addComponents(subject_name),
                new ActionRowBuilder().addComponents(date)
            )

            await interaction.showModal(modal);
        }
    }
}
