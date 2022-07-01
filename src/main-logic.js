import { displayInfo } from './display-info';
const { fetch } = require('undici');
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
  displayInfo(data);
  reminder(data);
}

export { getMaps };
