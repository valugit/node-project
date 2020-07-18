const express = require('express'),
  router = express.Router()

const { Category } = require('../../db')
const validatorCategoriesGet = require('../../validators/categories_get'),
  validatorCategoriesPut = require('../../validators/categories_put')

router.get('/api/categories', validatorCategoriesGet, (req, res) => {
  let order = JSON.parse(req.query.order)

  Category.findAndCountAll({
    offset: parseInt(req.query.offset) || 0,
    limit: parseInt(req.query.limit) || 25,
    order: [order]
  }).then(categories => {
    res.status(200).json({
      status: 200,
      categories: categories.rows,
      categoriesCount: categories.count
    })
  })
})

router.all('/api/categories/:id(\\d+)', (req, res, next) => {
  Category.findByPk(req.params.id).then(category => {
    if (category) {
      req.category = category
      next()
    }
    else
      res.status(404).json({ status: 404, message: 'Category not found' })
  })
})

router.get('/api/categories/:id(\\d+)', async (req, res) => {
  res.status(200).json({
    status: 200,
    category: req.category
  })
})

router.put('/api/categories/:id(\\d+)', validatorCategoriesPut, (req, res) => {
  req.category.update(req.body).then(category => {
    res.status(200).json({ status: 200, message: 'Category successfully updated' })
    req.io.sockets.emit('categories', {
      type: 'UPDATED',
      category
    })
  })
})

router.delete('/api/categories/:id(\\d+)', (req, res) => {
  req.category.destroy(req.params.id).then(category => {
    res.status(200).json({ status: 200, message: 'Category successfully deleted' })
    req.io.sockets.emit('categories', {
      type: 'DELETED',
      category
    })
  })
})

module.exports = router