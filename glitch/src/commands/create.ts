import * as dotenv from "dotenv";
dotenv.config();

import { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder } from "discord.js";
import axios, { isCancel, AxiosError } from "axios";
import { describe } from "node:test";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create')
        .setDescription('新しい課題を作成します'),

    execute: async function(interaction: any) {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName == "create") {
            const modal: ModalBuilder = new ModalBuilder()
                .setCustomId("create")
                .setTitle("課題入力フォーム");
            const homework_name: TextInputBuilder = new TextInputBuilder()
                .setCustomId("homework_name")
                .setLabel("課題名")
                .setMinLength(1)
                .setMaxLength(30)
                .setStyle(TextInputStyle.Short);
            const subject_name: TextInputBuilder = new TextInputBuilder()
                .setCustomId("subject_name")
                .setLabel("教科名")
                .setPlaceholder("シラバスに載っている正式名称で入力してください")
                .setMinLength(1)
                .setMaxLength(20)
                .setStyle(TextInputStyle.Short);
            const month: TextInputBuilder = new TextInputBuilder()
                .setCustomId("month")
                .setLabel("期限 (月)")
                .setPlaceholder("月を 1 - 12 で入力してください")
                .setMinLength(1)
                .setMaxLength(2)
                .setStyle(TextInputStyle.Short);
            const day: TextInputBuilder = new TextInputBuilder()
                .setCustomId("day")
                .setLabel("期限 (日)")
                .setPlaceholder("日を 1 - 31 で入力してください")
                .setMinLength(1)
                .setMaxLength(2)
                .setStyle(TextInputStyle.Short);
            const description: TextInputBuilder = new TextInputBuilder()
                .setCustomId("description")
                .setLabel("説明")
                .setPlaceholder("")
                .setMinLength(1)
                .setMaxLength(100)
                .setStyle(TextInputStyle.Paragraph);


            modal.addComponents(
                new ActionRowBuilder<TextInputBuilder>().addComponents(homework_name),
                new ActionRowBuilder<TextInputBuilder>().addComponents(subject_name),
                new ActionRowBuilder<TextInputBuilder>().addComponents(month),
                new ActionRowBuilder<TextInputBuilder>().addComponents(day),
                new ActionRowBuilder<TextInputBuilder>().addComponents(description),
            )

            await interaction.showModal(modal);
        }
    },

    modal: async function(interaction: any) {
        if (!interaction.isModalSubmit()) return;

        // Get the data entered by the user
        const homework: string = await interaction.fields.getTextInputValue("homework_name");
        const subject: string = await interaction.fields.getTextInputValue("subject_name");
        const month: string = await interaction.fields.getTextInputValue("month");
        const day: string = await interaction.fields.getTextInputValue("day");
        const description: string = await interaction.fields.getTextInputValue("description");

        const json: JsonCreate = {
            "command": "create",
            "homework": homework,
            "subject": subject,
            "month": month,
            "day": day,
            "description": description
        }

        await axios.post(process.env.gas_url!, json)
            .then(response => {
                console.log(response.data);
                interaction.reply(`課題「${homework}」が追加されました！`);
                console.log("Modal is send.")
            })
            .catch(error => {
                console.error(error);
            })
    }
}
