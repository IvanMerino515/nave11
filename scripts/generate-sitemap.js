import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

function toSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const espacios = JSON.parse(readFileSync(join(ROOT, 'src/data/espacios.json'), 'utf-8'))
const today = new Date().toISOString().split('T')[0]
const BASE = 'https://nave11.es'

const staticPages = [
  { loc: '/',       changefreq: 'weekly',  priority: '1.0' },
  { loc: '/planes', changefreq: 'monthly', priority: '0.8' },
]

const espacioPages = espacios.map(e => ({
  loc: `/espacio/${toSlug(e.nombre)}`,
  changefreq: 'monthly',
  priority: '0.7',
}))

const allPages = [...staticPages, ...espacioPages]

const urls = allPages.map(p => `  <url>
    <loc>${BASE}${p.loc}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
    <lastmod>${today}</lastmod>
  </url>`).join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

writeFileSync(join(ROOT, 'public/sitemap.xml'), sitemap)
console.log(`✓ sitemap.xml generado — ${allPages.length} URLs (${espacios.length} espacios)`)
