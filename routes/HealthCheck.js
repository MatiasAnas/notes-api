const AbstractApiRoute = require('./AbstractApiRoute');
const HealthCheckController = require('../controllers/HealthCheck');

class HealthCheck extends AbstractApiRoute {
  constructor(route, parentRoute) {
    super(route, parentRoute);
    this.healthCheckController = new HealthCheckController();
  }

  handleGet = (req, res, next) => {
    this.healthCheckController.getHealthCheck(req, res, next);
  };
}

module.exports = HealthCheck;
