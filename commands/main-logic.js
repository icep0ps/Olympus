const { fetch } = require('undici');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'get maps',
  description: 'Information for the embed',
  execute(message) {
    const logic = (() => {
      function reminder(data) {
        const currentMapDuration = data.current.remainingTimer;
        const a = currentMapDuration.split(':');
        const seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
        const milliseconds = seconds * 1000;
        setInterval(getMaps, milliseconds);
      }

      async function getMaps() {
        const reposnse = await fetch(
          `https://api.mozambiquehe.re/maprotation?auth=${process.env.API_KEY}`
        );
        const data = await reposnse.json();
        display.displayInfo(data);
        reminder(data);
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
        const currentMapDuration = data.current.remainingTimer;
        const nextMap = data.next.map;
        const random = Math.floor(Math.random() * VOICE_LINES.length);

        if (currentMap == 'Olympus') {
          let msg = `
            **${VOICE_LINES[random]}**
             The current map is **${currentMap}** with \`${currentMapDuration}\` remaining.
             **Next up:** ${nextMap} for 1 hour, 30 minutes.`;
          const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`It's showtime!`)
            .setDescription(msg)
            .setImage(
              'https://media2.giphy.com/media/dUkXrsOjtr5iC9HUcW/giphy.gif?cid=790b76115c2d22d73ec3b7a90af7f310d9d4e3a02c5c436a&rid=giphy.gif&ct=g'
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
            **Remaining Time:**  \`${currentMapDuration}\` minutes
            **Next up:** **${nextMap}** for 1 hour, 30 minutes.`;
          ('You all ready for the Octrain?');
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
        } else {
          let msg = `
          Unfortunately the current map is **${currentMap}** 
          **Remaining Time:**  \`${currentMapDuration}\` minutes
          **Next up:** ${nextMap} for 1 hour, 30 minutes.`;
          const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Sorry Amigo')
            .setDescription(msg)
            .setImage(
              'https://i0.wp.com/media2.giphy.com/media/9VrDjCjGMti4rZ4wEG/source.gif?resize=650,400'
            )
            .setTimestamp()
            .setFooter({
              text: 'Made by Icepops',
              iconURL: 'https://avatars.githubusercontent.com/u/96955965?v=4',
            });
          usermsg.channel.send({ embeds: [exampleEmbed] });
        }
      }

      return { displayInfo };
    })();
    logic.getMaps();
  },
};
