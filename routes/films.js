const express = require('express'),
  router = express.Router()

const { Film } = require('../db')

router.get('/films', (req, res) => {
  res.render('films', { title: 'CinemArchive' })
})

module.exports = router