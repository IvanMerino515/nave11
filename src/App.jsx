import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import Planes from './pages/Planes'
import Espacio from './pages/Espacio'
import { trackPageView } from './utils/analytics'

function Analytics() {
  const location = useLocation()
  useEffect(() => {
    trackPageView(location.pathname + location.search)
  }, [location])
  return null
}

export default function App() {
  return (
    <>
      <Analytics />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planes" element={<Planes />} />
        <Route path="/espacio/:slug" element={<Espacio />} />
      </Routes>
    </>
  )
}
