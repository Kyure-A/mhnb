import { ActionRowBuilder, Client, Events, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import axios, { isCancel, AxiosError } from "axios";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('課題管理リストを表示します'),

    execute: async function(interaction: any) {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName == "list") {

            await interaction.deferReply();

            try {
                const response = await axios.get(process.env.gas_url!);

                const fields = await JSON.parse(response.data);
                const embed = new EmbedBuilder()
                    .setTitle("課題リスト")
                    .setFields(fields);
                await interaction.editReply({ embed: [embed] });
            }
            catch (error) {
                console.log(error);
            }
        }
    }
}
