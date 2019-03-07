const {User, Location, db} = require('./server/db/models')

const userData = [
  {email: 'hoyer@icloud.com', password: 'qwerty'},
  {email: 'crobles@live.com', password: 'qwerty'},
  {email: 'paulv@mac.com', password: 'qwerty'},
  {email: 'boein@verizon.net', password: 'qwerty'},
  {email: 'trygstad@yahoo.com', password: 'qwerty'}
]
const locationData = [
  {
    message: 'hello1',
    latitude: 41.890172,
    longitude: -87.626822,
    public: false
  },
  {message: 'hello2', latitude: 41.892881, longitude: -87.63305},
  {message: 'hello3', latitude: 41.896665, longitude: -87.623105},
  {message: 'hello4', latitude: 41.899412, longitude: -87.629797},
  {message: 'hello5', latitude: 41.885095, longitude: -87.622815},
  {
    message: 'hello6',
    latitude: 41.886884,
    longitude: -87.647523,
    public: false
  },
  {message: 'hello7', latitude: 41.894552, longitude: -87.660907},
  {message: 'hello8', latitude: 41.882539, longitude: -87.621442},
  {message: 'hello9', latitude: 41.883817, longitude: -87.632767},
  {message: 'hello10', latitude: 41.879983, longitude: -87.620069}
]

const seed = async () => {
  try {
    await db.sync({
      force: true
    })

    const users = await User.bulkCreate(userData, {
      returning: true
    })

    const locations = await Location.bulkCreate(locationData, {
      returning: true
    })

    const [user1, user2, user3, user4, user5] = users
    const [
      loc1,
      loc2,
      loc3,
      loc4,
      loc5,
      loc6,
      loc7,
      loc8,
      loc9,
      loc10
    ] = locations

    await user1.setLocations([loc1, loc2, loc3])
    await user2.setLocations([loc4, loc5, loc6])
    await user3.setLocations([loc7])
    await user4.setLocations([loc8])
    await user5.setLocations([loc9, loc10])
  } catch (err) {
    console.log(err)
  }
}

module.exports = seed

if (require.main === module) {
  seed()
    .then(() => {
      console.log('Seeding success!')
      db.close()
    })
    .catch(err => {
      console.error('Oh noes! Something went wrong!')
      console.error(err)
      db.close()
    })
}
