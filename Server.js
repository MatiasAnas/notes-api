const express = require('express');

const HTMLNotFoundController = require('./controllers/HTMLNotFound');

const routesConfig = require('./constants/routes');
const routeParser = require('./utils/routesParser');

const middlewaresConfig = require('./constants/middlewares');

const runtimeConfig = require('./config/runtime');

class Server {
  constructor(port) {
    this.port = port;
    this.app = express();
    this.notFoundController = new HTMLNotFoundController();
  }

  listen = () => {
    // Templating Engine.
    this.app.set('view engine', 'ejs');
    this.app.set('views', 'views');

    // Middlewares.
    middlewaresConfig.forEach((middleware) => {
      if (middleware.path) this.app.use(middleware.path, middleware.handler);
      else this.app.use(middleware.handler);
    });

    // Routes.
    routeParser(routesConfig).forEach((route) => {
      route.hasParentRoute()
        ? this.app.use(route.getParentRoute(), route.getHandlers())
        : this.app.use(route.getHandlers());
    });

    // Not Found Page.
    this.app.use(this.notFoundController.handleNotFound);

    // Load Config
    runtimeConfig.load((err) => {
      // Start the server.
      if (err) console.log(err);
      else this.app.listen(this.port, this.handleListening);
    });
  };

  handleListening = () =>
    console.log(`Server listening at http://localhost:${this.port}`);
}

module.exports = Server;
