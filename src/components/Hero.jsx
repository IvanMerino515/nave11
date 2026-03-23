import { Link } from 'react-router-dom'
import styles from './Hero.module.css'

export default function Hero({ total }) {
  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <p className={styles.eyebrow}>Distrito 11 · Madrid</p>
        <h1 className={styles.titulo}>
          Carabanchel no es<br />una tendencia.
        </h1>
        <p className={styles.desc}>
          {total} espacios. Galerías, naves, bares históricos,<br />
          librerías, salas de música y mucho más.<br />
          Todo el Distrito 11 en un mapa.
        </p>
      </div>

      <Link to="/planes" className={styles.planCta}>
        <span className={styles.planLabel}>Generador de planes</span>
        <span className={styles.planTitulo}>¿No sabes por<br />dónde empezar?</span>
        <span className={styles.planAction}>→ Hazte un plan</span>
      </Link>
    </section>
  )
}
