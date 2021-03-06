const AbstractRoute = require('./AbstractRoute');
const HTMLNotFoundController = require('../controllers/HTMLNotFound');

class AbstractFrontRoute extends AbstractRoute {
  constructor(route, parentRoute, validations) {
    super(route, parentRoute, validations);
    this.notFoundController = new HTMLNotFoundController();
  }

  handleNotFound = (req, res, next) =>
    this.notFoundController.handleNotFound(req, res, next);
}

module.exports = AbstractFrontRoute;
