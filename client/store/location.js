import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_LOCATIONS = 'GET_LOCATIONS'
const ADD_LOCATIONS = 'ADD_LOCATIONS'
const REMOVE_LOCATION = 'REMOVE_LOCATION'
const EDIT_LOCATION = 'EDIT_LOCATION'

/**
 * INITIAL STATE
 */
const defaultLocations = []

/**
 * ACTION CREATORS
 */
const getUserLoc = locations => ({type: GET_LOCATIONS, locations})
const addLoc = location => ({type: ADD_LOCATIONS, location})
const removeLoc = id => ({type: REMOVE_LOCATION, id})
const editLoc = editedlocation => ({type: EDIT_LOCATION, editedlocation})
/**
 * THUNK CREATORS
 */
// export const fetchLocations = (userId) => async dispatch => {
//   try {
//     const params = {
//       id: userId
//     }
//     const {data} = await axios.get('/api/locations', {params})
//     dispatch(getUserLoc(data))
//   } catch (err) {
//     console.error(err)
//   }
// }

export const fetchLocations = userId => async dispatch => {
  try {
    const params = {userId}
    const {data} = await axios.get('/api/locations', {params})
    dispatch(getUserLoc(data))
  } catch (error) {
    console.log(error)
  }
}

export const addLocation = (obj, userId) => async dispatch => {
  try {
    const params = {userId}
    const {data} = await axios.post('/api/locations', obj, {params})
    dispatch(addLoc(data))
  } catch (err) {
    console.log(err)
  }
}

export const deleteLocation = locId => async dispatch => {
  try {
    const params = {locId}
    await axios.delete('/api/locations', {params})
    dispatch(removeLoc(locId))
  } catch (err) {
    console.log(err)
  }
}

export const updateLocation = (obj, locId) => async dispatch => {
  try {
    const params = {locId}
    const {data} = await axios.put('/api/locations', obj, {params})
    dispatch(editLoc(data))
  } catch (err) {
    console.log(err)
  }
}

export default function(state = defaultLocations, action) {
  switch (action.type) {
    case GET_LOCATIONS:
      return action.locations
    case ADD_LOCATIONS:
      return [...state, action.location]
    case REMOVE_LOCATION:
      return state.filter(location => location.id !== action.id)
    case EDIT_LOCATION:
      return state.map(location => {
        if (location.id === action.id) return action
        else return location
      })
    default:
      return state
  }
}
