const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/dates.json");

function loadDates() {
  try {
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath));
  } catch {
    return [];
  }
}

function saveDates(dates) {
  fs.writeFileSync(filePath, JSON.stringify(dates, null, 2));
}

module.exports = {
  loadDates,
  saveDates
};
