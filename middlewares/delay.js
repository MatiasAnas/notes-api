const runtimeConfig = require('../config/runtime');

delay = (_req, _res, next) => {
  const { apiDelayInMS } = runtimeConfig.getConfig();
  if (apiDelayInMS === 0) next();
  else setTimeout(() => next(), apiDelayInMS);
};

module.exports = delay;
