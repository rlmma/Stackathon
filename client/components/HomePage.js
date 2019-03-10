import React from 'react'
import {connect} from 'react-redux'
import {fetchLocations} from '../store/location'
import {MapView} from '../components'

export class HomePage extends React.Component {
  componentDidMount() {
    this.props.fetchLocations()
  }

  render() {
    let notRepeatedLocations = []
    let extraMessages = []
    const markers = []
    this.props.locations.forEach(location => {
      const loc = `${location.latitude}, ${location.longitude}`
      const index = notRepeatedLocations.indexOf(loc)
      if (index === -1) {
        notRepeatedLocations.push(loc)
        markers.push({
          id: location.id,
          marker: [location.latitude, location.longitude],
          message: [location.message],
          category: location.category,
          date: [location.createdAt.slice(0, 10)]
        })
      } else {
        markers[index].message.push(location.message)
        markers[index].date.push(location.createdAt.slice(0, 10))
      }
    })

    const path = this.props.location.pathname

    return (
      <div>
        <MapView markers={markers} path={path} extraMessages={extraMessages} />
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
