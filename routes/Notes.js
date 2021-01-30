const AbstractApiRoute = require('./AbstractApiRoute');
const NotesController = require('../controllers/Notes');

class Notes extends AbstractApiRoute {
  constructor(route, parentRoute) {
    super(route, parentRoute);
    this.notesController = new NotesController();
  }

  handleGet = (req, res, next) => {
    this.notesController.getNotes(req, res, next);
  };

  handlePost = (req, res, next) => {
    this.notesController.createNote(req, res, next);
  };

  handleDelete = (req, res, next) => {
    this.notesController.deleteNotes(req, res, next);
  };
}

module.exports = Notes;
