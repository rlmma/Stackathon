import React, {Component} from 'react'
import {connect} from 'react-redux'
import {MapView} from '../components'
import {fetchLocations} from '../store/location'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  componentDidMount() {
    const {userId} = this.props
    this.props.fetchLocations(userId.toString())
  }

  render() {
    const markers = this.props.locations.map(location => ({
      id: location.id,
      marker: [location.latitude, location.longitude],
      message: location.message,
      category: location.category,
      date: location.createdAt.slice(0, 10)
    }))

    return (
      <div>
        <MapView markers={markers} />
        {/* <table>
          <tr>
             <th>all notes</th>
          </tr>
            {markers.map((marker) => (
            <tr key = {marker.id}>
              <td>{marker.message}</td>
            </tr>
            ))}
        </table> */}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    userId: state.user.id,
    locations: state.locations
  }
}

const mapDispatch = dispatch => {
  return {
    fetchLocations: userId => dispatch(fetchLocations(userId))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
