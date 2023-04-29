// コマンド設定部分
const { SlashCommandBuilder } = require("discord.js");
const { APIUser } = require('discord-api-types/v10');
const { REST, Routes } = require("discord.js")

const create = new SlashCommandBuilder()
    .setName('create')
    .setDescription('あなた用の課題管理リストを作成します')

//0.13.0以降
const list = new SlashCommandBuilder()
    .setName('list')
    .setDescription('課題管理リストを表示します．global を引数に入れることで全体の課題管理リストを表示できます．')
    .addStringOption(option =>
        option
            .setName('language')
            .setDescription('global を引数に入れることで全体の課題管理リストを表示できます．')
            .setRequired(false) //trueで必須、falseで任意
            .addChoices(
                { name: 'global', value: 'global' }
            )
    );

const commands = [create, list]

//登録用関数

const rest = new REST({ version: '10' }).setToken(process.env.token)
async function main() {
    await rest.put(
        Routes.applicationCommands("BOTのユーザーIDをコピーして貼り付ける"),
        { body: commands }
    )
}

main().catch(err => console.log(err))
