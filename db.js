const tileModel = require('./models/Tile')

const { Sequelize, DataTypes } = require('sequelize')

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

const sequelize = new Sequelize('paint', DB_USER, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
})

const Tile = tileModel(sequelize, DataTypes)

sequelize.sync()

module.exports = {
  sequelize: sequelize,
  Tile: Tile
}