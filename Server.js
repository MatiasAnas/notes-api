const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const NotFoundController = require('./controllers/NotFound');
const routesConfig = require('./constants/routes');
const routeParser = require('./utils/routesParser');

class Server {
  constructor(port) {
    this.port = port;
    this.app = express();
    this.notFoundController = new NotFoundController();
  }

  listen = () => {
    this.app.set('view engine', 'ejs');
    this.app.set('views', 'views');
    //TO-DO: Move this to a separated file.
    this.app.use('/', this.handleLogRequestMiddleware);
    //TO-DO: Move this to a separated file.
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    //TO-DO: Move this to a separated file.
    this.app.use(express.static(path.join(__dirname, 'public')));
    routeParser(routesConfig).forEach((route) => {
      route.hasParentRoute()
        ? this.app.use(route.getParentRoute(), route.getHandlers())
        : this.app.use(route.getHandlers());
    });
    this.app.use(this.notFoundController.handleNotFound);
    this.app.listen(this.port, this.handleListening);
  };

  handleListening = () =>
    console.log(`Server listening at http://localhost:${this.port}`);

  handleLogRequestMiddleware = (req, _res, next) => {
    console.log(`Request -> URL: '${req.url}' | Method: ${req.method}`);
    next();
  };
}

module.exports = Server;
