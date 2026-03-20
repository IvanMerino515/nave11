import styles from './Hero.module.css'

export default function Hero({ total }) {
  return (
    <section className={styles.hero}>
      <p className={styles.eyebrow}>Distrito 11 · Madrid</p>
      <h1 className={styles.titulo}>
        Carabanchel no es<br />una tendencia.
      </h1>
      <p className={styles.desc}>
        {total} espacios. Galerías, naves, bares históricos,<br />
        librerías, salas de música y mucho más.<br />
        Todo el Distrito 11 en un mapa.
      </p>
    </section>
  )
}
