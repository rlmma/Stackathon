import React, {Component} from 'react'
import PropTypes from 'prop-types'
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
    const {email} = this.props

    // const markers = [{'id': 1, 'marker': [50, 11]}, {'id': 1, 'marker': [55, 12]}]

    const markers = this.props.locations.map(location => ({
      id: location.id,
      marker: [location.latitude, location.longitude],
      message: location.message
    }))

    return (
      <div>
        <h3>Welcome, {email}</h3>
        <MapView markers={markers} />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
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
UserHome.propTypes = {
  email: PropTypes.string
}
