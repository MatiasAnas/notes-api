const { notes } = require('../database/notes');

class BoardController {
  constructor(route, parentRoute) {
    this.route = route;
    this.parentRoute = parentRoute;
  }

  getBoard = (_req, res, _next) => {
    res.render('board', {
      path: `${this.parentRoute || ''}${this.route}`,
      contentTitle: 'Stored Notes',
      notes: notes,
    });
  };
}

module.exports = BoardController;
