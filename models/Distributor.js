module.exports = (sequelize, DataTypes) => {
  return sequelize.define('distributeur', {
    id_distributeur: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    adresse: {
      type: DataTypes.STRING
    },
    cpostal: {
      type: DataTypes.STRING
    },
    ville: {
      type: DataTypes.STRING
    },
    pays: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  })
}