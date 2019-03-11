const {User, Location, db} = require('./server/db/models')

const publicMessages = require('./publicMessagesData.json')

const userData = [
  {email: 'hoyer@icloud.com', password: 'qwerty'},
  {email: 'crobles@live.com', password: 'qwerty'},
  {email: 'paulv@mac.com', password: 'qwerty'},
  {email: 'boein@verizon.net', password: 'qwerty'},
  {email: 'trygstad@yahoo.com', password: 'qwerty'},
  {email: 'qwerty@yahoo.com', password: 'qwerty'}
]
const locationData = [
  {
    message: 'buy mozarella and proscuitto',
    latitude: 41.890172,
    longitude: -87.6268221
  },
  {
    message: 'had a best pizza with pepperoni',
    latitude: 41.8928812,
    longitude: -87.633054,
    category: 'memories'
  },
  {message: 'grab some books', latitude: 41.8966653, longitude: -87.6231055},
  {message: '', latitude: 41.8994121, longitude: -87.6297974},
  {
    message:
      'A few weeks ago we had to pay a union electrician for 6 hours of labor so he could literally unlock a building phone room door for us after hours and leave.',
    latitude: 41.8850925,
    longitude: -87.6228153,
    category: 'publicMessages'
  },
  {
    message:
      'A great place to work with great views and tons of lunch options without EVER having to go outside.',
    latitude: 41.8850925,
    longitude: -87.6228153,
    category: 'publicMessages'
  },
  {message: 'hello7', latitude: 41.8850925, longitude: -87.6228153},
  {message: 'weekend concert', latitude: 41.8825394, longitude: -87.6214428},
  {message: 'hello9', latitude: 41.8838175, longitude: -87.6327679},
  {message: 'hello10', latitude: 41.8799836, longitude: -87.6200696}
]

const locationsChicago = [
  {
    message:
      'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.',
    latitude: 41.9069,
    longitude: -87.646358,
    category: 'publicMessages'
  },
  {
    message:
      'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.',
    latitude: 41.907503,
    longitude: -87.626983,
    category: 'publicMessages'
  },
  {
    message:
      'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.',
    latitude: 41.90278,
    longitude: -87.645012,
    category: 'publicMessages'
  },
  {
    message:
      'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.',
    latitude: 41.9047858,
    longitude: -87.6357499,
    category: 'publicMessages'
  },
  {
    message:
      'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.',
    latitude: 41.8794928,
    longitude: -87.621882,
    category: 'publicMessages'
  },
  {
    message:
      'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.',
    latitude: 41.8838296,
    longitude: -87.6499921,
    category: 'publicMessages'
  },
  {
    message:
      'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.',
    latitude: 41.8933282,
    longitude: -87.6392991,
    category: 'publicMessages'
  },
  {
    message:
      'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.',
    latitude: 41.8819191,
    longitude: -87.6211,
    category: 'publicMessages'
  },
  {
    message:
      'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.',
    latitude: 41.8729494,
    longitude: -87.6220409,
    category: 'publicMessages'
  },
  {
    message:
      'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.',
    latitude: 41.8740022,
    longitude: -87.599292,
    category: 'publicMessages'
  }
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

    const publicMessagesLocations = await Location.bulkCreate(publicMessages, {
      returning: true
    })

    const chicagoLocations = await Location.bulkCreate(locationsChicago, {
      returning: true
    })

    const [user1, user2, user3, user4, user5, user6] = users
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

    await user1.setLocations([loc1, loc2, loc3, loc8, loc6])
    await user2.setLocations([loc4, loc5])
    await user3.setLocations([loc7])
    await user4.setLocations([...publicMessagesLocations])
    await user5.setLocations([loc9, loc10])
    await user6.setLocations([...chicagoLocations])
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
