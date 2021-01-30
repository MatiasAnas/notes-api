const { HTTP_STATUS_CODES } = require('../constants/http');
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
      checkedRequesLogs: enableApiRequestLogs ? 'checked' : '',
    });
  };

  postConfiguration = (req, res, _next) => {
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
