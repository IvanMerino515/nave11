# Guía de datos — espacios.json

El archivo `src/data/espacios.json` es la **única fuente de verdad**.
Contiene 44 espacios: 26 culturales + 18 de hostelería.
Nunca hardcodear datos en componentes.

---

## Esquema — Espacio cultural

```json
{
  "id": 1,
  "nombre": "VETA by Fer Francés",
  "categoria": "galeria",
  "direccion": "C. de Antoñita Jiménez, 31-43",
  "lat": 40.3899967,
  "lng": -3.7185609,
  "descripcion": "La galería más grande de Madrid. Dos antiguas naves industriales reconvertidas.",
  "descripcion_larga": "Texto extenso para la ficha detalle.",
  "tags": ["Arte contemporáneo", "Gran formato", "Instalación"],
  "horarios": {
    "lu": null,
    "ma": "11:00–20:00",
    "mi": "11:00–20:00",
    "ju": "11:00–20:00",
    "vi": "11:00–20:00",
    "sa": "11:00–20:00",
    "do": null
  },
  "telefono": "+34 911 17 70 67",
  "web": "http://www.vetagaleria.com/",
  "instagram": "vetagaleria",
  "rating": 4.6,
  "num_reviews": 467,
  "entrada_libre": true,
  "abre_sabados": true,
  "apto_ninos": true,
  "destacado": true,
  "evento_actual": {
    "titulo": "Nombre de la exposición",
    "fechas": "15 marzo – 10 mayo 2026",
    "descripcion": "Breve descripción."
  }
}
```

## Esquema — Espacio de hostelería

```json
{
  "id": 27,
  "nombre": "La Capa",
  "categoria": "hosteleria",
  "tipo_hosteleria": "vinos",
  "direccion": "C. Condes de Barcelona, 8",
  "lat": 40.3955381,
  "lng": -3.7144371,
  "descripcion": "Neotaberna con vinos naturales en antigua cafetería de barrio. Sin pretensiones.",
  "tags": ["Vinos naturales", "Tapas", "Barrio"],
  "horarios": {
    "lu": null,
    "ma": null,
    "mi": null,
    "ju": "20:30–00:00",
    "vi": "13:30–17:00 / 20:30–00:00",
    "sa": "13:30–17:00 / 20:30–00:00",
    "do": "13:30–17:00"
  },
  "telefono": "+34 919 95 44 91",
  "web": null,
  "instagram": null,
  "rating": 4.1,
  "num_reviews": 343,
  "precio": "€",
  "ambiente": ["cultural", "barrio", "vinos"],
  "apto_ninos": false,
  "abre_sabados": true,
  "destacado": true,
  "evento_actual": null
}
```

---

## Campos — referencia rápida

| Campo | Tipo | Aplica a | Descripción |
|---|---|---|---|
| `id` | number | ambos | Único, incremental |
| `nombre` | string | ambos | Nombre oficial |
| `categoria` | string | ambos | Ver categorías abajo |
| `tipo_hosteleria` | string | hostelería | `vinos` / `cerveza` / `cafe` / `restaurante` / `tapas` |
| `direccion` | string | ambos | Dirección postal |
| `lat` / `lng` | number | ambos | Coordenadas decimales |
| `descripcion` | string | ambos | Máx 150 chars. Para la card. |
| `descripcion_larga` | string | cultural | Para ficha detalle. Sin límite. |
| `tags` | string[] | ambos | 2–4 etiquetas |
| `horarios` | object | ambos | `null` = cerrado. String = "HH:MM–HH:MM" |
| `telefono` | string | ambos | Formato `+34 XXX XX XX XX` |
| `web` | string | ambos | URL completa o `null` |
| `instagram` | string | ambos | Handle sin @, o `null` |
| `rating` | number | ambos | 1 decimal. `null` si no hay. |
| `num_reviews` | number | ambos | Número de reseñas |
| `precio` | string | hostelería | `€` / `€€` / `€€€` |
| `ambiente` | string[] | hostelería | Para matching del generador |
| `entrada_libre` | boolean | cultural | `true` si es gratuito |
| `abre_sabados` | boolean | ambos | `true` si abre sábado |
| `apto_ninos` | boolean | ambos | `true` si es apto para familias |
| `destacado` | boolean | ambos | `true` para aparecer primero |
| `evento_actual` | object/null | ambos | `null` si no hay nada ahora |

---

## Categorías válidas

**Espacios culturales**:
`galeria` · `nave` · `estudio` · `musica` · `fotografia` · `cultural`

**Hostelería**:
`hosteleria` (en `categoria`) + especificar `tipo_hosteleria`:
`vinos` · `cerveza` · `cafe` · `restaurante` · `tapas`

---

## Tags disponibles

```
Arte contemporáneo, Arte emergente, Arte urbano, Arte latinoamericano,
Arte político, Arte internacional, Arte digital, Gran formato,
Fotografía, Grabado, Obra gráfica, Pintura, Escultura,
Instalación, Vídeo arte, Graffiti, Murales, Entrada libre,
Talleres, Residencias, Open studio, Colectivo,
Música, Danza, Teatro, Diseño, Arquitectura, Audiovisual,
Vinos naturales, Cerveza artesana, Café especialidad,
Brunch, Vermut, Tapas, Barrio, Plant based, Familiar
```

---

## Lógica del Generador de Planes

El generador en `usePlanGenerator.js` usa estos campos para el matching:

```javascript
// Filtros de cultura por pregunta "¿Qué quieres ver?"
const mapaCultura = {
  galerias: (e) => e.categoria === 'galeria',
  naves:    (e) => ['nave', 'estudio'].includes(e.categoria),
  urbano:   (e) => e.tags.includes('Arte urbano'),
  todo:     (e) => ['galeria','nave','estudio','cultural'].includes(e.categoria),
}

// Filtros de hostelería por pregunta "¿Qué te apetece tomar?"
const mapaGastro = {
  vino:       (e) => ['vinos','tapas'].includes(e.tipo_hosteleria),
  cafe:       (e) => e.tipo_hosteleria === 'cafe',
  cerveza:    (e) => ['cerveza','tapas'].includes(e.tipo_hosteleria),
  cualquiera: (e) => e.categoria === 'hosteleria',
}

// Filtro adicional por compañía
const filtraNinos = (e) => e.apto_ninos === true

// Número de paradas por tiempo
const numParadas = {
  rato:  { cultura: 1, gastro: 1 },
  tarde: { cultura: 2, gastro: 2 },
  dia:   { cultura: 4, gastro: 3 },
}
```

El orden de la ruta se calcula por proximidad geográfica (centroide → nearest neighbor).
La intercalación es siempre: **cultura → gastro → cultura → gastro**.

---

## Cómo añadir un nuevo espacio

1. Obtener coordenadas exactas en Google Maps
2. Verificar horarios en Google Maps o web oficial
3. Añadir objeto al array en `espacios.json` con `id` siguiente al último
4. Usar `categoria: "hosteleria"` + `tipo_hosteleria` para sitios gastronómicos
5. Actualizar este archivo si se añade tag o categoría nueva
