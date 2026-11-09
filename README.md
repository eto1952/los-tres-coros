# LOS TRES COROS — Cryptic ARG Interface & 3D Three.js Background

Una interfaz web inmersiva en blanco y negro con estética críptica, iluminación estroboscópica, efectos de distorsión analógica (glitch), protección criptográfica con hashes SHA-256 unidireccionales y un objeto tridimensional metálico flotante en tiempo real renderizado con **Three.js (r160+)**.

---

## ⚡ Características Principales

* **Fondo 3D en Tiempo Real (Three.js r160+)**:
  * Trébol de cuatro puntas (*four-sided clover*) modelado con sombreado plano (*flat shading*) y material metálico oscuro (`metalness: 0.85`, `roughness: 0.3`).
  * Mapa de entorno de reflexión generado dinámicamente mediante gradiente vertical 2x256 con `PMREMGenerator` (solución física para metales sin componente difuso en Three.js r155+).
  * Iluminación física escalada ~50x: luz ambiental visible, dos luces puntuales de color en extremos opuestos (cian arriba-izquierda y carmesí abajo-derecha) y luz blanca de borde (*rim light*) trasera.
  * Niebla atmosférica exponencial suave (`FogExp2`) en el tono del fondo.
  * Rotación biaxial continua y oscilación de flotación vertical suave.
  * Paralaje interactivo del cursor suavizado con interpolación lineal (*lerp*).
  * Límite de `devicePixelRatio` a 2, redimensionado responsivo, pausa automática en segundo plano (`visibilitychange`) y soporte estricto para `prefers-reduced-motion` (renderiza un único fotograma estático sin rotación ni paralaje).
  * Peso del script 3D: **inferior a 3 KB** y ejecución no bloqueante (`defer`).

* **Secuencia de Entrada / Intro**:
  * Comienza en oscuridad total (`#000000`).
  * Desvanecimiento (*fade-in*) del icono central `iconoprincipal.png`.
  * Parpadeo glitch analógico estroboscópico.
  * Revelación inmediata del fondo con el titular en **Courier New**: `LOS TRES COROS`.

* **3 Botones de Coro**:
  * **Uno**, **Nous** y **Alma**, centrados y espaciados.
  * Mancha negra radial de alto contraste (*spotlight*) y sombreado para destacar nítidamente sobre cualquier fondo o video.

* **Modal "PARA EL TREBOL ORACULO"**:
  * Mensaje críptico confidencial desplegable.

* **Seguridad Criptográfica (SHA-256 Anti-Inspección)**:
  * Al pulsar cualquier coro, se oculta el escenario y se solicita la **Clave Dedicada** (por defecto: `Holder`).
  * Ninguna clave se almacena en texto plano. Quien inspeccione el DOM o el código fuente únicamente verá los hashes matemáticos SHA-256 de 64 caracteres.
  * Al introducir la clave correcta, se aplica un **50% extra de oscuridad transparente** sobre el fondo animado y se proyecta el mensaje glitcheándose en tiempo real: `En espera...`.

---

## 📱 Optimización para Dispositivos Móviles

* Adaptación fluida a pantallas táctiles (teléfonos y tablets).
* Disposición automática en columna en pantallas estrechas sin desbordamiento horizontal.
* Ajuste dinámico de cámara 3D: aleja automáticamente el punto de vista en modo vertical (*portrait*) para encuadrar el trébol metálico detrás del encabezado.
* Soporte táctil para paralaje mediante `pointermove`.

---

## 🚀 Despliegue en GitHub Pages

Este proyecto está 100% preparado para ser publicado directamente en GitHub Pages:

1. **Crea un repositorio en GitHub** (puedes nombrarlo `los-tres-coros` o el nombre que prefieras).
2. **Sube todos los archivos** de esta carpeta al repositorio:
   * `index.html`
   * `styles.css`
   * `script.js`
   * `clover3d.js`
   * `generador_hash.html`
   * `iconoprincipal.png`, `coro1.png`, `coro2.png`, `coro3.png`, `logo.png`
   * `.nojekyll` *(archivo incluido que asegura la lectura directa de activos en GitHub Pages)*
   * `fondo.mp4` *(tu video opcional en bucle)*
3. En GitHub, ve a la pestaña **Settings** (Configuración) de tu repositorio.
4. En el menú lateral izquierdo, haz clic en **Pages**.
5. En **Branch** (Rama), selecciona `main` (o `master`) y carpeta `/(root)`.
6. Haz clic en **Save** (Guardar).
7. En unos segundos, tu sitio estará en vivo en:
   `https://<tu-usuario>.github.io/<nombre-del-repo>/`

---

## 🛠️ Personalización de Recursos y Claves

* **Cambiar video de fondo**: Guarda tu video MP4 en la raíz con el nombre `fondo.mp4`.
* **Cambiar imágenes**: Sustituye `iconoprincipal.png`, `coro1.png`, `coro2.png`, `coro3.png` o `logo.png` con tus propios archivos PNG.
* **Cambiar contraseñas**: Abre `generador_hash.html` localmente, escribe la nueva clave, pulsa **Copiar Hash** y pégalo en `CORO_HASHES` dentro de `script.js`.
