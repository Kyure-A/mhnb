"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const discord_js_1 = require("discord.js");
const axios_1 = __importDefault(require("axios"));
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('create')
        .setDescription('新しい課題を作成します'),
    execute: async function (interaction) {
        if (!interaction.isChatInputCommand())
            return;
        if (interaction.commandName == "create") {
            const modal = new discord_js_1.ModalBuilder()
                .setCustomId("create")
                .setTitle("課題入力フォーム");
            const homework_name = new discord_js_1.TextInputBuilder()
                .setCustomId("homework_name")
                .setLabel("課題名")
                .setMinLength(1)
                .setMaxLength(30)
                .setStyle(discord_js_1.TextInputStyle.Short);
            const subject_name = new discord_js_1.TextInputBuilder()
                .setCustomId("subject_name")
                .setLabel("教科名")
                .setPlaceholder("シラバスに載っている正式名称で入力してください")
                .setMinLength(1)
                .setMaxLength(20)
                .setStyle(discord_js_1.TextInputStyle.Short);
            const month = new discord_js_1.TextInputBuilder()
                .setCustomId("month")
                .setLabel("期限 (月)")
                .setPlaceholder("月を 1 - 12 で入力してください")
                .setMinLength(1)
                .setMaxLength(2)
                .setStyle(discord_js_1.TextInputStyle.Short);
            const day = new discord_js_1.TextInputBuilder()
                .setCustomId("day")
                .setLabel("期限 (日)")
                .setPlaceholder("日を 1 - 31 で入力してください")
                .setMinLength(1)
                .setMaxLength(2)
                .setStyle(discord_js_1.TextInputStyle.Short);
            const description = new discord_js_1.TextInputBuilder()
                .setCustomId("description")
                .setLabel("説明")
                .setPlaceholder("")
                .setMinLength(1)
                .setMaxLength(100)
                .setStyle(discord_js_1.TextInputStyle.Paragraph);
            modal.addComponents(new discord_js_1.ActionRowBuilder().addComponents(homework_name), new discord_js_1.ActionRowBuilder().addComponents(subject_name), new discord_js_1.ActionRowBuilder().addComponents(month), new discord_js_1.ActionRowBuilder().addComponents(day), new discord_js_1.ActionRowBuilder().addComponents(description));
            await interaction.showModal(modal);
        }
    },
    modal: async function (interaction) {
        if (!interaction.isModalSubmit())
            return;
        // Get the data entered by the user
        const homework = await interaction.fields.getTextInputValue("homework_name");
        const subject = await interaction.fields.getTextInputValue("subject_name");
        const month = await interaction.fields.getTextInputValue("month");
        const day = await interaction.fields.getTextInputValue("day");
        const description = await interaction.fields.getTextInputValue("description");
        const json = {
            "command": "create",
            "homework": homework,
            "subject": subject,
            "month": month,
            "day": day,
            "description": description
        };
        await axios_1.default.post(process.env.gas_url, json)
            .then(response => {
            console.log(response.data);
            interaction.reply(`課題「${homework}」が追加されました！`);
            console.log("Modal is send.");
        })
            .catch(error => {
            console.error(error);
        });
    }
};
