const isValidEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /^\S+@\S+\.\S+$/;
  const teste = regex.test(email);

  if (!teste) {
    return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } 
  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;
  const validPassword = 6;

  if (password.length < validPassword) {
    return res
      .status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const isMissingParams = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!password) {
    return res
      .status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  next();
};

module.exports = {
  isValidEmail,
  isValidPassword,
  isMissingParams,
};
