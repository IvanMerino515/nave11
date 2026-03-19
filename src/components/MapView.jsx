import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './MapView.module.css'

const CATEGORIA_COLOR = {
  galeria: '#c8a96e',
  nave: '#7eb8c8',
  estudio: '#a8c87e',
  musica: '#c87ea8',
  fotografia: '#c8a07e',
  cultural: '#8a8478',
}

export default function MapView({ espacios, onSelect }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])

  useEffect(() => {
    if (mapInstanceRef.current) return

    const map = L.map(mapRef.current, {
      center: [40.388, -3.727],
      zoom: 14,
      zoomControl: true,
    })

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map)

    mapInstanceRef.current = map
  }, [])

  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    markersRef.current.forEach((m) => m.remove())
    markersRef.current = []

    espacios.forEach((e) => {
      const color = CATEGORIA_COLOR[e.categoria] ?? '#8a8478'
      const icon = L.divIcon({
        className: '',
        html: `<div style="
          width: 10px; height: 10px;
          background: ${color};
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.15);
          box-shadow: 0 0 0 3px ${color}33;
        "></div>`,
        iconSize: [10, 10],
        iconAnchor: [5, 5],
      })

      const marker = L.marker([e.lat, e.lng], { icon })
        .addTo(map)
        .bindTooltip(e.nombre, {
          permanent: false,
          className: 'nave11-tooltip',
          direction: 'top',
          offset: [0, -8],
        })
        .on('click', () => onSelect(e))

      markersRef.current.push(marker)
    })
  }, [espacios, onSelect])

  return (
    <div className={styles.container}>
      <div ref={mapRef} className={styles.map} />
      <style>{`
        .leaflet-tile-pane {
          filter: grayscale(1) brightness(0.92) contrast(1.1);
        }
        .nave11-tooltip {
          background: #bfbfbf;
          border: 1px solid #2d2d2d;
          color: #2d2d2d;
          font-family: 'Rajdhani', sans-serif;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 4px;
          white-space: nowrap;
        }
        .nave11-tooltip::before {
          border-top-color: #2d2d2d !important;
        }
        .leaflet-control-zoom a {
          background: #bfbfbf !important;
          border-color: #2d2d2d !important;
          color: #2d2d2d !important;
        }
        .leaflet-control-zoom a:hover {
          background: #adadad !important;
        }
        .leaflet-control-attribution {
          background: rgba(191, 191, 191, 0.85) !important;
          color: #555 !important;
        }
        .leaflet-control-attribution a {
          color: #555 !important;
        }
      `}</style>
    </div>
  )
}
