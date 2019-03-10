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

router.post('/', async (req, res, next) => {
  try {
    const userId = req.user.id
    const data = req.body
    const location = {...data, userId}
    const newLocation = await Location.create(location)
    res.status(201).json(newLocation)
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const {locId} = req.query
    const deletedLocation = await Location.destroy({
      where: {
        id: locId
      }
    })
    res.json(deletedLocation)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    await Location.update(req.body, {
      where: {
        id: req.query.locId
      }
    })
    const updatedLocation = await Location.findById(req.query.locId)
    res.json(updatedLocation)
  } catch (err) {
    next(err)
  }
})

module.exports = router
