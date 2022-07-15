const { fetch } = require('undici');
const Embeds = require('./embeds.js');
var formatDistanceStrict = require('date-fns/formatDistanceStrict');

module.exports = {
  name: 'get maps',
  description: 'Gets current maps once.',
  execute(message, client) {
    const logic = (() => {
      async function getMaps() {
        try {
          const reposnse = await fetch(
            `https://api.mozambiquehe.re/maprotation?auth=${process.env.API_KEY}`
          );
          const data = await reposnse.json();
          await display.convertedTime(data);
          display.displayInfo(data);
        } catch (error) {
          message.channel.send(
            'Sorry amigo, i am having network problems try again'
          );
        }
      }

      return { getMaps };
    })();

    const display = (() => {
      const AN_HOUR = 60;
      const convertedTime = (data) => {
        const nextMapStart = data.next.readableDate_start;
        const a = nextMapStart.split(' ');
        const b = a[0].split('-');
        const c = a[1].split(':');

        const nextMapEnd = data.next.readableDate_end;
        const d = nextMapEnd.split(' ');
        const e = d[0].split('-');
        const f = d[1].split(':');
        const nextDurationRead = formatDistanceStrict(
          new Date(b[0], b[1], b[2], c[0], c[1], c[2]),
          new Date(e[0], e[1], e[2], f[0], f[1], f[2]),

          { unit: 'minute' },
          { roundingMethod: 'floor' }
        );
        return nextDurationRead.split(' ')[0];
      };

      const displayInfo = (data) => {
        let DURATION = undefined;
        const currentMap = data.current.map;
        const nextMap = data.next.map;
        const currentMapDuration = data.current.end;

        if (convertedTime > AN_HOUR) {
          DURATION = ' 1 hour, 30 minutes.';
        } else {
          DURATION = ' 1 hour';
        }

        if (currentMap == 'Olympus') {
          const description = Embeds.createMessages.isOlympus(
            currentMap,
            currentMapDuration,
            nextMap,
            DURATION
          );
          Embeds.createEmebeds.isOlympus(message, description, client);
          return;
        }
        if (nextMap == 'Olympus') {
          const description = Embeds.createMessages.almostOlympus(
            currentMap,
            currentMapDuration,
            nextMap,
            DURATION
          );
          Embeds.createEmebeds.almostOlympus(message, description, client);
          return;
        }
        if (nextMap == 'Olympus' && currentMap == 'Olympus') {
          const description = Embeds.createMessages.notOlympus(
            currentMap,
            currentMapDuration,
            nextMap,
            DURATION
          );
          Embeds.createEmebeds.notOlympus(message, description, client);
          return;
        }
      };

      return { displayInfo, convertedTime };
    })();
    logic.getMaps();
  },
};
