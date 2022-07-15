require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client({
  intents: [
    'GUILDS',
    'GUILD_MESSAGES',
    'DIRECT_MESSAGE_REACTIONS',
    'GUILD_MESSAGE_REACTIONS',
  ],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/');
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const BOT_PREFIX = '!';
const MAPS = 'olympus';
const ACTIVATE = 'activate';
const DEACTIVATE = 'deactivate';
const HELP = 'help';
let MsgContent = undefined;

client.on('ready', () => {
  console.log('Login successful!!!');
  client.user.setPresence({
    activities: [{ name: 'Apex Legends' }],
  });
});

client.on('messageCreate', (msg) => {
  if (msg.content === `${BOT_PREFIX}${MAPS}`) {
    MsgContent = msg;
    client.commands.get('get maps').execute(MsgContent, client);
  }
  if (
    msg.content === `${BOT_PREFIX}${ACTIVATE}` ||
    msg.content === `${BOT_PREFIX}${DEACTIVATE}`
  ) {
    MsgContent = msg;
    client.commands.get('Activate').execute(MsgContent, client);
  }

  if (msg.content === `${BOT_PREFIX}${HELP}`) {
    MsgContent = msg;
    client.commands.get('help').execute(MsgContent);
  }
});

client.login(process.env.BOT_TOKEN);
