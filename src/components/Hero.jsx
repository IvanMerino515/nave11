import styles from './Hero.module.css'

export default function Hero({ total }) {
  return (
    <section className={styles.hero}>
      <p className={styles.eyebrow}>Distrito 11 · Madrid</p>
      <h1 className={styles.titulo}>
        El sur tiene<br />su propio arte.
      </h1>
      <p className={styles.desc}>
        {total} espacios. Galerías, naves, estudios,<br />
        conservatorios y centros culturales<br />
        del distrito más creativo de Madrid.
      </p>
    </section>
  )
}
