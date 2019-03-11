import React from 'react'
import {connect} from 'react-redux'
import {
  Map as LeafletMap,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  withLeaflet
} from 'react-leaflet'
import {addLocation, deleteLocation, updateLocation} from '../store/location'
import {Speech, Geolocated} from '../components'
import worldGeoJSON from 'geojson-world-map'
import {me, defaultIcon, notes, memories, publicMessages} from './icons'
import {setGeolocation} from '../store/geolocation'
import GeoSearch from './GeoSearch'
import Control from 'react-leaflet-control'

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
      message: '',
      category: 'notes',
      zoom: 13,
      center: [41.8902, -87.6268]
    }
  }

  saveMessage = e => {
    const message = e.target.value
    this.setState({message})
  }

  addMarker = e => {
    this.setState({markers: [e.latlng], isClicked: true})
  }

  saveMarker = e => {
    e.preventDefault()
    const lat = this.state.markers[0].lat
    const lng = this.state.markers[0].lng
    let category = this.state.category
    const obj = {
      message: this.state.message,
      latitude: roundNumber(lat, 7),
      longitude: roundNumber(lng, 7),
      category
    }
    this.props.addLocation(obj, this.props.userId)
    this.setState({markers: [], isClicked: false})
  }

  chooseCategory = e => {
    const category = e.target.value
    this.setState({category})
  }

  openPopup(marker) {
    if (marker && marker.leafletElement) {
      window.setTimeout(() => {
        marker.leafletElement.openPopup()
      })
    }
  }

  showMarker = marker => {
    this.props.setGeolocation({})
    this.setState({center: marker, zoom: 17})
  }

  render() {
    const GeoSearchBar = withLeaflet(GeoSearch)
    const GeolocatedBar = withLeaflet(Geolocated)
    const zoom = this.props.geolocation.zoom
      ? this.props.geolocation.zoom
      : this.state.zoom
    const center = this.props.geolocation.lat
      ? [this.props.geolocation.lat, this.props.geolocation.lng]
      : this.state.center
    const position = [
      roundNumber(this.props.geolocation.lat, 7),
      roundNumber(this.props.geolocation.lng, 7)
    ]
    return (
      <div>
        {this.state.isClicked ? (
          <div>
            <Speech marker={this.state.markers[0]} />
          </div>
        ) : (
          ''
        )}
        {this.state.isClicked ? (
          <form onSubmit={this.saveMarker}>
            <input onChange={this.saveMessage} placeholder="your message" />
            <select onChange={this.chooseCategory}>
              <option hidden="true">Choose Category</option>
              <option value="memories">memories</option>
              <option value="notes">notes</option>
              <option value="publicMessages">publicMessages</option>
            </select>
            <button type="submit">save</button>
          </form>
        ) : (
          ''
        )}
        <div className="mapFlex">
          {this.props.path === '/home' ? (
            <LeafletMap
              className="mapShrink"
              center={center}
              zoom={zoom}
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
              <GeoJSON
                data={worldGeoJSON}
                style={() => ({
                  color: '#75361c',
                  weight: 5,
                  fillColor: '#333',
                  fillOpacity: 0.25
                })}
              />
              <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
              {this.props.geolocation.lat ? (
                <Marker position={position} icon={me} ref={this.openPopup}>
                  <Popup>
                    You are here <br /> Click to hide this message
                  </Popup>
                </Marker>
              ) : (
                ''
              )}
              {this.state.markers.map(marker => {
                return (
                  <Marker
                    position={[marker.lat, marker.lng]}
                    key={marker.id}
                    icon={defaultIcon}
                  >
                    <Popup>{marker.message}</Popup>
                  </Marker>
                )
              })}
              {this.props.markers.map(marker => {
                let choosenIcon
                if (marker.category === 'memories') choosenIcon = memories
                if (marker.category === 'publicMessages')
                  choosenIcon = publicMessages
                if (marker.category === 'notes') choosenIcon = notes
                return (
                  <Marker
                    position={marker.marker}
                    key={marker.id}
                    icon={choosenIcon}
                  >
                    <Popup>
                      {marker.message.map((message, idx) => {
                        return (
                          <div key={idx}>
                            {marker.date[idx]}
                            <br />
                            {message}
                          </div>
                        )
                      })}
                      {this.props.path === '/home' ? (
                        <button
                          type="submit"
                          onClick={() => this.props.deleteLocation(marker.id)}
                        >
                          delete
                        </button>
                      ) : (
                        ''
                      )}
                    </Popup>
                  </Marker>
                )
              })}
              <GeoSearchBar />
              <Control position="topright">
                <GeolocatedBar />
              </Control>
            </LeafletMap>
          ) : (
            <LeafletMap
              className="mapShrink"
              center={center}
              zoom={zoom}
              maxZoom={20}
              attributionControl={true}
              zoomControl={true}
              doubleClickZoom={true}
              scrollWheelZoom={true}
              dragging={true}
              animate={true}
              easeLinearity={0.35}
            >
              <GeoJSON
                data={worldGeoJSON}
                style={() => ({
                  color: '#75361c',
                  weight: 5,
                  fillColor: '#333',
                  fillOpacity: 0.25
                })}
              />
              <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
              {this.props.geolocation.lat ? (
                <Marker position={position} icon={me} ref={this.openPopup}>
                  <Popup>
                    You are here <br /> Click to hide this message
                  </Popup>
                </Marker>
              ) : (
                ''
              )}
              {this.state.markers.map(marker => {
                return (
                  <Marker
                    position={[marker.lat, marker.lng]}
                    key={marker.id}
                    icon={defaultIcon}
                  >
                    <Popup>{marker.message}</Popup>
                  </Marker>
                )
              })}
              {this.props.markers.map(marker => {
                let choosenIcon
                if (marker.category === 'memories') choosenIcon = memories
                if (marker.category === 'publicMessages')
                  choosenIcon = publicMessages
                if (marker.category === 'notes') choosenIcon = notes
                return (
                  <Marker
                    position={marker.marker}
                    key={marker.id}
                    icon={choosenIcon}
                  >
                    <Popup>
                      {marker.message.map((message, idx) => {
                        return (
                          <div key={idx}>
                            {marker.date[idx]}
                            <br />
                            {message}
                          </div>
                        )
                      })}
                      {this.props.path === '/home' ? (
                        <button
                          type="submit"
                          onClick={() => this.props.deleteLocation(marker.id)}
                        >
                          delete
                        </button>
                      ) : (
                        ''
                      )}
                    </Popup>
                  </Marker>
                )
              })}
              <GeoSearchBar />
              <Control position="topright">
                <GeolocatedBar />
              </Control>
            </LeafletMap>
          )}

          <div className="overFlow">
            <table className="tableShrink">
              <tr>
                <th>all notes</th>
                <th>show on map</th>
              </tr>
              {this.props.markers.map(marker => (
                <tr key={marker.id}>
                  <td>
                    {marker.message.map((message, idx) => {
                      return <div key={idx}>{message}</div>
                    })}
                  </td>
                  <td>
                    <button
                      type="submit"
                      onClick={() => this.showMarker(marker.marker)}
                    >
                      show on map
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
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
    addLocation: (obj, userId) => dispatch(addLocation(obj, userId)),
    setGeolocation: coords => dispatch(setGeolocation(coords)),
    updateLocation: (obj, locId) => dispatch(updateLocation(obj, locId)),
    deleteLocation: locId => dispatch(deleteLocation(locId))
  }
}

export default connect(mapState, mapDispatch)(MapView)
