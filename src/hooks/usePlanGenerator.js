import { useState } from 'react'
import espacios from '../data/espacios.json'

const NUM_PARADAS = {
  rato:  { cultura: 1, gastro: 1 },
  tarde: { cultura: 2, gastro: 2 },
  dia:   { cultura: 4, gastro: 3 },
}

const MAPA_CULTURA = {
  galerias: (e) => e.categoria === 'galeria',
  naves:    (e) => ['nave', 'estudio'].includes(e.categoria),
  urbano:   (e) => e.tags?.includes('Arte urbano'),
  todo:     (e) => ['galeria', 'nave', 'estudio', 'cultural'].includes(e.categoria),
}

const MAPA_GASTRO = {
  vino:       (e) => ['vinos', 'tapas'].includes(e.tipo_hosteleria),
  cafe:       (e) => e.tipo_hosteleria === 'cafe',
  cerveza:    (e) => ['cerveza', 'tapas'].includes(e.tipo_hosteleria),
  cualquiera: (e) => e.categoria === 'hosteleria',
}

function distancia(a, b) {
  const dx = a.lat - b.lat
  const dy = a.lng - b.lng
  return Math.sqrt(dx * dx + dy * dy)
}

function centroide(lista) {
  const lat = lista.reduce((s, e) => s + e.lat, 0) / lista.length
  const lng = lista.reduce((s, e) => s + e.lng, 0) / lista.length
  return { lat, lng }
}

// Nearest neighbor desde centroide
function ordenarGeograficamente(lista) {
  if (lista.length <= 1) return lista
  const c = centroide(lista)
  const resto = [...lista]
  const resultado = []
  let actual = c
  while (resto.length) {
    const idx = resto.reduce((min, e, i) =>
      distancia(e, actual) < distancia(resto[min], actual) ? i : min, 0)
    resultado.push(resto[idx])
    actual = resto[idx]
    resto.splice(idx, 1)
  }
  return resultado
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function intercalar(culturales, gastros) {
  const resultado = []
  const maxLen = Math.max(culturales.length, gastros.length)
  for (let i = 0; i < maxLen; i++) {
    if (culturales[i]) resultado.push(culturales[i])
    if (gastros[i]) resultado.push(gastros[i])
  }
  return resultado
}

export function usePlanGenerator() {
  const [respuestas, setRespuestas] = useState({
    tiempo: 'tarde',
    cultura: 'todo',
    compania: 'amigos',
    gastro: 'cualquiera',
  })
  const [plan, setPlan] = useState(null)

  function responder(campo, valor) {
    setRespuestas((prev) => ({ ...prev, [campo]: valor }))
    setPlan(null)
  }

  function generar() {
    const { tiempo, cultura, compania, gastro } = respuestas
    const { cultura: nCultura, gastro: nGastro } = NUM_PARADAS[tiempo]

    // Pool culturales
    let poolCultura = espacios.filter(
      (e) => e.categoria !== 'hosteleria' && MAPA_CULTURA[cultura]?.(e)
    )
    if (compania === 'ninos') {
      poolCultura = poolCultura.filter((e) => e.apto_ninos !== false)
    }

    // Pool gastronómicos
    let poolGastro = espacios.filter(
      (e) => e.categoria === 'hosteleria' && MAPA_GASTRO[gastro]?.(e)
    )
    if (compania === 'ninos') {
      poolGastro = poolGastro.filter((e) => e.apto_ninos === true)
    }
    if (compania === 'pareja') {
      const pref = poolGastro.filter((e) => ['restaurante', 'vinos'].includes(e.tipo_hosteleria))
      if (pref.length >= nGastro) poolGastro = pref
    }
    if (compania === 'amigos') {
      const pref = poolGastro.filter((e) => ['cerveza', 'tapas'].includes(e.tipo_hosteleria))
      if (pref.length >= nGastro) poolGastro = pref
    }

    const selCultura = shuffle(poolCultura).slice(0, nCultura)
    const selGastro = shuffle(poolGastro).slice(0, nGastro)

    const culturalesOrdenados = ordenarGeograficamente(selCultura)
    const gastrosOrdenados = ordenarGeograficamente(selGastro)
    const paradas = intercalar(culturalesOrdenados, gastrosOrdenados)

    // Distancia total aproximada (km, factored)
    let distTotal = 0
    for (let i = 1; i < paradas.length; i++) {
      distTotal += distancia(paradas[i - 1], paradas[i]) * 111
    }

    setPlan({
      paradas,
      tiempo,
      distanciaKm: distTotal.toFixed(1),
    })
  }

  return { respuestas, responder, plan, generar }
}
