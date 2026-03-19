import { useState, useMemo } from 'react'

const TIPOS_HOSTELERIA = ['vinos', 'cerveza', 'cafe', 'restaurante', 'tapas']

export function useFilter(espacios) {
  const [categoria, setCategoria] = useState('')
  const [soloEntradaLibre, setSoloEntradaLibre] = useState(false)
  const [soloAbreSabados, setSoloAbreSabados] = useState(false)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return espacios.filter((e) => {
      if (categoria) {
        if (categoria === 'hosteleria') {
          if (e.categoria !== 'hosteleria') return false
        } else if (TIPOS_HOSTELERIA.includes(categoria)) {
          if (e.tipo_hosteleria !== categoria) return false
        } else {
          if (e.categoria !== categoria) return false
        }
      }
      if (soloEntradaLibre && !e.entrada_libre) return false
      if (soloAbreSabados && !e.abre_sabados) return false
      if (query) {
        const q = query.toLowerCase()
        const inNombre = e.nombre.toLowerCase().includes(q)
        const inDesc = e.descripcion.toLowerCase().includes(q)
        const inTags = e.tags.some((t) => t.toLowerCase().includes(q))
        if (!inNombre && !inDesc && !inTags) return false
      }
      return true
    })
  }, [espacios, categoria, soloEntradaLibre, soloAbreSabados, query])

  return {
    filtered,
    categoria,
    setCategoria,
    soloEntradaLibre,
    setSoloEntradaLibre,
    soloAbreSabados,
    setSoloAbreSabados,
    query,
    setQuery,
  }
}
