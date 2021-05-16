const express = require('express');

class AbstractRoute {
  constructor(route, parentRoute, validations = {}) {
    this.router = express.Router();
    this.route = route;
    this.parentRoute = parentRoute;
    this.validations = validations;
  }

  getHandlers = () => {
    this.router.get(this.route, this.handleGet);
    this.router.post(
      this.route,
      this.validations.postValidations || [],
      this.handlePost
    );
    this.router.put(
      this.route,
      this.validations.putValidations || [],
      this.handlePut
    );
    this.router.delete(this.route, this.handleDelete);
    this.router.patch(
      this.route,
      this.validations.patchValidations || [],
      this.handlePatch
    );
    return this.router;
  };

  hasParentRoute = () => !!this.parentRoute;
  getParentRoute = () => this.parentRoute;

  handleNotFound = () => console.log('Not Found');

  handleGet = (req, res, next) => this.handleNotFound(req, res, next);
  handlePost = (req, res, next) => this.handleNotFound(req, res, next);
  handlePut = (req, res, next) => this.handleNotFound(req, res, next);
  handleDelete = (req, res, next) => this.handleNotFound(req, res, next);
  handlePatch = (req, res, next) => this.handleNotFound(req, res, next);
}

module.exports = AbstractRoute;
