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
                .then(function(response) {

                    const fields = JSON.parse(response.data);
                    embed = new EmbedBuilder()
                        .setTitle("課題リスト")
                        .setFields(fields);

                    console.log("OK");
                })
                .catch(function(error) {
                    console.log(error);
                })

            await interaction.editReply({ embed: [embed] });
        }
    }
}
