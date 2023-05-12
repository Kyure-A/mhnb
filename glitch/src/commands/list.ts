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

            let embed;

            await axios.get(process.env.gas_url!)
                .then(response => {

                    const fields = JSON.parse(response.data);
                    embed = new EmbedBuilder()
                        .setTitle("課題リスト")
                        .setFields(fields);

                    console.log("/list is completed");
                })
                .catch(error => {
                    console.log(error);
                })

            interaction.editReply({ embed: [embed] });
        }
    }
}
