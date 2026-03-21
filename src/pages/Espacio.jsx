import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import espacios from '../data/espacios.json'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useFilter } from '../hooks/useFilter'
import styles from './Espacio.module.css'

const DIAS = ['lu', 'ma', 'mi', 'ju', 'vi', 'sa', 'do']
const DIAS_LABEL = { lu: 'Lun', ma: 'Mar', mi: 'Mié', ju: 'Jue', vi: 'Vie', sa: 'Sáb', do: 'Dom' }
const DIAS_EN = { lu: 'Monday', ma: 'Tuesday', mi: 'Wednesday', ju: 'Thursday', vi: 'Friday', sa: 'Saturday', do: 'Sunday' }

const CATEGORIA_LABEL = {
  galeria: 'Galería', nave: 'Nave', estudio: 'Estudio',
  musica: 'Música y danza', sala: 'Sala', fotografia: 'Arte digital',
  cultural: 'Centro cultural', libreria: 'Librería',
  comercio: 'Comercio', mercado: 'Mercado',
}
const TIPO_HOSTELERIA_LABEL = {
  vinos: 'Vinos', cerveza: 'Cerveza', cafe: 'Café',
  restaurante: 'Restaurante', tapas: 'Tapas', castizo: 'Bar castizo',
}

const SCHEMA_TYPE = {
  galeria: 'ArtGallery', nave: 'EventVenue', estudio: 'LocalBusiness',
  musica: 'PerformingArtsTheater', sala: 'MusicVenue',
  fotografia: 'ArtGallery', cultural: 'CivicStructure',
  libreria: 'BookStore', comercio: 'Store', mercado: 'GroceryStore',
  hosteleria: {
    vinos: 'BarOrPub', cerveza: 'BarOrPub', cafe: 'CafeOrCoffeeShop',
    restaurante: 'Restaurant', tapas: 'BarOrPub', castizo: 'BarOrPub',
  },
}

function getSchemaType(e) {
  if (e.categoria === 'hosteleria') {
    return SCHEMA_TYPE.hosteleria[e.tipo_hosteleria] ?? 'FoodEstablishment'
  }
  return SCHEMA_TYPE[e.categoria] ?? 'LocalBusiness'
}

function buildJsonLd(e) {
  const type = getSchemaType(e)
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `https://nave11.es/espacio/${e.id}`,
    name: e.nombre,
    description: e.descripcion_larga || e.descripcion,
    address: {
      '@type': 'PostalAddress',
      streetAddress: e.direccion,
      addressLocality: 'Carabanchel',
      addressRegion: 'Madrid',
      postalCode: '28025',
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: e.lat,
      longitude: e.lng,
    },
    url: e.web || `https://nave11.es/espacio/${e.id}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Nave11',
      url: 'https://nave11.es',
    },
  }
  if (e.telefono) schema.telephone = e.telefono
  if (e.rating && e.num_reviews) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: e.rating.toString(),
      reviewCount: e.num_reviews.toString(),
      bestRating: '5',
    }
  }
  if (e.horarios) {
    schema.openingHoursSpecification = DIAS
      .filter(d => e.horarios[d])
      .map(d => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${DIAS_EN[d]}`,
        description: e.horarios[d],
      }))
  }
  return schema
}

