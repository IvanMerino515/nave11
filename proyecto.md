# Nave11 — Mapa Cultural de Carabanchel
## Contexto completo del proyecto

Nave11 es el mapa cultural y gastronómico definitivo del Distrito 11 de Carabanchel (Madrid).
Un proyecto independiente, gestionado por un único admin (vecino del barrio). Sin backend en v1.
La v2 contempla que los propios espacios gestionen su ficha.

---

## Por qué existe

Carabanchel tiene más de 170 contenedores culturales pero no existe ninguna plataforma
que los centralice junto con la oferta gastronómica, las librerías y el tejido histórico del barrio.
Este proyecto cubre ese hueco — sin agenda institucional, sin patrocinadores.

---

## Categorías completas

### Espacios culturales
| Categoría | Descripción |
|---|---|
| `galeria` | Galerías de arte contemporáneo |
| `nave` | Naves y espacios multidisciplinares |
| `estudio` | Estudios y colectivos de artistas |
| `musica` | Conservatorios y formación musical/danza |
| `sala` | Salas de conciertos, teatro y ensayo |
| `fotografia` | Fotografía, audiovisual, arte digital |
| `cultural` | Centros culturales municipales |

### Hostelería
| Categoría | Descripción |
|---|---|
| `vinos` | Vinos naturales y wine bars |
| `cerveza` | Cerveza artesana y brewpubs |
| `cafe` | Café de especialidad y brunch |
| `restaurante` | Cocina creativa y restaurantes |
| `tapas` | Tapas y neotabernas modernas |
| `castizo` | Bares históricos y de toda la vida |

### Tejido de barrio
| Categoría | Descripción |
|---|---|
| `libreria` | Librerías independientes |
| `comercio` | Comercios independientes con identidad propia |
| `mercado` | Mercados municipales |

---

## Filtros en la UI

- Por **categoría** (todas las anteriores)
- **Entrada libre** (espacios culturales)
- **Abre sábados**
- **Fundado antes de 2000** (para filtrar lo histórico)
- **Búsqueda por texto** (nombre + descripción + tags)

Vista principal: **listado de cards**.
Vista secundaria: **mapa Leaflet** (CartoDB Dark Matter).
Vista adicional: **Generador de Planes** en `/planes`.

---

## Guía visual

**Nombre**: Nave11
**Inspiración**: Noname's Book Club. Brutalismo tipográfico. Fanzine de barrio.

```css
--color-bg:           #F7F6F2;   /* Blanco sucio */
--color-surface:      #EFEDE6;
--color-surface-2:    #E8E5DC;
--color-border:       #D0CCC0;
--color-text:         #111111;
--color-text-muted:   #666358;
--color-accent:       #F07030;   /* Construcción */
--color-accent-hover: #D4520A;
--color-tag-bg:       #E8E5DC;
--color-dark-bg:      #111111;
--color-dark-text:    #F7F6F2;
```

**Tipografía**: `'Bebas Neue'` títulos · `'DM Sans'` cuerpo · Google Fonts
**Reglas**: `border-radius: 0` · sin sombras · sin gradientes

---

## DIRECTORIO COMPLETO — 70 espacios verificados

---

### GALERÍAS (14)

