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
const node_fs_1 = __importDefault(require("node:fs"));
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
const commands = [];
const files = node_fs_1.default.readdirSync('./commands').filter(file => file.endsWith('.mjs'));
for (const file of files) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}
//登録用関数
const rest = new discord_js_1.REST({ version: '10' }).setToken(process.env.token);
async function main() {
    await rest.put(discord_js_1.Routes.applicationGuildCommands(process.env.application_id, process.env.guild_id), { body: commands });
}
main().catch(err => console.log(err));
