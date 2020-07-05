const tileModel = require('./models/Tile')
const filmModel = require('./models/Film')
const categoryModel = require('./models/Category')
const distributorModel = require('./models/Distributor')

const { Sequelize, DataTypes } = require('sequelize')

const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_PORT = process.env.DB_PORT || 3306

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql'
})

const Tile = tileModel(sequelize, DataTypes)
const Film = filmModel(sequelize, DataTypes)
const Category = categoryModel(sequelize, DataTypes)
const Distributor = distributorModel(sequelize, DataTypes)

Category.belongsTo(Film, { foreignKey: 'id_genre' })
Film.hasOne(Category, { foreignKey: 'id_genre' })

Distributor.belongsTo(Film, { foreignKey: 'id_distributeur' })
Film.hasOne(Distributor, { foreignKey: 'id_distributeur' })

sequelize.sync()

module.exports = {
  sequelize,
  Tile,
  Film,
  Category,
  Distributor
}