const { body, validationResult } = require('express-validator')

const { User } = require('../db')

const validatorUserLogin = [
  body('email')
    .isEmail().withMessage('Your email must be a valid email (e.g. john.doe@domain.com).'),
  body('password')
    .isLength({ min: 6 }).withMessage('Your password must have at least 6 characters.'),

  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() })

    next()
  }
]

const validatorUserCreate = [
  body('firstName')
    .isLength({ min: 2 }).withMessage('Your first name should have at least 2 characters.')
    .isAlpha().withMessage('Your first name must contain alphabetical values only.'),
  body('lastName')
    .isLength({ min: 2 }).withMessage('Your last name should have at least 2 characters.')
    .isAlpha().withMessage('Your last name must contain alphabetical values only.'),
  body('email')
    .isEmail().withMessage('Your email must be a valid email (e.g. john.doe@domain.com).')
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        User.findOne({
          where: {
            email: value
          }
        }).then((user) => {
          if (user) reject()
          else resolve()
        })
      })
    }),
  body('password')
    .isLength({ min: 6 }).withMessage('Your password must have at least 6 characters.'),

  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
      return res.status(422).json({ status: 422, errors: errors.array() })

    next()
  }
]

module.exports = {
  validatorUserLogin,
  validatorUserCreate
}