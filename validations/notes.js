const { body } = require('express-validator');

const {
  MAX_NOTE_TITLE_LENGTH,
  MAX_NOTE_CONTENT_LENGTH,
} = require('../constants/notes');

const mandatoryNoteValidations = [
  body('title')
    .exists({ checkNull: true })
    .withMessage('Title is required.')
    .isString()
    .withMessage('Title should be a string.')
    .isLength({ min: 0, max: MAX_NOTE_TITLE_LENGTH })
    .withMessage(`Title can have at most ${MAX_NOTE_TITLE_LENGTH} characters.`),
  body('content')
    .exists({ checkNull: true })
    .withMessage('Content is required.')
    .isString()
    .withMessage('Content should be a string.')
    .isLength({ min: 0, max: MAX_NOTE_CONTENT_LENGTH })
    .withMessage(
      `Content can have at most ${MAX_NOTE_CONTENT_LENGTH} characters.`
    ),
];

const nonMandatoryNoteValidations = [
  body('title')
    .optional()
    .isString()
    .withMessage('Title should be a string.')
    .isLength({ min: 0, max: MAX_NOTE_TITLE_LENGTH })
    .withMessage(`Title can have at most ${MAX_NOTE_TITLE_LENGTH} characters.`),
  body('content')
    .optional()
    .isString()
    .withMessage('Content should be a string.')
    .isLength({ min: 0, max: MAX_NOTE_CONTENT_LENGTH })
    .withMessage(
      `Content can have at most ${MAX_NOTE_CONTENT_LENGTH} characters.`
    ),
];

module.exports = { mandatoryNoteValidations, nonMandatoryNoteValidations };
