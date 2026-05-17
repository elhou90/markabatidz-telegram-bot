const TelegramBot = require("node-telegram-bot-api");

const { BOT_TOKEN, CHAT_ID, CHECK_INTERVAL } = require("./config");
const { checkDates } = require("./checker");

const bot = new TelegramBot(BOT_TOKEN, {
  polling: true
});

let paused = false;

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

  await checkDates(bot);

  await bot.sendMessage(
    msg.chat.id,
    "✅ Vérification terminée."
  );
});

function getAlgeriaHour() {
  const now = new Date();

  return Number(
    now.toLocaleString("en-US", {
      timeZone: "Africa/Algiers",
      hour: "2-digit",
      hour12: false
    })
  );
}

function isAllowedTime() {
  const hour = getAlgeriaHour();

  return hour >= 0 && hour < 9;
}

async function scheduledCheck() {
  try {
    if (isAllowedTime()) {

      if (paused) {
        paused = false;

        await bot.sendMessage(
          CHAT_ID,
          "▶️ Bot relancé automatiquement (00h-09h Algérie)"
        );
      }

      console.log("Checking dates...");

      await bot.sendMessage(
        CHAT_ID,
        "🔍 Vérification des rendez-vous..."
      );

      await checkDates(bot);

    } else {

      if (!paused) {
        paused = true;

        await bot.sendMessage(
          CHAT_ID,
          "⏸️ Bot en pause jusqu'à minuit (heure Algérie)"
        );
      }

      console.log("Outside allowed hours");
    }

  } catch (err) {

    console.error(err);

    await bot.sendMessage(
      CHAT_ID,
      `⚠️ Erreur bot:\n${err.message}`
    );
  }
}

(async () => {

  console.log("Bot started");

  await bot.sendMessage(
    CHAT_ID,
    "🚀 Bot Markabati DZ démarré."
  );

  await scheduledCheck();

  setInterval(async () => {
    await scheduledCheck();
  }, CHECK_INTERVAL);

})();
