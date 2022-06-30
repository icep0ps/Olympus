require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

const BOT_PREFIX = '!';
const MAKE_ACTIVE_MEMBER = 'pls-role';

function makeActiveMember(user) {
  user.roles.add('992043379368149087');
}

client.on('ready', () => {
  console.log('Login successful!!!');
});

client.on('messageCreate', (msg) => {
  if (msg.content == 'i love one piece') {
    msg.react('❤️');
  }

  if (msg.content === `${BOT_PREFIX}${MAKE_ACTIVE_MEMBER}`) {
    makeActiveMember(msg.member);
  }
});

client.login(process.env.BOT_TOKEN);
