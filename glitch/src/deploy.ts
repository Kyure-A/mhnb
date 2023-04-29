// コマンド設定部分
const { SlashCommandBuilder } = require("discord.js");
const { APIUser } = require('discord-api-types/v10');
const { REST, Routes } = require("discord.js");
const fs = require('node:fs');

const commands = [];
const files = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of files) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

//登録用関数

const rest = new REST({ version: '10' }).setToken(process.env.token)
async function main() {
    await rest.put(
        Routes.applicationCommands("BOTのユーザーIDをコピーして貼り付ける"),
        { body: commands }
    )
}

main().catch(err => console.log(err))
