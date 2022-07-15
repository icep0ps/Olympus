const { MessageEmbed, Client } = require('discord.js');

const createEmebeds = (() => {
  const isOlympus = (message, description, client) => {
    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`It's showtime!`)
      .setDescription(description)
      .setImage(
        'https://media.giphy.com/media/udbvDtBh5POAa6aJzx/giphy-downsized-large.gif'
      )
      .setTimestamp()
      .setFooter({
        text: 'Made by Icepops',
        iconURL: 'https://avatars.githubusercontent.com/u/96955965?v=4',
      });
    sendEmebeds.sendEmebed(message, client, embed);
  };

  const almostOlympus = (message, description, client) => {
    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Its almost time compadre')
      .setDescription(description)
      .setImage(
        'https://64.media.tumblr.com/7b7eabc281cc5f9b8dc30bfd53a8eb89/tumblr_pomzxhKods1txj8weo4_540.gif'
      )
      .setTimestamp()
      .setFooter({
        text: 'Made by Icepops',
        iconURL: 'https://avatars.githubusercontent.com/u/96955965?v=4',
      });
    sendEmebeds.sendEmebed(message, client, embed);
  };

  const notOlympus = (message, description, client) => {
    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Sorry Amigo')
      .setDescription(description)
      .setImage(
        'https://i0.wp.com/media2.giphy.com/media/9VrDjCjGMti4rZ4wEG/source.gif?resize=650,400'
      )
      .setTimestamp()
      .setFooter({
        text: 'Made by Icepops',
        iconURL: 'https://avatars.githubusercontent.com/u/96955965?v=4',
      });
    sendEmebeds.sendEmebed(message, client, embed);
  };
  return { isOlympus, almostOlympus, notOlympus };
})();

const createMessages = (() => {
  const VOICE_LINES = [
    'Stimmed up and ready to burn.',
    "Wanna fly, compadre? Let's fly.",
    'All aboard the Octrain!',
    'Race you to the LZ.',
    "Today's a good day to cheat death.",
    "Reckless and full of wrecks. Let's go!",
  ];
  const RANDOM_LINE = Math.floor(Math.random() * VOICE_LINES.length);

  const isOlympus = (currentMap, currentMapDuration, nextMap, DURATION) => {
    let description = `
    **${VOICE_LINES[RANDOM_LINE]}**
     The current map is **${currentMap}** <@&993796946760318976> , ends in <t:${currentMapDuration}:R>. We will be swimmin' in stim, and getting some wins!
     **Next up:** ${nextMap} for ${DURATION}
     **Subscribe** to auto-notification by clicking 🟢
     **Unsubscribe** by clicking 🔴`;

    return description;
  };

  const almostOlympus = (currentMap, currentMapDuration, nextMap, DURATION) => {
    let description = `
Get ready <@&993796946760318976> the current map is **${currentMap}** 
**Ending**  <t:${currentMapDuration}:R>   or at <t:${currentMapDuration}:T>
**Next up:** ${nextMap} for ${DURATION}
You all ready for the Octrain?
**Subscribe** to auto-notification by clicking 🟢
**Unsubscribe** by clicking🔴`;
    return description;
  };

  const notOlympus = (currentMap, currentMapDuration, nextMap, DURATION) => {
    let description = `
    Unfortunately the current map is **${currentMap}** 
    **Ending**  <t:${currentMapDuration}:R>   or at <t:${currentMapDuration}:T>
    **Next up:** ${nextMap} for ${DURATION}
    **Subscribe** to auto-notification by clicking 🟢
    **Unsubscribe** by clicking🔴`;
    return description;
  };

  return { isOlympus, almostOlympus, notOlympus };
})();

const sendEmebeds = (() => {
  const channel = '800312184176377866';
  const Olympuschan = '🟢';
  const isNotOlympuschan = '🔴';

  const sendEmebed = async (message, client, embed) => {
    const myrole = message.guild.roles.cache.find(
      (role) => role.name == 'Olympus-chan'
    );
    let makeOlympuschan = await message.channel.send({ embeds: [embed] });
    makeOlympuschan.react(Olympuschan);
    makeOlympuschan.react(isNotOlympuschan);

    client.on('messageReactionAdd', async (reaction, user) => {
      if (reaction.message.partial) await reaction.message, fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;
      if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name == Olympuschan) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(myrole);
        }
      }
    });
    client.on('messageReactionAdd', async (reaction, user) => {
      if (reaction.message.partial) await reaction.message, fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;
      if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name == isNotOlympuschan) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(myrole);
        }
      }
    });
  };
  return { sendEmebed };
})();

module.exports = {
  createEmebeds,
  createMessages,
};
