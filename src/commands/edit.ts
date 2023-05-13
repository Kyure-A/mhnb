import { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder } from "discord.js";
import axios, { isCancel, AxiosError } from "axios";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('edit')
        .setDescription('指定した課題の内容を編集します'),
    execute: async function(interaction: any) {

    },
    modal: async function(interaction: any) {

    }
}
