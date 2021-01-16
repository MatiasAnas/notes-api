const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const LogRequestMiddleware = require('../middlewares/LogRequest');
const DelayMiddleware = require('../middlewares/Delay');

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
    path: '/api',
    handler: new DelayMiddleware().handleRequest,
  },
  {
    handler: express.static(path.join(__dirname, '..', 'public')),
  },
];
