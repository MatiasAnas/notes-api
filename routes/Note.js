const AbstractApiRoute = require('./AbstractApiRoute');
const NotesController = require('../controllers/Notes');

class Note extends AbstractApiRoute {
  constructor(route, parentRoute, validations) {
    super(route, parentRoute, validations);
    this.notesController = new NotesController();
  }

  handleGet = (req, res, next) => {
    this.notesController.getNote(req, res, next);
  };

  handlePut = (req, res, next) => {
    const replaceAllFields = true;
    this.notesController.updateNote(req, res, next, replaceAllFields);
  };

  handlePatch = (req, res, next) => {
    const replaceAllFields = false;
    this.notesController.updateNote(req, res, next, replaceAllFields);
  };

  handleDelete = (req, res, next) => {
    this.notesController.deleteNote(req, res, next);
  };
}

module.exports = Note;
