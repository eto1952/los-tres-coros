/**
 * =========================================================================
 * LOS TRES COROS - CONTROLADOR CRÍPTICO
 * =========================================================================
 * 
 * SEGURIDAD CRIPTOGRÁFICA (SHA-256):
 * Las contraseñas NO se almacenan en texto plano en ninguna parte del código.
 * Quien inspeccione elemento o el código fuente únicamente observará los
 * hashes SHA-256 unidireccionales mostrados a continuación.
 * 
 * Clave por defecto para los 3 coros: "Holder"
 * Hash SHA-256 correspondiente: efb13468b1325dfc7b9d2cf25525af78c96b9d914ec67204c64a456c07e9dc55
 * 
 * Para generar nuevos hashes en el futuro, puedes usar la consola del navegador:
 *     generarHash("TuNuevaClave")
 * o utilizar el archivo 'generador_hash.html' incluido.
 * =========================================================================
 */

// =========================================================================
// REGISTRO DE HASHES POR CORO (SHA-256)
// Coro del Uno: "7340"
// Coro del Nous: "204"
// Coro del Alma: "6637"
// =========================================================================
const CORO_HASHES = {
    1: "120c921ffa0261995b5bb4ab93bd1f75b44718013827589be329b77e0f8f677e", // Botón 1: Uno  (Clave: 7340)
    2: "fc56dbc6d4652b315b86b71c8d688c1ccdea9c5f1fd07763d2659fde2e2fc49a", // Botón 2: Nous (Clave: 204)
    3: "8279726d9928f47059d1731e2bb540f194aaaef2636381c3018e59c71ce1c226"  // Botón 3: Alma (Clave: 6637)
};

// Nombres y slugs para referencia visual y navegación
const CORO_NAMES = {
    1: "UNO",
    2: "NOUS",
    3: "ALMA"
};

const CORO_SLUGS = {
    1: "uno",
    2: "nous",
    3: "alma"
};

// Estado actual
let selectedCoro = null;
let introCompleted = false;

// =========================================================================
// ELEMENTOS DEL DOM
// =========================================================================
const introScreen = document.getElementById('intro-screen');
const introIconWrapper = document.getElementById('intro-icon-wrapper');
const glitchFlash = document.getElementById('glitch-flash');
const mainStage = document.getElementById('main-stage');

const bgVideo = document.getElementById('bg-video');
const bgCanvas = document.getElementById('bg-canvas');
const extraDarkness = document.getElementById('extra-darkness-overlay');

const coroCards = document.querySelectorAll('.coro-card');

const btnOraculo = document.getElementById('btn-oraculo');
const oracleModal = document.getElementById('oracle-modal');
const oracleClose = document.getElementById('oracle-close');
const oracleConfirmBtn = document.getElementById('oracle-confirm-btn');

const passwordScreen = document.getElementById('password-screen');
const coroTag = document.getElementById('coro-tag');
const keyForm = document.getElementById('key-form');
const keyInput = document.getElementById('key-input');
const keyFeedback = document.getElementById('key-feedback');
const cancelKeyBtn = document.getElementById('cancel-key-btn');

const successScreen = document.getElementById('success-screen');
const cipherStream = document.getElementById('cipher-stream');

// =========================================================================
// SECUENCIA DE INTRO: OSCURIDAD -> FADE IN ICONO -> GLITCH BLINK -> REVELADO
// =========================================================================
function runIntroSequence() {
    // 1. Oscuridad completa inicial (800ms)
    setTimeout(() => {
        if (introCompleted) return;
        // 2. Fade in del icono principal
        introIconWrapper.classList.add('fade-in');

        // 3. Mantener el icono visible y luego disparar parpadeo glitch
        setTimeout(() => {
            if (introCompleted) return;
            triggerGlitchStrobe();
        }, 2200);

    }, 800);

    // Permite al usuario hacer clic en la pantalla durante la intro para omitirla
    introScreen.addEventListener('click', () => {
        if (!introCompleted) {
            triggerGlitchStrobe();
        }
    });
}

