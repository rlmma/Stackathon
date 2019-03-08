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
      message: location.message
    }))

    return (
      <div>
        <h3>Your map</h3>
        <MapView markers={markers} />
        {/* <table>
          <tr>
            <th>message</th>
            <th>edit</th>
            <th>delete</th>
          </tr>

            { this.props.location((marker, idx) => {
              return (
              <tr>
                <td>id{idx}</td>
                  <td>
                    <form onSubmit={this.editMarker}>
                      <input placeholder={marker.message} />
                    </form>
                  </td>
                <td>
                   <button type="submit" onSubmit={this.deleteMarker}>delete</button>
                </td>
              </tr>
            )})}
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
