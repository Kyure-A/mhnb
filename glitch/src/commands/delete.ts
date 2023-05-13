import { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder } from "discord.js";
import axios, { isCancel, AxiosError } from "axios";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('指定した課題を削除します')
        .addIntegerOption(option =>
            option.setName("task_number")
                .setDescription("課題の番号")
                .setRequired(true)),

    execute: async function(interaction: any) {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName == "delete") {

            const task_number: number = await interaction.options.getInteger("task_number")

            const json = {
                "command": "delete",
                "task_number": task_number
            }

            await axios.post(process.env.gas_url!, json)
                .then(response => {
                    console.log(response.data);
                    interaction.reply(`課題 [${task_number}] が削除されました！`);
                    console.log("Modal is send.")
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }
}