| id | Nombre | Dirección | Lat | Lng | Rating | Tel | Web |
|---|---|---|---|---|---|---|---|
| 1 | VETA by Fer Francés | C. Antoñita Jiménez, 31-43 | 40.3899967 | -3.7185609 | 4.6 (467) | +34 911 17 70 67 | vetagaleria.com |
| 2 | Marquesa Gallery | C. Marquesa de Argüeso, 38 | 40.3908957 | -3.7244029 | 4.9 (57) | +34 671 20 68 74 | marquesagallery.com |
| 3 | Sabrina Amrani | C. Sallaberry, 52 | 40.392317 | -3.7206229 | 4.6 (59) | +34 916 21 78 59 | sabrinaamrani.com |
| 4 | La Gran | C. Nicolás Morales, 38 Pl.1 | 40.3908077 | -3.7325837 | 4.8 (18) | +34 912 46 23 92 | lagran.eu |
| 5 | Benveniste Contemporary | C. Nicolás Morales, 37 | 40.3907901 | -3.7325449 | 5.0 (4) | +34 914 71 83 05 | benveniste.com |
| 6 | Galería La Caja Negra | Av. Pedro Diez, 38 3ºC | 40.3916473 | -3.7340280 | 4.7 (24) | +34 913 10 43 60 | lacajanegra.com |
| 7 | 95 Art Gallery | C. Álvarez Abellán, 23 | 40.3851202 | -3.7316462 | 4.7 (540) | — | @95artgallery |
| 8 | Memoria | C. Morenés Arteaga, 18 | 40.3912243 | -3.7224470 | 4.2 (5) | +34 603 01 93 09 | galeriamemoria.com |
| 9 | Tönnheim Gallery | C. Alejandro Sánchez, 94 | 40.3892870 | -3.7182901 | 4.3 (10) | +34 625 95 50 07 | tonnheimgallery.com |
| 10 | Galería Nueva | C. Alejandro Sánchez, 94 | 40.3892870 | -3.7182901 | 4.4 (12) | +34 667 05 44 85 | galerianueva.com |
| 11 | Lapislázuli Gallery | C. Conde de Vistahermosa, 3C | 40.3947533 | -3.7131412 | 4.7 (14) | — | @lapislazuli.galeria |
| 12 | Garaje Bonilla | C. Morenés Arteaga, 15 | 40.3910890 | -3.7222512 | 4.8 (11) | +34 636 87 17 58 | — |
| 13 | OB Contemporary | C. Matilde Hernández, 36 | 40.3911161 | -3.7338841 | 5.0 (2) | +34 644 46 13 05 | obcontemporary.com |
| 14 | Belmonte | C. Belmonte de Tajo, 61 | 40.3904885 | -3.7199686 | 4.5 (30) | +34 626 86 88 95 | galeriabelmonte.com |

---

### NAVES Y ESPACIOS MULTIDISCIPLINARES (3)

| id | Nombre | Dirección | Lat | Lng | Rating | Tel |
|---|---|---|---|---|---|---|
| 15 | Nave Oporto | Av. Pedro Diez, 25 | 40.3914932 | -3.7326398 | 4.9 (9) | — |
| 16 | Casa Antillón | C. del Chimbo, 12 | 40.3823279 | -3.7288541 | 4.8 (58) | +34 601 00 22 02 |
| 17 | La Hipoteca | C. Belmonte de Tajo, 28 | 40.3925322 | -3.7198352 | 4.9 (33) | +34 609 07 30 93 |

---

### ESTUDIOS Y COLECTIVOS (2)

| id | Nombre | Dirección | Lat | Lng | Rating | Tel |
|---|---|---|---|---|---|---|
| 18 | LATE Studio | C. Nicolás Morales, 35 | 40.3908037 | -3.7322434 | 5.0 (3) | +34 602 49 06 83 |
| 19 | Espacio Amazonas | C. Ramón Serrano, 29 | 40.3841608 | -3.7449622 | 5.0 (8) | — |

---

### CONSERVATORIOS Y FORMACIÓN (2)

| id | Nombre | Dirección | Lat | Lng | Rating | Tel |
|---|---|---|---|---|---|---|
| 20 | Conservatorio Superior Danza María de Ávila | C. Gral. Ricardos, 177 | 40.3833772 | -3.7344717 | 4.3 (23) | +34 914 22 09 79 |
| 21 | Real Conservatorio Profesional Danza Mariemma | C. Padre Amigo, 5 | 40.3790560 | -3.7372910 | 4.5 (131) | +34 914 68 06 51 |

---

### SALAS DE CONCIERTOS, TEATRO Y ENSAYO (3)

| id | Nombre | Dirección | Lat | Lng | Rating | Tel | Descripción |
|---|---|---|---|---|---|---|---|
| 22 | Gruta 77 | C. Cuclillo, 6 | 40.3909210 | -3.7314071 | 4.4 (1687) | +34 914 71 23 70 | Sala de conciertos underground. Rock, punk, metal. Referente de la escena alternativa madrileña. Abre hasta las 6am. |
| 23 | Sala Tarambana | C. Dolores Armengot, 31 | 40.3858213 | -3.7432511 | 4.6 (1214) | +34 914 61 83 34 | Teatro de pequeño formato desde 1999. Adultos y niños. Festival de cortometrajes. Bar propio. |
| 24 | Matilda | C. Matilde Hernández, 32 | 40.3914573 | -3.7337630 | 4.6 (1006) | +34 914 72 55 09 | Salas de ensayo + estudio de grabación + bar. El hub musical del barrio. |

---

### FOTOGRAFÍA Y ARTE DIGITAL (1)

| id | Nombre | Dirección | Lat | Lng | Rating | Tel |
|---|---|---|---|---|---|---|
| 25 | HYPER HOUSE | C. Ramón Sainz, 22 | 40.3874896 | -3.7377451 | 4.3 (13) | — |

