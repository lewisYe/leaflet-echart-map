import React, { Suspense } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import RouteWithSubRoutes from '~utils/routeWithSubRoutes'
import { Link } from 'react-router-dom'
import style from './index.less';
import Spin from '~components/Spin'


export default class Main extends React.Component {
  componentDidMount() {

  }
  render() {
    const { routes, location } = this.props

    return (
      <div className={style.container}>
          <Suspense fallback={<Spin/>}>
            {
              routes && routes.map((route, index) => (
                <RouteWithSubRoutes key={index} {...route} />
              ))
            }
          </Suspense>
      </div>
    )
  }
}