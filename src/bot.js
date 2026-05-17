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
    "🔍 Vérification en cours..."
  );

  await checkDates();

  await bot.sendMessage(
    msg.chat.id,
    "✅ Vérification terminée."
  );
});

console.log("Bot started");

checkDates();

setInterval(() => {
  checkDates();
}, CHECK_INTERVAL);
