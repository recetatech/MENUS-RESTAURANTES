import { RestaurantData } from './types';

export function generateStandAloneHtml(data: RestaurantData): string {
  // Format the MENU array as clean JSON/JavaScript code
  const menuJs = JSON.stringify(
    data.menu.map((cat) => ({
      categoria: cat.categoria,
      descripcion: cat.descripcion || '',
      platos: cat.platos.map((p) => ({
        nombre: p.nombre,
        desc: p.desc || '',
        precio: p.precio,
        foto: p.foto || '',
      })),
    })),
    null,
    2
  );

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(data.nombreRestaurante)} — Menú</title>
<!--
  ============================================================
  PLANTILLA DE MENÚ DIGITAL — Impulso Local Agencia
  ============================================================
  CÓMO USAR (por cada cliente nuevo):
  1. Ctrl+F y reemplaza cada {{VARIABLE}} por el dato real.
  2. Edita el arreglo MENU más abajo (línea ~140) con las
     categorías y platos del restaurante.
  3. Cambia los 3 colores en :root (línea ~30) para que combinen
     con la marca del cliente. El resto de la página se adapta sola.
  4. Sube este archivo a una subcarpeta de tu hosting, ej:
     impulsolocalagencial.com/menu/nombre-restaurante/
  5. Genera el QR apuntando a esa URL FINAL (no antes).

  FOTOS (opcional, no obligatorio):
  - Portada: sube un archivo llamado EXACTAMENTE "portada.jpg"
    en la MISMA carpeta que este HTML. Aparece sola arriba.
    Si no la subes, no pasa nada: queda el fondo oscuro liso.
  - Por plato: en el dato "foto" de cada plato (más abajo, en
    MENU) escribe el nombre exacto del archivo de esa foto,
    ej: foto: "arroz-mariscos.jpg". Debe estar en la misma
    carpeta. Si no tienes foto para ese plato, deja foto: "".
  ============================================================
