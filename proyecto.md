# Contexto completo del proyecto — Nave11

## ¿Qué es esto?

Una web app React que actúa como **mapa cultural y gastronómico del Distrito 11 de Carabanchel** (Madrid).
Nombre del proyecto: **Nave11**.
El proyecto lo gestiona un único admin (vecino del barrio). Sin backend en v1.
La v2 contempla que los propios espacios gestionen su ficha.

## Por qué existe

Carabanchel tiene más de 170 contenedores culturales pero no existe ninguna plataforma
que los centralice junto con la oferta gastronómica afín. Este proyecto cubre ese hueco.

---

## Categorías de espacios culturales

| Categoría | Descripción |
|---|---|
| `galeria` | Galerías de arte contemporáneo |
| `nave` | Naves y espacios multidisciplinares |
| `estudio` | Estudios y colectivos de artistas |
| `musica` | Música, danza, teatro |
| `fotografia` | Fotografía, audiovisual, arte digital |
| `cultural` | Centros culturales municipales |

## Categorías de hostelería

| Categoría | Descripción |
|---|---|
| `vinos` | Vinos naturales y wine bars |
| `cerveza` | Cerveza artesana y brewpubs |
| `cafe` | Café de especialidad y brunch |
| `restaurante` | Cocina creativa y restaurantes |
| `tapas` | Tapas, tabernas y bares de toda la vida |

---

## Filtros disponibles en la UI

- Por **categoría** (culturales + hostelería)
- **Entrada libre** (solo espacios culturales)
- **Abre sábados**
- **Búsqueda por texto** (nombre + descripción + tags)

Vista principal: **listado de cards**.
Vista secundaria: **mapa Leaflet** (toggle en cabecera).
Vista adicional: **Generador de Planes** (`/planes`).

---

## Guía visual / Estética

**Nombre**: Nave11
**Inspiración**: Noname's Book Club. Brutalismo tipográfico. Fanzine de barrio.

**Paleta**:
```css
--color-bg:           #F7F6F2;   /* Blanco sucio */
--color-surface:      #EFEDE6;
--color-surface-2:    #E8E5DC;
--color-border:       #D0CCC0;
--color-text:         #111111;
--color-text-muted:   #666358;
--color-accent:       #F07030;   /* Construcción — naranja definitivo */
--color-accent-hover: #D4520A;
--color-tag-bg:       #E8E5DC;
--color-dark-bg:      #111111;   /* Para navbar y elementos invertidos */
--color-dark-text:    #F7F6F2;
```

**Tipografía**:
- Títulos: `'Bebas Neue'` — mayúsculas, bold extremo
- Cuerpo: `'DM Sans'` — sans-serif limpio
- Google Fonts

**Reglas de diseño**:
- `border-radius: 0` en todas partes
- Sin sombras, sin gradientes
- Tags: uppercase, letter-spacing, borde fino
- Mapa: tile CartoDB Dark Matter
- Barra naranja `#F07030` como elemento de acento principal

---

## Directorio completo — Espacios culturales (26)

### GALERÍAS (14)