---

### CENTROS CULTURALES MUNICIPALES (3)

| id | Nombre | Dirección | Lat | Lng | Rating | Tel |
|---|---|---|---|---|---|---|
| 26 | CC Fernando Lázaro Carreter | C. de la Verdad, 29 | 40.3915022 | -3.7170359 | 4.2 (817) | +34 914 69 08 95 |
| 27 | CC Blasco Ibáñez | C. Soldado José María Rey, 44 | 40.3949067 | -3.7327846 | 4.1 (111) | +34 914 28 05 54 |
| 28 | CC García Lorca | C. Eugenia de Montijo, 105 | 40.3742082 | -3.7510283 | 4.1 (396) | +34 915 11 03 70 |

---

### VINOS NATURALES Y WINE BARS (4)

| id | Nombre | Dirección | Lat | Lng | Rating | Tel |
|---|---|---|---|---|---|---|
| 29 | La Capa | C. Condes de Barcelona, 8 | 40.3955381 | -3.7144371 | 4.1 (343) | +34 919 95 44 91 |
| 30 | Luz Verde | C. Baleares, 51 | 40.3918990 | -3.7128132 | 4.5 (24) | — |
| 31 | Taberna La Ardosa | C. Abolengo, 9 | 40.3890737 | -3.7361514 | 4.6 (117) | +34 623 94 90 54 |
| 32 | Bodega Vidal | C. Parque Eugenia de Montijo, 54 | 40.3785149 | -3.7515853 | 4.9 (123) | +34 914 65 05 69 |

---

### CERVEZA ARTESANA (1)

| id | Nombre | Dirección | Lat | Lng | Rating | Tel |
|---|---|---|---|---|---|---|
| 33 | Cervezas Patanel | Av. Pedro Diez, 21 | 40.3914383 | -3.7314374 | 4.7 (2476) | +34 644 70 19 97 |

---

### CAFÉ DE ESPECIALIDAD Y BRUNCH (4)

| id | Nombre | Dirección | Lat | Lng | Rating | Tel |
|---|---|---|---|---|---|---|
| 34 | Roto Café | C. Soldado José María Rey, 47 | 40.3951080 | -3.7322726 | 4.9 (74) | — |
| 35 | Lille Drømme Kaffe | C. Ugena, 5 | 40.3744278 | -3.7250341 | 4.9 (81) | — |
| 36 | Bar Merinas | C. Alférez Juan Usera, 42 | 40.3952260 | -3.7314152 | 4.3 (517) | +34 915 42 97 78 |
| 37 | Cardo y Olivo | C. Antonio López, 23 | 40.3966999 | -3.7129304 | 4.2 (180) | +34 604 83 51 55 |

---

### COCINA CREATIVA Y RESTAURANTES (5)

| id | Nombre | Dirección | Lat | Lng | Rating | Tel |
|---|---|---|---|---|---|---|
| 38 | Doxa Plant Based | C. Marqués de Jura Real, 22 | 40.3915613 | -3.7106793 | 4.9 (342) | +34 634 71 46 46 |
| 39 | Come Bebe Ama | C. Gesaleico, 20 | 40.3943084 | -3.7285606 | 4.4 (995) | +34 622 07 59 91 |
| 40 | Como en Casa | Av. Abrantes, 88 | 40.3788918 | -3.7311150 | 4.8 (24) | +34 622 64 10 45 |
| 41 | Vegania Veggie Bar | C. Ntra. Sra. de la Luz, 62 | 40.3850859 | -3.7477357 | 4.7 (946) | +34 911 30 52 36 |
| 42 | La Recortá Ultramarinos | C. de la Oca, 15 | 40.3894265 | -3.7341573 | 4.3 (1730) | +34 916 64 66 45 |

---

### TAPAS Y NEOTABERNAS (3)

| id | Nombre | Dirección | Lat | Lng | Rating | Tel | Descripción |
|---|---|---|---|---|---|---|---|
| 43 | La Grifería | C. Antonio de Leyva, 2 | 40.3969387 | -3.7155649 | 4.5 (287) | +34 915 60 93 46 | 6 grifos craft, vinos, quesos artesanos. Neotaberna desde 2022. |
| 44 | Lalternativa | C. Matilde Hernández, 90 | 40.3867630 | -3.7373363 | 4.4 (382) | +34 914 65 58 98 | Taberna madrileña con tapas con cada copa. Callos, croquetas, jamón. |
| 45 | Montreal | C. Lola de Membrives, 5 | 40.3965680 | -3.7166500 | 4.8 (79) | +34 681 92 63 56 | Bar + yoga + cultura. Carta de vinos y comida, iniciativas culturales. |

