const express = require('express'),
  router = express.Router(),
  jwt = require('express-jwt')

const { User } = require('../db')

let JWT_SECRET = process.env.JWT_SECRET

router.use('/api', jwt({ secret: JWT_SECRET, algorithms: ['HS512'] }).unless(req => {
  return (
    req.originalUrl === '/api/users/login' && req.method === 'POST' ||
    req.originalUrl === '/api/users' && req.method === 'POST'
  )
}))

router.use('/api', (req, res, next) => {
  if (req.user) {
    User.findByPk(req.user.id).then(user => {
      req.user = user
      next()
    })
  }
  else
    next()
})

router.use('/api', (err, req, res, next) => {
  if (err.name === 'UnauthorizedError')
    res.redirect('/login')
})

module.exports = router