const { body, validationResult } = require('express-validator')

const { Film } = require('../db')

module.exports = [
  body('id_film')
    .isInt()
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        Film.findByPk(value).then(value => {
          if (!value)
            reject()

          resolve()
        })
      })
    }).withMessage('You must choose an existing film.'),

  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() })

    next()
  }
]