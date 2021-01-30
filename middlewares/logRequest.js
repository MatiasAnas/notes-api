const runtimeConfig = require('../config/runtime');

logRequest = (req, _res, next) => {
  const { enableApiRequestLogs } = runtimeConfig.getConfig();
  if (enableApiRequestLogs) {
    console.log(`Request -> URL: '${req.url}' | Method: ${req.method}`);
    console.log('Body:');
    console.log(req.body);
  }
  next();
};

module.exports = logRequest;