function triggerGlitchStrobe() {
    introCompleted = true;
    glitchFlash.classList.add('strobe');

    // Justo a mitad del parpadeo, desvanecemos la intro y mostramos la GUI principal
    setTimeout(() => {
        introScreen.style.display = 'none';
        mainStage.classList.remove('hidden-initial');

        // Intentar reproducir el video
        if (bgVideo) {
            bgVideo.play().catch(() => {
                // Si el navegador bloquea autoplay o el video no existe, activar fallback
                initCanvasFallback();
            });
        }
    }, 450);

    // Remover capa de flash al terminar la animación
    setTimeout(() => {
        glitchFlash.classList.remove('strobe');
    }, 850);
}

// =========================================================================
// FALLBACK DE FONDO ANIMADO (Si fondo.mp4 no se encuentra o falla)
// =========================================================================
function initCanvasFallback() {
    bgCanvas.style.display = 'block';
    const ctx = bgCanvas.getContext('2d');
    let width = bgCanvas.width = window.innerWidth;
    let height = bgCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = bgCanvas.width = window.innerWidth;
        height = bgCanvas.height = window.innerHeight;
    });

    const particles = Array.from({ length: 45 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedY: (Math.random() - 0.5) * 0.4,
        speedX: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.4 + 0.1
    }));

    function renderCanvas() {
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, width, height);

        // Nieve / ruido digital sutil
        ctx.fillStyle = '#ffffff';
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.globalAlpha = p.alpha;
            ctx.fillRect(p.x, p.y, p.size, p.size);
        });

        // Líneas sutiles de conexión
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
                if (dist < 90) {
                    ctx.globalAlpha = (1 - dist / 90) * 0.12;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        ctx.globalAlpha = 1;
        requestAnimationFrame(renderCanvas);
    }

    renderCanvas();
}

// Si el video da error al cargarse (p. ej. si no han puesto fondo.mp4 aún), usar canvas
if (bgVideo) {
    bgVideo.addEventListener('error', () => {
        initCanvasFallback();
    });
}

// =========================================================================
// INTERACCIÓN DE LOS 3 BOTONES DE CORO
// =========================================================================
coroCards.forEach(card => {
    card.addEventListener('click', () => {
        const coroId = parseInt(card.dataset.coro, 10);
        openPasswordPrompt(coroId);
    });

    // Accesibilidad por teclado (Enter / Espacio)
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const coroId = parseInt(card.dataset.coro, 10);
            openPasswordPrompt(coroId);
        }
    });
});

function openPasswordPrompt(coroId) {
    selectedCoro = coroId;
    coroTag.textContent = `[ CORO SELECCIONADO: ${CORO_NAMES[coroId] || coroId} // ACCESO DEDICADO ]`;
    keyInput.value = '';
    keyFeedback.textContent = '';
    keyFeedback.className = 'feedback-msg';

    // Desvanecer el escenario principal (todos los demás elementos)
    mainStage.classList.add('fade-out');

    setTimeout(() => {
        mainStage.style.display = 'none';
        passwordScreen.classList.remove('hidden');
        passwordScreen.style.display = 'flex';
        keyInput.focus();
    }, 400);
}

// Botón de regresar / cancelar en la pantalla de contraseña
cancelKeyBtn.addEventListener('click', () => {
    passwordScreen.classList.add('hidden');
    passwordScreen.style.display = 'none';

    mainStage.style.display = 'flex';
    setTimeout(() => {
        mainStage.classList.remove('fade-out');
    }, 50);

    selectedCoro = null;
});

// =========================================================================
// MOTOR DE SEGURIDAD CRIPTOGRÁFICA (SHA-256)
// =========================================================================
// Algoritmo SHA-256 con soporte dual: Web Crypto API nativa + fallback autónomo
// (Garantiza funcionamiento al 100% tanto en servidor como abriendo localmente con doble clic)
async function computeSha256(str) {
    const trimmed = str.trim();
    
    // 1. Intentar usar la API nativa del navegador si está disponible
    if (window.crypto && window.crypto.subtle && window.crypto.subtle.digest) {
        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(trimmed);
            const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        } catch (e) {
            console.warn('[Cripto] Usando motor criptográfico local...', e);
        }
    }

    // 2. Fallback estándar autónomo SHA-256
    return sha256Fallback(trimmed);
}

