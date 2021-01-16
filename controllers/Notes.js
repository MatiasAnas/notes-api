const database = require('../database/database');
const NotFoundController = require('./NotFound');

class NotesController {
  constructor() {
    this.notFoundController = new NotFoundController();
  }

  getNote = (req, res, next) => {
    const noteId = parseInt(req.params.noteId, 10);
    const note = database.notes.find((note) => note.id === noteId);
    if (note) res.json(note);
    else this.notFoundController.handleNotFound(req, res, next);
  };

  createNote = (req, res, _next) => {
    const { title, content, bold, italic } = req.body;
    const newId =
      database.notes.length === 0
        ? 0
        : database.notes[database.notes.length - 1].id + 1;
    database.notes.push({
      id: newId,
      title,
      content,
      bold,
      italic,
    });
    //TO-DO: Return created note.
    res.status(200).json({ message: 'Note created successfully.' });
  };

  updateNote = (req, res, next) => {
    const noteId = parseInt(req.params.noteId, 10);
    const note = database.notes.find((note) => note.id === noteId);
    if (note) {
      const { title, content, bold, italic } = req.body;
      database.notes = database.notes.map((note) =>
        note.id !== noteId ? note : { ...note, title, content, bold, italic }
      );
      res.status(200).json({ message: 'Note updated successfully.' });
    } else this.notFoundController.handleNotFound(req, res, next);
  };

  deleteNote = (req, res, next) => {
    const noteId = parseInt(req.params.noteId, 10);
    const note = database.notes.find((note) => note.id === noteId);
    if (note) {
      database.notes = database.notes.filter((note) => note.id !== noteId);
      res.status(200).json({ message: 'Note deleted successfully.' });
    } else this.notFoundController.handleNotFound(req, res, next);
  };

  getNotes = (_req, res, _next) => {
    res.json(database.notes);
  };

  deleteNotes = (_req, res, _next) => {
    database.notes = [];
    res.status(200).json({ message: 'Notes deleted successfully.' });
  };
}

module.exports = NotesController;
