require('dotenv').config();
const Discord = require('discord.js');
const { fetch } = require('undici');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

const BOT_PREFIX = '!';
const MAKE_ACTIVE_MEMBER = 'pls-role';
const MAPS = 'pls-maps';

function makeActiveMember(user) {
  user.roles.add('992043379368149087');
}

function displayInfo(data, Usermsg) {
  const currentMap = data.current.map;
  const currentMapDuration = data.current.remainingTimer;
  const nextMap = data.next.map;
  const nextMapDuration = data.next.DurationInMinutes;
  function msg() {
    let msg = '';
    if (currentMap == 'Olympus') {
      msg = `Lets go! The current map is **${currentMap}** 🕺 remaining time is \`${currentMapDuration}\` minutes
    The next map is **${nextMap}** for \`${nextMapDuration}\` minutes so don't hit up **k0i** till its over!`;
    } else {
      msg = `The current map is **${currentMap}** remaining time is \`${currentMapDuration}\` minutes
The next map is **${nextMap}** for \`${nextMapDuration}\` minutes`;
    }
    return msg;
  }

  Usermsg.channel.send(msg());
}

async function getMaps(Usermsg) {
  const reposnse = await fetch(
    `https://api.mozambiquehe.re/maprotation?auth=${process.env.API_KEY}`
  );
  const data = await reposnse.json();
  displayInfo(data, Usermsg);
}

client.on('ready', () => {
  console.log('Login successful!!!');
});

client.on('messageCreate', (msg) => {
  if (msg.content === `${BOT_PREFIX}${MAKE_ACTIVE_MEMBER}`) {
    makeActiveMember(msg.member);
  }

  if (msg.content === `${BOT_PREFIX}${MAPS}`) {
    getMaps(msg);
  }
});

client.login(process.env.BOT_TOKEN);
