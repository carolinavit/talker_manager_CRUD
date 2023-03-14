const { Router } = require('express');

const talkerRoute = Router();

const path = require('path'); 

const readFile = require('../utils/readFile');

talkerRoute.get('/', async (_req, res) => {
    const data = await readFile(path.resolve(__dirname, '../talker.json'));
    return res.status(200).json(data);
});

module.exports = talkerRoute;
