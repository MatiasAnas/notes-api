const Home = require('../routes/Home');
const Board = require('../routes/Board');
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
    path: '/api',
    subRoutes: [
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