---

### BARES HISTÓRICOS Y DE TODA LA VIDA (5)

| id | Nombre | Dirección | Lat | Lng | Rating | Tel | Fundado | Descripción |
|---|---|---|---|---|---|---|---|---|
| 46 | La Casa de los Minutejos | C. Antonio de Leyva, 19 | 40.3951315 | -3.7152518 | 4.2 (2918) | +34 915 60 67 26 | 1967 | Inventores del minutejo — sándwich de oreja a la plancha. Institución del barrio desde hace casi 60 años. |
| 47 | Casa Enriqueta | C. Gral. Ricardos, 19 | 40.3964244 | -3.7174727 | 4.3 (4203) | +34 910 86 42 81 | — | Gallinejas, entresijos, casquería madrileña pura. El Carabanchel obrero en un plato. |
| 48 | Bar Yakarta | Av. de Oporto, 2 | 40.3853903 | -3.7182883 | 3.5 (1011) | +34 915 69 18 93 | — | Abre desde las 6am. Estética marinera años 70 intacta. Un fósil vivo del barrio. |
| 49 | Bar Río | C. del Halcón, 6 | 40.3894660 | -3.7427108 | 4.7 (537) | +34 915 25 41 88 | 1992 | Símbolo vecinal de Vista Alegre. Fiestas de carnaval, tortilla, clientela fiel de 30 años. |
| 50 | Bar Montes | Paseo de San Illán, 5 | 40.4020065 | -3.7240353 | 4.6 (459) | +34 681 19 90 98 | 50+ años | Más de cincuenta años. Sardinas al momento, boquerones, terraza amplia. |

---

### LIBRERÍAS (4)

| id | Nombre | Dirección | Lat | Lng | Rating | Tel | Descripción |
|---|---|---|---|---|---|---|---|
| 51 | Librería Derivas | C. Jacinto Verdaguer, 17 | 40.3955895 | -3.7167393 | 4.9 (159) | +34 911 13 56 16 | La más relevante. Literatura independiente, editoriales pequeñas, eventos culturales. Representó a Carabanchel en la Feria del Libro de Madrid 2025. Lema: "Vivo el barrio, leo sin rumbo." |
| 52 | Librería El Camino | C. Camino Viejo de Leganés, 169 | 40.3820338 | -3.7303851 | 4.7 (66) | +34 913 60 20 59 | Librería de barrio tradicional con buena selección y servicio cercano. |
| 53 | Librería María | Av. Ntra. Sra. de Fátima, 94 | 40.3802176 | -3.7488623 | 4.8 (74) | +34 915 25 43 83 | Librería-papelería con libros sobre historia y arquitectura de Carabanchel. Montse lleva décadas en el barrio. |
| 54 | Librería Papelería Carabanchel | Paseo Marcelino Camacho, 19 | 40.3858695 | -3.7410390 | 4.5 (208) | +34 914 62 86 92 | Organiza presentaciones de libros. Actividad cultural activa en el barrio. |

---

### COMERCIOS INDEPENDIENTES (1)

| id | Nombre | Tipo | Dirección | Lat | Lng | Rating | Tel | Descripción |
|---|---|---|---|---|---|---|---|---|
| 55 | Maison Raôul | Panadería francesa | Av. Pedro Diez, 21 dup. | 40.3913698 | -3.7315292 | 4.8 (85) | — | Boulangerie auténtica junto a Patanel. Croissants, tarte tatin, pan artesanal desde 2€ el desayuno. |

---

### MERCADOS (1)

| id | Nombre | Dirección | Lat | Lng | Rating | Tel | Descripción |
|---|---|---|---|---|---|---|---|
| 56 | Mercado San Isidro | C. San Patricio, 1 | 40.3918422 | -3.7253096 | 4.4 (1254) | +34 914 71 53 09 | El mercado municipal de toda la vida. Producto local, sin turistas. Puesto de libros de segunda mano dentro. |

---

## Generador de Planes — Especificación

### Página `/planes` — 5 preguntas → ruta personalizada

