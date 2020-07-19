const express = require('express'),
  router = express.Router(),
  sha1 = require('sha1'),
  jwt = require('jsonwebtoken'),
  { User } = require('../../db'),
  { validatorUserLogin, validatorUserCreate } = require('../../validators/users_post')

let JWT_SECRET = process.env.JWT_SECRET

router.post('/api/users/login', validatorUserLogin, (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
      password: sha1(req.body.password)
    }
  }).then(user => {
    if (user) {
      req.session.user_id = user.id
      res.status(200).json({ status: 200, token: jwt.sign({ id: user.id }, JWT_SECRET, { algorithm: 'HS512' }) })
    }
  }).catch(err => {
    res.status(400).json({ status: 400, message: 'Wrong credentials.', err })
  })
})

router.post('/api/users', validatorUserCreate, (req, res) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: sha1(req.body.password)
  }).then(user => {
    if (user) {
      req.session.user_id = user.id
      res.status(201).json({ status: 201, message: 'Account successfully created.' })
    }
  }).catch(err => {
    res.status(400).json({ status: 400, message: 'Something went wrong with the request.', err })
  })
})

module.exports = router