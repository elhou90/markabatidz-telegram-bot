const TelegramBot = require("node-telegram-bot-api");

const { BOT_TOKEN, CHAT_ID } = require("./config");
const { getAvailableDates } = require("./api");
const { loadDates, saveDates } = require("./storage");

const bot = new TelegramBot(BOT_TOKEN);

async function checkDates() {
  console.log("Checking dates...");

  const currentDates = await getAvailableDates();

  if (!Array.isArray(currentDates)) return;

  const oldDates = loadDates();

  const newDates = currentDates.filter(
    (date) => !oldDates.includes(date)
  );

  if (newDates.length > 0) {
    for (const date of newDates) {
      await bot.sendMessage(
        CHAT_ID,
        `🚨 Nouveau rendez-vous disponible !\n\n📅 ${date}\n\nhttps://markabatidz.energy.gov.dz/Pers`
      );
    }

    saveDates(currentDates);
  }
}

module.exports = {
  checkDates
};
