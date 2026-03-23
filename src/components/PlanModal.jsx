import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import styles from './PlanModal.module.css'

const TIPO_LABEL = {
  vinos: 'Vinos', cerveza: 'Cerveza', cafe: 'Café',
  restaurante: 'Restaurante', tapas: 'Tapas', castizo: 'Bar castizo',
}
const CATEGORIA_LABEL = {
  galeria: 'Galería', nave: 'Nave', estudio: 'Estudio',
  musica: 'Música', sala: 'Sala', fotografia: 'Arte digital',
  cultural: 'Cultural', libreria: 'Librería', comercio: 'Comercio',
}
const TIEMPO_LABEL = { rato: '~1h', tarde: '~3h', dia: '~6h' }

function catLabel(e) {
  return e.categoria === 'hosteleria'
    ? (TIPO_LABEL[e.tipo_hosteleria] ?? 'Hostelería')
    : (CATEGORIA_LABEL[e.categoria] ?? e.categoria)
}

function numIcon(n) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:28px;height:28px;
      background:#111;color:#F7F6F2;
      display:flex;align-items:center;justify-content:center;
      font-size:12px;font-weight:700;font-family:sans-serif;
      border:2px solid #F7F6F2;
    ">${n}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  })
}

function FitBounds({ paradas }) {
  const map = useMap()
  useEffect(() => {
    if (!paradas.length) return
    const bounds = paradas
      .filter(e => e.lat && e.lng)
      .map(e => [e.lat, e.lng])
    if (bounds.length > 0) map.fitBounds(bounds, { padding: [40, 40] })
  }, [paradas, map])
  return null
}

function MapaRuta({ paradas }) {
  const coords = paradas.filter(e => e.lat && e.lng)
  const center = coords.length
    ? [coords[0].lat, coords[0].lng]
    : [40.3938, -3.7192]

  return (
    <MapContainer
      center={center}
      zoom={15}
      className={styles.mapa}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
      <FitBounds paradas={coords} />
      {coords.length > 1 && (
        <Polyline
          positions={coords.map(e => [e.lat, e.lng])}
          pathOptions={{ color: '#F07030', weight: 2, dashArray: '6 6' }}
        />
      )}
      {coords.map((e, i) => (
        <Marker key={e.id} position={[e.lat, e.lng]} icon={numIcon(i + 1)}>
          <Popup>
            <strong>{e.nombre}</strong><br />
            <span style={{ fontSize: '0.8em', color: '#666' }}>{e.direccion}</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default function PlanModal({ plan, onClose, onRegenerar }) {
  const [tab, setTab] = useState('ruta')

  useEffect(() => {
    setTab('ruta')
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [plan])

  if (!plan) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={e => e.stopPropagation()}>

        {/* Handle drag visual */}
        <div className={styles.handle} />

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <h2 className={styles.titulo}>Tu plan en Carabanchel</h2>
            <p className={styles.meta}>
              {plan.paradas.length} paradas · {plan.distanciaKm} km · {TIEMPO_LABEL[plan.tiempo]}
            </p>
          </div>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === 'ruta' ? styles.tabActive : ''}`}
            onClick={() => setTab('ruta')}
          >
            Ruta
          </button>
          <button
            className={`${styles.tab} ${tab === 'mapa' ? styles.tabActive : ''}`}
            onClick={() => setTab('mapa')}
          >
            Mapa
          </button>
        </div>

        {/* Contenido */}
        <div className={styles.body}>
          {tab === 'ruta' && (
            <div className={styles.ruta}>
              {plan.paradas.map((e, i) => (
                <div key={e.id} className={styles.parada}>
                  <div className={styles.paradaNum}>
                    <span className={styles.num}>{i + 1}</span>
                    {i < plan.paradas.length - 1 && <div className={styles.linea} />}
                  </div>
                  <div className={styles.paradaInfo}>
                    <span className={styles.cat}>{catLabel(e)}</span>
                    <h3 className={styles.nombre}>{e.nombre}</h3>
                    <p className={styles.direccion}>{e.direccion}</p>
                    {e.descripcion && <p className={styles.desc}>{e.descripcion}</p>}
                    <div className={styles.badges}>
                      {e.entrada_libre && <span className={styles.badge}>Entrada libre</span>}
                      {e.fundado_en && <span className={styles.badge}>Desde {e.fundado_en}</span>}
                    </div>
                  </div>
                </div>
              ))}
              <button className={styles.regenerar} onClick={onRegenerar}>
                Regenerar ruta
              </button>
            </div>
          )}

          {tab === 'mapa' && <MapaRuta paradas={plan.paradas} />}
        </div>

      </div>
    </div>
  )
}
