const { body } = require('express-validator');

const { MAX_API_DELAY_IN_MS } = require('../constants/config');

const configValidations = [
  body('apiDelayInMS')
    .exists({ checkNull: true })
    .withMessage('apiDelayInMS is required.')
    .isInt({ min: 0, max: MAX_API_DELAY_IN_MS })
    .withMessage(
      `apiDelayInMS should be between 0 and ${MAX_API_DELAY_IN_MS}.`
    ),
  body('enableApiRequestLogs')
    .custom((value) => value === 'on' || !value)
    .withMessage("enableApiRequestLogs should be 'on' or be absent."),
];

module.exports = { configValidations };
