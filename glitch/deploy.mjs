import * as dotenv from "dotenv";
dotenv.config();
import { REST, Routes } from "discord.js";
import fs from "node:fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const commands = [];
const files = fs.readdirSync('./commands').filter(file => file.endsWith('.mjs'));
for (const file of files) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}
//登録用関数
const rest = new REST({ version: '10' }).setToken(process.env.token);
async function main() {
    await rest.put(Routes.applicationGuildCommands(process.env.application_id, process.env.guild_id), { body: commands });
}
main().catch(err => console.log(err));
