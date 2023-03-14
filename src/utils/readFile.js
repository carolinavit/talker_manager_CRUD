const fs = require('fs').promises;

const readFile = async (path) => {
  try {
    const data = await fs.readFile(path);
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading: ${error.message}`);
  }
};

module.exports = readFile;
