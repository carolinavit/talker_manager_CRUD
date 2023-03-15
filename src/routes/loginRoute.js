const { Router } = require('express');

const loginRoute = Router();

const generateToken = require('../utils/generateToken');

const {
  isValidEmail,
  isValidPassword,
  isMissingParams,
} = require('../middlewares/loginValidation');

loginRoute.post('/', isMissingParams, isValidEmail, isValidPassword, async (_req, res) => {
    const token = generateToken();
    return res.status(200).json({ token });
  });

module.exports = loginRoute;
