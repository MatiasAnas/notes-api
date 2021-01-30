const { HTTP_STATUS_CODES } = require('../constants/http');

class JSONNotFound {
  handleNotFound = (_req, res, _next) => {
    res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Not Found' });
  };
}

module.exports = JSONNotFound;
