import { lazy } from 'react';
const Main = lazy(() => import('../layouts/main/index'));
const Login = lazy(() => import('../layouts/login/index'));
const Template = lazy(() => import('~views/template/index'));
const Maps = lazy(() => import('~views/map/index'));
const LeafletMap = lazy(() => import('~views/leaflet/index'));
const ReactLeafletMap = lazy(() => import('~views/leaflet/react'));
const Scatter = lazy(() => import('~views/scatter/index'));

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
        path: "/template",
        component: Template
      },
      {
        path: "/map",
        component: Maps
      },
      {
        path: "/leaflet",
        component: LeafletMap
      },
      {
        path: "/reactleaflet",
        component: ReactLeafletMap
      },
      {
        path: "/scatter",
        component: Scatter
      }
    ]
  }
];

export default routes;