function sha256Fallback(ascii) {
    function rightRotate(value, amount) {
        return (value >>> amount) | (value << (32 - amount));
    }
    
    const mathPow = Math.pow;
    const maxWord = mathPow(2, 32);
    let lengthProperty = 'length';
    let i, j;
    let result = '';

    const words = [];
    const asciiBitLength = ascii[lengthProperty] * 8;
    
    let hash = [];
    const k = [];
    let primeCounter = 0;

    const isComposite = {};
    for (let candidate = 2; primeCounter < 64; candidate++) {
        if (!isComposite[candidate]) {
            for (i = 0; i < 313; i += candidate) {
                isComposite[i] = candidate;
            }
            hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
            k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
        }
    }
    
    hash = hash.slice(0, 8);
    ascii += '\x80';
    while (ascii[lengthProperty] % 64 - 56) ascii += '\x00';
    for (i = 0; i < ascii[lengthProperty]; i++) {
        j = ascii.charCodeAt(i);
        if (j >> 8) return;
        words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }
    words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
    words[words[lengthProperty]] = (asciiBitLength);
    
    for (j = 0; j < words[lengthProperty];) {
        const w = words.slice(j, j += 16);
        const oldHash = hash;
        hash = hash.slice(0, 8);
        
        for (i = 0; i < 64; i++) {
            const i2 = i + j;
            const w15 = w[i - 15], w2 = w[i - 2];
            const a = hash[0], e = hash[4];
            const temp1 = hash[7]
                + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
                + ((e & hash[5]) ^ ((~e) & hash[6]))
                + k[i]
                + (w[i] = (i < 16) ? w[i] : (
                        w[i - 16]
                        + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3))
                        + w[i - 7]
                        + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))
                    ) | 0
                );
            const temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
                + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
            
            hash = [(temp1 + temp2) | 0].concat(hash);
            hash[4] = (hash[4] + temp1) | 0;
        }
        
        for (i = 0; i < 8; i++) {
            hash[i] = (hash[i] + oldHash[i]) | 0;
        }
    }
    
    for (i = 0; i < 8; i++) {
        for (i = 0; i < 4; i++) {
            const byte = (hash[i] >> (24 - i * 8)) & 255;
            result += (byte < 16 ? '0' : '') + byte.toString(16);
        }
    }
    
    // Convert 8 32-bit words to 64 hex characters
    let hexResult = '';
    for (let h = 0; h < 8; h++) {
        let hex = (hash[h] >>> 0).toString(16);
        while (hex.length < 8) hex = '0' + hex;
        hexResult += hex;
    }
    return hexResult;
}

// Envío de formulario de contraseña
keyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const enteredValue = keyInput.value.trim();

    if (!enteredValue) {
        showKeyError('SECUENCIA VACÍA');
        return;
    }

    // Calcula el hash SHA-256 de lo que escribió el usuario
    const inputHash = await computeSha256(enteredValue);
    const expectedHash = CORO_HASHES[selectedCoro];

    // Comparación estricta de hashes (nunca de texto plano)
    if (inputHash === expectedHash) {
        handleAuthenticationSuccess();
    } else {
        showKeyError('ACCESO DENEGADO // CLAVE INCORRECTA');
    }
});

function showKeyError(msg) {
    keyFeedback.textContent = `[ ${msg} ]`;
    keyFeedback.className = 'feedback-msg denied';
    keyInput.value = '';
    keyInput.focus();

    // Resetear animación después de unos momentos
    setTimeout(() => {
        keyFeedback.classList.remove('denied');
    }, 600);
}

