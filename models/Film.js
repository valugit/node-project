module.exports = (sequelize, DataTypes) => {
  return sequelize.define('film', {
    id_film: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    id_genre: {
      type: DataTypes.INTEGER
    },
    id_distributeur: {
      type: DataTypes.INTEGER
    },
    titre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 255
      }
    },
    resum: {
      type: DataTypes.STRING,
      validate: {
        max: 255
      }
    },
    date_debut_affiche: {
      type: DataTypes.DATEONLY
    },
    date_fin_affiche: {
      type: DataTypes.DATEONLY
    },
    duree_minutes: {
      type: DataTypes.INTEGER
    },
    annee_production: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false
  })
}