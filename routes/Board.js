const AbstractFrontRoute = require('./AbstractFrontRoute');
const BoardController = require('../controllers/Board');

class Board extends AbstractFrontRoute {
  constructor(route, parentRoute) {
    super(route, parentRoute);
    this.boardController = new BoardController(route, parentRoute);
  }

  handleGet = (req, res, next) => {
    this.boardController.getBoard(req, res, next);
  };
}

module.exports = Board;
