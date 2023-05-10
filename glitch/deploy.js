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
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const discord_js_1 = require("discord.js");
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
const create = require("./commands/create");
const list = require("./commands/list");
const commands = [
    create.data.toJSON(),
    list.data.toJSON()
];
const rest = new discord_js_1.REST({ version: '10' }).setToken(process.env.token);
async function main() {
    try {
        await rest.put(discord_js_1.Routes.applicationGuildCommands(process.env.application_id, process.env.guild_id), { body: commands });
        console.log("Successful! Your commands are deployed.");
    }
    catch (error) {
        console.error("An error occurred. Please check your code.");
    }
}
main().catch(err => console.log(err));
