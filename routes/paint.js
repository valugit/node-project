const express = require('express'),
  router = express.Router()

const { Tile } = require('../db')

router.get('/paint', (req, res) => {
  Tile.findAll().then(tiles => {
    let mosaic = []
    let colNumber = 50
    let rowNumber = 40

    for (let x = 1; x <= colNumber; x++) {
      let column = []
      for (let y = 1; y <= rowNumber; y++) {
        let tile = tiles.find(t => t.coord_X === x && t.coord_Y === y)
        if (!tile)
          column.push({ color: 'white', coord_X: x, coord_Y: y })
        else
          column.push({ id: tile.id, color: tile.color, coord_X: tile.coord_X, coord_Y: tile.coord_Y })
      }
      mosaic.push(column)
    }

    res.render('paint', {
      title: 'SquarePaint',
      mosaic: JSON.stringify(mosaic)
    })
  })
})

module.exports = router