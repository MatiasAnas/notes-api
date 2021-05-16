const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');

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
    handler: helmet(),
  },
  {
    handler: (req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE'
      );
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      next();
    },
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
