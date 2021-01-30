const AbstractFrontRoute = require('./AbstractFrontRoute');
const ConfigController = require('../controllers/Config');

class Config extends AbstractFrontRoute {
  constructor(route, parentRoute) {
    super(route, parentRoute);
    this.configController = new ConfigController(route, parentRoute);
  }

  handleGet = (req, res, next) => {
    this.configController.getConfigView(req, res, next);
  };

  handlePost = (req, res, next) => {
    this.configController.postConfiguration(req, res, next);
  };
}

module.exports = Config;