```
1. ¿Cuánto tiempo tienes?
   [ ] Un rato (1h)  [ ] Una tarde (3h) ←default  [ ] Día completo (6h+)

2. ¿Qué quieres ver?
   [ ] Galerías de arte  [ ] Naves y espacios alternativos
   [ ] Arte urbano  [ ] De todo ←default

3. ¿Con quién vas?
   [ ] Solo/a  [ ] En pareja  [ ] Con amigos ←default  [ ] Con niños

4. ¿Qué te apetece tomar?
   [ ] Vino natural / vermut  [ ] Café y brunch
   [ ] Cerveza artesana  [ ] Cualquier cosa ←default

5. ¿Qué más te apetece? (opcional)
   [ ] Nada en especial ←default
   [ ] Pasar por una librería
   [ ] Comprar pan artesanal
```

**Nota sobre la pregunta 5**: es opcional y está al final para no alargar el flujo.
Si el usuario no la modifica, la ruta no incluye paradas de tejido de barrio.
El mercado municipal queda fuera del generador — horario muy restrictivo y no encaja
en rutas culturales. Aparece en el directorio como categoría `mercado` pero no como parada.

### Lógica de matching (JavaScript puro)

```javascript
const mapaCultura = {
  galerias: (e) => e.categoria === 'galeria',
  naves:    (e) => ['nave','estudio'].includes(e.categoria),
  urbano:   (e) => e.tags.includes('Arte urbano'),
  todo:     (e) => ['galeria','nave','estudio','cultural','sala'].includes(e.categoria),
}

const mapaGastro = {
  vino:       (e) => ['vinos','tapas','castizo'].includes(e.tipo_hosteleria),
  cafe:       (e) => e.tipo_hosteleria === 'cafe',
  cerveza:    (e) => ['cerveza','tapas'].includes(e.tipo_hosteleria),
  cualquiera: (e) => e.categoria === 'hosteleria',
}

// Paradas opcionales de barrio (pregunta 5)
const mapaBarrio = {
  libreria:  (e) => e.categoria === 'libreria',
  comercio:  (e) => e.categoria === 'comercio',
  ninguno:   null,
}

const numParadas = {
  rato:  { cultura: 1, gastro: 1, barrio: 0 },
  tarde: { cultura: 2, gastro: 2, barrio: 1 },
  dia:   { cultura: 4, gastro: 3, barrio: 1 },
}
// barrio: 0 si pregunta 5 = "Nada en especial"
// barrio: 1 si pregunta 5 = librería o comercio (máximo 1 parada)

// Patrón de intercalación sin parada de barrio:
// cultura → gastro → cultura → gastro

// Patrón con parada de barrio (tarde o día):
// cultura → barrio → gastro → cultura → gastro

// Ordenación: nearest neighbor desde centroide de espacios seleccionados
// Filtro adicional: apto_ninos === true si compania === 'ninos'
```

### Copy del generador

```
Hero:
HAZTE UN PLAN
Dinos qué te apetece.
Nosotros ponemos el mapa.

CTA tras respuestas:
→ Generar plan

Resultado:
TU TARDE EN CARABANCHEL
[N] paradas · [X]km a pie

Botones:
[ Ver en el mapa ]
[ Regenerar ]

Empty state:
No hay paradas con esos filtros.
Prueba con más tiempo o menos restricciones.

Pregunta 5 — label:
¿Algo más? (opcional)
```

---

## Roadmap

### v1 — En construcción
- [x] Investigación y verificación — 56 espacios en 15 categorías
- [x] Identidad visual completa
- [x] Documentación del proyecto
- [ ] Scaffolding → `npm create vite@latest nave11 -- --template react`
- [ ] `src/data/espacios.json` con los 56 espacios
- [ ] Variables CSS · SpaceCard · FilterBar · MapView
- [ ] Vista listado + búsqueda
- [ ] Vista mapa Leaflet (CartoDB Dark Matter)
- [ ] Ficha detalle
- [ ] Página `/planes` — Generador de Planes
- [ ] Deploy en Netlify

### v2 — Plataforma participativa
- [ ] Backend (Supabase) · Formulario de registro · Panel admin
- [ ] Compartir plan generado · Sistema de eventos

### v3 — Comunidad
- [ ] Newsletter semanal · Rutas temáticas fijas · Monetización

---

## Referencias

- Círculo Carabanchel: https://circulocarabanchel.com
- Distrito 11: https://distrito11carabanchel.madrid.es
- Obertura Carabanchel: https://www.oberturacarabanchel.com
- Time Out radiografía: https://www.timeout.es/madrid/es/arte/carabanchel-radiografia-artistica-del-barrio
- Guía Repsol: https://www.guiarepsol.com/es/viajar/nos-gusta/galerias-de-carabanchel-madrid/