-->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Public+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root{
    /* ---- 1. PALETA: cambia estos 3 colores por cliente ---- */
    --accent:${data.accentColor};      /* color principal de la marca (botones, precios) */
    --ink:${data.inkColor};         /* color de texto principal, casi negro cálido */
    --bg:${data.bgColor};          /* fondo general, tono cálido claro */
    /* ---- fijos: no suelen necesitar cambio ---- */
    --card:#FFFFFF;
    --line:#E4DACB;
    --muted:#7A6F5E;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-padding-top:64px}
  body{
    background:var(--bg);color:var(--ink);
    font-family:'Public Sans',system-ui,sans-serif;
    line-height:1.5;
    padding-bottom:env(safe-area-inset-bottom,0px);
  }
  .serif{font-family:'Fraunces',serif}
  .wrap{max-width:640px;margin:0 auto;padding:0 20px}

  /* ---- Hero ---- */
  .hero{
    padding:56px 20px 40px;text-align:center;
    background-image:linear-gradient(180deg,rgba(20,15,8,.55) 0%,rgba(20,15,8,.88) 100%),
      linear-gradient(180deg,var(--ink) 0%,#1c170f 100%),
      url('portada.jpg');
    background-size:cover;background-position:center;
    color:#F5EFE4;
  }
  .hero .tag{
    font-size:13px;letter-spacing:.04em;color:#C9BBA1;margin-bottom:10px;
  }
  .hero h1{
    font-size:clamp(32px,7vw,48px);font-weight:600;line-height:1.05;
  }
  .hero p{margin-top:12px;color:#D8CBB4;font-size:15px;max-width:38ch;margin-inline:auto}

  /* ---- Nav de categorías (sticky) ---- */
  nav{
    position:sticky;top:0;z-index:10;
    background:var(--bg);border-bottom:1px solid var(--line);
    overflow-x:auto;white-space:nowrap;
    -ms-overflow-style:none;scrollbar-width:none;
  }
  nav::-webkit-scrollbar{display:none}
  nav .inner{display:inline-flex;gap:4px;padding:12px 16px}
  nav a{
    font-size:13px;font-weight:600;color:var(--muted);
    padding:8px 14px;border-radius:100px;text-decoration:none;
    border:1px solid var(--line);
  }
  nav a:hover,nav a:focus-visible{color:var(--ink);border-color:var(--ink)}

  /* ---- Secciones de menú ---- */
  section.cat{padding:36px 0 8px;scroll-margin-top:64px}
  section.cat h2{font-size:22px;font-weight:600;margin-bottom:4px}
  section.cat .desc{color:var(--muted);font-size:14px;margin-bottom:20px}

  .item{padding:14px 0;border-bottom:1px solid var(--line);display:flex;gap:12px}
  .item:last-child{border-bottom:none}
  .item-photo{
    width:56px;height:56px;border-radius:10px;object-fit:cover;
    flex:none;background:var(--line);
  }
  .item-body{flex:1;min-width:0}
  .item-row{display:flex;align-items:baseline;gap:8px}
  .item-row .name{font-weight:600;font-size:16px}
  .item-row .leader{flex:1;border-bottom:1px dotted var(--line);margin-bottom:5px}
  .item-row .price{font-weight:600;color:var(--accent);font-size:15px;white-space:nowrap}
  .item .item-desc{color:var(--muted);font-size:13.5px;margin-top:2px;max-width:52ch}

  /* ---- Footer / info ---- */
  footer{margin-top:44px;padding:28px 0 100px;border-top:1px solid var(--line)}
  footer .row{display:flex;gap:10px;font-size:14px;margin-bottom:8px;color:var(--muted)}
  footer .row b{color:var(--ink);min-width:76px}

  /* ---- Botón flotante de WhatsApp ---- */
  .wa-float{
    position:fixed;left:0;right:0;bottom:0;
    padding:14px 20px calc(14px + env(safe-area-inset-bottom,0px));
    background:linear-gradient(180deg,rgba(250,246,240,0) 0%,var(--bg) 40%);
  }
  .wa-btn{
    display:flex;align-items:center;justify-content:center;gap:8px;
    max-width:600px;margin:0 auto;
    background:var(--accent);color:#fff;text-decoration:none;
    font-weight:600;font-size:15px;padding:14px 20px;border-radius:12px;
    box-shadow:0 8px 20px -6px rgba(0,0,0,.35);
  }
  .wa-btn svg{width:19px;height:19px;flex:none}

  @media(prefers-color-scheme:dark){
    body{background:#161310;color:#F1E9DA}
    :root{--bg:#161310;--card:#1F1A15;--line:#332C23;--muted:#B0A08A}
    .wa-float{background:linear-gradient(180deg,rgba(22,19,16,0) 0%,#161310 40%)}
  }
</style>
</head>
<body>

  <div class="hero">
    <div class="tag">${escapeHtml(data.ciudadBarrio)}</div>
    <h1 class="serif">${escapeHtml(data.nombreRestaurante)}</h1>
    <p>${escapeHtml(data.fraseCorta)}</p>
  </div>

  <nav id="catNav"><div class="inner" id="navLinks"></div></nav>

  <main class="wrap" id="menuContainer"></main>

  <footer class="wrap">
    <div class="row"><b>Horario</b> ${escapeHtml(data.horario)}</div>
    <div class="row"><b>Dirección</b> ${escapeHtml(data.direccion)}</div>
    <div class="row"><b>Teléfono</b> ${escapeHtml(data.telefonoVisible)}</div>
  </footer>

  <div class="wa-float">
    <a class="wa-btn" id="waMainBtn" href="#" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.14c-.24.68-1.4 1.3-1.93 1.35-.5.05-1 .25-3.37-.7-2.85-1.14-4.7-4.04-4.84-4.22-.14-.18-1.16-1.55-1.16-2.95 0-1.4.73-2.09.99-2.38.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.81 2 .88 2.15.07.14.12.31.02.5-.1.19-.15.31-.3.48-.14.17-.31.37-.44.5-.14.14-.29.29-.13.57.17.28.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.29 1.42.28.14.44.12.6-.07.17-.19.71-.83.9-1.11.19-.29.38-.24.63-.14.26.09 1.63.77 1.91.91.28.14.47.21.53.33.07.12.07.68-.17 1.36z"/></svg>
      Pedir por WhatsApp
    </a>
  </div>

<script>
/* ============================================================
   DATOS DEL MENÚ — edita solo aquí, la página se arma sola
   ============================================================ */
const WHATSAPP_NUMERO = "${data.whatsappNumero.replace(/[^0-9]/g, '')}"; // indicativo + número, sin "+" ni espacios
const WHATSAPP_MENSAJE = "${escapeJsString(data.whatsappMensaje)}";

const MENU = ${menuJs};

/* ============================================================
   Render — no necesitas tocar esto
   ============================================================ */
function slug(s){ return s.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').replace(/[^a-z0-9]+/g,'-'); }

const nav = document.getElementById('navLinks');
const main = document.getElementById('menuContainer');

MENU.forEach(cat=>{
  const id = slug(cat.categoria);

  const a = document.createElement('a');
  a.href = '#'+id; a.textContent = cat.categoria;
  nav.appendChild(a);

  const sec = document.createElement('section');
  sec.className = 'cat'; sec.id = id;
  sec.innerHTML = \`<h2 class="serif">\${cat.categoria}</h2>\` +
    (cat.descripcion ? \`<div class="desc">\${cat.descripcion}</div>\` : '') +
    cat.platos.map(p => \`
      <div class="item">
        \${p.foto ? \`<img class="item-photo" src="\${p.foto}" alt="" onerror="this.remove()">\` : ''}
        <div class="item-body">
          <div class="item-row">
            <span class="name">\${p.nombre}</span>
            <span class="leader"></span>
            <span class="price">\${p.precio}</span>
          </div>
          \${p.desc ? \`<div class="item-desc">\${p.desc}</div>\` : ''}
        </div>
      </div>
    \`).join('');
  main.appendChild(sec);
});

const waLink = \`https://wa.me/\${WHATSAPP_NUMERO}?text=\${encodeURIComponent(WHATSAPP_MENSAJE)}\`;
document.getElementById('waMainBtn').href = waLink;
</script>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeJsString(str: string): string {
  return (str || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}