| id | Nombre | Dirección | Coordenadas | Rating | Tel | Web |
|---|---|---|---|---|---|---|
| 1 | VETA by Fer Francés | C. Antoñita Jiménez, 31-43 | 40.3899967, -3.7185609 | 4.6 (467) | +34 911 17 70 67 | vetagaleria.com |
| 2 | Marquesa Gallery | C. Marquesa de Argüeso, 38 | 40.3908957, -3.7244029 | 4.9 (57) | +34 671 20 68 74 | marquesagallery.com |
| 3 | Sabrina Amrani | C. Sallaberry, 52 | 40.392317, -3.7206229 | 4.6 (59) | +34 916 21 78 59 | sabrinaamrani.com |
| 4 | La Gran | C. Nicolás Morales, 38 Pl.1 | 40.3908077, -3.7325837 | 4.8 (18) | +34 912 46 23 92 | lagran.eu |
| 5 | Benveniste Contemporary | C. Nicolás Morales, 37 | 40.3907901, -3.7325449 | 5.0 (4) | +34 914 71 83 05 | benveniste.com |
| 6 | Galería La Caja Negra | Av. Pedro Diez, 38 3ºC | 40.3916473, -3.7340280 | 4.7 (24) | +34 913 10 43 60 | lacajanegra.com |
| 7 | 95 Art Gallery | C. Álvarez Abellán, 23 | 40.3851202, -3.7316462 | 4.7 (540) | — | @95artgallery |
| 8 | Memoria | C. Morenés Arteaga, 18 | 40.3912243, -3.7224470 | 4.2 (5) | +34 603 01 93 09 | galeriamemoria.com |
| 9 | Tönnheim Gallery | C. Alejandro Sánchez, 94 | 40.3892870, -3.7182901 | 4.3 (10) | +34 625 95 50 07 | tonnheimgallery.com |
| 10 | Galería Nueva | C. Alejandro Sánchez, 94 | 40.3892870, -3.7182901 | 4.4 (12) | +34 667 05 44 85 | galerianueva.com |
| 11 | Lapislázuli Gallery | C. Conde de Vistahermosa, 3C | 40.3947533, -3.7131412 | 4.7 (14) | — | @lapislazuli.galeria |
| 12 | Garaje Bonilla | C. Morenés Arteaga, 15 | 40.3910890, -3.7222512 | 4.8 (11) | +34 636 87 17 58 | — |
| 13 | OB Contemporary | C. Matilde Hernández, 36 | 40.3911161, -3.7338841 | 5.0 (2) | +34 644 46 13 05 | obcontemporary.com |
| 14 | Belmonte | C. Belmonte de Tajo, 61 | 40.3904885, -3.7199686 | 4.5 (30) | +34 626 86 88 95 | galeriabelmonte.com |

### NAVES Y ESPACIOS MULTIDISCIPLINARES (3)

| id | Nombre | Dirección | Coordenadas | Rating | Tel |
|---|---|---|---|---|---|
| 15 | Nave Oporto | Av. Pedro Diez, 25 | 40.3914932, -3.7326398 | 4.9 (9) | — |
| 16 | Casa Antillón | C. del Chimbo, 12 | 40.3823279, -3.7288541 | 4.8 (58) | +34 601 00 22 02 |
| 17 | La Hipoteca | C. Belmonte de Tajo, 28 | 40.3925322, -3.7198352 | 4.9 (33) | +34 609 07 30 93 |

### ESTUDIOS Y COLECTIVOS (2)

| id | Nombre | Dirección | Coordenadas | Rating | Tel |
|---|---|---|---|---|---|
| 18 | LATE Studio | C. Nicolás Morales, 35 | 40.3908037, -3.7322434 | 5.0 (3) | +34 602 49 06 83 |
| 19 | Espacio Amazonas | C. Ramón Serrano, 29 | 40.3841608, -3.7449622 | 5.0 (8) | — |

### MÚSICA, DANZA Y TEATRO (3)

| id | Nombre | Dirección | Coordenadas | Rating | Tel |
|---|---|---|---|---|---|
| 20 | Arte & Desmayo | C. Baleares, 14 | 40.3949070, -3.7135582 | 4.5 (183) | +34 640 92 43 05 |
| 21 | Conservatorio Superior Danza María de Ávila | C. Gral. Ricardos, 177 | 40.3833772, -3.7344717 | 4.3 (23) | +34 914 22 09 79 |
| 22 | Real Conservatorio Profesional Danza Mariemma | C. Padre Amigo, 5 | 40.3790560, -3.7372910 | 4.5 (131) | +34 914 68 06 51 |

### FOTOGRAFÍA Y ARTE DIGITAL (1)

| id | Nombre | Dirección | Coordenadas | Rating | Tel |
|---|---|---|---|---|---|
| 23 | HYPER HOUSE | C. Ramón Sainz, 22 | 40.3874896, -3.7377451 | 4.3 (13) | — |

### CENTROS CULTURALES MUNICIPALES (3)

