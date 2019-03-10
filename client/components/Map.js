import React from 'react'
import {connect} from 'react-redux'
// import { Map, Marker, Popup, TileLayer, Tooltip, Circle } from 'react-leaflet';
import {Map as LeafletMap, TileLayer, Marker, Popup} from 'react-leaflet'
import {addLocation} from '../store/location'
import {Speech, Geolocated} from '../components'
import L from 'leaflet'

//const userIcon =  "https://image.flaticon.com/icons/svg/189/189074.svg";
const defaultUrl = 'https://image.flaticon.com/icons/svg/1502/1502944.svg'
const happyHourUrl = 'https://image.flaticon.com/icons/svg/1353/1353862.svg'
const memories = 'https://image.flaticon.com/icons/svg/1102/1102457.svg'
const visitedPlaces = 'https://image.flaticon.com/icons/svg/190/190411.svg'
const dreamVacation = 'https://image.flaticon.com/icons/svg/1308/1308430.svg'

export const userIcon = new L.Icon({
  iconRetinaUrl: 'https://image.flaticon.com/icons/svg/1502/1502944.svg',
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [35, 65],
  shadowAnchor: [20, 92]
})

const icons = {
  default: defaultUrl,
  happyHourUrl,
  memories: memories,
  visitedPlaces,
  dreamVacation
}

// const url = icons[marker.category]
// console.log('url', url)
// const newIcon = new L.Icon({
//   iconRetinaUrl: url,
//   iconAnchor: [5, 55],
//   popupAnchor: [10, -44],
//   iconSize: [35, 65],
//   shadowAnchor: [20, 92],
// })

export const pointerIcon = new L.Icon({
  iconRetinaUrl: 'https://image.flaticon.com/icons/svg/1538/1538096.svg',
  shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png',
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [35, 65],
  shadowSize: [68, 95],
  shadowAnchor: [20, 92]
})

function roundNumber(rnum, rlength) {
  var newnumber =
    Math.round(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength)
  return newnumber
}

class MapView extends React.Component {
  constructor() {
    super()
    this.state = {
      markers: [],
      isClicked: false,
      message: ''
    }
  }

  saveMessage = e => {
    const message = e.target.value
    this.setState({message})
  }

  addMarker = e => {
    this.setState({isClicked: true})
    const {markers} = this.state
    markers.push(e.latlng)
    this.setState({markers})
    this.setState({isClicked: true})
  }

  saveMarker = e => {
    e.preventDefault()
    const lat = this.state.markers[this.state.markers.length - 1].lat
    const lng = this.state.markers[this.state.markers.length - 1].lng
    const obj = {
      message: this.state.message,
      latitude: roundNumber(lat, 7),
      longitude: roundNumber(lng, 7)
    }
    this.props.addLocation(obj, this.props.userId)
  }

  openPopup(marker) {
    if (marker && marker.leafletElement) {
      window.setTimeout(() => {
        marker.leafletElement.openPopup()
      })
    }
  }

  render() {
    const position = [
      roundNumber(this.props.geolocation.lat, 7),
      roundNumber(this.props.geolocation.lng, 7)
    ]
    return (
      <div>
        {this.state.isClicked ? (
          <div>
            <Speech
              marker={this.state.markers[this.state.markers.length - 1]}
            />
          </div>
        ) : (
          ''
        )}
        {this.state.isClicked ? (
          <form onSubmit={this.saveMarker}>
            <input onChange={this.saveMessage} placeholder="your message" />
            <button type="submit">save</button>
          </form>
        ) : (
          ''
        )}
        <Geolocated />
        <LeafletMap
          center={[41.8902, -87.6268]}
          zoom={13}
          maxZoom={20}
          attributionControl={true}
          zoomControl={true}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          dragging={true}
          animate={true}
          easeLinearity={0.35}
          onClick={this.addMarker}
        >
          <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          {this.props.geolocation.lat ? (
            <Marker position={position} icon={userIcon} ref={this.openPopup}>
              <Popup>
                You are here <br /> Click to hide this message
              </Popup>
            </Marker>
          ) : (
            ''
          )}
          {this.state.markers.map(marker => {
            return (
              <Marker position={[marker.lat, marker.lng]} key={marker.id}>
                <Popup>{marker.message}</Popup>
              </Marker>
            )
          })}
          {this.props.markers.map(marker => {
            return (
              <Marker position={marker.marker} key={marker.id} icon={userIcon}>
                <Popup>{marker.message}</Popup>
              </Marker>
            )
          })}
        </LeafletMap>
      </div>
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.id,
    geolocation: state.geolocation
  }
}

const mapDispatch = dispatch => {
  return {
    addLocation: (obj, userId) => dispatch(addLocation(obj, userId))
  }
}

export default connect(mapState, mapDispatch)(MapView)
