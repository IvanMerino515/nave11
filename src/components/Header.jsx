import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import isotipo from '../images/isotipo_black.png'
import { trackEvent } from '../utils/analytics'

const CATEGORIAS_CULTURA = [
  { value: 'galeria', label: 'Galerías' },
  { value: 'nave', label: 'Naves' },
  { value: 'estudio', label: 'Estudios' },
  { value: 'sala', label: 'Salas' },
  { value: 'musica', label: 'Música y danza' },
  { value: 'fotografia', label: 'Arte digital' },
  { value: 'cultural', label: 'Centros culturales' },
]

const CATEGORIAS_GASTRO = [
  { value: 'vinos', label: 'Vinos' },
  { value: 'cerveza', label: 'Cerveza' },
  { value: 'cafe', label: 'Café' },
  { value: 'restaurante', label: 'Restaurantes' },
  { value: 'tapas', label: 'Tapas' },
  { value: 'castizo', label: 'Castizos' },
]

const CATEGORIAS_BARRIO = [
  { value: 'libreria', label: 'Librerías' },
  { value: 'comercio', label: 'Comercios' },
]

export default function Header({ vista, setVista, filtros }) {
  const {
    categoria, setCategoria,
    soloEntradaLibre, setSoloEntradaLibre,
    soloAbreSabados, setSoloAbreSabados,
    soloHistorico, setSoloHistorico,
    query, setQuery,
  } = filtros
  const [filtersOpen, setFiltersOpen] = useState(true)
  const manualOverride = useRef(false)

  const toggle = (val) => {
    const next = categoria === val ? '' : val
    if (next) trackEvent('filtro_categoria', { categoria: next })
    setCategoria(next)
  }
  const hayFiltrosActivos = categoria !== '' || soloEntradaLibre || soloAbreSabados || soloHistorico || query !== ''

  const handleFilterToggle = () => {
    manualOverride.current = true
    setFiltersOpen(o => !o)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY <= 8) {
        manualOverride.current = false
        setFiltersOpen(true)
      } else if (!manualOverride.current) {
        setFiltersOpen(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <div className={styles.brand}>
          <img src={isotipo} alt="Nave11" className={styles.logo} />
          <span className={styles.brandSub}>Mapa cultural de Carabanchel</span>
        </div>
        <div className={styles.navRight}>
          <div className={styles.viewToggle}>
            <button className={`${styles.viewBtn} ${vista === 'lista' ? styles.active : ''}`} onClick={() => { setVista('lista'); trackEvent('vista_cambiada', { vista: 'lista' }) }}>Lista</button>
            <button className={`${styles.viewBtn} ${vista === 'mapa' ? styles.active : ''}`} onClick={() => { setVista('mapa'); trackEvent('vista_cambiada', { vista: 'mapa' }) }}>Mapa</button>
            <Link to="/planes" className={styles.viewBtn}>Planes</Link>
          </div>
          <button
            className={`${styles.filterToggle} ${hayFiltrosActivos ? styles.filterToggleActive : ''}`}
            onClick={handleFilterToggle}
            aria-label="Filtros"
          >
            {filtersOpen ? '↑' : '↓'} Filtros{hayFiltrosActivos ? ' ·' : ''}
          </button>
        </div>
      </div>

      <div className={`${styles.filters} ${!filtersOpen ? styles.filtersHidden : ''}`}>
        <input
          type="search"
          className={styles.search}
          placeholder="Busca por nombre, tipo o disciplina..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={(e) => { if (e.target.value.length > 1) trackEvent('busqueda', { texto: e.target.value }) }}
        />

        <div className={styles.filterRow}>
          {/* Cultura */}
          <div className={styles.filterGroup}>
            <span className={styles.groupLabel}>Cultura</span>
            <div className={styles.catFilters}>
              <button className={`${styles.catBtn} ${categoria === '' ? styles.active : ''}`} onClick={() => setCategoria('')}>Todos</button>
              {CATEGORIAS_CULTURA.map((c) => (
                <button key={c.value} className={`${styles.catBtn} ${categoria === c.value ? styles.active : ''}`} onClick={() => toggle(c.value)}>{c.label}</button>
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          {/* Gastronomía */}
          <div className={styles.filterGroup}>
            <span className={styles.groupLabel}>Gastronomía</span>
            <div className={styles.catFilters}>
              <button
                className={`${styles.catBtn} ${styles.catBtnGastro} ${categoria === 'hosteleria' ? styles.activeGastro : ''}`}
                onClick={() => toggle('hosteleria')}
              >
                Todos
              </button>
              {CATEGORIAS_GASTRO.map((c) => (
                <button key={c.value} className={`${styles.catBtn} ${styles.catBtnGastro} ${categoria === c.value ? styles.activeGastro : ''}`} onClick={() => toggle(c.value)}>{c.label}</button>
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          {/* Tejido de barrio */}
          <div className={styles.filterGroup}>
            <span className={styles.groupLabel}>Barrio</span>
            <div className={styles.catFilters}>
              {CATEGORIAS_BARRIO.map((c) => (
                <button key={c.value} className={`${styles.catBtn} ${styles.catBtnBarrio} ${categoria === c.value ? styles.activeBarrio : ''}`} onClick={() => toggle(c.value)}>{c.label}</button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.toggleFilters}>
          <label className={styles.toggle}>
            <input type="checkbox" checked={soloEntradaLibre} onChange={(e) => setSoloEntradaLibre(e.target.checked)} />
            <span>Entrada libre</span>
          </label>
          <label className={styles.toggle}>
            <input type="checkbox" checked={soloAbreSabados} onChange={(e) => setSoloAbreSabados(e.target.checked)} />
            <span>Abre sábados</span>
          </label>
          <label className={styles.toggle}>
            <input type="checkbox" checked={soloHistorico} onChange={(e) => setSoloHistorico(e.target.checked)} />
            <span>De toda la vida</span>
          </label>
        </div>
      </div>
    </header>
  )
}
