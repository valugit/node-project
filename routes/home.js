const express = require('express'),
  router = express.Router()

const { Tile } = require('../db')

router.get('/', (req, res) => {
  Tile.findAll().then(tiles => {
    let mosaic = []
    let x = 1
    while (x <= 50) {
      let column = []
      let y = 1
      while (y <= 40) {
        let tile = tiles.find(t => t.coord_X === x && t.coord_Y === y)
        if (!tile)
          column.push({ color: 'white', coord_X: x, coord_Y: y })
        else
          column.push({ id: tile.id, color: tile.color, coord_X: tile.coord_X, coord_Y: tile.coord_Y })
        y++
      }
      mosaic.push(column)
      x++
    }

    res.render('index', { mosaic: JSON.stringify(mosaic) })
  })
})

module.exports = router