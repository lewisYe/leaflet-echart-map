import React, { Component } from 'react';
import china from '~static/geoJson/china'
import zj from '~static/geoJson/zhejiang'
import { Map, TileLayer, Marker, Popup, GeoJSON, LayerGroup } from 'react-leaflet'
import L from 'leaflet'
import Styles from './index.less';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import heat from './heat'
import district from './district'
import city from './city'

export default class LeafletMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: city,
      zoom: 7
    }
  }
  onZoomend = (e) => {
    console.log(e.target._zoom)
    if (e.target._zoom > 8) {
      this.setState({
        marker: district,
        zoom: e.target._zoom
      })
    } else {
      this.setState({
        marker: city,
        zoom: e.target._zoom
      })
    }
  }
  render() {
    const position = [28.876859000, 120.126855000];
    const gradient = {
      0.4: "blue",
      0.6: "cyan",
      0.7: "lime",
      0.8: "yellow",
      1: "red"
    }
    const heatPoints = heat.map(v => {
      return [v.y, v.x, v.sales]
    })
    return (
      <Map
        animate={false}
        ref={node => this.map = node}
        center={position}
        zoom={this.state.zoom}
        style={{ height: '100vh' }}
        attributionControl={false}
        zoomControl={false}
        onZoomend={this.onZoomend}
      >
        <HeatmapLayer
          zoomAnimation={false}
          fitBoundsOnLoad
          points={heatPoints}
          longitudeExtractor={m => m[1]}
          latitudeExtractor={m => m[0]}
          intensityExtractor={m => parseFloat(m[2])}
          gradient={gradient}
        />
        <GeoJSON
          zIndex={1}
          data={zj}
          style={(feature) => {
            return {
              color: "#0beaeb",
              opacity: .3,
              weight: 1,
              fillColor: '#356cb9',
              fillOpacity: .9,
              zIndex: 1
            }
          }} />
        {
          this.state.marker.map((v, i) => {
            var myIcon = new L.divIcon({ className: Styles.icon, html: `<span>${v.name}</span>` });
            var position = v.center.split(',').reverse();
            return (
              <Marker position={position} icon={myIcon} key={i} />
            )
          })
        }
      </Map>
    );
  };
}
