"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const axios_1 = __importDefault(require("axios"));
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('edit')
        .setDescription('指定した課題の内容を編集します')
        .addIntegerOption(option => option.setName("task_number")
        .setDescription("課題の番号")
        .setRequired(true)),
    execute: async function (interaction) {
        if (!interaction.isChatInputCommand())
            return;
        if (interaction.commandName == "edit") {
            const task_number = await interaction.options.getInteger("task_number");
            const task_str = String(task_number);
            await axios_1.default.get(process.env.gas_url, {
                params: {
                    "command": "edit",
                    "task_number": task_str
                }
            })
                .then(response => {
                const json = response.data;
                const modal = new discord_js_1.ModalBuilder()
                    .setCustomId("edit")
                    .setTitle("課題入力フォーム");
                const task = new discord_js_1.TextInputBuilder()
                    .setCustomId("task_number")
                    .setLabel("課題番号（変更しないでください）")
                    .setMinLength(1)
                    .setMaxLength(2)
                    .setStyle(discord_js_1.TextInputStyle.Short)
                    .setValue(String(task_number));
                const homework_name = new discord_js_1.TextInputBuilder()
                    .setCustomId("homework_name")
                    .setLabel("課題名")
                    .setMinLength(1)
                    .setMaxLength(30)
                    .setStyle(discord_js_1.TextInputStyle.Short)
                    .setValue(json.homework);
                const subject_name = new discord_js_1.TextInputBuilder()
                    .setCustomId("subject_name")
                    .setLabel("教科名")
                    .setPlaceholder("シラバスに載っている正式名称で入力してください")
                    .setMinLength(1)
                    .setMaxLength(20)
                    .setStyle(discord_js_1.TextInputStyle.Short)
                    .setValue(json.subject);
                const month = new discord_js_1.TextInputBuilder()
                    .setCustomId("month")
                    .setLabel("期限 (月)")
                    .setPlaceholder("月を 1 - 12 で入力してください")
                    .setMinLength(1)
                    .setMaxLength(2)
                    .setStyle(discord_js_1.TextInputStyle.Short)
                    .setValue(json.month);
                const day = new discord_js_1.TextInputBuilder()
                    .setCustomId("day")
                    .setLabel("期限 (日)")
                    .setPlaceholder("日を 1 - 31 で入力してください")
                    .setMinLength(1)
                    .setMaxLength(2)
                    .setStyle(discord_js_1.TextInputStyle.Short)
                    .setValue(json.day);
                const description = new discord_js_1.TextInputBuilder()
                    .setCustomId("description")
                    .setLabel("説明")
                    .setPlaceholder("")
                    .setMinLength(1)
                    .setMaxLength(100)
                    .setStyle(discord_js_1.TextInputStyle.Paragraph)
                    .setValue(json.description);
                modal.addComponents(new discord_js_1.ActionRowBuilder().addComponents(task), new discord_js_1.ActionRowBuilder().addComponents(homework_name), new discord_js_1.ActionRowBuilder().addComponents(subject_name), new discord_js_1.ActionRowBuilder().addComponents(month), new discord_js_1.ActionRowBuilder().addComponents(day), new discord_js_1.ActionRowBuilder().addComponents(description));
                interaction.showModal(modal);
            })
                .catch(error => {
                console.error(error);
                interaction.editReply("axios in edit.js threw error");
            });
        }
    },
    modal: async function (interaction) {
        const task_number = await interaction.fields.getTextInputValue("task_number");
        const homework = await interaction.fields.getTextInputValue("homework_name");
        const subject = await interaction.fields.getTextInputValue("subject_name");
        const month = await interaction.fields.getTextInputValue("month");
        const day = await interaction.fields.getTextInputValue("day");
        const description = await interaction.fields.getTextInputValue("description");
        const json = {
            "command": "edit",
            "task_number": task_number,
            "homework": homework,
            "subject": subject,
            "month": month,
            "day": day,
            "description": description
        };
        await axios_1.default.post(process.env.gas_url, json)
            .then(response => {
            console.log(response.data);
            interaction.reply(`課題「${homework}」が編集されました！`);
            console.log("Modal is send.");
        })
            .catch(error => {
            console.error(error);
        });
    }
};
