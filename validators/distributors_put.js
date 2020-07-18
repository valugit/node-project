const { body, validationResult } = require('express-validator')

module.exports = [
  body('nom')
    .optional()
    .isLength({ min: 1, max: 255 })
    .withMessage('Distributor\'s name must be a string that contains between 1 and 255 characters.'),
  body('telephone')
    .optional()
    .isLength({ min: 9, max: 9 })
    .isNumeric()
    .withMessage('Distributor\'s phone number must be a string that contains 9 numeric characters.'),

  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() })

    next()
  }
]