const userModel = require('./models/User'),
  tileModel = require('./models/Tile'),
  filmModel = require('./models/Film'),
  categoryModel = require('./models/Category'),
  distributorModel = require('./models/Distributor'),
  sessionModel = require('./models/Session')

const { Sequelize, DataTypes } = require('sequelize')

const DB_NAME = process.env.DB_NAME,
  DB_USER = process.env.DB_USER,
  DB_PASSWORD = process.env.DB_PASSWORD,
  DB_HOST = process.env.DB_HOST || 'localhost',
  DB_PORT = process.env.DB_PORT || 3306

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false
})

const User = userModel(sequelize, DataTypes)
const Tile = tileModel(sequelize, DataTypes)
const Film = filmModel(sequelize, DataTypes)
const Category = categoryModel(sequelize, DataTypes)
const Distributor = distributorModel(sequelize, DataTypes)
const Session = sessionModel(sequelize, DataTypes)

Film.belongsTo(Category, { foreignKey: 'id_genre' })
Film.belongsTo(Distributor, { foreignKey: 'id_distributeur' })

Session.belongsTo(User, { foreignKey: 'id_user' })
Session.belongsTo(Film, { foreignKey: 'id_film' })

sequelize.sync()

module.exports = {
  sequelize,
  Tile,
  Film,
  Category,
  Distributor,
  User,
  Session
}