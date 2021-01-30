const AbstractApiRoute = require('./AbstractApiRoute');
const NotesController = require('../controllers/Notes');

class Note extends AbstractApiRoute {
  constructor(route, parentRoute) {
    super(route, parentRoute);
    this.notesController = new NotesController();
  }

  handleGet = (req, res, next) => {
    this.notesController.getNote(req, res, next);
  };

  handlePut = (req, res, next) => {
    this.notesController.updateNote(req, res, next);
  };

  handleDelete = (req, res, next) => {
    this.notesController.deleteNote(req, res, next);
  };
}

module.exports = Note;
