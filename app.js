// Toggle del menú móvil
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
menuBtn.addEventListener('click', () => {
  const open = mobileNav.style.display === 'flex';
  mobileNav.style.display = open ? 'none' : 'flex';
});

// Año dinámico en footer
document.getElementById('year').textContent = new Date().getFullYear();

// Carga de GIF con fallback SVG
const gif = document.getElementById('logoGif');
const fallback = document.getElementById('svgFallback');
const chip = document.getElementById('mediaStatus');

function setStatus(s){ chip.textContent = 'Estado: ' + s; }

function testImage(src, ok, err) {
  const img = new Image();
  img.onload = ok;
  img.onerror = err;
  img.src = src;
}

// Intentar cargar logo.gif en la misma carpeta. Si falla, mostrar fallback.
testImage(gif.getAttribute('src'),
  () => { setStatus('ok'); gif.hidden = false; fallback.hidden = true; },
  () => { setStatus('error'); gif.hidden = true; fallback.hidden = false; }
);

// --- Pruebas manuales ---
// Para simular error: cambiar temporalmente gif.src = 'no-existe.gif';
// Verifica que el chip muestre “Estado: error” y que aparezca el SVG.
