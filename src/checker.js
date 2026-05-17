const { CHAT_ID } = require("./config");
const { getAvailableDates } = require("./api");
const { loadDates, saveDates } = require("./storage");

async function checkDates(bot) {

  const currentDates = await getAvailableDates();

  if (!Array.isArray(currentDates)) {

    await bot.sendMessage(
      CHAT_ID,
      "⚠️ Réponse API invalide."
    );

    return;
  }

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

  } else {

    await bot.sendMessage(
      CHAT_ID,
      "❌ Aucun nouveau rendez-vous trouvé."
    );
  }

  saveDates(currentDates);
}

module.exports = {
  checkDates
};
