const Sequelize = require('sequelize')
const db = require('../db')

const Location = db.define('location', {
  message: {
    type: Sequelize.STRING,
    allowNull: false
  },
  latitude: {
    type: Sequelize.DECIMAL(8, 4),
    allowNull: false
  },
  longitude: {
    type: Sequelize.DECIMAL(8, 4),
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    defaultValue: 'notes'
  }
})

module.exports = Location
