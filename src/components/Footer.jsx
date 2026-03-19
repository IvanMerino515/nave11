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
          <span className={styles.sub}>Mapa cultural de Carabanchel · Proyecto independiente · Distrito 11, Madrid</span>
          <span className={styles.meta}>Datos verificados · Actualizado en 2026</span>
        </div>
        <div className={styles.right}>
          <p className={styles.cta}>¿Gestionas un espacio y no apareces?</p>
          <a href="mailto:hola@nave11.es" className={styles.ctaLink}>→ Escríbenos</a>
          <a href="https://digitaldementia.es" target="_blank" rel="noopener noreferrer" className={styles.firma}>
            Made in digitaldementia.es
          </a>
        </div>
      </div>
    </footer>
  )
}