| id | Nombre | Dirección | Coordenadas | Rating | Tel |
|---|---|---|---|---|---|
| 24 | CC Fernando Lázaro Carreter | C. de la Verdad, 29 | 40.3915022, -3.7170359 | 4.2 (817) | +34 914 69 08 95 |
| 25 | CC Blasco Ibáñez | C. Soldado José María Rey, 44 | 40.3949067, -3.7327846 | 4.1 (111) | +34 914 28 05 54 |
| 26 | CC García Lorca | C. Eugenia de Montijo, 105 | 40.3742082, -3.7510283 | 4.1 (396) | +34 915 11 03 70 |

---

## Directorio completo — Hostelería (18)

### VINOS NATURALES Y WINE BARS (4)

| id | Nombre | Dirección | Coordenadas | Rating | Tel | Descripción |
|---|---|---|---|---|---|---|
| 27 | La Capa | C. Condes de Barcelona, 8 | 40.3955381, -3.7144371 | 4.1 (343) | +34 919 95 44 91 | Neotaberna con vinos naturales en antigua cafetería de barrio. Mantel de papel, barra metálica, sin pretensiones. |
| 28 | Luz Verde | C. Baleares, 51 | 40.3918990, -3.7128132 | 4.5 (24) | — | Bar de vinos naturales recién abierto. Referencias austriacas y suizas. El más afín al ecosistema cultural del barrio. |
| 29 | Taberna La Ardosa | C. Abolengo, 9 | 40.3890737, -3.7361514 | 4.6 (117) | +34 623 94 90 54 | Taberna clásica con vermut de grifo, gildas y tortilla pintxo. Auténtica. |
| 30 | Bodega Vidal | C. Parque Eugenia de Montijo, 54 | 40.3785149, -3.7515853 | 4.9 (123) | +34 914 65 05 69 | Bodega familiar con catas guiadas. Enrique asesora en persona. Joya escondida del barrio. |

### CERVEZA ARTESANA (1)

| id | Nombre | Dirección | Coordenadas | Rating | Tel | Descripción |
|---|---|---|---|---|---|---|
| 31 | Cervezas Patanel | Av. Pedro Diez, 21 | 40.3914383, -3.7314374 | 4.7 (2476) | +34 644 70 19 97 | Brewpub con cervezas fabricadas en Carabanchel. Ambiente de nave industrial, cocina para compartir. |

### CAFÉ DE ESPECIALIDAD Y BRUNCH (3)

| id | Nombre | Dirección | Coordenadas | Rating | Tel | Descripción |
|---|---|---|---|---|---|---|
| 32 | Roto Café | C. Soldado José María Rey, 47 | 40.3951080, -3.7322726 | 4.9 (74) | — | El mejor café del barrio. Tostadas caseras, cookies, ambiente tranquilo. Muy cerca del CC Blasco Ibáñez. |
| 33 | Lille Drømme Kaffe | C. Ugena, 5 | 40.3744278, -3.7250341 | 4.9 (81) | — | Café de especialidad nórdico. El más sorprendente del barrio. Opciones veganas. |
| 34 | Bar Merinas | C. Alférez Juan Usera, 42 | 40.3952260, -3.7314152 | 4.3 (517) | +34 915 42 97 78 | Brunch, vermut de grifo, terraza junto a la plaza San Isidro. |

### COCINA CREATIVA Y RESTAURANTES (5)

