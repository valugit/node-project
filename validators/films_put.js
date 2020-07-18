const { body, validationResult } = require('express-validator')

const { Category, Distributor } = require('../db')

module.exports = [
  body('titre')
    .optional()
    .isLength({ min: 1, max: 255 })
    .withMessage('"titre" must be a string that contains between 1 and 255 characters.'),
  body('resum')
    .optional()
    .isLength({ min: 1, max: 255 })
    .withMessage('"resum" must be a string that contains between 1 and 255 characters.'),
  body('date_debut_affiche')
    .optional()
    .isISO8601({ format: 'YYYY-MM-DD' })
    .withMessage('"date_debut_affiche" must be a valid date (e.g. "2002-07-15").'),
  body('date_fin_affiche')
    .optional()
    .isISO8601({ format: 'YYYY-MM-DD' })
    .withMessage('"date_fin_affiche" must be a valid date (e.g. "2002-07-15").'),
  body('annee_production')
    .optional()
    .isInt({ min: 1000, max: 9999 })
    .withMessage('"annee_production" must be a valid year (e.g. "2002").'),
  body('duree_minutes')
    .optional()
    .isInt({ min: 0 })
    .withMessage('"duree_minutes" must be a positive integer.'),
  body('id_genre')
    .optional()
    .isInt()
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        Category.findByPk(value).then(value => {
          if (!value)
            reject()

          resolve()
        })
      })
    }).withMessage('You must choose an existing category.'),
  body('id_distributeur')
    .optional()
    .isInt()
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        Distributor.findByPk(value).then(value => {
          if (!value)
            reject()

          resolve()
        })
      })
    }).withMessage('You must choose an existing distributor.'),

  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() })

    next()
  }
]