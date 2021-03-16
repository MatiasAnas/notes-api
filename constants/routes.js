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
        subRoutes: [
          {
            path: '/:noteId',
            RouteClass: Note,
          },
        ],
      },
    ],
  },
];
