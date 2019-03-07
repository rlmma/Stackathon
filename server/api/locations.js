const router = require('express').Router()
const {Location} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const {userId} = req.query
    if (userId) {
      const userLocations = await Location.findAll({where: {userId}})
      res.json(userLocations)
    } else {
      const allLocations = await Location.findAll({
        where: {
          public: true
        }
      })
      res.json(allLocations)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
