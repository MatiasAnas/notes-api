const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const NotFoundController = require('./controllers/NotFoundController');

const Home = require('./routes/Home');
const Board = require('./routes/Board');

class Server {
  constructor(port) {
    this.port = port;
    this.app = express();
    this.notFoundController = new NotFoundController();
  }

  listen = () => {
    this.app.set('view engine', 'ejs');
    this.app.set('views', 'views');
    this.app.use('/', this.handleLogRequestMiddleware);
    this.app.use(bodyParser.urlencoded({ extended: false }));
    //TO-DO: Move this to a controller.
    this.app.use(express.static(path.join(__dirname, 'public')));
    //TO-DO: See if we can store the routes in a list with Route / path keys.
    this.routes = [new Home('/'), new Board('/board')];
    this.routes.forEach((route) => {
      route.hasParentRoute()
        ? this.app.use(route.getParentRoute(), route.getHandlers())
        : this.app.use(route.getHandlers());
    });
    this.app.use(this.notFoundController.handleNotFound);
    this.app.listen(this.port, this.handleListening);
  };

  handleListening = () =>
    console.log(`Server listening at http://localhost:${this.port}`);

  // TO-DO: Move this to a controller.
  handleLogRequestMiddleware = (req, _res, next) => {
    console.log(`Request -> URL: '${req.url}' | Method: ${req.method}`);
    next();
  };
}

module.exports = Server;
