const { validationResult } = require('express-validator');

const { HTTP_STATUS_CODES } = require('../constants/http');
const { MAX_API_DELAY_IN_MS } = require('../constants/config');
const runtimeConfig = require('../config/runtime');

class Config {
  constructor(route, parentRoute) {
    this.route = route;
    this.parentRoute = parentRoute;
  }

  getConfigView = (_req, res, _next) => {
    const { apiDelayInMS, enableApiRequestLogs } = runtimeConfig.getConfig();
    res.render('config', {
      path: `${this.parentRoute || ''}${this.route}`,
      contentTitle: 'Api Configuration',
      apiDelayInMS,
      maxApiDelayInMS: MAX_API_DELAY_IN_MS,
      checkedRequesLogs: enableApiRequestLogs ? 'checked' : '',
    });
  };

  postConfiguration = (req, res, _next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(HTTP_STATUS_CODES.BAD_REQUEST)
        .json({ errors: errors.array() });
      return;
    }
    const { apiDelayInMS, enableApiRequestLogs } = req.body;
    const newRuntimeConfig = {
      apiDelayInMS: parseInt(apiDelayInMS, 10),
      enableApiRequestLogs: enableApiRequestLogs === 'on',
    };
    runtimeConfig.setConfig(newRuntimeConfig, (err) => {
      if (err)
        res
          .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal Server Error' });
      else res.redirect('/');
    });
  };
}

module.exports = Config;
