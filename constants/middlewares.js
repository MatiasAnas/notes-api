const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const LogRequestMiddleware = require('../middlewares/LogRequest');

module.exports = [
  {
    handler: bodyParser.urlencoded({ extended: false }),
  },
  {
    handler: bodyParser.json(),
  },
  {
    path: '/api',
    handler: new LogRequestMiddleware().handleRequest,
  },
  {
    handler: express.static(path.join(__dirname, '..', 'public')),
  },
];