| id | Nombre | Dirección | Coordenadas | Rating | Tel | Descripción |
|---|---|---|---|---|---|---|
| 35 | Doxa Plant Based | C. Marqués de Jura Real, 22 | 40.3915613, -3.7106793 | 4.9 (342) | +34 634 71 46 46 | Gastropub plant based. Cocina creativa, frecuentado por artistas. El más alternativo. |
| 36 | Come Bebe Ama | C. Gesaleico, 20 | 40.3943084, -3.7285606 | 4.4 (995) | +34 622 07 59 91 | Cocina extremeña de vanguardia. Frecuentado por actores, artistas y músicos del barrio. |
| 37 | Como en Casa | Av. Abrantes, 88 | 40.3788918, -3.7311150 | 4.8 (24) | +34 622 64 10 45 | Bistró de barrio reciente. Cocina casera de calidad, terraza, mejor tortilla del barrio según sus clientes. |
| 38 | El Jardín de mi Madre | Av. de la Peseta, 79 | 40.3623301, -3.7512502 | 4.6 (959) | +34 910 22 29 80 | Terraza amplia, hamburgesas artesanas, ambiente familiar. |
| 39 | La Recortá Ultramarinos | C. de la Oca, 15 | 40.3894265, -3.7341573 | 4.3 (1730) | +34 916 64 66 45 | Bar-ultramarinos con ambiente y terraza. Referente de la calle de la Oca. |

### TAPAS Y BARES DE TODA LA VIDA (5)

| id | Nombre | Dirección | Coordenadas | Rating | Tel | Descripción |
|---|---|---|---|---|---|---|
| 40 | La Capa (tapas) | C. Condes de Barcelona, 8 | 40.3955381, -3.7144371 | 4.1 (343) | +34 919 95 44 91 | Tapas honradas: croquetas de gorgonzola, kokotxas, tortilla. Sin florituras. |
| 41 | Cervezas Patanel (tapas) | Av. Pedro Diez, 21 | 40.3914383, -3.7314374 | 4.7 (2476) | +34 644 70 19 97 | Picoteo informal para compartir con cervezas de la casa. |

---

## Generador de Planes — Especificación completa

### Concepto

Página separada en `/planes`. El usuario responde 4 preguntas y recibe
una ruta personalizada con espacios culturales + paradas gastronómicas
intercaladas, ordenadas geográficamente para minimizar desplazamientos.

### Las 4 preguntas

```
1. ¿Cuánto tiempo tienes?
   [ ] Un rato (1h)
   [ ] Una tarde (3h)       ← default
   [ ] Día completo (6h+)

2. ¿Qué quieres ver?
   [ ] Galerías de arte
   [ ] Naves y espacios alternativos
   [ ] Arte urbano
   [ ] De todo un poco          ← default

3. ¿Con quién vas?
   [ ] Solo/a
   [ ] En pareja
   [ ] Con amigos              ← default
   [ ] Con niños/familia

4. ¿Qué te apetece tomar?
   [ ] Vino natural / vermut
   [ ] Café y brunch
   [ ] Cerveza artesana
   [ ] Cualquier cosa           ← default
```

### Lógica de generación de rutas (JavaScript puro, sin backend)

```javascript
// Número de paradas según tiempo disponible
const paradas = {
  'rato':    { cultura: 1, gastro: 1 },
  'tarde':   { cultura: 2, gastro: 2 },
  'dia':     { cultura: 4, gastro: 3 },
}

// Mapping preguntas → categorías culturales
const mapaCultura = {
  'galerias':    ['galeria'],
  'naves':       ['nave', 'estudio'],
  'urbano':      ['galeria'],           // filtrar por tag 'Arte urbano'
  'todo':        ['galeria', 'nave', 'estudio', 'cultural'],
}

// Mapping pregunta bebida → categorías hostelería
const mapaGastro = {
  'vino':        ['vinos', 'tapas'],
  'cafe':        ['cafe'],
  'cerveza':     ['cerveza', 'tapas'],
  'cualquiera':  ['vinos', 'cafe', 'cerveza', 'restaurante', 'tapas'],
}

// Ajuste por compañía
const ajusteCompania = {
  'ninos':  { excluirTags: ['Solo adultos'], incluirTags: ['Familiar'] },
  'pareja': { preferirTipo: ['restaurante', 'vinos'] },
  'amigos': { preferirTipo: ['cerveza', 'tapas'] },
  'solo':   { preferirTipo: ['cafe', 'vinos'] },
}

// Algoritmo de ordenación geográfica
// → calcular centroide de espacios seleccionados
// → ordenar por distancia al centroide (nearest neighbor simplificado)
// → intercalar culturales y gastronómicos: cultura → gastro → cultura → gastro
```

