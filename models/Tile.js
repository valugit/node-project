module.exports = (sequelize, DataTypes) => {
  return sequelize.define('tile', {
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    coord_X: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    coord_Y: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false
  })
}