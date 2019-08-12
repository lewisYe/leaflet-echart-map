import React, { Component } from 'react';
import L from 'leaflet';
import { tiledMapLayer, echartsLayer } from '@supermap/iclient-leaflet';
import china from '~static/geoJson/china'
import data from './data'
import '~components/LeafletHeatLayer'
import geoCoord from './geoCoord';
import Styles from './index.less'
import echarts from 'echarts'

export default class Bar extends Component {
  constructor(props) {
    super(props);
  }
  onLayerMouseover = (e) => {
    e.target.setStyle({
      weight: 3,
      color: "#0beaeb",
      fillColor: 'red',
    })
  }
  onLayerMouseout = (e) => {
    this.themeLayer.resetStyle(e.target)
  }
  onLayerClick = (e) => {
    console.log(e.target.feature.properties.name)
  }
  createMarkerBar(name, value, index) {
    var myIcon = L.divIcon({ className: Styles.bar, iconSize: [25, 200], html: `<div id="marker-${index}" class="map-marker-bar"></div>` });
    L.marker(geoCoord[name].reverse(), {
      icon: myIcon,
    }).addTo(this.map);
    var myChart = echarts.init(document.getElementById(`marker-${index}`));
    var option = {
      tooltip: {
        trigger: "item"
      },
      xAxis: [{
        show: false,
        type: "category",
        data: ["主营收入", "资产总额"]
      }],
      yAxis: [{
        show: false,
        type: "value",
        name: "金额"
      }],
      series: [{
        name: "金额",
        type: "bar",
        barGap: 0,
        barWidth: 10,
        barCategoryGap: 0,
        itemStyle: {
          normal: {
            borderColor: "#fff",
            borderWidth: 0,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
            color: function (e) {
              return ["#fe0100", "#007cff"][e.dataIndex]
            }
          },
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        },
        data: value
      }]
    };
    myChart.setOption(option)
  }
  componentDidMount() {
    var map = L.map('map', {
      center: [32.67, 109.06],
      maxZoom: 18,
      zoom: 5,
      attributionControl: false,
      zoomControl: true
    });
    this.map = map;
    this.themeLayer = L.geoJSON(china, {
      style: (feature) => {
        return {
          color: "#fff",
          opacity: .3,
          weight: 1,
          fillColor: '#356cb9',
          fillOpacity: .9
        };
      },
      onEachFeature: (feature, layer) => {
        layer.on({
          mouseover: this.onLayerMouseover,
          mouseout: this.onLayerMouseout,
          click:this.onLayerClick
        })
      }
    }).addTo(map);
    data.map((v, i) => {
      this.createMarkerBar(v.name, [v.v1, v.v2], i)
    })
    this.themeLayer.eachLayer((layer) => {
      var curProvince = L.polygon(layer.getLatLngs(), {
        weight: 5,
        color: "#0beaeb",
        opacity: 1,
        fill: false
      })
      this.map.addLayer(curProvince)
    });
  }
  render() {
    return (
      <div id="map" style={{ height: '100vh' }}></div>
    )
  }
}