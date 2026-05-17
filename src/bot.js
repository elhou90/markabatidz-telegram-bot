const TelegramBot = require("node-telegram-bot-api");

const { BOT_TOKEN, CHECK_INTERVAL } = require("./config");
const { checkDates } = require("./checker");

const bot = new TelegramBot(BOT_TOKEN, {
  polling: true
});

bot.onText(/\/start/, async (msg) => {
  await bot.sendMessage(
    msg.chat.id,
    "✅ Bot Markabati DZ actif."
  );
});

bot.onText(/\/check/, async (msg) => {
  await bot.sendMessage(
    msg.chat.id,
    "🔍 Vérification manuelle..."
  );

  await checkDates();

  await bot.sendMessage(
    msg.chat.id,
    "✅ Vérification terminée."
  );
});

function isAllowedTime() {
  const now = new Date();

  const algeriaHour = Number(
    now.toLocaleString("en-US", {
      timeZone: "Africa/Algiers",
      hour: "2-digit",
      hour12: false
    })
  );

  return algeriaHour >= 0 && algeriaHour < 9;
}

async function scheduledCheck() {
  if (isAllowedTime()) {
    console.log("Checking dates...");
    await checkDates();
  } else {
    console.log("Outside allowed hours");
  }
}

console.log("Bot started");

scheduledCheck();

setInterval(() => {
  scheduledCheck();
}, CHECK_INTERVAL);
