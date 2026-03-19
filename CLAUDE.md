# Nave11 — Mapa Cultural de Carabanchel

Directorio web de espacios culturales y gastronómicos del barrio de Carabanchel (Madrid).
Administrado por un único admin. Sin backend en v1.

## Stack

- **Framework**: Vite + React 18
- **Mapa**: Leaflet.js (sin API key, tile CartoDB Dark Matter)
- **Datos**: JSON estático en `src/data/espacios.json`
- **Estilos**: CSS Modules (sin Tailwind, sin librerías de UI)
- **Deploy**: Netlify (carpeta `dist`)
- **Package manager**: npm

## Comandos

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Build → dist/
npm run preview   # Preview del build
```

## Estructura del proyecto

```
src/
  components/
    SpaceCard.jsx       # Card de espacio cultural o gastronómico
    FilterBar.jsx       # Filtros y búsqueda
    MapView.jsx         # Vista mapa con Leaflet
    PlanGenerator.jsx   # Generador de planes (/planes)
  data/
    espacios.json       # Fuente de datos única (44 espacios)
  hooks/
    useSearch.js
    useFilter.js
    usePlanGenerator.js
  styles/
    variables.css       # Variables CSS globales — NO tocar sin consultar docs
  pages/
    Home.jsx            # Vista principal — listado + filtros
    Planes.jsx          # Generador de planes
    Espacio.jsx         # Ficha detalle
  App.jsx
  main.jsx
docs/
  proyecto.md     # Contexto completo, todos los espacios, lógica del generador
  datos.md        # Esquema JSON y guía para añadir espacios
  contenido.md    # Propuesta de valor, copy y mensajes clave
```

## Reglas del proyecto

- **No usar** librerías de UI (MUI, Chakra, shadcn). Todo CSS propio.
- **No usar** TypeScript en v1. Solo JSX.
- Datos **únicamente** en `src/data/espacios.json`. Nunca hardcodear.
- El mapa es vista **secundaria**. Vista principal = listado de cards.
- El Generador de Planes vive en `/planes` como página separada.
- `border-radius: 0` en todos los elementos — sin redondeos.
- Sin `box-shadow`. Sin gradientes.

## Paleta — NO modificar sin consultar docs/proyecto.md

```css
--color-bg:           #F7F6F2;
--color-surface:      #EFEDE6;
--color-surface-2:    #E8E5DC;
--color-border:       #D0CCC0;
--color-text:         #111111;
--color-text-muted:   #666358;
--color-accent:       #F07030;
--color-accent-hover: #D4520A;
--color-tag-bg:       #E8E5DC;
--color-dark-bg:      #111111;
--color-dark-text:    #F7F6F2;
```

## Tipografía

- Títulos: `'Bebas Neue'` (Google Fonts) — uppercase, brutalista
- Cuerpo: `'DM Sans'` (Google Fonts) — limpio y legible

## Contexto completo

→ `@docs/proyecto.md` — todos los espacios, lógica del generador, roadmap
→ `@docs/datos.md` — esquema JSON, cómo añadir espacios
→ `@docs/contenido.md` — copy, tono de voz, mensajes clave
