const { fetch } = require('undici');
const Embeds = require('./embeds.js');
var formatDistanceStrict = require('date-fns/formatDistanceStrict');

module.exports = {
  name: 'Activate',
  description: 'Activates bot to run automatically.',
  execute(message, client) {
    const logic = (() => {
      async function getMaps() {
        try {
          if (message.content == '!activate') {
            const reposnse = await fetch(
              `https://api.mozambiquehe.re/maprotation?auth=${process.env.API_KEY}`
            );
            const data = await reposnse.json();
            display.displayInfo(data);
            reminder(data);
          } else if (message.content == '!deactivate') {
            clearTimeout(timer);
          }
        } catch {
          setTimeout(getMaps, 60000);
        }
      }

      const reminder = (data) => {
        const currentMapDuration = data.current.remainingTimer;
        const nextMapDuration = data.next.DurationInSecs;
        const a = currentMapDuration.split(':');
        const seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
        const nextMap = data.next.map;
        if (nextMap == 'Olympus') {
          const milliseconds = seconds * 1000;
          timer = setTimeout(getMaps, milliseconds);
        } else {
          const milliseconds = seconds + nextMapDuration * 1000;
          timer = setTimeout(getMaps, milliseconds);
        }
      };
      return { getMaps, reminder };
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
