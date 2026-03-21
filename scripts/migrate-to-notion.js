import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const NOTION_TOKEN = process.env.NOTION_TOKEN
const DATABASE_ID = '207f9cfe70ae460c97bfddb5e46abeb9'

const HEADERS = {
  'Authorization': `Bearer ${NOTION_TOKEN}`,
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json',
}

// ─── 1. Añadir propiedades a la base de datos ─────────────────────────────

async function addDatabaseProperties() {
  console.log('📐 Añadiendo propiedades a la base de datos de Notion…')

  const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}`, {
    method: 'PATCH',
    headers: HEADERS,
    body: JSON.stringify({
      properties: {
        'Descripción':       { rich_text: {} },
        'Descripción larga': { rich_text: {} },
        'Tags':              { multi_select: { options: [] } },
        'Teléfono':          { phone_number: {} },
        'Lat':               { number: { format: 'number' } },
        'Lng':               { number: { format: 'number' } },
        'Lu':                { rich_text: {} },
        'Ma':                { rich_text: {} },
        'Mi':                { rich_text: {} },
        'Ju':                { rich_text: {} },
        'Vi':                { rich_text: {} },
        'Sa':                { rich_text: {} },
        'Do':                { rich_text: {} },
        'Apto niños':        { checkbox: {} },
        'Num reseñas':       { number: { format: 'number' } },
      }
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Error añadiendo propiedades: ${err}`)
  }

  console.log('  ✓ Propiedades añadidas')
}

// ─── 2. Fetch todas las páginas de Notion ─────────────────────────────────

async function fetchAllPages() {
  const pages = []
  let cursor = undefined

  do {
    const body = { page_size: 100 }
    if (cursor) body.start_cursor = cursor

    const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(body),
    })

    const data = await res.json()
    pages.push(...data.results.filter(p => !p.archived && !p.in_trash))
    cursor = data.has_more ? data.next_cursor : undefined
  } while (cursor)

  return pages
}

// ─── 3. Actualizar cada página con datos del JSON ─────────────────────────

function richText(str) {
  if (!str) return []
  return [{ type: 'text', text: { content: String(str).slice(0, 2000) } }]
}

async function updatePage(pageId, espacio) {
  const { descripcion, descripcion_larga, tags, telefono, lat, lng,
          horarios, apto_ninos, num_reviews } = espacio

  const properties = {}

  if (descripcion)       properties['Descripción']       = { rich_text: richText(descripcion) }
  if (descripcion_larga) properties['Descripción larga'] = { rich_text: richText(descripcion_larga) }
  if (tags?.length)      properties['Tags']              = { multi_select: tags.map(t => ({ name: t })) }
  if (telefono)          properties['Teléfono']          = { phone_number: telefono }
  if (lat != null)       properties['Lat']               = { number: lat }
  if (lng != null)       properties['Lng']               = { number: lng }
  if (num_reviews)       properties['Num reseñas']       = { number: num_reviews }
  if (apto_ninos != null) properties['Apto niños']       = { checkbox: apto_ninos }

  const DIAS = ['lu', 'ma', 'mi', 'ju', 'vi', 'sa', 'do']
  const DIAS_PROP = { lu: 'Lu', ma: 'Ma', mi: 'Mi', ju: 'Ju', vi: 'Vi', sa: 'Sa', do: 'Do' }
  if (horarios) {
    DIAS.forEach(d => {
      properties[DIAS_PROP[d]] = { rich_text: richText(horarios[d] ?? '') }
    })
  }

  if (Object.keys(properties).length === 0) return

  const res = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: 'PATCH',
    headers: HEADERS,
    body: JSON.stringify({ properties }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error(`  ❌ Error actualizando ${espacio.nombre}: ${err}`)
  }
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  if (!NOTION_TOKEN) {
    console.error('❌ Falta NOTION_TOKEN')
    process.exit(1)
  }

  const espacios = JSON.parse(readFileSync(join(ROOT, 'src/data/espacios.json'), 'utf-8'))
  const byNombre = {}
  espacios.forEach(e => { byNombre[e.nombre.trim().toLowerCase()] = e })

  await addDatabaseProperties()

  console.log('📤 Migrando datos del JSON a Notion…')
  const pages = await fetchAllPages()
  console.log(`   ${pages.length} páginas encontradas`)

  let ok = 0, skip = 0
  for (const page of pages) {
    const nombre = page.properties['Nombre']?.title?.map(t => t.plain_text).join('').trim() || ''
    const espacio = byNombre[nombre.toLowerCase()]

    if (!espacio) {
      console.log(`  ⚠️  No encontrado en JSON: "${nombre}"`)
      skip++
      continue
    }

    process.stdout.write(`  → ${nombre}… `)
    await updatePage(page.id, espacio)
    console.log('✓')
    ok++

    // Pequeña pausa para no saturar la API
    await new Promise(r => setTimeout(r, 350))
  }

  console.log(`\n✅ Migración completa: ${ok} actualizados, ${skip} no encontrados`)
}

main().catch(err => {
  console.error('❌', err.message)
  process.exit(1)
})
