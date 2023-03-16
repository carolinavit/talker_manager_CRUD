const { Router } = require('express');

const talkerRoute = Router();

const path = require('path');

const readFile = require('../utils/readFile');

const TALKER_DATA_PATH = path.resolve(__dirname, '../talker.json');

const auth = require('../middlewares/auth');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateTalk = require('../middlewares/validateTalk');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const validateRate = require('../middlewares/validateRate');

talkerRoute.get('/', async (_req, res) => {
  const data = await readFile(TALKER_DATA_PATH);
  return res.status(200).json(data);
});

talkerRoute.get('/:id', async (req, res) => {
  const { id } = req.params;
  const data = await readFile(TALKER_DATA_PATH);
  const filterId = data.find((e) => e.id === +id);
  if (!filterId) {
    return res
      .status(404)
      .send({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(filterId);
});

talkerRoute.post(
  '/',
  auth,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  (req, res) => {
    /* const {
    name,
      age,
      talk: { watchedAt, rate },
    } = req.body; */
    res.status(201).json({ message: 'Atividade registrada com sucesso!' });
  },
);

module.exports = talkerRoute;
