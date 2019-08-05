import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

require('echarts/map/js/province/zhejiang.js');

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state={
      zoom:1
    }
  }
  onChartClick = () => {
    this.setState({
      zoom:3
    })
  }
  render() {
    const option = {
      title: {
        text: '浙江地图',
        left: 'center'
      },
      backgroundColor: '#0f5789',
      series: [
        {
          name: 'iphone3',
          type: 'map',
          mapType: '浙江',
          roam: true,
          aspectScale: 1,
          zoom:this.state.zoom,
          label: {
            normal: {
              show: true,
              color:'#fff'
            },
            emphasis: {
              show: true
            },
            color:'#fffff'
          },
          data: [],
          itemStyle:{
            areaColor:'red',
            borderColor:'blue',
          }
        },
      ],
    };
    let onEvents = {
      'click': this.onChartClick,
    }
    return (
      <ReactEcharts
        option={option}
        onEvents={onEvents}
        style={{ height: '100vh', width: '100%' }}
      />
    );
  };
}
