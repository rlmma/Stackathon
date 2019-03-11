import React from 'react'
import {geolocated} from 'react-geolocated'
import {connect} from 'react-redux'
import {setGeolocation} from '../store/geolocation'

class Demo extends React.Component {
  render() {
    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords || this.props.geolocation ? (
      <button
        type="submit"
        onClick={() => {
          this.props.setGeolocation({
            lat: this.props.coords.latitude,
            lng: this.props.coords.longitude,
            zoom: 17
          })
        }}
      >
        show me on Map
      </button>
    ) : (
      <div>Getting the location data&hellip; </div>
    )
  }
}

const options = {
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
}

const mapState = state => {
  return {
    geolocation: state.geolocation
  }
}

const mapDispatch = dispatch => {
  return {
    setGeolocation: coords => dispatch(setGeolocation(coords))
  }
}

export default connect(mapState, mapDispatch)(geolocated(options)(Demo))
