# Guía de datos — espacios.json

Fuente de verdad única del proyecto. 56 espacios en 15 categorías.
Nunca hardcodear datos en componentes.

---

## Categorías válidas

### `categoria` — campo principal

**Espacios culturales:**
`galeria` · `nave` · `estudio` · `musica` · `sala` · `fotografia` · `cultural`

**Hostelería** → usar `categoria: "hosteleria"` + campo `tipo_hosteleria`:
`vinos` · `cerveza` · `cafe` · `restaurante` · `tapas` · `castizo`

**Tejido de barrio:**
`libreria` · `comercio` · `mercado`

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
  "descripcion": "La galería más grande de Madrid. Dos naves industriales reconvertidas.",
  "descripcion_larga": "Texto extenso para la ficha detalle.",
  "tags": ["Arte contemporáneo", "Gran formato", "Instalación"],
  "horarios": {
    "lu": null, "ma": "11:00–20:00", "mi": "11:00–20:00",
    "ju": "11:00–20:00", "vi": "11:00–20:00", "sa": "11:00–20:00", "do": null
  },
  "telefono": "+34 911 17 70 67",
  "web": "http://www.vetagaleria.com/",
  "instagram": "vetagaleria",
  "rating": 4.6,
  "num_reviews": 467,
  "fundado_en": null,
  "entrada_libre": true,
  "abre_sabados": true,
  "apto_ninos": true,
  "destacado": true,
  "evento_actual": {
    "titulo": "Nombre de la exposición",
    "fechas": "15 mar – 10 may 2026",
    "descripcion": "Breve descripción."
  }
}
```

## Esquema — Hostelería

```json
{
  "id": 29,
  "nombre": "La Capa",
  "categoria": "hosteleria",
  "tipo_hosteleria": "vinos",
  "direccion": "C. Condes de Barcelona, 8",
  "lat": 40.3955381,
  "lng": -3.7144371,
  "descripcion": "Neotaberna con vinos naturales en antigua cafetería. Sin pretensiones.",
  "tags": ["Vinos naturales", "Tapas", "Barrio"],
  "horarios": {
    "lu": null, "ma": null, "mi": null,
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
  "fundado_en": null,
  "apto_ninos": false,
  "abre_sabados": true,
  "destacado": true,
  "evento_actual": null
}
```

## Esquema — Castizo (bar histórico)

```json
{
  "id": 46,
  "nombre": "La Casa de los Minutejos",
  "categoria": "hosteleria",
  "tipo_hosteleria": "castizo",
  "direccion": "C. Antonio de Leyva, 19",
  "lat": 40.3951315,
  "lng": -3.7152518,
  "descripcion": "Inventores del minutejo. En el barrio desde 1967.",
  "tags": ["Castizo", "Tapas", "Historia del barrio"],
  "horarios": {
    "lu": null,
    "ma": "10:30–15:00 / 18:30–23:00",
    "mi": "10:30–15:00 / 18:30–23:00",
    "ju": "10:30–15:00 / 18:30–23:00",
    "vi": "10:30–15:00 / 18:30–00:00",
    "sa": "11:00–16:00 / 18:30–00:00",
    "do": "11:00–16:00"
  },
  "telefono": "+34 915 60 67 26",
  "web": null,
  "instagram": null,
  "rating": 4.2,
  "num_reviews": 2918,
  "precio": "€",
  "ambiente": ["castizo", "barrio", "historico"],
  "fundado_en": 1967,
  "apto_ninos": true,
  "abre_sabados": true,
  "destacado": true,
  "evento_actual": null
}
```

## Esquema — Librería

```json
{
  "id": 51,
  "nombre": "Librería Derivas",
  "categoria": "libreria",
  "direccion": "C. de Jacinto Verdaguer, 17",
  "lat": 40.3955895,
  "lng": -3.7167393,
  "descripcion": "Literatura independiente, editoriales pequeñas, punto de encuentro cultural.",
  "tags": ["Librería independiente", "Literatura", "Eventos culturales"],
  "horarios": {
    "lu": "10:00–14:00 / 17:00–20:30",
    "ma": "10:00–14:00 / 17:00–20:30",
    "mi": "10:00–14:00 / 17:00–20:30",
    "ju": "10:00–14:00 / 17:00–20:30",
    "vi": "10:00–14:00 / 17:00–20:30",
    "sa": "10:00–14:00 / 17:00–20:30",
    "do": null
  },
  "telefono": "+34 911 13 56 16",
  "web": null,
  "instagram": null,
  "rating": 4.9,
  "num_reviews": 159,
  "fundado_en": null,
  "entrada_libre": true,
  "abre_sabados": true,
  "apto_ninos": true,
  "destacado": true,
  "evento_actual": null
}
```

---

## Campos — referencia rápida

| Campo | Tipo | Aplica a | Notas |
|---|---|---|---|
| `id` | number | todos | Único, incremental, nunca reutilizar |
| `nombre` | string | todos | Nombre oficial |
| `categoria` | string | todos | Ver categorías arriba |
| `tipo_hosteleria` | string | hostelería | Solo si `categoria === "hosteleria"` |
| `direccion` | string | todos | Dirección postal completa |
| `lat` / `lng` | number | todos | Coordenadas decimales para Leaflet |
| `descripcion` | string | todos | Máx 150 chars. Para la card. |
| `descripcion_larga` | string | cultural | Para ficha detalle. Sin límite. |
| `tags` | string[] | todos | 2–4 etiquetas. Reutilizar existentes. |
| `horarios` | object | todos | `null` = cerrado. String = "HH:MM–HH:MM" |
| `telefono` | string | todos | `+34 XXX XX XX XX` o `null` |
| `web` | string | todos | URL completa o `null` |
| `instagram` | string | todos | Handle sin @ o `null` |
| `rating` | number | todos | 1 decimal o `null` |
| `num_reviews` | number | todos | Número de reseñas Google Maps |
| `precio` | string | hostelería | `€` / `€€` / `€€€` |
| `ambiente` | string[] | hostelería | Para matching del generador |
| `fundado_en` | number | todos | Año de fundación o `null` |
| `entrada_libre` | boolean | cultural + librería | `true` si gratuito |
| `abre_sabados` | boolean | todos | `true` si abre sábado |
| `apto_ninos` | boolean | todos | `true` si apto familias |
| `destacado` | boolean | todos | `true` para aparecer primero |
| `evento_actual` | object/null | todos | `null` si no hay nada ahora |

---

## Tags disponibles

```
Arte contemporáneo, Arte emergente, Arte urbano, Arte latinoamericano,
Arte político, Arte internacional, Arte digital, Gran formato,
Fotografía, Grabado, Obra gráfica, Pintura, Escultura,
Instalación, Vídeo arte, Graffiti, Murales, Entrada libre,
Talleres, Residencias, Open studio, Colectivo,
Música, Danza, Teatro, Diseño, Arquitectura, Audiovisual,
Rock, Punk, Underground, Conciertos, Ensayo, Grabación,
Vinos naturales, Cerveza artesana, Café especialidad,
Brunch, Vermut, Tapas, Barrio, Plant based, Vegano, Familiar,
Castizo, Historia del barrio, Casquería, Aperitivo,
Librería independiente, Literatura, Eventos culturales,
Panadería artesana, Mercado, Producto local,
Comercio independiente
```

---

## Lógica del Generador de Planes

```javascript
// Filtros cultura — pregunta 2
const mapaCultura = {
  galerias: (e) => e.categoria === 'galeria',
  naves:    (e) => ['nave','estudio'].includes(e.categoria),
  urbano:   (e) => e.tags.includes('Arte urbano'),
  todo:     (e) => ['galeria','nave','estudio','cultural','sala'].includes(e.categoria),
}

// Filtros hostelería — pregunta 4
const mapaGastro = {
  vino:       (e) => ['vinos','tapas','castizo'].includes(e.tipo_hosteleria),
  cafe:       (e) => e.tipo_hosteleria === 'cafe',
  cerveza:    (e) => ['cerveza','tapas'].includes(e.tipo_hosteleria),
  cualquiera: (e) => e.categoria === 'hosteleria',
}

// Paradas opcionales de barrio — pregunta 5 (opcional)
// El mercado NO entra en el generador — horario demasiado restrictivo
const mapaBarrio = {
  libreria: (e) => e.categoria === 'libreria',
  comercio: (e) => e.categoria === 'comercio',
  ninguno:  null,
}

// Número de paradas por tiempo
const numParadas = {
  rato:  { cultura: 1, gastro: 1, barrio: 0 },
  tarde: { cultura: 2, gastro: 2, barrio: 1 },
  dia:   { cultura: 4, gastro: 3, barrio: 1 },
}
// barrio siempre máximo 1 parada, solo en tarde o día completo

// Patrones de intercalación:
// Sin barrio:   cultura → gastro → cultura → gastro
// Con barrio:   cultura → barrio → gastro → cultura → gastro

// Filtro compañía: apto_ninos === true si compania === 'ninos'
// Ordenación: nearest neighbor desde centroide de espacios seleccionados
```

---

## Cómo añadir un nuevo espacio

1. Coordenadas exactas en Google Maps (click derecho → "¿Qué hay aquí?")
2. Verificar horarios en Google Maps o web oficial
3. Añadir objeto al array con `id` siguiente al último (actualmente: 57)
4. Para hostelería: `categoria: "hosteleria"` + `tipo_hosteleria` obligatorio
5. Para bares históricos: rellenar `fundado_en` si se conoce el año
6. Actualizar este archivo si se añade tag o categoría nueva
