const { body } = require('express-validator');

const Home = require('../routes/Home');
const Board = require('../routes/Board');
const Config = require('../routes/Config');
const HealthCheck = require('../routes/HealthCheck');
const Note = require('../routes/Note');
const Notes = require('../routes/Notes');

const {
  MAX_NOTE_TITLE_LENGTH,
  MAX_NOTE_CONTENT_LENGTH,
} = require('../constants/notes');

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
    validations: {
      postValidations: [
        body('apiDelayInMS')
          .exists({ checkNull: true })
          .withMessage('apiDelayInMS is required.')
          .isInt({ min: 0, max: 5000 })
          .withMessage('apiDelayInMS should be between 0 and 5000.'),
        body('enableApiRequestLogs')
          .custom((value) => value === 'on' || !value)
          .withMessage("enableApiRequestLogs should be 'on' or be absent."),
      ],
    },
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
              .withMessage('Title should be a string.')
              .isLength({ min: 0, max: MAX_NOTE_TITLE_LENGTH })
              .withMessage(
                `Title can have at most ${MAX_NOTE_TITLE_LENGTH} characters.`
              ),
            body('content')
              .exists({ checkNull: true })
              .withMessage('Content is required.')
              .isString()
              .withMessage('Content should be a string.')
              .isLength({ min: 0, max: MAX_NOTE_CONTENT_LENGTH })
              .withMessage(
                `Content can have at most ${MAX_NOTE_CONTENT_LENGTH} characters.`
              ),
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
                  .withMessage('Title should be a string.')
                  .isLength({ min: 0, max: MAX_NOTE_TITLE_LENGTH })
                  .withMessage(
                    `Title can have at most ${MAX_NOTE_TITLE_LENGTH} characters.`
                  ),
                body('content')
                  .exists({ checkNull: true })
                  .withMessage('Content is required.')
                  .isString()
                  .withMessage('Content should be a string.')
                  .isLength({ min: 0, max: MAX_NOTE_CONTENT_LENGTH })
                  .withMessage(
                    `Content can have at most ${MAX_NOTE_CONTENT_LENGTH} characters.`
                  ),
              ],
              patchValidations: [
                body('title')
                  .optional()
                  .isString()
                  .withMessage('Title should be a string.')
                  .isLength({ min: 0, max: MAX_NOTE_TITLE_LENGTH })
                  .withMessage(
                    `Title can have at most ${MAX_NOTE_TITLE_LENGTH} characters.`
                  ),
                body('content')
                  .optional()
                  .isString()
                  .withMessage('Content should be a string.')
                  .isLength({ min: 0, max: MAX_NOTE_CONTENT_LENGTH })
                  .withMessage(
                    `Content can have at most ${MAX_NOTE_CONTENT_LENGTH} characters.`
                  ),
              ],
            },
            RouteClass: Note,
          },
        ],
      },
    ],
  },
];
