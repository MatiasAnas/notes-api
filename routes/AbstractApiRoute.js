const AbstractRoute = require('./AbstractRoute');
const JSONNotFoundController = require('../controllers/JSONNotFound');

class AbstractApiRoute extends AbstractRoute {
  constructor(route, parentRoute, validations) {
    super(route, parentRoute, validations);
    this.notFoundController = new JSONNotFoundController();
  }

  handleNotFound = (req, res, next) =>
    this.notFoundController.handleNotFound(req, res, next);
}

module.exports = AbstractApiRoute;
