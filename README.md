# ESENCIA by Gold Dubai — Arabian Collection

Sitio estático (HTML + CSS + JS, sin dependencias). Listo para Vercel.

## Publicar en Vercel
1. Entra a vercel.com → Add New → Project → arrastra esta carpeta (o súbela a GitHub e impórtala).
2. Framework preset: **Other**. Sin comando de build. Output: la raíz.
3. Deploy.

## Editar perfumes
Todo el catálogo está en `js/data.js`:
- `name`, `brand`, `desc`, `hook`, `profile`, `top/heart/base` (notas verificadas).
- `img`: nombre del archivo en `assets/` (sin `.webp`).
- `box: [centroX, arriba, abajo]`: dónde está el frasco dentro de la foto (0 a 1). Sirve para centrarlo y darle la misma escala que los demás sin recortar la foto.
- `accent`: color de luz inspirado en el envase.
- `family` / `when`: alimentan la asesoría «¿Qué aroma te define?» y los filtros.
- Listas `featured`, `prestige`, `recommended`: qué perfumes aparecen en cada sección.

WhatsApp de todos los botones: `whatsapp` en `js/data.js` (+593 99 086 7201).

## Asesoría «¿Qué aroma te define?»
- Cada perfume tiene `family` (fresco, calido, elegante, gourmand) y `when` (dia, noche, evento).
  Al elegir un perfil, la web muestra todas las fragancias de esa familia y el momento destaca la mejor opción.
- En `families` puedes cambiar la descripción de cada perfil (`notes`) y añadir en `extra`
  fragancias que tienes pero no están en el catálogo con foto; aparecen como «También tengo» con enlace a WhatsApp.

## Precios
`priceRange` en `js/data.js` define el rango (USD 65 a 90). `brandPrice` define el «desde» por marca (Lattafa: 65, Arabiyat Prestige: 85); las demás marcas muestran «USD 60 – 90».
Si quieres un precio exacto para un perfume, añade `price: 75` en su ficha y aparecerá ese valor.

`launch: true` en un perfume muestra la etiqueta «Nuevo lanzamiento».
