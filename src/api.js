const axios = require("axios");
const { BASE_URL } = require("./config");

async function getAvailableDates() {
  try {
    const response = await axios.get(
      `${BASE_URL}/server/api/disponibilite/dates-disponibles`,
      {
        headers: {
          accept: "application/json"
        },
        withCredentials: true
      }
    );

    return response.data;
  } catch (err) {
    console.error(err.message);
    return [];
  }
}

module.exports = {
  getAvailableDates
};
