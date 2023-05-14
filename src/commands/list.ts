import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import axios, { isCancel, AxiosError } from "axios";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('課題管理リストを表示します'),

    execute: async function(interaction: any) {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName == "list") {

            await interaction.deferReply();

            await axios.get(process.env.gas_url!, {
                params: {
                    command: "list"
                }
            })
                .then(response => {
                    const fields: Field[] = response.data;
                    const embeds: EmbedBuilder = new EmbedBuilder()
                        .setTitle("課題リスト")
                        .addFields(fields);
                    interaction.editReply({ embeds: [embeds] });
                })
                .catch(error => {
                    console.error(error);
                    interaction.editReply("axios in list.js threw error")
                });
        }
    }
}
