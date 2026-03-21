/**
 * Genera un slug SEO-friendly a partir del nombre de un espacio.
 * Funciona en browser (Vite) y en Node (scripts/).
 *
 * "VETA by Fer Francés"        → "veta-by-fer-frances"
 * "Gruta 77"                   → "gruta-77"
 * "La Casa de los Minutejos"   → "la-casa-de-los-minutejos"
 * "CC Fernando Lázaro Carreter"→ "cc-fernando-lazaro-carreter"
 */
export function toSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')                    // descompone caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '')     // elimina diacríticos (á→a, ñ→n, ü→u…)
    .replace(/[^a-z0-9\s-]/g, '')        // elimina caracteres especiales
    .trim()
    .replace(/\s+/g, '-')               // espacios → guiones
    .replace(/-+/g, '-')                // colapsa guiones múltiples
}
