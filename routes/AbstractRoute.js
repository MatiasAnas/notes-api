const express = require('express');

const NotFoundController = require('../controllers/NotFoundController');

class AbstractRoute {
  constructor(route, parentRoute) {
    this.router = express.Router();
    this.route = route;
    this.parentRoute = parentRoute;
    this.notFoundController = new NotFoundController();
  }

  getHandlers = () => {
    this.router.get(this.route, this.handleGet);
    this.router.post(this.route, this.handlePost);
    this.router.put(this.route, this.handlePut);
    return this.router;
  };

  hasParentRoute = () => !!this.parentRoute;
  getParentRoute = () => this.parentRoute;

  handleGet = (req, res, next) =>
    this.notFoundController.handleNotFound(req, res, next);
  handlePost = (req, res, next) =>
    this.notFoundController.handleNotFound(req, res, next);
  handlePut = (req, res, next) =>
    this.notFoundController.handleNotFound(req, res, next);
  //TO-DO: Add delete.
}

module.exports = AbstractRoute;
