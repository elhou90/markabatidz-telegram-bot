require("dotenv").config();

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  CHAT_ID: process.env.CHAT_ID,
  CHECK_INTERVAL: Number(process.env.CHECK_INTERVAL || 30000),
  BASE_URL: process.env.BASE_URL
};
