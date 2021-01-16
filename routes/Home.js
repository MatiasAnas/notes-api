const AbstractRoute = require('./AbstractRoute');
const HomeController = require('../controllers/Home');

class Home extends AbstractRoute {
  constructor(route, parentRoute) {
    super(route, parentRoute);
    this.homeController = new HomeController(route, parentRoute);
  }

  handleGet = (req, res, next) => {
    this.homeController.getHome(req, res, next);
  };
}

module.exports = Home;
