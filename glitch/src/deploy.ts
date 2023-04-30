import { SlashCommandBuilder, REST, Routes } from "discord.js";
import { APIUser } from "discord-api-types/v10"
import fs from "node:fs";
import config from "../.config.json"

const commands: any[] = [];
const files = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of files) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

//登録用関数

const rest = new REST({ version: '10' }).setToken(config.token)
async function main() {
    await rest.put(
        Routes.applicationCommands("BOTのユーザーIDをコピーして貼り付ける"),
        { body: commands }
    )
}

main().catch(err => console.log(err))
