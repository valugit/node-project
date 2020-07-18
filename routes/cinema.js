const express = require('express'),
  router = express.Router()

router.get('/cinema', (req, res) => {
  res.render('cinema', { title: 'CinemArchive' })
})

router.get('/cinema/films', (req, res) => {
  res.render('films', { title: 'CinemArchive', subtitle: 'films' })
})

router.get('/cinema/films/:id(\\d+)', (req, res) => {
  res.render('film', {
    title: 'CinemArchive',
    subtitle: 'films',
    id: req.params.id
  })
})

router.get('/cinema/distributors', (req, res) => {
  res.render('distributors', { title: 'CinemArchive', subtitle: 'distributors' })
})

router.get('/cinema/distributors/:id(\\d+)', (req, res) => {
  res.render('distributor', {
    title: 'CinemArchive',
    subtitle: 'distributors',
    id: req.params.id
  })
})

router.get('/cinema/categories', (req, res) => {
  res.render('categories', { title: 'CinemArchive', subtitle: 'categories' })
})

router.get('/cinema/categories/:id(\\d+)', (req, res) => {
  res.render('category', {
    title: 'CinemArchive',
    subtitle: 'categories',
    id: req.params.id
  })
})

module.exports = router