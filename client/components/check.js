import React from 'react'
// import { Map, Marker, Popup, TileLayer, Tooltip, Circle } from 'react-leaflet';
import {Map as LeafletMap, TileLayer, Marker, Popup} from 'react-leaflet'

export class SimpleExample extends React.Component {
  constructor() {
    super()
    this.state = {
      markers: [[51.505, -0.09]]
    }
  }

  addMarker = e => {
    const {markers} = this.state
    markers.push(e.latlng)
    this.setState({markers})
  }

  render() {
    return (
      <Map center={[51.505, -0.09]} onClick={this.addMarker} zoom={13}>
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        {this.state.markers.map((position, idx) => (
          <Marker key={`marker-${idx}`} position={position}>
            <Popup>
              <span>
                A pretty CSS3 popup. <br /> Easily customizable.
              </span>
            </Popup>
          </Marker>
        ))}
      </Map>
    )
  }
}
