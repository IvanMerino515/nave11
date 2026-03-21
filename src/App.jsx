import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Planes from './pages/Planes'
import Espacio from './pages/Espacio'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/planes" element={<Planes />} />
      <Route path="/espacio/:slug" element={<Espacio />} />
    </Routes>
  )
}
