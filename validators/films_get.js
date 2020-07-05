const { query, validationResult } = require('express-validator')

module.exports = [
  query('limit')
    .isInt({ min: 1 }).withMessage('Limit must be a numeric value that is strictly positive.'),
  query('offset')
    .isInt({ min: 0 }).withMessage('Offset must be a numeric value that is positive or null.'),
  query('order')
    .custom((value, { req }) => {
      value = JSON.parse(value)
      return new Promise((resolve, reject) => {
        let acceptedOrderBy = ['id_film', 'titre', 'date_debut_affiche', 'duree_minutes', 'genre', 'distributeur']
        let acceptedOrderWay = ['ASC', 'DESC']
        if (!(value instanceof Array)) reject()
        if (!acceptedOrderBy.includes(value[0])) reject()
        if (!acceptedOrderWay.includes(value[1])) reject()
        resolve()
      })
    }).withMessage('Order is not valid.'),

  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() })

    next()
  }
]