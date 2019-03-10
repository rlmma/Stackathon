import React from 'react'
import {connect} from 'react-redux'
import {fetchLocations} from '../store/location'
import {MapView} from '../components'

export class HomePage extends React.Component {
  componentDidMount() {
    this.props.fetchLocations()
  }

  render() {
    // const markers = [{'id': 1, 'marker': [50, 11]}, {'id': 1, 'marker': [55, 12]}]

    const markers = this.props.locations.map(location => ({
      id: location.id,
      marker: [location.latitude, location.longitude],
      message: location.message,
      category: location.category,
      date: location.createdAt.slice(0, 10)
    }))

    return (
      <div>
        <h3>Welcome, </h3>
        <MapView markers={markers} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.id,
    locations: state.locations
  }
}

const mapDispatch = dispatch => {
  return {
    fetchLocations: () => dispatch(fetchLocations())
  }
}

export default connect(mapState, mapDispatch)(HomePage)
