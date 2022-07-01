require('dotenv').config();
import { getMaps } from './main-logic';
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

const BOT_PREFIX = '!';
const MAPS = 'olympus';
let MsgContent = undefined;

client.on('ready', () => {
  console.log('Login successful!!!');
});

client.on('messageCreate', (msg) => {
  if (msg.content === `${BOT_PREFIX}${MAPS}`) {
    MsgContent = msg;
    getMaps();
  }
});

client.login(process.env.BOT_TOKEN);
