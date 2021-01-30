const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logRequestMiddleware = require('../middlewares/logRequest');
const delayMiddleware = require('../middlewares/delay');

module.exports = [
  {
    handler: bodyParser.urlencoded({ extended: false }),
  },
  {
    handler: bodyParser.json(),
  },
  {
    path: '/api',
    handler: logRequestMiddleware,
  },
  {
    path: '/api',
    handler: delayMiddleware,
  },
  {
    handler: express.static(path.join(__dirname, '..', 'public')),
  },
];
