# Mis Tarjetas

App web instalable (PWA) para controlar tarjetas de crédito: fechas de corte, fechas límite de pago,
qué tarjeta conviene usar cada día y el consolidado de crédito autorizado.
Los datos se guardan solo en el dispositivo de cada usuario. No hay servidor ni cuentas.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app completa |
| `manifest.webmanifest` | Nombre, ícono y colores al instalarla |
| `sw.js` | Hace que funcione sin conexión |
| `icons/` | Íconos para Android, iPhone y navegador |
| `privacidad.html` | Aviso de privacidad (pon tu correo de contacto antes de publicar) |

## Publicarla gratis en GitHub Pages

1. Crea una cuenta en https://github.com (si no tienes).
2. Crea un repositorio nuevo, por ejemplo `mis-tarjetas`, marcado como **Public**.
3. En el repositorio: **Add file → Upload files**. Arrastra todo el contenido de esta carpeta
   (index.html, manifest.webmanifest, sw.js, privacidad.html y la carpeta icons) y da **Commit changes**.
4. Ve a **Settings → Pages**. En *Source* elige **Deploy from a branch**, rama **main**, carpeta **/ (root)** y guarda.
5. En uno o dos minutos tu app queda en: `https://TU-USUARIO.github.io/mis-tarjetas/`
6. Comparte ese link. Debe abrirse con **https** para que se pueda instalar.

Alternativa sin GitHub: entra a https://app.netlify.com/drop y arrastra la carpeta completa.

## Cómo la instalan tus usuarios

- **Android (Chrome):** abrir el link → aparece "Instalar" en la app o en el menú ⋮ → *Instalar app*.
- **iPhone (Safari):** abrir el link → botón Compartir → *Agregar a pantalla de inicio*.
- **Computadora (Chrome/Edge):** ícono de instalar en la barra de direcciones.

## Recordatorios

El botón **Agregar pagos a mi calendario** genera un archivo `.ics` con los próximos 12 meses de
fechas límite y cortes de cada tarjeta. Cada pago trae dos alertas: 3 días antes y un día antes, a las 9:00.
Al abrirlo en el celular se importa al calendario (Google Calendar, Calendario de iPhone, Outlook).
Si cambias fechas de una tarjeta, vuelve a exportar; los eventos usan el mismo identificador,
así que la mayoría de los calendarios los actualizan en lugar de duplicarlos.

## Respaldos

Como los datos viven solo en el dispositivo, recomienda a los usuarios usar **Descargar respaldo**
de vez en cuando y **Restaurar respaldo** al cambiar de celular.

## Publicar cambios

1. Sube los archivos modificados al repositorio.
2. En `sw.js` cambia `VERSION` (por ejemplo `mis-tarjetas-v2`) para que los celulares descarguen la versión nueva.

## Siguiente paso: Google Play

Cuando quieras publicarla en la tienda se puede empaquetar con Capacitor o con PWABuilder
(https://www.pwabuilder.com), que genera el paquete para Android a partir del link de GitHub Pages.
Necesitarás una cuenta de Google Play Console (pago único de 25 USD) y el aviso de privacidad publicado.
