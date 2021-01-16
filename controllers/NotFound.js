const { HTTP_STATUS_CODES } = require('../constants/http');

class NotFound {
  handleNotFound = (_req, res, _next) => {
    res
      .status(HTTP_STATUS_CODES.NOT_FOUND)
      .render('not-found', { path: null, contentTitle: 'Not Found' });
  };
}

module.exports = NotFound;
