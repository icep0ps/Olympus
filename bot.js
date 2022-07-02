require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/');
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const BOT_PREFIX = '!';
const MAPS = 'olympus';
let MsgContent = undefined;

client.on('ready', () => {
  console.log('Login successful!!!');
});

client.on('messageCreate', (msg) => {
  if (msg.content === `${BOT_PREFIX}${MAPS}`) {
    MsgContent = msg;
    client.commands.get('get maps').execute(MsgContent);
  }
});

client.login(process.env.BOT_TOKEN);