### Estructura de una ruta generada

```
TU PLAN PARA HOY
─────────────────────────────────

PARADA 1 — 11:00
[GALERÍA]
VETA by Fer Francés
C. Antoñita Jiménez, 31-43
~1h · Entrada libre

PARADA 2 — 12:30
[CAFÉ]
Roto Café
C. Soldado José María Rey, 47
~30min · Café de especialidad

PARADA 3 — 13:15
[NAVE]
Nave Oporto
Av. Pedro Diez, 25
~45min · Open studio

PARADA 4 — 14:30
[VINOS]
La Capa
C. Condes de Barcelona, 8
~1h · Vinos naturales y tapas

─────────────────────────────────
4 paradas · ~4km a pie · Tarde completa
[ Ver en el mapa ] [ Regenerar ruta ]
```

### Horarios compatibles

El generador solo incluye espacios que abren el día seleccionado.
Si el usuario no especifica día → asumir sábado (día de mayor apertura).
Si un espacio no tiene horarios en el JSON → incluirlo con nota "Consultar horarios".

### Copy del generador (tono Nave11)

```
Hero:
HAZTE UN PLAN
Dinos qué te apetece.
Nosotros ponemos el mapa.

CTA tras respuestas:
→ Generar plan

Resultado:
TU TARDE EN CARABANCHEL
[número] paradas · [distancia] a pie

Botones de acción:
[ Ver en el mapa ]
[ Regenerar ]
[ Compartir plan ]       ← v2

Empty state:
No hay paradas disponibles con esos filtros.
Prueba con más tiempo o menos restricciones.
```

---

## Esquema JSON ampliado — Hostelería

Los espacios de hostelería se añaden al mismo `espacios.json` con estos campos adicionales:

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

**Campos exclusivos de hostelería**:
- `tipo_hosteleria`: `vinos` / `cerveza` / `cafe` / `restaurante` / `tapas`
- `precio`: `€` / `€€` / `€€€`
- `ambiente`: array de strings para el matching del generador
- `apto_ninos`: boolean — relevante para el filtro de compañía

---

## Roadmap actualizado

### v1 — En construcción (solo admin)
- [x] Investigación y verificación — 26 espacios culturales + 18 hostelería
- [x] Arquitectura y stack definido
- [x] Identidad visual completa (paleta, tipografía, tono)
- [x] CLAUDE.md y documentación del proyecto
- [ ] Scaffolding → `npm create vite@latest nave11 -- --template react`
- [ ] `src/data/espacios.json` con los 44 espacios
- [ ] Variables CSS en `src/styles/variables.css`
- [ ] Componente `SpaceCard.jsx`
- [ ] Componente `FilterBar.jsx`
- [ ] Vista listado principal con búsqueda
- [ ] Vista mapa con Leaflet (CartoDB Dark Matter)
- [ ] Ficha detalle de cada espacio
- [ ] Página `/planes` — Generador de Planes
- [ ] Deploy en Netlify

### v2 — Plataforma participativa
- [ ] Backend (Supabase)
- [ ] Formulario de registro para espacios
- [ ] Panel de admin
- [ ] Compartir plan generado (link único)
- [ ] Sistema de eventos con calendario

### v3 — Comunidad
- [ ] Newsletter semanal de eventos
- [ ] Rutas temáticas fijas (ruta galerías, ruta música...)
- [ ] Integración con agenda del Ayuntamiento
- [ ] Monetización: espacios patrocinados

---

## Referencias

- Círculo Carabanchel: https://circulocarabanchel.com
- Distrito 11: https://distrito11carabanchel.madrid.es
- Obertura Carabanchel: https://www.oberturacarabanchel.com
- Time Out radiografía: https://www.timeout.es/madrid/es/arte/carabanchel-radiografia-artistica-del-barrio
- Guía Repsol: https://www.guiarepsol.com/es/viajar/nos-gusta/galerias-de-carabanchel-madrid/
