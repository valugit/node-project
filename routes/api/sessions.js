const express = require('express'),
  router = express.Router()

const { User, Film, Category, Distributor, Session } = require('../../db')

const validatorSessionsPost = require('../../validators/sessions_post')

router.get('/api/sessions', (req, res) => {
  Session.findAll({
    limit: 1,
    order: [
      ['id', 'DESC']
    ],
    include: [
      {
        model: User,
        attributes: ['firstName', 'lastName']
      },
      {
        model: Film,
        attributes: ['titre', 'resum', 'duree_minutes'],
        include: [
          {
            model: Category,
            attributes: ['nom']
          },
          {
            model: Distributor,
            attributes: ['nom']
          }
        ]
      }
    ]
  }).then(session => {
    if (session.length)
      res.status(200).json({ status: 200, session: session[0] })
    else
      res.status(204).json({ status: 204, message: 'No session has been found.' })
  })
})

router.post('/api/sessions', validatorSessionsPost, (req, res) => {
  Session.create({
    id_user: req.user.id,
    id_film: req.body.id_film
  }).then(session => {
    if (session) {
      req.io.sockets.emit('sessions', {
        type: 'CREATED',
        session
      })
      res.status(201).json({
        status: 201,
        message: 'Session successfully created.'
      })
    }
    else
      res.status(400).json({ status: 400, message: 'Something went wrong with the request.' })
  })
})

module.exports = router