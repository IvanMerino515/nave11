import { useState } from 'react'
import espacios from '../data/espacios.json'
import { useFilter } from '../hooks/useFilter'
import Header from '../components/Header'
import Hero from '../components/Hero'
import SpaceCard from '../components/SpaceCard'
import SpaceDetail from '../components/SpaceDetail'
import MapView from '../components/MapView'
import Footer from '../components/Footer'
import styles from './Home.module.css'

const espaciosOrdenados = [
  ...espacios.filter((e) => e.destacado),
  ...espacios.filter((e) => !e.destacado),
]

export default function Home() {
  const [vista, setVista] = useState('lista')
  const [selected, setSelected] = useState(null)

  const filtros = useFilter(espaciosOrdenados)
  const { filtered } = filtros

  const hayFiltros = filtros.categoria || filtros.soloEntradaLibre || filtros.soloAbreSabados || filtros.soloHistorico || filtros.query

  return (
    <div className={styles.app}>
      <Header vista={vista} setVista={setVista} filtros={filtros} />

      {vista === 'lista' ? (
        <>
          {!hayFiltros && <Hero total={espacios.length} />}
          <main className={styles.main}>
            <div className={styles.count}>
              {filtered.length} {filtered.length === 1 ? 'espacio' : 'espacios'}
            </div>
            <div className={styles.list}>
              {filtered.map((e) => (
                <SpaceCard key={e.id} espacio={e} onClick={setSelected} />
              ))}
              {filtered.length === 0 && (
                <p className={styles.empty}>
                  Ningún espacio encaja con eso.<br />
                  Prueba con otra búsqueda o quita algún filtro.
                </p>
              )}
            </div>
          </main>
          <Footer />
          {selected && (
            <SpaceDetail espacio={selected} onClose={() => setSelected(null)} />
          )}
        </>
      ) : (
        <div className={styles.mapLayout}>
          <MapView espacios={filtered} onSelect={setSelected} />
          {selected && (
            <SpaceDetail
              espacio={selected}
              onClose={() => setSelected(null)}
              inline
            />
          )}
        </div>
      )}
    </div>
  )
}
