const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'help',
  description: 'Learn about Olympus',
  execute(message) {
    const msg = `
    **!activate** - Will enable automatic notifications when its about to be olympus or when it actually is olympus.\n
    **!deactivate** - completely disables the bot (might not work 💀)\n
    **!olympus** - Will just tell you if its olympus or not without enabling auto notifications.
    `;
    const exampleEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`How to use Olympus`)
      .setDescription(msg)
      .setAuthor({
        name: 'Made by Icepops',
        iconURL: 'https://avatars.githubusercontent.com/u/96955965?v=4',
        url: 'https://github.com/icep0ps',
      });

    message.channel.send({ embeds: [exampleEmbed] });
  },
};
