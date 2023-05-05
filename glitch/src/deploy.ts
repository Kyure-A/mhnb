import * as dotenv from "dotenv";
dotenv.config();

import { SlashCommandBuilder, REST, Routes } from "discord.js";
import { APIUser } from "discord-api-types/v10"
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

const create = require("./commands/create");
const list = require("./commands/list");

const commands: any[] = [
    create.data.toJSON(),
    list.data.toJSON()
];

//登録用関数

const rest = new REST({ version: '10' }).setToken(process.env.token!)

async function main() {
    await rest.put(
        Routes.applicationGuildCommands(process.env.application_id!, process.env.guild_id!),
        { body: commands }
    )
}

main().catch(err => console.log(err))
