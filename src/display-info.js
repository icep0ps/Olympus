const { MessageEmbed } = require('discord.js');

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
        'https://i0.wp.com/media3.giphy.com/media/87gVnUvsXHhPdFPBNa/giphy.gif?resize=650,400'
      )
      .setTimestamp()
      .setFooter({
        text: 'Made by Icepops',
        iconURL: 'https://avatars.githubusercontent.com/u/96955965?v=4',
      });
    usermsg.channel.send({ embeds: [exampleEmbed] });
  } else {
    let msg = `
      Unfortunately the current map is **${currentMap}** 
      **Remaining Time:**  \`${currentMapDuration}\` minutes
      **Next up:** **${nextMap}** for 1 hour, 30 minutes.`;
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

export { displayInfo };
