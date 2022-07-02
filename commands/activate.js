const { fetch } = require('undici');
const { MessageEmbed } = require('discord.js');
var formatDistance = require('date-fns/formatDistance');

module.exports = {
  name: 'Activate',
  description: 'Activates bot to run automatically.',
  execute(message) {
    const logic = (() => {
      async function getMaps() {
        if (message.content == '!activate') {
          const reposnse = await fetch(
            `https://api.mozambiquehe.re/maprotation?auth=${process.env.API_KEY}`
          );
          const data = await reposnse.json();
          display.displayInfo(data);
          console.log('Reminder set');
          reminder(data);
        } else if (message.content == '!deactivate') {
          console.log('shutting down');
          clearTimeout(timer);
        }
      }

      function reminder(data) {
        const currentMapDuration = data.current.remainingTimer;
        const a = currentMapDuration.split(':');
        const seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
        const nextMap = data.current.map;
        if (nextMap != 'Olympus') {
          const milliseconds = seconds * 2 * 1000;
          timer = setTimeout(getMaps, milliseconds);
        } else {
          const milliseconds = seconds * 1000;
          timer = setTimeout(getMaps, milliseconds);
        }
      }
      return { getMaps, reminder };
    })();

    const display = (() => {
      const VOICE_LINES = [
        'Stimmed up and ready to burn.',
        "Wanna fly, compadre? Let's fly.",
        'All aboard the Octrain!',
        'Race you to the LZ.',
        "Today's a good day to cheat death.",
        "Reckless and full of wrecks. Let's go!",
      ];

      function displayInfo(data) {
        const currentMap = data.current.map;
        const currentMapDuration = data.current.end;
        const nextMapStart = data.next.readableDate_start;
        const a = nextMapStart.split(' ');
        const b = a[0].split('-');
        const c = a[1].split(':');

        const nextMapEnd = data.next.readableDate_end;
        const d = nextMapEnd.split(' ');
        const e = d[0].split('-');
        const f = d[1].split(':');
        const nextDurationRead = formatDistance(
          new Date(b[0], b[1], b[2], c[0], c[1], c[2]),
          new Date(e[0], e[1], e[2], f[0], f[1], f[2]),

          { unit: 'hour' }
        );
        const nextMap = data.next.map;
        const random = Math.floor(Math.random() * VOICE_LINES.length);

        if (currentMap == 'Olympus') {
          let msg = `
            **${VOICE_LINES[random]}**
             The current map is **${currentMap}**, ends in <t:${currentMapDuration}:R> of swimmin' in stim, and getting some wins!
             **Next up:** ${nextMap} for ${nextDurationRead}`;
          const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`It's showtime!`)
            .setDescription(msg)
            .setImage(
              'https://media.giphy.com/media/Se52SxwN2H5LGU4bGP/giphy.gif'
            )
            .setTimestamp()
            .setFooter({
              text: 'Made by Icepops',
              iconURL: 'https://avatars.githubusercontent.com/u/96955965?v=4',
            });
          message.channel.send({ embeds: [exampleEmbed] });
        } else if (nextMap == 'Olympus') {
          let msg = `
            Get ready amigo the current map is **${currentMap}** 
            **Ending**  <t:${currentMapDuration}:R>   or at <t:${currentMapDuration}:T>
            **Next up:** ${nextMap} for ${nextDurationRead}
            You all ready for the Octrain?`;
          const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Its almost time compadre')
            .setDescription(msg)
            .setImage(
              'https://64.media.tumblr.com/7b7eabc281cc5f9b8dc30bfd53a8eb89/tumblr_pomzxhKods1txj8weo4_540.gif'
            )
            .setTimestamp()
            .setFooter({
              text: 'Made by Icepops',
              iconURL: 'https://avatars.githubusercontent.com/u/96955965?v=4',
            });
          message.channel.send({ embeds: [exampleEmbed] });
        }
      }

      return { displayInfo };
    })();
    logic.getMaps();
  },
};
