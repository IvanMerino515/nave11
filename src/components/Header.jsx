import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import isotipo from '../images/isotipo_black.png'

const CATEGORIAS_CULTURA = [
  { value: 'galeria', label: 'Galerías' },
  { value: 'nave', label: 'Naves' },
  { value: 'estudio', label: 'Estudios' },
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
]

export default function Header({ vista, setVista, filtros }) {
  const { categoria, setCategoria, soloEntradaLibre, setSoloEntradaLibre, soloAbreSabados, setSoloAbreSabados, query, setQuery } = filtros

  const toggle = (val) => setCategoria(categoria === val ? '' : val)

  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <div className={styles.brand}>
          <img src={isotipo} alt="Nave11" className={styles.logo} />
          <span className={styles.brandSub}>Mapa cultural de Carabanchel</span>
        </div>
        <div className={styles.viewToggle}>
          <button className={`${styles.viewBtn} ${vista === 'lista' ? styles.active : ''}`} onClick={() => setVista('lista')}>Lista</button>
          <button className={`${styles.viewBtn} ${vista === 'mapa' ? styles.active : ''}`} onClick={() => setVista('mapa')}>Mapa</button>
          <Link to="/planes" className={styles.viewBtn}>Planes</Link>
        </div>
      </div>

      <div className={styles.filters}>
        <input
          type="search"
          className={styles.search}
          placeholder="Busca por nombre, tipo o disciplina..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
        </div>
      </div>
    </header>
  )
}
