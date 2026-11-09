# GUÍA DE USO - LOS TRES COROS

Este proyecto implementa una página web con interfaz gráfica de usuario (GUI) críptica en blanco y negro, protegida con algoritmos de hash unidireccionales SHA-256.

---

## 📁 Estructura de Archivos y Recursos

Puedes colocar tus propios archivos con estos nombres en esta misma carpeta:

| Archivo | Formato | Descripción |
| :--- | :--- | :--- |
| `fondo.mp4` | Video MP4 | Tu video de fondo animado en bucle (*loop*). Si no lo colocas, la web activa un fondo animado digital alternativo automático. |
| `iconoprincipal.png` | Imagen PNG | El icono que aparece tras la oscuridad inicial con efecto de parpadeo/glitch. |
| `logo.png` | Imagen PNG | Logotipo o encabezado de tu preferencia ubicado en la parte superior. |
| `coro1.png` | Imagen PNG | Símbolo para el botón 1 (**Uno**). |
| `coro2.png` | Imagen PNG | Símbolo para el botón 2 (**Nous**). |
| `coro3.png` | Imagen PNG | Símbolo para el botón 3 (**Alma**). |
| `index.html` | HTML5 | Estructura principal de la web. |
| `styles.css` | CSS3 | Efectos B&W, manchas negras, glitch, líneas CRT y Courier New. |
| `script.js` | JS (ES6) | Lógica de la intro, hashing SHA-256 y cambio de pantallas. |
| `generador_hash.html` | Herramienta | Generador local para crear nuevos hashes cuando quieras cambiar contraseñas. |

---

## 🔒 Protocolo de Seguridad Criptográfica (SHA-256)

- **Clave actual (para los 3 botones):** `Holder`
- **Hash SHA-256 en el código:** `efb13468b1325dfc7b9d2cf25525af78c96b9d914ec67204c64a456c07e9dc55`
- **Protección contra inspección:**
  Si un usuario abre las herramientas de desarrollador (F12) o inspecciona el código fuente, **nunca verá la palabra "Holder" ni ninguna contraseña en texto plano**. Solo verá el valor hash matemático de 64 caracteres hexadecimales.

---

## 🔑 Cómo cambiar las claves en el futuro

Cuando quieras asignarle una clave diferente a cada botón (o cambiarlas):

### Opción 1: Con la herramienta visual local
1. Abre el archivo `generador_hash.html` con doble clic en tu navegador.
2. Escribe tu nueva contraseña en el campo de texto.
3. Haz clic en **[ COPIAR HASH ]**.
4. Abre `script.js` y pega el hash en el botón que desees:
   ```javascript
   const CORO_HASHES = {
       1: "pegar_hash_aqui", // Botón 1: Uno
       2: "pegar_hash_aqui", // Botón 2: Nous
       3: "pegar_hash_aqui"  // Botón 3: Alma
   };
   ```

### Opción 2: Desde la consola del navegador
1. En `index.html`, presiona `F12` y ve a la pestaña **Console**.
2. Escribe:
   ```javascript
   generarHash("TuNuevaClave")
   ```
3. Copia el hash impreso y colócalo en `script.js`.

### Opción 3: Pidiéndomelo directamente
Simplemente dime: *"Quiero que la clave de Uno sea X, de Nous sea Y y de Alma sea Z"* y yo actualizaré los hashes de inmediato con la máxima seguridad.

---

## 👁️ Experiencia de Usuario Implementada

1. **Secuencia de Entrada:** Comienza en total oscuridad. Luego aparece gradualmente `iconoprincipal.png`, la pantalla parpadea con un efecto estroboscópico/glitch analógico y se revela el fondo animado con el título **LOS TRES COROS** (en fuente *Courier New* con trazos y resplandor).
2. **Sombreado / Mancha Negra:** Cada símbolo cuenta con una mancha de alto contraste radial debajo para que destaque con nitidez absoluta sobre cualquier video o animación de fondo.
3. **El Trébol Oráculo:** Botón en la parte inferior que despliega una ventana emergente críptica con la transmisión correspondiente.
4. **Clave Dedicada:** Al hacer clic en un coro, todos los demás elementos se desvanecen suavemente mientras el fondo animado continúa reproduciéndose, solicitando la clave con validación hash.
5. **Estado de Éxito:** Al autenticarse con éxito, se añade un **50% extra de oscuridad** sobre el fondo animado y aparece el mensaje **"En espera..."** con un efecto de distorsión glitch en tiempo real.