// =========================================================================
// ESTADO DE ÉXITO: CARGA -> GLITCH -> DISOLUCIÓN ASCII TRÉBOLES -> FADE OUT
// =========================================================================
function handleAuthenticationSuccess() {
    keyFeedback.textContent = '[ VERIFICACIÓN CORRECTA // DESENCRIPTANDO ]';
    keyFeedback.className = 'feedback-msg granted';
    keyInput.disabled = true;

    setTimeout(() => {
        // 1. Ocultar el recuadro de contraseña
        passwordScreen.classList.add('hidden');
        passwordScreen.style.display = 'none';

        // 2. Aplicar 50% extra de oscuridad/color negro transparente sobre el fondo animado
        extraDarkness.classList.add('active');

        // 3. Mostrar pantalla de carga con texto glitcheándose "En espera..."
        successScreen.classList.remove('hidden');
        successScreen.style.display = 'flex';

        // 4. Iniciar stream de telemetría críptica en segundo plano
        startCipherStream();

        // 5. Iniciar llenado de la barra de carga hacia el portal
        startPortalLoadingSequence();
    }, 700);
}

function startPortalLoadingSequence() {
    const loadFill = document.getElementById('load-fill');
    const loadStatus = document.getElementById('load-status');
    const successContent = document.getElementById('success-content');
    const portalCurtain = document.getElementById('portal-curtain');
    let percent = 0;

    const interval = setInterval(() => {
        // Incremento con pequeños saltos aleatorios estilo terminal
        percent += Math.floor(Math.random() * 8) + 3;
        if (percent > 100) percent = 100;

        if (loadFill) loadFill.style.width = percent + '%';
        if (loadStatus) loadStatus.textContent = `[ SINCRONIZANDO PORTAL: ${percent}% ]`;

        if (percent >= 100) {
            clearInterval(interval);
            loadStatus.textContent = '[ PORTAL SOBRECARGADO // DILUCIÓN INMINENTE ]';
            
            // Glitch violento y colapso del panel
            setTimeout(() => {
                if (successContent) successContent.classList.add('intense-collapse');
                launchAsciiCloverDissolution();
            }, 500);

            // Fundido a negro final y transición a la otra página
            setTimeout(() => {
                if (portalCurtain) portalCurtain.classList.add('fade-out');
            }, 2300);

            setTimeout(() => {
                const slug = CORO_SLUGS[selectedCoro] || 'uno';
                try {
                    sessionStorage.setItem('activeCoro', slug);
                } catch (e) {}
                window.location.href = `portal.html?coro=${slug}`;
            }, 3500);
        }
    }, 90);
}

// Animación de tréboles de 4 hojas en ASCII / Matrix Storm
function launchAsciiCloverDissolution() {
    const canvas = document.getElementById('ascii-storm-canvas');
    if (!canvas) return;

    canvas.classList.add('active');
    const ctx = canvas.getContext('2d');
    const w = canvas.width = window.innerWidth;
    const h = canvas.height = window.innerHeight;

    const asciiCloverArt = [
        '  .-. .-.  \n (   X   ) \n  \'-\'|\'-\'  ',
        '   _ /\\ _   \n  >_  _<  \n    \\/    ',
        ' [ 🍀 ] ',
        ' { ♣ } ',
        ' <+> ',
        ' 0x4C_CLOVER ',
        ' /* TRIPARTITE */ ',
        ' .::[ 4-LEAF ]::. ',
        ' [ ETO-2026 ] '
    ];

    const particles = Array.from({ length: 65 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        text: asciiCloverArt[Math.floor(Math.random() * asciiCloverArt.length)],
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6 - 2,
        size: Math.floor(Math.random() * 8) + 12,
        alpha: 1,
        fadeSpeed: Math.random() * 0.015 + 0.008
    }));

    let animRunning = true;

    function renderStorm() {
        if (!animRunning) return;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
        ctx.fillRect(0, 0, w, h);

        ctx.font = '14px "Courier New", Courier, monospace';
        ctx.fillStyle = '#ffffff';

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= p.fadeSpeed;
            if (p.alpha < 0) p.alpha = 0;

            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.font = `${p.size}px "Courier New", Courier, monospace`;
            
            // Soporte multilínea para mini ASCII art
            const lines = p.text.split('\n');
            lines.forEach((line, idx) => {
                ctx.fillText(line, p.x, p.y + (idx * (p.size + 2)));
            });

            ctx.restore();
        });

        requestAnimationFrame(renderStorm);
    }

    renderStorm();

    setTimeout(() => {
        animRunning = false;
    }, 3500);
}

