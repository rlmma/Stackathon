const User = require('./user')
const Location = require('./location')
const db = require('../db')

User.hasMany(Location)
Location.belongsTo(User)

module.exports = {
  User,
  Location,
  db
}
