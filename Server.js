const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const NotFoundController = require('./controllers/NotFound');

const Home = require('./routes/Home');
const Board = require('./routes/Board');
const Note = require('./routes/Note');
const Notes = require('./routes/Notes');

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
    //TO-DO: Move this to a controller.
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    //TO-DO: Move this to a controller.
    this.app.use(express.static(path.join(__dirname, 'public')));
    //TO-DO: See if we can store the routes in a list with Route / path keys.
    this.routes = [
      new Home('/'),
      new Board('/board'),
      new Note('/:noteId', '/notes'),
      new Notes('/notes'),
    ];
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
