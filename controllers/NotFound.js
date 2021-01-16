class NotFoundController {
  handleNotFound = (_req, res, _next) => {
    res
      .status(404)
      .render('not-found', { path: null, contentTitle: 'Not Found' });
  };
}

module.exports = NotFoundController;
