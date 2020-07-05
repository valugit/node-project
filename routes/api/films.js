const express = require('express'),
  router = express.Router()

const { Film, Category, Distributor } = require('../../db')
const validatorFilmsGet = require('../../validators/films_get')

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
    const pagesCount = Math.ceil(films.count / req.query.limit)
    const currentPage = Math.ceil(req.query.offset / req.query.limit) + 1
    let paginate = []

    if (pagesCount < 5) {
      for (let i = 1; i <= pagesCount; i++) {
        paginate.push({
          page: i,
          offset: (i - 1) * req.query.limit,
          current: i === currentPage
        })
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          paginate.push({
            page: i,
            offset: (i - 1) * req.query.limit,
            current: i === currentPage
          })
        }
        paginate.push({
          page: 'last',
          offset: (pagesCount - 1) * req.query.limit
        })
      } else if (currentPage > pagesCount - 2) {
        paginate.push({
          page: 'first',
          offset: 0
        })
        for (let i = pagesCount - 4; i <= pagesCount; i++) {
          paginate.push({
            page: i,
            offset: (i - 1) * req.query.limit,
            current: i === currentPage
          })
        }
      } else {
        paginate.push({
          page: 'first',
          offset: 0
        })
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          paginate.push({
            page: i,
            offset: (i - 1) * req.query.limit,
            current: i === currentPage
          })
        }
        paginate.push({
          page: 'last',
          offset: (pagesCount - 1) * req.query.limit
        })
      }
    }

    res.json({
      status: 200,
      films: films.rows,
      filmsCount: films.count,
      pagesCount,
      paginate
    })
  })
})

module.exports = router