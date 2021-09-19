const { validationResult } = require('express-validator');

const database = require('../database/database');
const JSONNotFoundController = require('./JSONNotFound');
const { HTTP_STATUS_CODES } = require('../constants/http');
const { MAX_NOTES_IN_MEMORY } = require('../constants/notes');

class Notes {
  constructor() {
    this.notFoundController = new JSONNotFoundController();
  }

  getNote = (req, res, next) => {
    const noteId = parseInt(req.params.noteId, 10);
    const note = database.notes.find((note) => note.id === noteId);
    if (note) res.status(HTTP_STATUS_CODES.OK).json(note);
    else this.notFoundController.handleNotFound(req, res, next);
  };

  createNote = (req, res, _next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(HTTP_STATUS_CODES.BAD_REQUEST)
        .json({ errors: errors.array() });
      return;
    }
    if (database.notes.length >= MAX_NOTES_IN_MEMORY) {
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: 'Max number of notes in memory exceded.' });
      return;
    }
    const { title, content, bold, italic } = req.body;
    const newId =
      database.notes.length === 0
        ? 0
        : database.notes[database.notes.length - 1].id + 1;
    const currentDate = new Date().toISOString();
    const newNote = {
      id: newId,
      title,
      content,
      bold: !!bold,
      italic: !!italic,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    database.notes.push(newNote);
    res.status(HTTP_STATUS_CODES.CREATED).json({
      message: 'Note created successfully.',
      note: newNote,
    });
  };

  updateNote = (req, res, next, replaceAllFields) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(HTTP_STATUS_CODES.BAD_REQUEST)
        .json({ errors: errors.array() });
      return;
    }
    const noteId = parseInt(req.params.noteId, 10);
    const originalNote = database.notes.find((note) => note.id === noteId);
    if (originalNote) {
      const { title, content, bold, italic } = req.body;
      const currentDate = new Date().toISOString();
      let modifiedNote;
      if (replaceAllFields) {
        modifiedNote = {
          ...originalNote,
          title,
          content,
          bold: !!bold,
          italic: !!italic,
          updatedAt: currentDate,
        };
      } else {
        modifiedNote = {
          ...originalNote,
          ...(title !== null && title !== undefined ? { title } : {}),
          ...(content !== null && content !== undefined ? { content } : {}),
          ...(bold !== null && bold !== undefined ? { bold: !!bold } : {}),
          ...(italic !== null && italic !== undefined
            ? { italic: !!italic }
            : {}),
          updatedAt: currentDate,
        };
      }
      database.notes = database.notes.map((note) =>
        note.id === noteId ? modifiedNote : note
      );
      res.status(HTTP_STATUS_CODES.OK).json({
        message: 'Note updated successfully.',
        note: modifiedNote,
      });
    } else this.notFoundController.handleNotFound(req, res, next);
  };

  deleteNote = (req, res, next) => {
    const noteId = parseInt(req.params.noteId, 10);
    const note = database.notes.find((note) => note.id === noteId);
    if (note) {
      database.notes = database.notes.filter((note) => note.id !== noteId);
      res
        .status(HTTP_STATUS_CODES.OK)
        .json({ message: 'Note deleted successfully.' });
    } else this.notFoundController.handleNotFound(req, res, next);
  };

  getNotes = (req, res, _next) => {
    if (req.query.pageNumber && req.query.pageSize) {
      const pageNumber = parseInt(req.query.pageNumber, 10);
      const pageSize = parseInt(req.query.pageSize, 10);
      const startIndex = (pageNumber - 1) * pageSize;
      res
        .status(HTTP_STATUS_CODES.OK)
        .json(database.notes.slice(startIndex, startIndex + pageSize));
    } else {
      res.status(HTTP_STATUS_CODES.OK).json(database.notes);
    }
  };

  deleteNotes = (_req, res, _next) => {
    database.notes = [];
    res
      .status(HTTP_STATUS_CODES.OK)
      .json({ message: 'Notes deleted successfully.' });
  };
}

module.exports = Notes;
