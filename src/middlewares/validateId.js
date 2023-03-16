const path = require('path');

const readFile = require('../utils/readFile');

const TALKER_DATA_PATH = path.resolve(__dirname, '../talker.json');

const validateId = async (req, res, next) => {
  const { id } = req.params;
   const data = await readFile(TALKER_DATA_PATH);
   const filterId = data.find((e) => e.id === +id);
  if (!filterId) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return next();
};

module.exports = validateId;