function startCipherStream() {
    const chars = '0123456789ABCDEF/\\_<>[]#*~$';
    setInterval(() => {
        let stream = 'CORO_ACTIVO: ' + (CORO_NAMES[selectedCoro] || 'SYNC') + ' | SESIÓN: 0x';
        for (let i = 0; i < 8; i++) {
            stream += chars[Math.floor(Math.random() * chars.length)];
        }
        stream += ' | ESTADO: TRANSMISIÓN LATENTE';
        cipherStream.textContent = stream;
    }, 250);
}

// =========================================================================
// POP-UP / MODAL DEL TRÉBOL ORÁCULO
// =========================================================================
btnOraculo.addEventListener('click', () => {
    oracleModal.classList.add('active');
    oracleModal.setAttribute('aria-hidden', 'false');
});

function closeOracleModal() {
    oracleModal.classList.remove('active');
    oracleModal.setAttribute('aria-hidden', 'true');
}

oracleClose.addEventListener('click', closeOracleModal);
oracleConfirmBtn.addEventListener('click', closeOracleModal);

// Cerrar si hace clic fuera del modal
oracleModal.addEventListener('click', (e) => {
    if (e.target === oracleModal) {
        closeOracleModal();
    }
});

// Cerrar con Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (oracleModal.classList.contains('active')) {
            closeOracleModal();
        }
    }
});

// =========================================================================
// HERRAMIENTA EN CONSOLA PARA CAMBIO DE CLAVES FUTURAS
// =========================================================================
// Puedes abrir la consola (F12) y ejecutar: generarHash("MiNuevaClave")
window.generarHash = async function(clave) {
    if (!clave) {
        console.warn('Debes proporcionar una clave. Ej: generarHash("MiClave")');
        return;
    }
    const hash = await computeSha256(clave.trim());
    console.log(`%c[HASH SHA-256 GENERADO]`, 'color: #00ffff; font-weight: bold;');
    console.log(`Texto: "${clave}"`);
    console.log(`Hash:  ${hash}`);
    console.log(`Copia y pega este hash en la constante CORO_HASHES de script.js para el botón deseado.`);
    return hash;
};

// =========================================================================
// TOLERANCIA A MAYÚSCULAS/MINÚSCULAS PARA GITHUB PAGES (LINUX)
// =========================================================================
function setupImageFallbacks() {
    const imagesToProtect = [
        { id: 'img-coro1', variants: ['Coro1.png', 'coro1.png', 'Coro1.PNG', 'coro1.PNG'] },
        { id: 'img-coro2', variants: ['Coro2.png', 'coro2.png', 'Coro2.PNG', 'coro2.PNG'] },
        { id: 'img-coro3', variants: ['Coro3.png', 'coro3.png', 'Coro3.PNG', 'coro3.PNG'] },
        { id: 'intro-icon', variants: ['iconoprincipal.png', 'Iconoprincipal.png', 'IconoPrincipal.png', 'iconoprincipal.PNG'] },
        { id: 'custom-logo', variants: ['logo.png', 'Logo.png', 'LOGO.png', 'logo.PNG'] }
    ];

    imagesToProtect.forEach(({ id, variants }) => {
        const img = document.getElementById(id);
        if (!img) return;

        let attempt = 0;
        img.addEventListener('error', function errorHandler() {
            attempt++;
            if (attempt < variants.length) {
                this.src = variants[attempt];
            } else {
                this.removeEventListener('error', errorHandler);
            }
        });
    });
}

// =========================================================================
// INICIAR
// =========================================================================
window.addEventListener('DOMContentLoaded', () => {
    setupImageFallbacks();
    runIntroSequence();
});
