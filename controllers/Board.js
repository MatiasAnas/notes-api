const database = require('../database/database');

class Board {
  constructor(route, parentRoute) {
    this.route = route;
    this.parentRoute = parentRoute;
  }

  getBoard = (_req, res, _next) => {
    res.render('board', {
      path: `${this.parentRoute || ''}${this.route}`,
      contentTitle: 'Stored Notes',
      notes: database.notes,
    });
  };
}

module.exports = Board;
