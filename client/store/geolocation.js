const GET_GEOLOCATION = 'GET_GEOLOCATION'

export const setGeolocation = coords => ({
  type: GET_GEOLOCATION,
  coords
})

export default (state = {}, action) => {
  switch (action.type) {
    case GET_GEOLOCATION:
      return action.coords
    default:
      return state
  }
}
