const { HTTP_STATUS_CODES } = require('../constants/http');

class HealthCheck {
  getHealthCheck = (_req, res, _next) => {
    res.json({ healthy: true });
  };
}

module.exports = HealthCheck;