function useEspacioSeo(e) {
  useEffect(() => {
    if (!e) return

    const catLabel = e.categoria === 'hosteleria'
      ? (TIPO_HOSTELERIA_LABEL[e.tipo_hosteleria] ?? 'Hostelería')
      : (CATEGORIA_LABEL[e.categoria] ?? e.categoria)

    const title = `${e.nombre} — ${catLabel} en Carabanchel | Nave11`
    const desc = `${e.descripcion} ${e.direccion}, Carabanchel, Madrid.${e.fundado_en ? ` Abierto desde ${e.fundado_en}.` : ''}`

    document.title = title

    const setMeta = (name, content, prop = false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let el = document.querySelector(sel)
      if (!el) {
        el = document.createElement('meta')
        prop ? el.setAttribute('property', name) : el.setAttribute('name', name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', desc)
    setMeta('og:title', title, true)
    setMeta('og:description', desc, true)
    setMeta('og:url', `https://nave11.es/espacio/${e.id}`, true)
    setMeta('og:type', 'place', true)
    setMeta('twitter:title', title, true)
    setMeta('twitter:description', desc, true)

    // JSON-LD
    const existing = document.getElementById('jsonld-espacio')
    if (existing) existing.remove()
    const script = document.createElement('script')
    script.id = 'jsonld-espacio'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(buildJsonLd(e))
    document.head.appendChild(script)

    return () => {
      document.title = 'Nave11 — Mapa cultural de Carabanchel | Arte, bares, librerías y más'
      const s = document.getElementById('jsonld-espacio')
      if (s) s.remove()
    }
  }, [e])
}

export default function Espacio() {
  const { id } = useParams()
  const navigate = useNavigate()
  const espacio = espacios.find(e => e.id === Number(id))

  // filtros vaciós solo para pasar al Header (no filtra nada en esta página)
  const filtros = useFilter(espacios)

  useEspacioSeo(espacio)

  if (!espacio) {
    return (
      <div style={{ padding: '64px 24px', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
          Espacio no encontrado.
        </p>
        <Link to="/" style={{ color: 'var(--color-text)', fontWeight: 700, fontSize: '0.85rem' }}>
          ← Volver al directorio
        </Link>
      </div>
    )
  }

  const {
    nombre, categoria, tipo_hosteleria, direccion, descripcion, descripcion_larga,
    tags, horarios, telefono, web, instagram, rating, num_reviews,
    entrada_libre, abre_sabados, destacado, fundado_en, evento_actual,
  } = espacio

  const catLabel = categoria === 'hosteleria'
    ? (TIPO_HOSTELERIA_LABEL[tipo_hosteleria] ?? 'Hostelería')
    : (CATEGORIA_LABEL[categoria] ?? categoria)

  // Relacionados: misma categoría, excluyendo el actual, máx 4
  const relacionados = espacios
    .filter(e => e.id !== espacio.id && e.categoria === categoria)
    .slice(0, 4)

  return (
    <div className={styles.page}>
      <Header vista="lista" setVista={() => {}} filtros={filtros} />

      <div className={styles.container}>

        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <button onClick={() => navigate(-1)} className={styles.back}>
            ← Todos los espacios
          </button>
        </div>

        <article className={styles.article}>

          {/* Header del espacio */}
          <header className={styles.header}>
            <div className={styles.headerMeta}>
              <span className={styles.cat}>{catLabel}</span>
              {destacado && <span className={styles.badgeDestacado}>Imprescindible</span>}
              {entrada_libre && <span className={styles.badge}>Entrada libre</span>}
              {abre_sabados && <span className={styles.badge}>Abre sábados</span>}
              {fundado_en && <span className={styles.badgeYear}>Desde {fundado_en}</span>}
            </div>

            <h1 className={styles.nombre}>{nombre}</h1>
            <p className={styles.direccion}>{direccion} · Carabanchel, Madrid</p>

            {rating && (
              <p className={styles.rating}>
                <span className={styles.star}>★</span>
                {rating.toFixed(1)}
                {num_reviews && (
                  <span className={styles.reviews}>{num_reviews.toLocaleString('es-ES')} reseñas</span>
                )}
              </p>
            )}
          </header>

          <div className={styles.body}>

            {/* Columna principal */}
            <div className={styles.main}>

              {/* Descripción */}
              <section className={styles.section}>
                <p className={styles.desc}>{descripcion_larga || descripcion}</p>
              </section>

              {/* Evento en cartel */}
              {evento_actual && (
                <section className={styles.section}>
                  <div className={styles.evento}>
                    <span className={styles.eventoLabel}>En cartel</span>
                    <strong className={styles.eventoTitulo}>{evento_actual.titulo}</strong>
                    <span className={styles.eventoFechas}>{evento_actual.fechas}</span>
                    {evento_actual.descripcion && (
                      <p className={styles.eventoDesc}>{evento_actual.descripcion}</p>
                    )}
                  </div>
                </section>
              )}

              {/* Horarios */}
              {horarios && (
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>Horarios</h2>
                  <div className={styles.horariosGrid}>
                    {DIAS.map(d => (
                      <div key={d} className={`${styles.diaRow} ${!horarios[d] ? styles.cerrado : ''}`}>
                        <span className={styles.diaLabel}>{DIAS_LABEL[d]}</span>
                        <span className={styles.diaHora}>{horarios[d] ?? 'Cerrado'}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Tags */}
              {tags?.length > 0 && (
                <section className={styles.section}>
                  <div className={styles.tags}>
                    {tags.map(tag => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                    {entrada_libre && <span className={`${styles.tag} ${styles.tagAccent}`}>Entrada libre</span>}
                  </div>
                </section>
              )}
            </div>

            {/* Columna lateral */}
            <aside className={styles.aside}>

              {/* Contacto */}
              <div className={styles.asideCard}>
                <h2 className={styles.sectionTitle}>Contacto</h2>
                <div className={styles.contacto}>
                  <p className={styles.contactAddr}>
                    <span className={styles.contactIcon}>◎</span>
                    {direccion}
                  </p>
                  {telefono && (
                    <a href={`tel:${telefono}`} className={styles.contactLink}>
                      <span className={styles.contactIcon}>☏</span>
                      {telefono}
                    </a>
                  )}
                  {web && (
                    <a href={web} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                      <span className={styles.contactIcon}>↗</span>
                      Web oficial
                    </a>
                  )}
                  {instagram && (
                    <a
                      href={`https://instagram.com/${instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLink}
                    >
                      <span className={styles.contactIcon}>◐</span>
                      @{instagram}
                    </a>
                  )}
                </div>
              </div>

              {/* Ver en mapa */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${espacio.lat},${espacio.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                Ver en Google Maps ↗
              </a>
            </aside>

          </div>
        </article>

        {/* Relacionados */}
        {relacionados.length > 0 && (
          <section className={styles.relacionados}>
            <h2 className={styles.relacionadosTitle}>
              Más {catLabel.toLowerCase()}s en Carabanchel
            </h2>
            <div className={styles.relacionadosList}>
              {relacionados.map(r => (
                <Link key={r.id} to={`/espacio/${r.id}`} className={styles.relacionadoItem}>
                  <span className={styles.relacionadoNombre}>{r.nombre}</span>
                  <span className={styles.relacionadoDir}>{r.direccion}</span>
                  {r.rating && (
                    <span className={styles.relacionadoRating}>★ {r.rating.toFixed(1)}</span>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>

      <Footer />
    </div>
  )
}
