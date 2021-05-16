const { body } = require('express-validator');

const configValidations = [
  body('apiDelayInMS')
    .exists({ checkNull: true })
    .withMessage('apiDelayInMS is required.')
    .isInt({ min: 0, max: 5000 })
    .withMessage('apiDelayInMS should be between 0 and 5000.'),
  body('enableApiRequestLogs')
    .custom((value) => value === 'on' || !value)
    .withMessage("enableApiRequestLogs should be 'on' or be absent."),
];

module.exports = { configValidations };
