import { Link } from 'react-router-dom'
import { usePlanGenerator } from '../hooks/usePlanGenerator'
import isotipo from '../images/isotipo_black.png'
import styles from './Planes.module.css'
import { trackEvent } from '../utils/analytics'

const CATEGORIA_LABEL = {
  galeria: 'Galería', nave: 'Nave', estudio: 'Estudio',
  musica: 'Música', sala: 'Sala', fotografia: 'Arte digital',
  cultural: 'Cultural', libreria: 'Librería', comercio: 'Comercio',
}

const TIPO_LABEL = {
  vinos: 'Vinos', cerveza: 'Cerveza', cafe: 'Café',
  restaurante: 'Restaurante', tapas: 'Tapas', castizo: 'Bar castizo',
}

const TIEMPO_LABEL = { rato: '~1h', tarde: '~3h', dia: '~6h' }

const PREGUNTAS = [
  {
    id: 'tiempo',
    pregunta: '¿Cuánto tiempo tienes?',
    opciones: [
      { valor: 'rato', label: 'Un rato', sub: '1h' },
      { valor: 'tarde', label: 'Una tarde', sub: '3h' },
      { valor: 'dia', label: 'Día completo', sub: '6h+' },
    ],
  },
  {
    id: 'cultura',
    pregunta: '¿Qué quieres ver?',
    opciones: [
      { valor: 'galerias', label: 'Galerías de arte' },
      { valor: 'naves', label: 'Naves y espacios alternativos' },
      { valor: 'urbano', label: 'Arte urbano' },
      { valor: 'todo', label: 'De todo un poco' },
    ],
  },
  {
    id: 'compania',
    pregunta: '¿Con quién vas?',
    opciones: [
      { valor: 'solo', label: 'Solo/a' },
      { valor: 'pareja', label: 'En pareja' },
      { valor: 'amigos', label: 'Con amigos' },
      { valor: 'ninos', label: 'Con niños' },
    ],
  },
  {
    id: 'gastro',
    pregunta: '¿Qué te apetece tomar?',
    opciones: [
      { valor: 'vino', label: 'Vino natural / vermut' },
      { valor: 'cafe', label: 'Café y brunch' },
      { valor: 'cerveza', label: 'Cerveza artesana' },
      { valor: 'cualquiera', label: 'Cualquier cosa' },
    ],
  },
  {
    id: 'barrio',
    pregunta: '¿Algo más? (opcional)',
    opciones: [
      { valor: 'ninguno', label: 'Nada en especial' },
      { valor: 'libreria', label: 'Pasar por una librería' },
      { valor: 'comercio', label: 'Comprar pan artesanal' },
    ],
  },
]

export default function Planes() {
  const { respuestas, responder, plan, generar } = usePlanGenerator()

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.brand}>
          <img src={isotipo} alt="Nave11" className={styles.logo} />
          <span className={styles.brandSub}>Mapa cultural de Carabanchel</span>
        </Link>
      </nav>

      <main className={styles.main}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Distrito 11 · Madrid</p>
          <h1 className={styles.titulo}>Hazte un plan</h1>
          <p className={styles.desc}>Dinos qué te apetece. Nosotros ponemos el mapa.</p>
        </header>

        <div className={styles.preguntas}>
          {PREGUNTAS.map((p) => (
            <div key={p.id} className={styles.pregunta}>
              <h2 className={styles.preguntaTitulo}>{p.pregunta}</h2>
              <div className={styles.opciones}>
                {p.opciones.map((o) => (
                  <button
                    key={o.valor}
                    className={`${styles.opcion} ${respuestas[p.id] === o.valor ? styles.opcionActiva : ''}`}
                    onClick={() => responder(p.id, o.valor)}
                  >
                    {o.label}
                    {o.sub && <span className={styles.opcionSub}>{o.sub}</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button className={styles.cta} onClick={() => {
          generar()
          trackEvent('plan_generado', {
            tiempo: respuestas.tiempo,
            cultura: respuestas.cultura,
            compania: respuestas.compania,
            gastro: respuestas.gastro,
          })
        }}>
          → Generar plan
        </button>

        {plan && plan.paradas.length > 0 && (
          <div className={styles.resultado}>
            <div className={styles.resultadoHeader}>
              <h2 className={styles.resultadoTitulo}>Tu tarde en Carabanchel</h2>
              <p className={styles.resultadoMeta}>
                {plan.paradas.length} paradas · {plan.distanciaKm} km a pie · {TIEMPO_LABEL[plan.tiempo]}
              </p>
            </div>

            <div className={styles.paradas}>
              {plan.paradas.map((e, i) => (
                <div key={e.id} className={styles.parada}>
                  <div className={styles.paradaNum}>
                    <span className={styles.num}>{i + 1}</span>
                    {i < plan.paradas.length - 1 && <div className={styles.linea} />}
                  </div>
                  <div className={styles.paradaInfo}>
                    <span className={styles.paradaCat}>
                      {e.categoria === 'hosteleria'
                        ? TIPO_LABEL[e.tipo_hosteleria] ?? 'Hostelería'
                        : CATEGORIA_LABEL[e.categoria] ?? e.categoria}
                    </span>
                    <h3 className={styles.paradaNombre}>{e.nombre}</h3>
                    <p className={styles.paradaDireccion}>{e.direccion}</p>
                    <p className={styles.paradaDesc}>{e.descripcion}</p>
                    {e.entrada_libre && (
                      <span className={styles.paradaBadge}>Entrada libre</span>
                    )}
                    {e.precio && (
                      <span className={styles.paradaBadge}>{e.precio}</span>
                    )}
                    {e.fundado_en && (
                      <span className={styles.paradaBadge}>Desde {e.fundado_en}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button className={styles.regenerar} onClick={generar}>
              Regenerar ruta
            </button>
          </div>
        )}

        {plan && plan.paradas.length === 0 && (
          <p className={styles.empty}>
            No hay paradas disponibles con esos filtros.<br />
            Prueba con más tiempo o menos restricciones.
          </p>
        )}
      </main>
    </div>
  )
}
