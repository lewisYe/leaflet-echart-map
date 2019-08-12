import React, { lazy } from 'react';
const Main = lazy(() => import('../layouts/main/index'));
const Login = lazy(() => import('../layouts/login/index'));
const Template = lazy(() => import('~views/template/index'));
const Maps = lazy(() => import('~views/map/index'));
const LeafletMap = lazy(() => import('~views/leaflet/index'));
const ReactLeafletMap = lazy(() => import('~views/leaflet/react'));
const Scatter = lazy(() => import('~views/scatter/index'));
const Bar = lazy(() => import('~views/bar/index'));
const Lines = lazy(() => import('~views/lines/index'));

function NotFound({ location }) {
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

const routes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/",
    component: Main,
    routes: [
      {
        path: "/",
        exact:true,
        component: Main
      },
      {
        path: "/template",
        exact:true,
        component: Template
      },
      {
        path: "/map",
        exact:true,
        component: Maps
      },
      {
        path: "/leaflet",
        exact:true,
        component: LeafletMap
      },
      {
        path: "/reactleaflet",
        exact:true,
        component: ReactLeafletMap
      },
      {
        path: "/scatter",
        exact:true,
        component: Scatter
      },
      {
        path: "/bar",
        exact:true,
        component: Bar
      },
      {
        path: "/lines",
        exact:true,
        component: Lines
      },
      {
        path: '*',
        component: NotFound,
      }
    ]
  },
  {
    path: '*',
    component: NotFound,
  }
];

export default routes;