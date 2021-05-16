class Home {
  constructor(route, parentRoute) {
    this.route = route;
    this.parentRoute = parentRoute;
  }

  getHome = (_req, res, _next) => {
    res.render('home', {
      path: `${this.parentRoute || ''}${this.route}`,
      contentTitle: 'Api Description',
    });
  };
}

module.exports = Home;
