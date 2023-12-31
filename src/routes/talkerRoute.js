const { Router } = require('express');

const talkerRoute = Router();

const path = require('path');

const fs = require('fs').promises;

const readFile = require('../utils/readFile');

const TALKER_DATA_PATH = path.resolve(__dirname, '../talker.json');

const auth = require('../middlewares/auth');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateTalk = require('../middlewares/validateTalk');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const validateRate = require('../middlewares/validateRate');
const validateId = require('../middlewares/validateId');

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
 async (req, res) => {
    const data = await readFile(TALKER_DATA_PATH);
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const addTalker = {
      id: data.length + 1,
      name,
      age,
      talk: { watchedAt, rate },
    };
    const allTalkers = JSON.stringify([...data, addTalker]);
    await fs.writeFile(TALKER_DATA_PATH, allTalkers);
    res.status(201).json(addTalker);
  },
);

talkerRoute.put(
  '/:id',
  auth,
  validateId,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const talkers = await readFile(TALKER_DATA_PATH);
    const filterId = talkers.findIndex((e) => e.id === +id);
    talkers[filterId] = { id: Number(id), name, age, talk: { watchedAt, rate } };
     const updatedTalkers = JSON.stringify(talkers);
     await fs.writeFile(TALKER_DATA_PATH, updatedTalkers);
    
    return res.status(200).json(talkers[filterId]);
  },
);

talkerRoute.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const data = await readFile(TALKER_DATA_PATH);
  const filterId = data.find((e) => e.id !== +id);
  const updatedTalkers = JSON.stringify(filterId);
  await fs.writeFile(TALKER_DATA_PATH, updatedTalkers);
  return res.status(204).end();
});

module.exports = talkerRoute;
