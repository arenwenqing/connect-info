import React, { lazy } from 'react'
import { useRoutes, Navigate } from 'react-router-dom'
const Home = lazy(() => import('../pages/Index'))
const Address = lazy(() => import('../pages/Address'))
// const MainInformation = lazy(() => import('@pages/MainInformation'))
// const ProductMessage = lazy(() => import("@pages/ProductMessage"))
// const IntellectualProperty = lazy(() => import('@pages/IntellectualProperty'))
// const ContractDocument = lazy(() => import('@pages/ContractDocument'))
// const JudicialCase = lazy(() => import('@pages/JudicialCase'))
// const UserCenter = lazy(() => import('@pages/UserCenter'))

const ComponentApp = () => {
  const routes = useRoutes([
    { path: "/", element: <Navigate to="/home" />},
    { path: "/home", element: <Home /> },
    { path: "/address", element: <Address /> },
  ])
  return routes
}

export default ComponentApp