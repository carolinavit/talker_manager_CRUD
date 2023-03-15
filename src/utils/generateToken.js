const generateToken = () => {
  const rand = Math.random().toString(36).substring(2);
  const token = (rand + rand).substring(0, 16);
  return token;
};

module.exports = generateToken;

// função de referência retirada do stackoverflow
// https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details

/* var rand = function () {
  return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function () {
  return rand() + rand(); // to make it longer
};

token(); // "bnh5yzdirjinqaorq0ox1tf383nb3xr"
 */
