import styles from './SpaceDetail.module.css'

const DIAS = ['lu', 'ma', 'mi', 'ju', 'vi', 'sa', 'do']
const DIAS_LABEL = { lu: 'Lun', ma: 'Mar', mi: 'Mié', ju: 'Jue', vi: 'Vie', sa: 'Sáb', do: 'Dom' }

const CATEGORIA_LABEL = {
  galeria: 'Galería',
  nave: 'Nave',
  estudio: 'Estudio',
  musica: 'Música',
  fotografia: 'Fotografía',
  cultural: 'Cultural',
}

function PanelContent({ espacio }) {
  const {
    nombre, categoria, direccion, descripcion, descripcion_larga,
    tags, horarios, telefono, web, instagram,
    rating, num_reviews, entrada_libre, evento_actual,
  } = espacio

  return (
    <>
      <div className={styles.header}>
        <span className={styles.cat}>{CATEGORIA_LABEL[categoria] ?? categoria}</span>
        <h2 className={styles.nombre}>{nombre}</h2>
        <p className={styles.direccion}>{direccion}</p>
        {rating && (
          <p className={styles.rating}>
            <span className={styles.star}>★</span>
            {rating.toFixed(1)}
            {num_reviews && <span className={styles.reviews}>({num_reviews} reseñas)</span>}
          </p>
        )}
      </div>

      <div className={styles.body}>
        <p className={styles.desc}>{descripcion_larga || descripcion}</p>

        {evento_actual && (
          <div className={styles.evento}>
            <span className={styles.eventoLabel}>En cartel</span>
            <strong className={styles.eventoTitulo}>{evento_actual.titulo}</strong>
            <span className={styles.eventoFechas}>{evento_actual.fechas}</span>
            {evento_actual.descripcion && <p className={styles.eventoDesc}>{evento_actual.descripcion}</p>}
          </div>
        )}

        <div className={styles.horarios}>
          <h3 className={styles.sectionTitle}>Horarios</h3>
          <div className={styles.horariosGrid}>
            {DIAS.map((d) => (
              <div key={d} className={`${styles.dia} ${!horarios[d] ? styles.cerrado : ''}`}>
                <span className={styles.diaLabel}>{DIAS_LABEL[d]}</span>
                <span className={styles.diaHora}>{horarios[d] ?? 'Cerrado hoy'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
          {entrada_libre && <span className={`${styles.tag} ${styles.tagAccent}`}>Entrada libre</span>}
        </div>

        <div className={styles.contacto}>
          {telefono && (
            <a href={`tel:${telefono}`} className={styles.contactLink}>
              <span className={styles.contactIcon}>☏</span> {telefono}
            </a>
          )}
          {web && (
            <a href={web} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
              <span className={styles.contactIcon}>↗</span> Web oficial
            </a>
          )}
          {instagram && (
            <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
              <span className={styles.contactIcon}>◎</span> @{instagram}
            </a>
          )}
        </div>
      </div>
    </>
  )
}

export default function SpaceDetail({ espacio, onClose, inline = false }) {
  if (!espacio) return null

  if (inline) {
    return (
      <div className={styles.panelInline}>
        <button className={styles.close} onClick={onClose}>✕</button>
        <PanelContent espacio={espacio} />
      </div>
    )
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>✕</button>
        <PanelContent espacio={espacio} />
      </div>
    </div>
  )
}
