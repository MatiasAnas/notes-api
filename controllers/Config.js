class Config {
  constructor(route, parentRoute) {
    this.route = route;
    this.parentRoute = parentRoute;
  }

  getConfigView = (_req, res, _next) => {
    res.render('config', {
      path: `${this.parentRoute || ''}${this.route}`,
      contentTitle: 'Api Configuration',
    });
  };

  postConfiguration = (req, res, _next) => {
    // TO-DO: Store this configuration in a runtimeConfig.json file on the root dir, and update the runtime app.
    console.log(`Delay: ${req.body.delayInMS}`);
    console.log(`Request Logs: ${req.body.enableRequestLogs || 'off'}`);
    res.redirect('/');
  };
}

module.exports = Config;
