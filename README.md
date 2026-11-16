# Mis Tarjetas · LBA Automate

PWA para registrar tarjetas, fechas estimadas, saldos manuales y confirmaciones de pago. Conserva los datos en el navegador, sin cuentas ni sincronización bancaria.

## Publicación

Conservar `index.html`, `privacidad.html`, `manifest.webmanifest`, `sw.js` y la carpeta `assets/` en la raíz del repositorio. El isotipo se obtuvo del sitio oficial de LBA Automate. Los iconos antiguos de la raíz se conservan por compatibilidad, pero ya no se referencian.

GitHub Pages: publicar la rama elegida desde `/ (root)`. Mantener la misma URL/origen para conservar el acceso al almacenamiento existente.

## Actualizar una instalación existente

1. Descargar un respaldo antes de actualizar.
2. Publicar los archivos completos, incluida la carpeta assets.
3. Abrir la app con conexión y luego cerrar todas sus ventanas/pestañas. Volver a abrir para que tome el nuevo service worker. No borrar los datos del sitio.
4. Confirmar que las tarjetas permanecen guardadas.

Se mantiene la clave `mis-tarjetas-v1` del almacenamiento. La primera lectura válida añade un punto de inicio para el seguimiento de pagos y conserva el campo de pago anterior. No reconstruye un historial bancario: el usuario debe revisar los periodos anteriores en sus estados de cuenta. Desde ese punto de inicio, los periodos sin confirmar permanecen visibles aunque cambie el mes.

## Seguridad y privacidad

- No introducir número completo de tarjeta, CVV, NIP ni accesos bancarios.
- El navegador y los respaldos JSON no se cifran por la app.
- El respaldo se valida antes de guardar; el reemplazo solicita confirmación. No combina archivos.
- Si el almacenamiento existente no se puede interpretar, la app bloquea sobrescrituras para evitar pérdida silenciosa.
- Marcar pagado registra una confirmación manual; no realiza transacciones ni cambia saldos.
- La comparación ordena por días hasta la fecha estimada; no es una evaluación de tasas, comisiones o capacidad de pago.

## Plan de pagos

`plan.html`, enlazada desde el inicio. Arriba muestra autorizado, deuda y disponible (suma de todas las deudas). Por cada deuda se captura límite, saldo, tasa anual y pago mínimo; con el pago mensual total calcula cuándo se termina de pagar, cuánto se paga de intereses y, por deuda, cuánto pagar este mes y cuándo queda liquidada.

- El excedente sobre los mínimos va primero a la tasa más alta (avalancha). Interés mensual = saldo × tasa anual ÷ 12 + IVA 16%. No considera compras nuevas ni comisiones.
- “Traer mis tarjetas” copia nombre, línea y saldo de las tarjetas guardadas (`mis-tarjetas-v1`) sin modificarlas.
- Datos en su propia clave `mis-tarjetas-plan-v1`, solo en el navegador.

## Calendario

Exportación ICS estática. No se sincroniza ni actualiza sola. Los importes son referencias capturadas al exportar. Cambiar fechas o volver a importar puede duplicar eventos según el calendario: revisar y eliminar eventos anteriores cuando corresponda. La entrega de alertas depende de la aplicación de calendario y sus permisos.

## Verificación

`node tests/regression.cjs`

`node tests/plan.cjs` (cálculo del plan de pagos)

Pruebas de lógica de pagos, años bisiestos, montos, validación de respaldos, persistencia, ICS UTF-8 y caché por página mediante entorno simulado. No requieren dependencias.

Pendiente antes de publicación definitiva: comprobar visualmente en Chrome/Android y Safari/iPhone, instalar la PWA y verificar exportación/importación del calendario real. La ejecución de Chromium local no estuvo disponible en el entorno de preparación.

## Identidad

Azul principal #2563EB, azul marino #0B1F3A, fondo #F5F8FC, isotipo oficial y tipografía del sistema sin solicitudes a Google Fonts. Vista clara y oscura adaptable a las preferencias del dispositivo.
