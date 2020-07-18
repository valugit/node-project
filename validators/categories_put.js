const { body, validationResult } = require('express-validator')

module.exports = [
  body('nom')
    .optional()
    .isLength({ min: 1, max: 255 })
    .withMessage('Distributor\'s name must be a string that contains between 1 and 255 characters.'),

  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() })

    next()
  }
]