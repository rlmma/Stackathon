import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_LOCATIONS = 'GET_LOCATIONS'
const ADD_LOCATIONS = 'ADD_LOCATIONS'
// const REMOVE_USER_LOCATION = 'REMOVE_USER_LOCATION'
// const ADD_USER_LOCATION = 'ADD_USER_LOCATION'

/**
 * INITIAL STATE
 */
const defaultLocations = []

/**
 * ACTION CREATORS
 */
const getUserLoc = locations => ({type: GET_LOCATIONS, locations})
const addLoc = location => ({type: ADD_LOCATIONS, location})
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

export default function(state = defaultLocations, action) {
  switch (action.type) {
    case GET_LOCATIONS:
      return action.locations
    case ADD_LOCATIONS:
      return [...state, action.location]
    default:
      return state
  }
}
