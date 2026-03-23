import styles from './Footer.module.css'
import logoCompleto from '../images/nave11_logo_black.png'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.brandRow}>
            <img src={logoCompleto} alt="Nave11" className={styles.logo} />
          </div>
          <span className={styles.sub}>Distrito 11, Carabanchel, Madrid · Proyecto independiente · Sin publicidad</span>
          <span className={styles.meta}>Datos verificados · 2026</span>
        </div>
        <div className={styles.right}>
          <p className={styles.cta}>¿Gestionas un espacio y no apareces?</p>
          <a href="mailto:hola@nave11.app" className={styles.ctaLink}>→ Escríbenos</a>
          <a href="https://digitaldementia.es" target="_blank" rel="noopener noreferrer" className={styles.firma}>
            Made in digitaldementia.es
          </a>
        </div>
      </div>
    </footer>
  )
}
