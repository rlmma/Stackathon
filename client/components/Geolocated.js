import React from 'react'
import {geolocated} from 'react-geolocated'
import {connect} from 'react-redux'
import {setGeolocation} from '../store/geolocation'

class Demo extends React.Component {
  render() {
    console.log(this.props)
    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      // <table>
      //   <tbody>
      //     <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
      //     <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
      //     <tr><td>altitude</td><td>{this.props.coords.altitude}</td></tr>
      //     <tr><td>heading</td><td>{this.props.coords.heading}</td></tr>
      //     <tr><td>speed</td><td>{this.props.coords.speed}</td></tr>
      //   </tbody>
      // </table>
      <button
        type="submit"
        onClick={() => {
          this.props.setGeolocation({
            lat: this.props.coords.latitude,
            lng: this.props.coords.longitude
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
    enableHighAccuracy: false,
    maximumAge: 0,
    timeout: 2000,
    distanceFilter: 1
  },
  watchPosition: false,
  userDecisionTimeout: null,
  suppressLocationOnMount: false,
  geolocationProvider: navigator.geolocation
}

const optionss = {
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
}

const mapDispatch = dispatch => {
  return {
    setGeolocation: coords => dispatch(setGeolocation(coords))
  }
}

export default connect(null, mapDispatch)(geolocated(optionss)(Demo))
