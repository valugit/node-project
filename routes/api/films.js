const express = require('express'),
  router = express.Router()

const { Film, Category, Distributor } = require('../../db')
const validatorFilmsGet = require('../../validators/films_get'),
  validatorFilmsPut = require('../../validators/films_put')

router.get('/api/films', validatorFilmsGet, (req, res) => {
  let order = JSON.parse(req.query.order)
  if (order[0] === 'distributeur')
    order = [Distributor, 'nom', order[1]]
  if (order[0] === 'genre')
    order = [Category, 'nom', order[1]]

  Film.findAndCountAll({
    offset: parseInt(req.query.offset) || 0,
    limit: parseInt(req.query.limit) || 25,
    order: [
      order || ['id_film', 'ASC']
    ],
    attributes: ['id_film', 'titre', 'duree_minutes', 'date_debut_affiche'],
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
  }).then(films => {
    res.status(200).json({
      status: 200,
      films: films.rows,
      filmsCount: films.count
    })
  })
})

router.all('/api/films/:id(\\d+)', (req, res, next) => {
  Film.findByPk(req.params.id).then(film => {
    if (film) {
      req.film = film
      next()
    }
    else
      res.status(404).json({ status: 404, message: 'Film not found' })
  })
})

router.get('/api/films/:id(\\d+)', async (req, res) => {
  const distributors = await Distributor.findAll({ attributes: ['id_distributeur', 'nom'] })
  const categories = await Category.findAll({ attributes: ['id_genre', 'nom'] })

  res.status(200).json({
    status: 200,
    distributors,
    categories,
    film: req.film
  })
})

router.put('/api/films/:id(\\d+)', validatorFilmsPut, (req, res) => {
  req.film.update(req.body).then(film => {
    res.status(200).json({ status: 200, message: 'Film successfully updated' })
    req.io.sockets.emit('films', {
      type: 'UPDATED',
      film
    })
  })
})

router.delete('/api/films/:id(\\d+)', (req, res) => {
  req.film.destroy(req.params.id).then(film => {
    res.status(200).json({ status: 200, message: 'Film successfully deleted' })
    req.io.sockets.emit('films', {
      type: 'DELETED',
      film
    })
  })
})

module.exports = router