const AbstractRoute = require('./AbstractRoute');
const BoardController = require('../controllers/Board');

class Board extends AbstractRoute {
  constructor(route, parentRoute) {
    super(route, parentRoute);
    this.boardController = new BoardController(route, parentRoute);
  }

  handleGet = (req, res, next) => {
    this.boardController.getBoard(req, res, next);
  };
}

module.exports = Board;
