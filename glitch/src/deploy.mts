import * as dotenv from "dotenv";
dotenv.config();
import { SlashCommandBuilder, REST, Routes } from "discord.js";
import fs from "node:fs";
import { APIUser } from "discord-api-types/v10"

const commands: any[] = [];
const files = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of files) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

//登録用関数

const rest = new REST({ version: '10' }).setToken(process.env.token!)

async function main() {
    await rest.put(
        Routes.applicationCommands(process.env.application_id!),
        { body: commands }
    )
}

main().catch(err => console.log(err))
