import styles from './SpaceCard.module.css'

const CATEGORIA_LABEL = {
  galeria: 'Galería',
  nave: 'Nave',
  estudio: 'Estudio',
  musica: 'Música',
  sala: 'Sala',
  fotografia: 'Arte digital',
  cultural: 'Cultural',
  libreria: 'Librería',
  comercio: 'Comercio',
  mercado: 'Mercado',
}

const TIPO_HOSTELERIA_LABEL = {
  vinos: 'Vinos',
  cerveza: 'Cerveza',
  cafe: 'Café',
  restaurante: 'Restaurante',
  tapas: 'Tapas',
  castizo: 'Bar castizo',
}

export default function SpaceCard({ espacio, onClick }) {
  const { nombre, categoria, tipo_hosteleria, direccion, descripcion, tags, rating, entrada_libre, destacado } = espacio

  const catLabel = categoria === 'hosteleria'
    ? (TIPO_HOSTELERIA_LABEL[tipo_hosteleria] ?? 'Hostelería')
    : (CATEGORIA_LABEL[categoria] ?? categoria)

  const esGastro = categoria === 'hosteleria'

  return (
    <article className={`${styles.card} ${destacado ? styles.destacado : ''} ${esGastro ? styles.gastro : ''}`} onClick={() => onClick(espacio)}>
      <div className={styles.left}>
        <div className={styles.metaRow}>
          <span className={`${styles.cat} ${esGastro ? styles.catGastro : ''}`}>{catLabel}</span>
          {destacado && <span className={styles.badgeDestacado}>Imprescindible</span>}
          {entrada_libre && <span className={styles.badge}>Entrada libre</span>}
        </div>
        <h2 className={styles.nombre}>{nombre}</h2>
        <p className={styles.direccion}>{direccion}</p>
      </div>

      <p className={styles.descripcion}>{descripcion}</p>

      <div className={styles.right}>
        <div className={styles.tags}>
          {tags.slice(0, 2).map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
        {rating && (
          <span className={styles.rating}>
            <span className={styles.ratingDot}>★</span>
            {rating.toFixed(1)}
          </span>
        )}
      </div>
    </article>
  )
}
