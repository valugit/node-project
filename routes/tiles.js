const express = require('express'),
  router = express.Router(),
  { Tile } = require('../db')

router.post('/tiles', (req, res) => {
  Tile.findOne({
    where: {
      coord_X: req.body.x,
      coord_Y: req.body.y
    }
  }).then(tile => {
    if (!tile) {
      Tile.create({
        color: req.body.color,
        coord_X: req.body.x,
        coord_Y: req.body.y
      }).then(tile => {
        if (tile) {
          res.json({ status: 201 })
          req.io.sockets.emit('tiles', {
            type: 'CREATED',
            tile
          })
        }
        else
          res.json({ status: 400 })
      })
    }
    else
      res.status(409).json({ message: 'tile already exists' })
  })
})

router.put('/tiles/:id(\\d+)', (req, res) => {
  Tile.findByPk(req.params.id).then(tile => {
    if (tile) {
      tile.update(req.body).then(tile => {
        res.json({ status: 204 })
        req.io.sockets.emit('tiles', {
          type: 'UPDATED',
          tile
        })
      })
    }
    else
      res.status(404).json({ message: 'tile not found' })
  })
})

module.exports = router