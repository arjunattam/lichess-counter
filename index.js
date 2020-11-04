// @ts-check
const {chromium} = require("playwright-chromium");
const fs = require('fs');

function clean(x) {
  return parseInt(x.split(" ")[0].replace(",", ""));
}

function log(players, games) {
  const date = new Date();
  return `${date.toISOString()},${players},${games}\n`;
}

function append(line) {
  fs.appendFileSync('results.txt', line);
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("http://lichess.org/");
  const players = clean(await page.innerText("#nb_connected_players"));
  const games = clean(await page.innerText("#nb_games_in_play"));
  append(log(players, games));
  await browser.close();
})();