import React from 'react'
import {connect} from 'react-redux'
// import { Map, Marker, Popup, TileLayer, Tooltip, Circle } from 'react-leaflet';
import {Map as LeafletMap, TileLayer, Marker, Popup} from 'react-leaflet'
import {addLocation} from '../store/location'
import {Speech} from '../components'

// const url = 'https://api.spacexdata.com/v2/launchpads';
// const leafURL = "https://api.mapbox.com/styles/v1/nicknyr/cje7mtk2y6gf92snsydobiahf/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibmlja255ciIsImEiOiJjajduNGptZWQxZml2MndvNjk4eGtwbDRkIn0.L0aWwfHlFJVGa-WOj7EHaA";

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
      latitude: roundNumber(lat, 6),
      longitude: roundNumber(lng, 6)
    }
    this.props.addLocation(obj, this.props.userId)
  }

  render() {
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
          {this.state.markers.map(marker => {
            return (
              <Marker position={[marker.lat, marker.lng]} key={marker.id}>
                <Popup>{marker.message}</Popup>
              </Marker>
            )
          })}
          {this.props.markers.map(marker => {
            return (
              <Marker position={marker.marker} key={marker.id}>
                <Popup>{marker.message}</Popup>
              </Marker>
            )
          })}
        </LeafletMap>
      </div>
    )
  }
}

// UNSAFE_componentWillMount() {
//   axios.get(url).then(res => {
//     this.setState({data: res.data})
//   }).catch(err => {
//     console.log('error', err)
//   })
// }

//   render() {
//     const {data} = this.state;
//     console.log(data);
//     return (
//       <div>
//         <Map
//           style={{height: "100vh"}}
//           center={this.state.latlng}
//           zoom={4}>
//           <TileLayer
//             url={leafURL}
//             attribution="<attribution>" />
//           {data.map((elem, i) => {
//             return (
//               <Marker
//                 key={i}
//                 position={{lat:elem.location.latitude, lng: elem.location.longitude}}>
//                 <Popup>
//                   <span>
//                     {elem.full_name}<br />
//                     {elem.status}<br />
//                     {elem.details}<br />
//                     {elem.vehicles_launched.map((elem, i) => {
//                       return ( <p key={i}>{elem}</p>)
//                     })}
//                   </span>
//                 </Popup>
//                 <Circle
//                   center={{lat:elem.location.latitude, lng: elem.location.longitude}}
//                   fillColor="blue"
//                   radius={200}/>
//               </Marker>
//             )
//           })}
//         </Map>
//       </div>
//     );
//   }
// }

const mapState = state => {
  return {
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    addLocation: (obj, userId) => dispatch(addLocation(obj, userId))
  }
}

export default connect(mapState, mapDispatch)(MapView)
