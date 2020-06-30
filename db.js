const tileModel = require('./models/Tile')

const { Sequelize, DataTypes } = require('sequelize')

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_PORT = process.env.DB_PORT || 3306

const sequelize = new Sequelize('paint', DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql'
})

const Tile = tileModel(sequelize, DataTypes)

sequelize.sync()

module.exports = {
  sequelize: sequelize,
  Tile: Tile
}