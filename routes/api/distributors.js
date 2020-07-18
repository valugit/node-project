const express = require('express'),
  router = express.Router()

const { Distributor } = require('../../db')
const validatorDistributorsGet = require('../../validators/distributors_get'),
  validatorDistributorsPut = require('../../validators/distributors_put')

router.get('/api/distributors', validatorDistributorsGet, (req, res) => {
  let order = JSON.parse(req.query.order)

  Distributor.findAndCountAll({
    offset: parseInt(req.query.offset) || 0,
    limit: parseInt(req.query.limit) || 25,
    order: [order]
  }).then(distributors => {
    res.status(200).json({
      status: 200,
      distributors: distributors.rows,
      distributorsCount: distributors.count
    })
  })
})

router.all('/api/distributors/:id(\\d+)', (req, res, next) => {
  Distributor.findByPk(req.params.id).then(distributor => {
    if (distributor) {
      req.distributor = distributor
      next()
    }
    else
      res.status(404).json({ status: 404, message: 'Distributor not found' })
  })
})

router.get('/api/distributors/:id(\\d+)', async (req, res) => {
  res.status(200).json({
    status: 200,
    distributor: req.distributor
  })
})

router.put('/api/distributors/:id(\\d+)', validatorDistributorsPut, (req, res) => {
  req.distributor.update(req.body).then(distributor => {
    res.status(200).json({ status: 200, message: 'Distributor successfully updated' })
    req.io.sockets.emit('distributors', {
      type: 'UPDATED',
      distributor
    })
  })
})

router.delete('/api/distributors/:id(\\d+)', (req, res) => {
  req.distributor.destroy(req.params.id).then(distributor => {
    res.status(200).json({ status: 200, message: 'Distributor successfully deleted' })
    req.io.sockets.emit('distributors', {
      type: 'DELETED',
      distributor
    })
  })
})

module.exports = router