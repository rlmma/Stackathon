import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_LOCATIONS = 'GET_LOCATIONS'
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

export default function(state = defaultLocations, action) {
  switch (action.type) {
    case GET_LOCATIONS:
      return action.locations
    default:
      return state
  }
}
