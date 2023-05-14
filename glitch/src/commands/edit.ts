import { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder } from "discord.js";
import axios, { isCancel, AxiosError } from "axios";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('edit')
        .setDescription('指定した課題の内容を編集します')
        .addIntegerOption(option =>
            option.setName("task_number")
                .setDescription("課題の番号")
                .setRequired(true)),

    execute: async function(interaction: any) {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName == "edit") {

            const task_number: number = await interaction.options.getInteger("task_number")

<<<<<<< HEAD
            await axios.get(process.env.gas_url!, {
                params: {
                    command: "edit",
                    task_number: task_number
                }
            })
=======
            await axios.get(process.env.gas_url!)
>>>>>>> 4c3e6766af094af1d1860285433bb85025145048
                .then(response => {
                    const json = response.data;

                    const modal: ModalBuilder = new ModalBuilder()
                        .setCustomId("edit")
                        .setTitle("課題入力フォーム");
                    const homework_name: TextInputBuilder = new TextInputBuilder()
                        .setCustomId("homework_name")
                        .setLabel("課題名")
                        .setMinLength(1)
                        .setMaxLength(30)
                        .setStyle(TextInputStyle.Short)
                        .setValue(json.homework);
                    const subject_name: TextInputBuilder = new TextInputBuilder()
                        .setCustomId("subject_name")
                        .setLabel("教科名")
                        .setPlaceholder("シラバスに載っている正式名称で入力してください")
                        .setMinLength(1)
                        .setMaxLength(20)
                        .setStyle(TextInputStyle.Short)
                        .setValue(json.subject);
                    const month: TextInputBuilder = new TextInputBuilder()
                        .setCustomId("month")
                        .setLabel("期限 (月)")
                        .setPlaceholder("月を 1 - 12 で入力してください")
                        .setMinLength(1)
                        .setMaxLength(2)
                        .setStyle(TextInputStyle.Short)
                        .setValue(json.month);
                    const day: TextInputBuilder = new TextInputBuilder()
                        .setCustomId("day")
                        .setLabel("期限 (日)")
                        .setPlaceholder("日を 1 - 31 で入力してください")
                        .setMinLength(1)
                        .setMaxLength(2)
                        .setStyle(TextInputStyle.Short)
                        .setValue(json.day);
                    const description: TextInputBuilder = new TextInputBuilder()
                        .setCustomId("description")
                        .setLabel("説明")
                        .setPlaceholder("")
                        .setMinLength(1)
                        .setMaxLength(100)
                        .setStyle(TextInputStyle.Paragraph)
                        .setValue(json.description);

                    modal.addComponents(
                        new ActionRowBuilder<TextInputBuilder>().addComponents(homework_name),
                        new ActionRowBuilder<TextInputBuilder>().addComponents(subject_name),
                        new ActionRowBuilder<TextInputBuilder>().addComponents(month),
                        new ActionRowBuilder<TextInputBuilder>().addComponents(day),
                        new ActionRowBuilder<TextInputBuilder>().addComponents(description),
                    )

                    interaction.showModal(modal);
                })
                .catch(error => {
                    console.error(error);
                    interaction.editReply("axios in edit.js threw error")
                });
        }

    },
    modal: async function(interaction: any) {
        const homework: string = await interaction.fields.getTextInputValue("homework_name");
        const subject: string = await interaction.fields.getTextInputValue("subject_name");
        const month: string = await interaction.fields.getTextInputValue("month");
        const day: string = await interaction.fields.getTextInputValue("day");
        const description: string = await interaction.fields.getTextInputValue("description");

        const json = {
            "command": "edit",
            "homework": homework,
            "subject": subject,
            "month": month,
            "day": day,
            "description": description
        }

        await axios.post(process.env.gas_url!, json)
            .then(response => {
                console.log(response.data);
                interaction.reply(`課題「${homework}」が編集されました！`);
                console.log("Modal is send.")
            })
            .catch(error => {
                console.error(error);
            })
    }
}
