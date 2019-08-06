import React, { Component } from 'react';
import L from 'leaflet';
import { tiledMapLayer, echartsLayer } from '@supermap/iclient-leaflet';
import china from '~static/geoJson/china'
import styles from './index.less'
import data from './data'
import '~components/LeafletHeatLayer'

export default class Scatter extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    var map = L.map('map', {
      center: [32.67, 109.06],
      maxZoom: 18,
      zoom: 5,
      attributionControl: false,
      zoomControl: false
    });

    L.geoJSON(china, {
      style: (feature) => {
        return {
          color: "#fff",
          opacity: .3,
          weight: 1,
          fillColor: '#356cb9',
          fillOpacity: .9
        };
      }
    }).addTo(map);
    var datas = data.map(v => {
      return ({
        name: v.comp_name,
        value: [v.x, v.y, v.val]
      })
    })
    var _data = datas.slice(0, 6)

    var heatPoints = data.map(v => {
      return ([v.y, v.x, v.val])
    })
    var option = {
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'scatter',
          coordinateSystem: 'leaflet',
          data: datas,
          // symbolSize: (val) => {
          //   return val[2] / 10;
          // },
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: '#ddb926'
            }
          }
        },
        {
          type: 'effectScatter',
          coordinateSystem: 'leaflet',
          data: _data,
          symbolSize: (val) => {
            return 20;
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true,
              color: '#ffa022'
            }
          },
          itemStyle: {
            normal: {
              color: '#ffa022',
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          zlevel: 1
        }
      ]
    };
    var eLayer = echartsLayer(option)
    eLayer.addTo(map);

    var hLayer = L.heatLayer(heatPoints, {
      radius: 30,
      minOpacity: 0.5
    })
    hLayer.addTo(map);
    this.setState({
      eLayer,
      hLayer,
      map
    })
  }
  onHeatClick = () => {
    let { eLayer, hLayer, map } = this.state;
    eLayer.remove()
    hLayer.addTo(map);
  }
  onScatterClick = () => {
    let { eLayer, hLayer, map } = this.state;
    eLayer.addTo(map);
    hLayer.remove()
  }
  render() {
    return (
      <div className={styles.mapWarp}>
        <div id="map" style={{ height: '100vh' }}></div>
        <div className={styles.btns}>
          <div onClick={this.onHeatClick}>热力图</div><div onClick={this.onScatterClick}>散点图</div>
        </div>
      </div>
    )
  }
}