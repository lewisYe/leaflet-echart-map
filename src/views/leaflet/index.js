import React, { Component } from 'react';
import L from 'leaflet'
import china from '~static/geoJson/china'
import zj from '~static/geoJson/zhejiang'
import Styles from './index.less'

export default class LeafletMap extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //地图地址
    var map = L.map('map', { attributionControl:false,zoomControl: false }).setView([28.876859000, 120.126855000], 7);
    L.geoJSON(zj, {
      style: (feature) => {
        return {
          color: "#fff",
          opacity: .3,
          weight: 1,
          fillColor: '#356cb9',
          fillOpacity: .9
        };
      }
    }).bindPopup(function (layer) {
      return layer.feature.properties.description;
    }).addTo(map);

    var myIcon = L.divIcon({ className: Styles.icon, html: "<span>杭州市</span>" });
    L.marker([29.876859000, 119.526855000], {
      icon: myIcon
    }).addTo(map);
  }
  render() {
    return (
      <div id="map" style={{ height: '100vh' }}></div>
    );
  };
}
