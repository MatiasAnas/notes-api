const { REQUEST_DELAY_IN_MS } = require('../constants/server');

class Delay {
  handleRequest = (_req, _res, next) => {
    if (REQUEST_DELAY_IN_MS === 0) next();
    else setTimeout(() => next(), REQUEST_DELAY_IN_MS);
  };
}

module.exports = Delay;
