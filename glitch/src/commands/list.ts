import { ActionRowBuilder, Client, Events, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import axios, { isCancel, AxiosError } from "axios";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('課題管理リストを表示します'),

    execute: async function(interaction: any) {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName == "list") {

            try {
                const fields = await axios.get(process.env.gas_url!).data;
                const embed = new EmbedBuilder()
                    .setTitle("")
                    .setFields(fields);
            }
            catch (error) {
                console.error(error);
            }
        }
    }
}
