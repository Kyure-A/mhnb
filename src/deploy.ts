import * as dotenv from "dotenv";
dotenv.config();

import { REST, Routes } from "discord.js";

const create = require("./commands/create");
const list = require("./commands/list");
const del = require("./commands/delete");
const edit = require("./commands/edit");

const commands: any[] = [
    create.data.toJSON(),
    list.data.toJSON(),
    del.data.toJSON(),
    edit.data.toJSON()
];

const rest = new REST({ version: '10' }).setToken(process.env.token!)

async function main() {
    try {
        await rest.put(
            Routes.applicationGuildCommands(process.env.application_id!, process.env.guild_id!),
            { body: commands }
        );

        console.log("Successful! Commands are deployed.")
    }
    catch (error) {
        console.error("An error occurred. Please check code.")
    }
}

main().catch(err => console.log(err))
