const Home = require('../routes/Home');
const Board = require('../routes/Board');
const Config = require('../routes/Config');
const HealthCheck = require('../routes/HealthCheck');
const Note = require('../routes/Note');
const Notes = require('../routes/Notes');

const { configValidations } = require('../validations/config');
const {
  mandatoryNoteValidations,
  nonMandatoryNoteValidations,
} = require('../validations/notes');

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
      postValidations: configValidations,
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
          postValidations: mandatoryNoteValidations,
        },
        subRoutes: [
          {
            path: '/:noteId',
            validations: {
              putValidations: mandatoryNoteValidations,
              patchValidations: nonMandatoryNoteValidations,
            },
            RouteClass: Note,
          },
        ],
      },
    ],
  },
];
