import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const NOTION_TOKEN = process.env.NOTION_TOKEN
const DATABASE_ID = '207f9cfe70ae460c97bfddb5e46abeb9'

if (!NOTION_TOKEN) {
  console.error('❌ Falta NOTION_TOKEN en variables de entorno')
  process.exit(1)
}

async function fetchAllPages() {
  const pages = []
  let cursor = undefined

  do {
    const body = { page_size: 100 }
    if (cursor) body.start_cursor = cursor

    const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Notion API error ${res.status}: ${err}`)
    }

    const data = await res.json()
    pages.push(...data.results)
    cursor = data.has_more ? data.next_cursor : undefined
  } while (cursor)

  return pages
}

function getText(prop) {
  return prop?.rich_text?.map(t => t.plain_text).join('').trim() || null
}

function getSelect(prop) {
  return prop?.select?.name || null
}

function getMultiSelect(prop) {
  return prop?.multi_select?.map(o => o.name) ?? null
}

function mapPage(page, existing) {
  const p = page.properties

  const nombre = p['Nombre']?.title?.map(t => t.plain_text).join('').trim() || ''

  const horarioNotion = {
    lu: getText(p['Lu']) || null,
    ma: getText(p['Ma']) || null,
    mi: getText(p['Mi']) || null,
    ju: getText(p['Ju']) || null,
    vi: getText(p['Vi']) || null,
    sa: getText(p['Sa']) || null,
    do: getText(p['Do']) || null,
  }
  const hasHorarioNotion = Object.values(horarioNotion).some(v => v !== null)

  return {
    id: existing?.id ?? null,
    nombre,
    categoria: getSelect(p['Categoría']) ?? existing?.categoria ?? null,
    tipo_hosteleria: getSelect(p['Tipo hostelería']) ?? existing?.tipo_hosteleria ?? null,
    direccion: getText(p['Dirección']) ?? existing?.direccion ?? null,
    lat: p['Lat']?.number ?? existing?.lat ?? null,
    lng: p['Lng']?.number ?? existing?.lng ?? null,
    descripcion: getText(p['Descripción']) ?? existing?.descripcion ?? null,
    descripcion_larga: getText(p['Descripción larga']) ?? existing?.descripcion_larga ?? null,
    tags: getMultiSelect(p['Tags']) ?? existing?.tags ?? [],
    horarios: hasHorarioNotion ? horarioNotion : (existing?.horarios ?? { lu: null, ma: null, mi: null, ju: null, vi: null, sa: null, do: null }),
    telefono: p['Teléfono']?.phone_number ?? existing?.telefono ?? null,
    num_reviews: p['Num reseñas']?.number ?? existing?.num_reviews ?? null,
    apto_ninos: p['Apto niños']?.checkbox ?? existing?.apto_ninos ?? false,
    evento_actual: existing?.evento_actual ?? null,
    web: p['Web']?.url ?? existing?.web ?? null,
    instagram: getText(p['Instagram']) ?? existing?.instagram ?? null,
    rating: p['Rating']?.number ?? existing?.rating ?? null,
    fundado_en: p['Fundado en']?.number ?? existing?.fundado_en ?? null,
    entrada_libre: p['Entrada libre']?.checkbox ?? existing?.entrada_libre ?? false,
    abre_sabados: p['Abre sábados']?.checkbox ?? existing?.abre_sabados ?? false,
    destacado: p['Destacado']?.checkbox ?? existing?.destacado ?? false,
  }
}

async function main() {
  const currentPath = join(ROOT, 'src/data/espacios.json')
  const current = JSON.parse(readFileSync(currentPath, 'utf-8'))

  // Índice por nombre normalizado
  const existingByNombre = {}
  current.forEach(e => {
    existingByNombre[e.nombre.trim().toLowerCase()] = e
  })

  console.log(`📥 Fetching from Notion…`)
  const pages = await fetchAllPages()
  console.log(`   ${pages.length} entradas encontradas en Notion`)

  // Filtrar páginas archivadas/eliminadas
  const active = pages.filter(p => !p.archived && !p.in_trash)

  // Deduplicar por nombre (primera aparición gana)
  const seenNames = new Set()
  const deduped = active.filter(page => {
    const nombre = page.properties['Nombre']?.title?.map(t => t.plain_text).join('').trim().toLowerCase() || ''
    if (seenNames.has(nombre)) {
      console.warn(`  ⚠️  Duplicado ignorado: "${page.properties['Nombre']?.title?.map(t => t.plain_text).join('').trim()}" (elimínalo en Notion)`)
      return false
    }
    seenNames.add(nombre)
    return true
  })

  const merged = deduped.map(page => {
    const nombre = page.properties['Nombre']?.title?.map(t => t.plain_text).join('').trim() || ''
    const existing = existingByNombre[nombre.toLowerCase()] ?? null
    return mapPage(page, existing)
  })

  // Asignar IDs secuenciales (conservando los existentes, rellenando huecos)
  const usedIds = new Set(merged.filter(e => e.id !== null).map(e => e.id))
  let nextId = 1
  merged.forEach(e => {
    if (e.id === null) {
      while (usedIds.has(nextId)) nextId++
      e.id = nextId
      usedIds.add(nextId)
      nextId++
    }
  })

  // Detectar espacios nuevos vs actualizados
  const nuevos = merged.filter(e => !existingByNombre[e.nombre.toLowerCase()])
  const total = merged.length

  writeFileSync(currentPath, JSON.stringify(merged, null, 2))

  console.log(`✓ espacios.json actualizado — ${total} espacios`)
  if (nuevos.length > 0) {
    console.log(`  🆕 Nuevos: ${nuevos.map(e => e.nombre).join(', ')}`)
  }
}

main().catch(err => {
  console.error('❌', err.message)
  process.exit(1)
})
