"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const axios_1 = __importDefault(require("axios"));
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('list')
        .setDescription('課題管理リストを表示します'),
    execute: async function (interaction) {
        if (!interaction.isChatInputCommand())
            return;
        if (interaction.commandName == "list") {
            await interaction.deferReply();
            let embed;
            await axios_1.default.get(process.env.gas_url)
                .then(function (response) {
                const fields = JSON.parse(response.data);
                embed = new discord_js_1.EmbedBuilder()
                    .setTitle("課題リスト")
                    .setFields(fields);
                console.log("OK");
            })
                .catch(function (error) {
                console.log(error);
            });
            interaction.editReply({ embed: [embed] });
        }
    }
};
