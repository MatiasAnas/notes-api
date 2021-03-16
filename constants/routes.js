const { body } = require('express-validator');

const Home = require('../routes/Home');
const Board = require('../routes/Board');
const Config = require('../routes/Config');
const HealthCheck = require('../routes/HealthCheck');
const Note = require('../routes/Note');
const Notes = require('../routes/Notes');

module.exports = [
  {
    path: '/',
    RouteClass: Home,
  },
  {
    path: '/board',
    RouteClass: Board,
  },
  {
    path: '/config',
    RouteClass: Config,
  },
  {
    path: '/api',
    subRoutes: [
      {
        path: '/health_check',
        RouteClass: HealthCheck,
      },
      {
        path: '/notes',
        RouteClass: Notes,
        validations: {
          postValidations: [
            body('title')
              .exists({ checkNull: true })
              .withMessage('Title is required.')
              .isString()
              .withMessage('Title should be a string.'),
            body('content')
              .exists({ checkNull: true })
              .withMessage('Content is required.')
              .isString()
              .withMessage('Content should be a string.'),
          ],
        },
        subRoutes: [
          {
            path: '/:noteId',
            validations: {
              putValidations: [
                body('title')
                  .exists({ checkNull: true })
                  .withMessage('Title is required.')
                  .isString()
                  .withMessage('Title should be a string.'),
                body('content')
                  .exists({ checkNull: true })
                  .withMessage('Content is required.')
                  .isString()
                  .withMessage('Content should be a string.'),
              ],
              patchValidations: [
                body('title')
                  .optional()
                  .isString()
                  .withMessage('Title should be a string.'),
                body('content')
                  .optional()
                  .isString()
                  .withMessage('Content should be a string.'),
              ],
            },
            RouteClass: Note,
          },
        ],
      },
    ],
  },
];
