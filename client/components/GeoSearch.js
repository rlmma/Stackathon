import React, {Component} from 'react'
import {withLeaflet, MapControl} from 'react-leaflet'
import L from 'leaflet'
import {OpenStreetMapProvider, GeoSearchControl} from 'leaflet-geosearch'

class GeoSearch extends MapControl {
  constructor(props, context) {
    super(props)
  }

  createLeafletElement(opts) {
    const provider = new OpenStreetMapProvider()
    const searchControl = new GeoSearchControl({
      provider: provider,
      //position: "topleft",
      style: 'bar'
    })

    return searchControl
  }

  componentDidMount() {
    const {map} = this.props.leaflet
    map.addControl(this.leafletElement)
  }
}

export default withLeaflet(GeoSearch)
