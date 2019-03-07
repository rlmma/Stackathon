import React from 'react'
// import { Map, Marker, Popup, TileLayer, Tooltip, Circle } from 'react-leaflet';
import {Map as LeafletMap, TileLayer, Marker, Popup} from 'react-leaflet'

// const url = 'https://api.spacexdata.com/v2/launchpads';
// const leafURL = "https://api.mapbox.com/styles/v1/nicknyr/cje7mtk2y6gf92snsydobiahf/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibmlja255ciIsImEiOiJjajduNGptZWQxZml2MndvNjk4eGtwbDRkIn0.L0aWwfHlFJVGa-WOj7EHaA";

class MapView extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     latlng: {
  //     lat: 28.5618571,
  //     lng: -80.577366,
  //     },
  //     data: []
  //   }
  // }
  render() {
    return (
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
      >
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        {this.props.markers.map(marker => {
          return (
            <Marker position={marker.marker} key={marker.id}>
              <Popup>{marker.message}</Popup>
            </Marker>
          )
        })}
      </LeafletMap>
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

export default MapView
