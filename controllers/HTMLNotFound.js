const { HTTP_STATUS_CODES } = require('../constants/http');

class HTMLNotFound {
  handleNotFound = (_req, res, _next) => {
    res
      .status(HTTP_STATUS_CODES.NOT_FOUND)
      .render('not-found', { path: null, contentTitle: 'Not Found' });
  };
}

module.exports = HTMLNotFound;
