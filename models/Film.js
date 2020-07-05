module.exports = (sequelize, DataTypes) => {
  return sequelize.define('film', {
    id_film: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    id_genre: {
      type: DataTypes.INTEGER,
      references: {
        model: 'genre',
        key: 'id_genre'
      }
    },
    id_distributeur: {
      type: DataTypes.INTEGER,
      references: {
        model: 'distributeur',
        key: 'id_distributeur'
      }
    },
    titre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    resum: {
      type: DataTypes.TEXT
    },
    date_debut_affiche: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    date_fin_affiche: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    duree_minutes: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    annee_production: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    timestamps: false
  })
}