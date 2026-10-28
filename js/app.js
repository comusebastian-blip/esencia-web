/* ESENCIA by Gold Dubai — interacción */
(() => {
  'use strict';
  const D = window.ESENCIA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const byId = Object.fromEntries(D.products.map(p => [p.id, p]));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EASE = 'cubic-bezier(.22,.61,.21,1)';
  document.documentElement.classList.add('js');
  const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const src = p => `assets/${p.img}.webp`;
  const wa = text => `https://wa.me/${D.whatsapp}?text=${encodeURIComponent(text)}`;
  const buyLink = p => wa(`Hola, quiero ${p.name} de ${p.brand} (ESENCIA by Gold Dubai). ¿Me confirmas precio y disponibilidad?`);
  const tryLink = p => wa(`Hola, quiero reservar mi experiencia olfativa (preabono no reembolsable de USD 3) y probar ${p.name} de ${p.brand}.`);
  const profileChips = p => p.profile.split('·').map(s => `<span>${esc(s.trim())}</span>`).join('');
  const ICON = {
    top: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v12M3 7l5-5 5 5"/></svg>',
    heart: '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="5"/><circle cx="8" cy="8" r="1.6"/></svg>',
    base: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 12h12M4 9h8M6 6h4"/></svg>'
  };
  const notes = p => [['top', 'Salida', p.top], ['heart', 'Corazón', p.heart], ['base', 'Fondo', p.base]]
    .map(([k, l, v]) => `<div><b>${ICON[k]}${l}</b><span>${esc(v)}</span></div>`).join('');

  /* ---------- Escenario del frasco ----------
     Escala uniforme: el frasco ocupa ~80% de la hornacina (≈67% del escenario) y su base
     descansa sobre el borde de mármol. La fotografía original no se recorta ni se deforma. */
  const FRAC = 0.86, BASE = 0.985;
  const cutSrc = p => `assets/cut/${p.img}.webp`;
  function shotHTML(p, alt = true) {
    return `<div class="shot${p.cutout ? ' cutout' : ''}" style="--a:${p.accent}" data-id="${p.id}">
      <span class="spot" aria-hidden="true"></span>
      <div class="sill"><span class="pool" aria-hidden="true"></span><div class="glint"></div></div>
      <div class="contact"></div>
      <div class="win"><img class="fill" src="${src(p)}" alt="" aria-hidden="true" loading="lazy" decoding="async"><img class="ph" src="${src(p)}" alt="${alt ? esc(p.name + ' de ' + p.brand) : ''}" loading="lazy" decoding="async"></div>
      <span class="frame" aria-hidden="true"></span>
      ${p.fx ? `<div class="fx fx-${p.fx}" style="--fx:${p.fxc}" aria-hidden="true">${'<i></i>'.repeat(7)}</div>` : ''}
    </div>`;
  }
  const gainHTML = p => p.gain ? `<span class="gain-k">Lo que te da</span><span class="gain-t">${esc(p.gain)}</span>` : '';
  const newTag = p => p.launch ? '<span class="tag-new">Nuevo lanzamiento</span>' : '';
  const priceText = p => p.price ? `USD ${p.price}` : (D.brandPrice && D.brandPrice[p.brand]) ? `Desde USD ${D.brandPrice[p.brand]}` : `USD ${D.priceRange.from} – ${D.priceRange.to}`;
  /* Marco uniforme (4:5) para todos los perfumes. La foto se ve completa, con su proporción
     original, centrada dentro del marco; el espacio sobrante se rellena con la misma foto desenfocada. */
  function fit(shot) {
    const p = byId[shot.dataset.id]; if (!p) return;
    const win = $('.win', shot), ph = $('.ph', shot), fill = $('.fill', shot);
    const W = win.clientWidth, H = win.clientHeight;
    if (!W || !H || !ph.naturalWidth) return;
    const R = 0.8;
    let fh = H * BASE * 0.97, fw = fh * R;
    if (fw > W * 0.96) { fw = W * 0.96; fh = fw / R; }
    const fl = (W - fw) / 2, ft = BASE * H - fh;
    const iw = ph.naturalWidth, ih = ph.naturalHeight, s = Math.min(fw / iw, fh / ih);
    const w = iw * s, h = ih * s;
    Object.assign(ph.style, { width: w + 'px', height: h + 'px', left: (fl + (fw - w) / 2) + 'px', top: (ft + (fh - h) / 2) + 'px' });
    if (fill) Object.assign(fill.style, { width: fw + 'px', height: fh + 'px', left: fl + 'px', top: ft + 'px' });
    win.style.clipPath = `inset(${ft}px ${W - fl - fw}px ${H - ft - fh}px ${fl}px round 3px)`;
    const ox = win.offsetLeft, oy = win.offsetTop;
    const host = shot.parentElement && shot.parentElement.classList.contains('spin-item') ? shot.parentElement : shot;
    [host, shot].forEach(el => { el.style.setProperty('--fl', (ox + fl) + 'px'); el.style.setProperty('--ft', (oy + ft) + 'px'); el.style.setProperty('--fw', fw + 'px'); el.style.setProperty('--fh', fh + 'px'); });
  }
  const ro = 'ResizeObserver' in window ? new ResizeObserver(es => es.forEach(e => fit(e.target.closest('.shot')))) : null;
  function mountShots(root = document) {
    $$('.shot', root).forEach(shot => {
      if (shot._m) return; shot._m = true;
      const ph = $('.ph', shot); if (!ph) { shot._m = false; return; }
      const go = () => fit(shot);
      ph.complete && ph.naturalWidth ? go() : ph.addEventListener('load', go, { once: true });
      ro ? ro.observe($('.win', shot)) : addEventListener('resize', go);
      // luz que cae sobre el frasco al entrar en pantalla (el carrusel 3D la controla aparte)
      if (shot.closest('.spin-item') && !shot.closest('.mirror')) { if (liveIO) liveIO.observe(shot); else shot.classList.add('live'); return; }
      if (liveIO) liveIO.observe(shot); else shot.classList.add('live');
      lightIO ? lightIO.observe(shot) : shot.classList.add('lit');
    });
  }
  const liveIO = ('IntersectionObserver' in window && !reduce) ? new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('live', e.isIntersecting)), { rootMargin: '80px' }) : null;
  const lightIO = ('IntersectionObserver' in window && !reduce) ? new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('lit'); lightIO.unobserve(e.target); }
  }), { threshold: .35 }) : null;
  function relight(shot) { if (!shot) return; shot.classList.remove('lit'); void shot.offsetWidth; shot.classList.add('lit'); }

  /* ---------- Header y menú ---------- */
  const header = $('#header');
  const onScrollHeader = () => header.classList.toggle('scrolled', scrollY > innerHeight * 0.55);
  onScrollHeader();
  const menuBtn = $('#menuBtn');
  const setMenu = open => { document.body.classList.toggle('menu-open', open); document.body.classList.toggle('lock', open); menuBtn.setAttribute('aria-expanded', open); menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú'); };
  menuBtn.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  $$('#nav a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  /* ---------- Portada: parallax suave + polvo dorado ---------- */
  const heroMedia = $('.hero-media'), hero = $('#hero');
  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      onScrollHeader();
      if (!reduce && scrollY < innerHeight * 1.1) heroMedia.style.transform = `translate3d(0,${scrollY * 0.22}px,0)`;
      ticking = false;
    });
  }, { passive: true });

  (function dust() {
    const c = $('#dust'); if (!c || reduce) return;
    const ctx = c.getContext('2d'); let w, h, dpr, parts = [], run = true, raf;
    const N = innerWidth < 700 ? 26 : 46;
    const size = () => { dpr = Math.min(devicePixelRatio || 1, 2); w = c.clientWidth; h = c.clientHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const make = (y) => ({ x: Math.random() * w, y: y ?? Math.random() * h, r: Math.random() * 1.4 + .3, v: Math.random() * .25 + .08, d: Math.random() * Math.PI * 2, a: Math.random() * .5 + .2 });
    size(); parts = Array.from({ length: N }, () => make());
    addEventListener('resize', size);
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y -= p.v; p.d += .01; p.x += Math.sin(p.d) * .18;
        if (p.y < -10) Object.assign(p, make(h + 10));
        const tw = .6 + Math.sin(p.d * 3) * .4;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283);
        ctx.fillStyle = `rgba(247,214,150,${p.a * tw})`; ctx.shadowColor = 'rgba(247,214,150,.8)'; ctx.shadowBlur = 6; ctx.fill();
      }
      if (run) raf = requestAnimationFrame(tick);
    };
    new IntersectionObserver(([e]) => { run = e.isIntersecting && !document.hidden; cancelAnimationFrame(raf); if (run) raf = requestAnimationFrame(tick); }).observe(hero);
  })();

  /* ---------- Protagonistas: tocadiscos 3D de mármol ----------
     El anillo gira de verdad en 3D (rotateY) junto con el disco de mármol.
     Se puede arrastrar; al soltar se acomoda en el perfume más cercano y la ficha se despliega. */
  const lead = D.featured.map(id => byId[id]);
  const N = lead.length, STEP = 360 / N, DUR = 7000;
  const spin = $('#spin'), ring = $('#spinRing'), unfold = $('#unfold'), dots = $('#leadDots');
  // Cada vitrina siempre mira al visitante (no se deforma al cruzar); la profundidad, la luz,
  // la sombra proyectada y el reflejo en el mármol dan el volumen real.
  ring.innerHTML = lead.map((p, i) => `<div class="spin-item" data-i="${i}" style="--lit:${i ? 0 : 1}">
      <div class="cast"></div><div class="foot"></div>
      <div class="mirror" aria-hidden="true"><div class="mirror-in">${shotHTML(p, false)}</div></div>
      <div class="back"></div>${shotHTML(p)}<div class="sheen"></div><div class="shade"></div></div>`).join('');
  const base = document.createElement('div'); base.className = 'spin-base'; base.setAttribute('aria-hidden', 'true');
  base.innerHTML = '<div class="disc" id="disc">' + Array.from({ length: 10 }, (_, k) => `<i class="${k === 0 ? 'top' : k === 9 ? 'rim' : ''}" style="transform:translateZ(${-k * 4}px)"></i>`).join('') + '<i class="floor" style="transform:translateZ(-70px)"></i></div>';
  ring.before(base);
  $$('.ph, .refl img', ring).forEach(i => i.loading = 'eager');
  const items = $$('.spin-item', ring), disc = $('#disc');
  dots.innerHTML = lead.map((p, i) => `<button role="tab" aria-label="${esc(p.name)}" aria-selected="${i === 0}"></button>`).join('');
  dots.style.setProperty('--dur', DUR + 'ms');
  $('#leadTotal').textContent = String(N).padStart(2, '0');

  let Rad = 0, theta = 0, k = 0, li = 0, anim = null, timer = null;
  function layout() {
    const pw = items[0].offsetWidth, ph = items[0].offsetHeight;
    Rad = pw * (innerWidth < 760 ? 1.05 : 1.22);
    const Dm = 2 * Rad + pw * 1.05;
    Object.assign(disc.style, { width: Dm + 'px', height: Dm + 'px', left: (pw - Dm) / 2 + 'px', top: (ph - Dm / 2) + 'px' });
    render();
  }
  function render() {
    ring.style.transform = base.style.transform = `translateZ(${-Rad}px) rotateY(${theta}deg)`;
    items.forEach((it, i) => {
      let rel = ((i * STEP + theta) % 360 + 540) % 360 - 180;
      const c = Math.cos(rel * Math.PI / 180);
      // los paneles laterales se giran un poco hacia el visitante para que se lean mejor
      it.style.transform = `rotateY(${i * STEP}deg) translateZ(${Rad}px) rotateY(${-rel}deg)`;
      it.style.setProperty('--rel', rel.toFixed(1));
      it.style.setProperty('--lit', Math.max(0, c) ** 1.4);
      it.style.opacity = Math.min(1, Math.max(0, (c + 0.45) / 0.55));
      it.style.pointerEvents = c > 0.2 ? '' : 'none';
    });
  }
  function writeCopy(p, i) {
    $('#leadBrand').innerHTML = esc(p.brand) + (p.launch ? ' · <b class="tag-inline">Nuevo lanzamiento</b>' : '');
    $('#leadName').textContent = p.name;
    $('#leadConc').textContent = [p.profile.split('·')[0].trim(), p.conc].filter(Boolean).join('  |  ');
    $('#leadHook').textContent = p.hook;
    $('#leadDesc').textContent = p.desc;
    $('#leadProfile').innerHTML = profileChips(p);
    $('#leadNotes').innerHTML = notes(p);
    $('#leadBuy').href = buyLink(p);
    $('#leadPrice').textContent = priceText(p);
    $('#leadGain').innerHTML = gainHTML(p);
    $('#leadNum').textContent = String(i + 1).padStart(2, '0');
    spin.style.setProperty('--accent', p.accent);
    $$('button', dots).forEach((b, n) => b.setAttribute('aria-selected', n === i));
    items.forEach((it, n) => it.setAttribute('aria-hidden', n !== i));
  }
  writeCopy(lead[0], 0);
  const lightFront = () => items.forEach((it, n) => { const sh = it.querySelector(':scope > .shot'); if (n === li) relight(sh); else sh.classList.remove('lit'); });
  const easeIO = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  function spinTo(target, ms = 1100) {
    cancelAnimationFrame(anim);
    const from = theta, to = -target * STEP, t0 = performance.now();
    k = target; const n = ((target % N) + N) % N, changed = n !== li;
    if (changed) { unfold.classList.remove('open'); }
    if (reduce) ms = 1;
    const step = now => {
      const t = Math.min(1, (now - t0) / ms);
      theta = from + (to - from) * easeIO(t); render();
      if (t < 1) anim = requestAnimationFrame(step);
      else if (changed) { li = n; writeCopy(lead[n], n); void unfold.offsetWidth; unfold.classList.add('open'); restartBar(); lightFront(); }
      else unfold.classList.add('open');
    };
    anim = requestAnimationFrame(step);
  }
  const restartBar = () => { const b = $('[aria-selected="true"]', dots); if (!b) return; b.style.animation = 'none'; void b.offsetWidth; b.style.animation = ''; };
  const startAuto = () => { clearInterval(timer); if (reduce || dots.classList.contains('paused')) return; timer = setInterval(() => { if (!document.hidden && !sheetOpen && !drag) spinTo(k + 1); }, DUR); restartBar(); };
  const stopAuto = () => { clearInterval(timer); dots.classList.add('paused'); spin.classList.add('touched'); };
  $('#leadPrev').addEventListener('click', () => { stopAuto(); spinTo(k - 1); });
  $('#leadNext').addEventListener('click', () => { stopAuto(); spinTo(k + 1); });
  dots.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return; stopAuto();
    const n = $$('button', dots).indexOf(b); let d = n - li; if (d > N / 2) d -= N; if (d < -N / 2) d += N; spinTo(k + d);
  });
  $('#leadMore').addEventListener('click', () => openSheet(lead[li].id));
  spin.tabIndex = 0;
  spin.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { stopAuto(); spinTo(k + 1); } if (e.key === 'ArrowLeft') { stopAuto(); spinTo(k - 1); } });

  // arrastrar para girar (dedo o mouse)
  let drag = null;
  spin.addEventListener('pointerdown', e => {
    if (e.target.closest('.t-nav')) return;
    cancelAnimationFrame(anim);
    drag = { x: e.clientX, y: e.clientY, th: theta, moved: false, id: e.pointerId, t: performance.now(), lastX: e.clientX, v: 0 };
  });
  addEventListener('pointermove', e => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x;
    if (!drag.moved) { if (Math.abs(dx) < 6) return; if (Math.abs(e.clientY - drag.y) > Math.abs(dx)) { drag = null; return; } drag.moved = true; spin.classList.add('dragging'); stopAuto(); unfold.classList.remove('open'); try { spin.setPointerCapture(e.pointerId); } catch (_) {} }
    const now = performance.now(); drag.v = (e.clientX - drag.lastX) / Math.max(1, now - drag.t); drag.t = now; drag.lastX = e.clientX;
    theta = drag.th + dx * (180 / (Rad * Math.PI)); render();
  }, { passive: true });
  const endDrag = e => {
    if (!drag || (e.pointerId !== undefined && e.pointerId !== drag.id)) return;
    const d = drag; drag = null; spin.classList.remove('dragging');
    if (!d.moved) {
      const it = e.target.closest && e.target.closest('.spin-item');
      if (it) { const i = +it.dataset.i; if (i === li) openSheet(lead[i].id); else { stopAuto(); let dd = i - li; if (dd > N / 2) dd -= N; if (dd < -N / 2) dd += N; spinTo(k + dd); } }
      return;
    }
    const fling = d.v * 260 * (180 / (Rad * Math.PI));            // inercia del gesto
    const target = Math.round(-(theta + fling) / STEP);
    spinTo(target, 900);
  };
  addEventListener('pointerup', endDrag); addEventListener('pointercancel', endDrag);

  layout(); addEventListener('resize', layout);
  let firstLight = false;
  new IntersectionObserver(([e]) => { if (e.isIntersecting) { if (!firstLight) { firstLight = true; lightFront(); } startAuto(); } else clearInterval(timer); }, { threshold: .3 }).observe(spin);

  /* ---------- Película ---------- */
  const film = $('#film'), snd = $('#filmSound');
  if (film) {
    new IntersectionObserver(([e]) => { if (e.isIntersecting) { film.preload = 'auto'; film.play().catch(() => {}); } else film.pause(); }, { threshold: .4 }).observe(film);
    snd.addEventListener('click', () => { film.muted = !film.muted; snd.textContent = film.muted ? 'Sonido' : 'Silenciar'; snd.setAttribute('aria-label', film.muted ? 'Activar sonido' : 'Silenciar'); film.play().catch(() => {}); });
  }

  /* ---------- Rieles ---------- */
  const cardHTML = p => `<article class="card rv" style="--accent:${p.accent}">
      ${shotHTML(p)}
      <div class="card-meta">${newTag(p)}<span class="card-brand">${esc(p.brand)}</span><h3 class="card-name">${esc(p.name)}</h3>${p.gain ? `<p class="card-gain">${esc(p.gain)}</p>` : ''}<p class="card-profile">${esc(p.profile.replace(/ · /g, ' | '))}</p><p class="card-price">${priceText(p)}</p>
      <button class="card-link" data-open="${p.id}">Ver y comprar <i aria-hidden="true">→</i></button></div>
    </article>`;
  function buildRail(id, list) {
    const track = $('#' + id); track.innerHTML = list.map(k => cardHTML(byId[k])).join('');
    const dotsEl = $(`[data-dots="${id}"]`); dotsEl.innerHTML = list.map(() => '<span></span>').join('');
    const cards = $$('.card', track), ds = $$('span', dotsEl);
    let raf;
    const mark = () => {
      const mid = track.getBoundingClientRect().left + track.clientWidth / 2;
      let best = 0, bd = 1e9;
      cards.forEach((c, i) => { const r = c.getBoundingClientRect(); const d = Math.abs(r.left + r.width / 2 - mid); if (d < bd) { bd = d; best = i; } });
      cards.forEach((c, i) => c.classList.toggle('is-active', i === best));
      ds.forEach((d, i) => d.classList.toggle('on', i === best));
    };
    track.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(mark); }, { passive: true });
    addEventListener('resize', mark); mark();
    // en la tarjeta, cualquier toque abre la ficha
    track.addEventListener('click', e => {
      const card = e.target.closest('.card'); if (!card) return;
      const i = cards.indexOf(card);
      if (matchMedia('(max-width:760px)').matches && !card.classList.contains('is-active') && !e.target.closest('[data-open]')) {
        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }); return;
      }
      openSheet(list[i]);
    });
  }
  buildRail('prestigeRail', D.prestige);
  $$('[data-rail]').forEach(b => b.addEventListener('click', () => {
    const t = $('#' + b.dataset.rail), c = $('.card', t);
    t.scrollBy({ left: (+b.dataset.dir) * (c.offsetWidth + parseFloat(getComputedStyle(t).columnGap || 20)), behavior: 'smooth' });
  }));

  /* ---------- Asesoría: perfil olfativo (selección múltiple) ----------
     El cliente puede elegir varios perfiles, el momento y marcar las fragancias que le interesan.
     Todo viaja armado en el mensaje de WhatsApp para que la recomendación sea inmediata. */
  const fams = new Set(), picks = new Set(); let mom = 'todos';
  const advF = $('#advFamily'), advR = $('#advResult');
  advF.innerHTML = Object.entries(D.families).map(([k, v]) => `<button class="adv-opt" data-v="${k}" aria-pressed="false" style="--fa:${v.accent}">
      <span class="ao-bg" style="background-image:url(assets/${v.img}.webp);background-position:${v.pos}"></span><span class="ao-veil"></span><span class="ao-arch"></span><span class="ao-check" aria-hidden="true">✓</span>
      <span class="ao-text"><strong>${v.label}</strong><small>${v.line}</small><span class="ao-cta">Elegir <i aria-hidden="true">+</i></span></span></button>`).join('');
  const hint = '<p class="adv-hint">Elige uno o varios perfiles</p>';
  advR.innerHTML = hint;
  advF.addEventListener('click', e => {
    const b = e.target.closest('.adv-opt'); if (!b) return;
    const k = b.dataset.v; fams.has(k) ? fams.delete(k) : fams.add(k);
    b.setAttribute('aria-pressed', fams.has(k));
    advF.classList.toggle('picked', fams.size > 0);
    const first = [...fams][fams.size - 1];
    $('#aroma').style.setProperty('--pick', first ? D.families[first].accent : '#d6aa62');
    // quitar de la selección las fragancias que ya no encajan
    [...picks].forEach(id => { if (!byId[id].family.some(f => fams.has(f))) picks.delete(id); });
    renderAdv(fams.size === 1 && fams.has(k));
  });
  advR.addEventListener('click', e => {
    const c = e.target.closest('[data-when]'); if (c) { mom = c.dataset.when; renderAdv(false); return; }
    const f = e.target.closest('[data-sheet]'); if (f) { e.stopPropagation(); openSheet(f.dataset.sheet); return; }
    const it = e.target.closest('.adv-item'); if (it) {
      const id = it.dataset.id; picks.has(id) ? picks.delete(id) : picks.add(id);
      it.setAttribute('aria-pressed', picks.has(id)); updateMsg();
    }
  });
  const famLabels = () => [...fams].map(k => D.families[k].label);
  const joinEs = arr => arr.length < 2 ? (arr[0] || '') : arr.slice(0, -1).join(', ') + ' y ' + arr[arr.length - 1];
  function waMsg() {
    let t = `Hola, quiero mi recomendación de ESENCIA by Gold Dubai.\n• Mi perfil olfativo: ${joinEs(famLabels())}`;
    if (mom !== 'todos') t += `\n• Para: ${D.moments[mom].phrase}`;
    if (picks.size) t += `\n• Me interesan: ${joinEs([...picks].map(id => byId[id].name))}`;
    const oth = $('#advOthers', advR); if (!oth || oth.checked) t += `\n• También quiero conocer otras opciones del equipo Esencia, incluidas las creaciones de la casa`;
    return t + '\n¿Qué me recomiendas?';
  }
  function updateMsg() {
    const a = $('#advSend', advR); if (!a) return;
    a.href = wa(waMsg());
    $('#advSummary', advR).innerHTML = `<strong>${esc(joinEs(famLabels()))}</strong>${mom !== 'todos' ? ' · ' + esc(D.moments[mom].label) : ''}${picks.size ? ` · ${picks.size} ${picks.size === 1 ? 'fragancia marcada' : 'fragancias marcadas'}` : ''}`;
  }
  function renderAdv(scroll) {
    if (!fams.size) { advR.innerHTML = hint; return; }
    const list = D.products.map((p, i) => {
      const n = p.family.filter(f => fams.has(f)).length;
      return { p, n, fit: mom === 'todos' || p.when.includes(mom), s: n * 2 + (fams.has(p.family[0]) ? 1 : 0) + (mom !== 'todos' && p.when.includes(mom) ? 3 : 0) - i * .001 };
    }).filter(x => x.n > 0).sort((a, b) => b.s - a.s);
    const chips = [['todos', 'Cualquier momento'], ...Object.entries(D.moments).map(([k, v]) => [k, v.label])]
      .map(([k, l]) => `<button data-when="${k}" aria-pressed="${k === mom}">${l}</button>`).join('');
    const notesTxt = [...fams].map(k => `<p class="adv-notes"><b>${D.families[k].label}</b> · ${esc(D.families[k].notes)}</p>`).join('');
    const extras = [...fams].flatMap(k => D.families[k].extra || []);
    advR.innerHTML = `<div class="adv-res">
      <div class="adv-res-head">
        <div><p class="lead-brand">Tu perfil olfativo</p><h3 class="adv-title">${esc(famLabels().join(' + '))}</h3></div>
        <div class="adv-notes-wrap">${notesTxt}</div>
      </div>
      <div class="adv-when" role="group" aria-label="¿Para qué momento?"><span>¿Para cuándo?</span>${chips}</div>
      <p class="adv-tip">Toca las fragancias que te llamen la atención para incluirlas en tu mensaje.</p>
      <div class="adv-list">${list.map((x, n) => `<div class="adv-item${x.fit ? '' : ' off'}" role="button" tabindex="0" data-id="${x.p.id}" aria-pressed="${picks.has(x.p.id)}" style="--accent:${x.p.accent}">
          ${n === 0 ? '<em class="adv-badge">Te recomendamos</em>' : ''}<span class="adv-tick" aria-hidden="true">✓</span>${shotHTML(x.p)}
          ${newTag(x.p)}<span class="card-brand">${esc(x.p.brand)}</span><span class="card-name">${esc(x.p.name)}</span><span class="card-price">${priceText(x.p)}</span>
          <button class="adv-ficha" data-sheet="${x.p.id}">Ver y comprar</button></div>`).join('')}</div>
      ${extras.length ? `<p class="adv-extra"><span>También tengo</span>${extras.map(n => `<a href="${wa(`Hola, mi perfil es ${joinEs(famLabels())}. Me interesa ${n}. ¿Precio y disponibilidad?`)}" target="_blank" rel="noopener">${esc(n)}</a>`).join('')}</p>` : ''}
      <div class="adv-more">
        <div><p class="adv-sum" id="advSummary"></p>
          <p><strong>¿No encuentras exactamente tu aroma?</strong> Tu asesor del equipo Esencia tiene más fragancias con este perfil, incluidas creaciones exclusivas de la casa que no están en la web.</p>
          <label class="adv-more-opt"><input type="checkbox" id="advOthers" checked> Quiero que el equipo Esencia me recomiende otras opciones</label></div>
        <a class="btn-gold" id="advSend" target="_blank" rel="noopener"><span>Enviar mi selección</span><i aria-hidden="true">→</i></a>
      </div>
    </div>`;
    mountShots(advR); updateMsg();
    if (scroll && !reduce) { const r = advR.getBoundingClientRect(); if (r.top > innerHeight * .7) advR.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }
  advR.addEventListener('change', e => { if (e.target.id === 'advOthers') updateMsg(); });
  advR.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('adv-item')) { e.preventDefault(); e.target.click(); } });

  /* ---------- Catálogo ---------- */
  const grid = $('#catGrid'), filters = $('#filters');
  grid.innerHTML = D.products.map(p => `<button class="cat-item rv" data-fam="${p.family.join(' ')}" data-open="${p.id}" style="--accent:${p.accent}" aria-label="Ver y comprar ${esc(p.name)}">
      ${shotHTML(p)}<span class="card-meta">${newTag(p)}<span class="card-brand">${esc(p.brand)}</span><span class="card-name">${esc(p.name)}</span>${p.gain ? `<span class="card-gain">${esc(p.gain)}</span>` : ''}<span class="card-profile">${esc(p.profile.replace(/ · /g, ' | '))}</span><span class="card-price">${priceText(p)}</span><span class="cat-cta">Ver y comprar <i aria-hidden="true">→</i></span></span></button>`).join('');
  filters.innerHTML = [['todas', 'Todas'], ...Object.entries(D.families).map(([k, v]) => [k, v.label])]
    .map(([k, l], i) => `<button data-f="${k}" aria-pressed="${i === 0}">${l}</button>`).join('');
  filters.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return; const f = b.dataset.f;
    $$('button', filters).forEach(x => x.setAttribute('aria-pressed', x === b));
    const items = $$('.cat-item', grid);
    const anim = !reduce && grid.animate;
    items.forEach(it => {
      const show = f === 'todas' || it.dataset.fam.split(' ').includes(f);
      if (show && it.hidden) { it.hidden = false; anim && it.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 500, easing: EASE }); }
      else if (!show) it.hidden = true;
    });
  });

  /* ---------- Ficha olfativa ---------- */
  const sheet = $('#sheet'); let sheetOpen = false, lastFocus = null;
  function openSheet(id) {
    const p = byId[id]; if (!p) return;
    lastFocus = document.activeElement;
    sheet.style.setProperty('--accent', p.accent);
    $('.sheet-stage', sheet).classList.remove('near');
    $('#sheetShot').outerHTML = shotHTML(p).replace('class="shot', 'id="sheetShot" class="shot');
    $('#sheetBrand').innerHTML = esc(p.brand) + (p.launch ? ' · <b class="tag-inline">Nuevo lanzamiento</b>' : '');
    $('#sheetName').textContent = p.name;
    $('#sheetDesc').textContent = p.desc;
    $('#sheetProfile').innerHTML = profileChips(p);
    $('#sheetNotes').innerHTML = notes(p);
    $('#sheetBuy').href = buyLink(p);
    $('#sheetPrice').textContent = priceText(p);
    $('#sheetGain').innerHTML = gainHTML(p);
    $('#sheetTry').href = tryLink(p);
    $('#sheetDecant').href = wa(`Hola, quiero un decant de ${D.decant.ml} ml de ${p.name} (${p.brand}) por USD ${D.decant.price}.`);
    sheet.hidden = false; document.body.classList.add('lock'); sheetOpen = true;
    $('.sheet-panel', sheet).scrollTop = 0;
    $$('#sheetShot img').forEach(i => i.loading = 'eager');
    requestAnimationFrame(() => { sheet.classList.add('open'); mountShots(sheet); $('.sheet-close', sheet).focus({ preventScroll: true }); });
  }
  function closeSheet() {
    if (!sheetOpen) return; sheetOpen = false;
    sheet.classList.remove('open'); document.body.classList.remove('lock');
    setTimeout(() => { if (!sheetOpen) sheet.hidden = true; }, reduce ? 0 : 450);
    lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true });
  }
  sheet.addEventListener('click', e => {
    if (e.target.closest('[data-close]')) { closeSheet(); return; }
    const st = e.target.closest('.sheet-stage'); if (st) st.classList.toggle('near');
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeSheet(); setMenu(false); }
    if (e.key === 'Tab' && sheetOpen) {
      const f = $$('a[href],button', sheet).filter(x => x.offsetParent); const a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    }
  });
  document.addEventListener('click', e => { const o = e.target.closest('[data-open]'); if (o && !o.closest('.rail-track')) openSheet(o.dataset.open); });
  window.openSheet = openSheet;

  /* ---------- Decants de 5 ml ---------- */
  const dChips = $('#decantChips'), dPicks = new Set();
  dChips.innerHTML = D.products.map(p => `<button data-id="${p.id}" aria-pressed="false">${esc(p.name)}</button>`).join('');
  const dUpdate = () => {
    const n = dPicks.size, tot = n * D.decant.price;
    $('#decantSum').innerHTML = n ? `<strong>${n} ${n === 1 ? 'decant' : 'decants'}</strong> de ${D.decant.ml} ml · <strong>USD ${tot}</strong>` : 'Elige una o varias fragancias';
    const names = [...dPicks].map(id => byId[id].name);
    $('#decantSend').href = wa(n ? `Hola, quiero ${n === 1 ? 'un decant' : n + ' decants'} de ${D.decant.ml} ml (USD ${D.decant.price} c/u, total USD ${tot}):\n• ${names.join('\n• ')}` : `Hola, quiero pedir decants de ${D.decant.ml} ml (USD ${D.decant.price}). ¿Qué fragancias me recomiendas?`);
  };
  dChips.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const id = b.dataset.id; dPicks.has(id) ? dPicks.delete(id) : dPicks.add(id); b.setAttribute('aria-pressed', dPicks.has(id)); dUpdate(); });
  dUpdate();

  /* ---------- Botón flotante de compra (aparece después de la portada) ---------- */
  const bar = document.createElement('a');
  bar.className = 'buybar'; bar.target = '_blank'; bar.rel = 'noopener';
  bar.href = wa('Hola, quiero comprar una fragancia de ESENCIA by Gold Dubai. ¿Me ayudas a elegir?');
  bar.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.2 1.4z"/></svg>Comprar por WhatsApp';
  document.body.appendChild(bar);
  const foot = $('.footer');
  const dSend = $('#decantSend');
  const barCheck = () => { const fr = foot.getBoundingClientRect().top, dr = dSend.getBoundingClientRect(); const rf = ($('#resForm') && !$('#resForm').hidden ? $('#resForm') : $('#resDone')), rr = rf ? rf.getBoundingClientRect() : { top: 1e9, bottom: -1 }; const dIn = (dr.top < innerHeight && dr.bottom > 0) || (rr.top < innerHeight && rr.bottom > 0); bar.classList.toggle('show', scrollY > innerHeight * 0.9 && fr > innerHeight * 0.95 && !dIn); };
  addEventListener('scroll', barCheck, { passive: true }); barCheck();

  /* ---------- Aparición suave ---------- */
  $$('.sec-head, .film-frame, .exp-card, .decant-inner').forEach(el => el.classList.add('rv'));
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach(el => io.observe(el));
  } else $$('.rv').forEach(el => el.classList.add('in'));

  // Decants: misma presentación que los protagonistas (luz de teatro, bandeja de mármol y destellos)
  const dv = $('.decant-visual');
  if (dv) {
    byId.decant = { id: 'decant', name: 'Decants de 5 ml', brand: 'ESENCIA', img: 'decants', accent: '#d6b26a', fx: 'sparkle', fxc: '#ffd8a0' };
    dv.innerHTML = `<div class="decant-stage"><div class="mirror" aria-hidden="true"><div class="mirror-in">${shotHTML(byId.decant, false)}</div></div>${shotHTML(byId.decant)}</div>`;
    // El reflejo empieza en la base del marco (no en la bandeja)
    const ds = $('.decant-stage', dv), real = $(':scope > .shot', ds), mi = $('.mirror-in', ds);
    const syncMirror = () => { const ft = parseFloat(real.style.getPropertyValue('--ft')), fh = parseFloat(real.style.getPropertyValue('--fh'));
      if (ft >= 0 && fh) mi.style.transform = `translateY(${-(real.clientHeight - ft - fh)}px) scaleY(-1)`; };
    if ('ResizeObserver' in window) new ResizeObserver(syncMirror).observe(real); [300, 900, 2000, 4000].forEach(t => setTimeout(syncMirror, t));
    $('.ph', real).addEventListener('load', () => setTimeout(syncMirror, 50));
  }

  /* ================= RESERVAS · preventa con abono (3 pasos) ================= */
  (function reservas() {
    const R = D.reserva, box = $('#reservas'), form = $('#resForm');
    if (!R || !box || !form) return;
    const items = D.products.filter(p => !(R.ocultar || []).includes(p.id));
    const priceOf = p => p.price ? { v: p.price, desde: false } : (D.brandPrice && D.brandPrice[p.brand]) ? { v: D.brandPrice[p.brand], desde: true } : { v: null, desde: false };
    const money = n => 'USD ' + (n % 1 ? n.toFixed(2) : n);
    const pLabel = p => { const pr = priceOf(p); return pr.v ? (pr.desde ? 'Desde ' : '') + money(pr.v) : 'A confirmar'; };
    $$('[data-entrega]', box).forEach(el => el.textContent = R.entrega);

    let pick = null, qty = 1, abono = R.abonos[0], file = null, step = 1;
    $('#resPick').innerHTML = items.map(p => `<button type="button" role="radio" aria-checked="false" class="res-chip" data-id="${p.id}">
        <img src="${src(p)}" alt="" loading="lazy" decoding="async"><span><b>${esc(p.short || p.name)}</b><small>${pLabel(p)}</small></span></button>`).join('');
    $('#resAbonos').innerHTML = R.abonos.map((a, i) => `<label><input type="radio" name="resAbono" value="${a}" ${i ? '' : 'checked'}><span>USD ${a}</span></label>`).join('');

    const calc = () => { const p = byId[pick]; if (!p) return null; const pr = priceOf(p), ab = abono * qty, total = pr.v ? pr.v * qty : null; return { p, pr, ab, total, saldo: total != null ? Math.max(0, total - ab) : null }; };
    const amt = (c, v) => v != null ? (c.pr.desde ? 'desde ' : '') + money(v) : 'a confirmar';
    function update() {
      const c = calc(), sum = $('#resSum');
      $$('.res-chip', box).forEach(el => { const on = el.dataset.id === pick; el.classList.toggle('on', on); el.setAttribute('aria-checked', on); });
      sum.innerHTML = c
        ? `<span><small>${esc(c.p.short || c.p.name)} × ${qty}</small><b>${amt(c, c.total)}</b></span><span class="hi"><small>Abono hoy</small><b>${money(c.ab)}</b></span><span><small>Saldo</small><b>${amt(c, c.saldo)}</b></span>`
        : `<span class="muted">Elige un perfume para ver tu abono y saldo</span>`;
    }
    const err = $('#resError');
    const fail = m => { err.textContent = m; err.hidden = false; return false; };
    function valid(n) {
      err.hidden = true;
      if (n >= 2 && !pick) return fail('Elige el perfume que quieres reservar.');
      if (n >= 3 && !$('#resAccept').checked) return fail('Acepta las condiciones para continuar.');
      return true;
    }
    function go(n) {
      if (n > step && !valid(n)) return;
      step = n;
      $$('.res-step', box).forEach(el => { const on = +el.dataset.step === n; el.hidden = !on; el.classList.toggle('on', on); });
      $$('[data-step-dot]', box).forEach(el => { const k = +el.dataset.stepDot; el.classList.toggle('on', k === n); el.classList.toggle('done', k < n); });
      const top = $('.res-box', box).getBoundingClientRect().top;
      if (top < 70 || top > innerHeight * .6) $('.res-box', box).scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }
    box.addEventListener('click', e => {
      const chip = e.target.closest('.res-chip'); if (chip) { pick = chip.dataset.id; err.hidden = true; update(); return; }
      const g = e.target.closest('[data-go]'); if (g) { go(+g.dataset.go); return; }
      const q = e.target.closest('[data-q]'); if (q) { qty = Math.max(1, Math.min(10, qty + +q.dataset.q)); $('#resQty').textContent = qty; update(); }
    });
    $('#resAbonos').addEventListener('change', e => { abono = +e.target.value; update(); });

    const B = R.banco || {};
    $('#resBank').innerHTML = B.numero
      ? `<dl>${[['Banco', B.banco], ['Cuenta', [B.tipo, B.numero].filter(Boolean).join(' · ')], ['Titular', B.titular], ['Cédula / RUC', B.cedula]].filter(r => r[1]).map(r => `<div><dt>${r[0]}</dt><dd>${esc(r[1])}</dd></div>`).join('')}</dl>`
      : `<p>Te enviamos los datos de transferencia por WhatsApp.</p>`;
    $('#resFile').addEventListener('change', e => {
      file = e.target.files[0] || null; const pv = $('#resPreview');
      $('#resFileTxt').textContent = file ? '✓ ' + file.name : 'Subir comprobante de transferencia';
      if (file && file.type.startsWith('image/')) { pv.src = URL.createObjectURL(file); pv.hidden = false; } else pv.hidden = true;
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      if (step < 3) { go(step + 1); return; }
      if (!valid(3)) return;
      const c = calc(), name = $('#resName').value.trim(), phone = $('#resPhone').value.trim();
      if (name.length < 3) { fail('Escribe tu nombre completo.'); $('#resName').focus(); return; }
      if (phone.replace(/\D/g, '').length < 9) { fail('Escribe un número de WhatsApp válido.'); $('#resPhone').focus(); return; }
      const code = 'ESN-' + Math.random().toString(36).slice(2, 6).toUpperCase();
      const msg = [`Hola equipo Esencia, quiero confirmar mi RESERVA ${code}`, '',
        `• Perfume: ${c.p.name} (${c.p.brand})`, `• Cantidad: ${qty}`, `• Precio: ${amt(c, c.total)}`,
        `• Abono: ${money(c.ab)} (USD ${abono} por perfume)`, `• Saldo: ${amt(c, c.saldo)}`, '',
        `• Nombre: ${name}`, `• WhatsApp: ${phone}`, '',
        file ? 'Adjunto mi comprobante de transferencia.' : 'Aún no he transferido: por favor envíenme los datos bancarios.',
        'Acepto las condiciones de la reserva.'].join('\n');
      window.open(wa(msg), '_blank', 'noopener');
      $('#resCode').textContent = code; $('#resDoneName').textContent = name.split(' ')[0];
      $('#resShare').hidden = !(file && navigator.canShare && navigator.canShare({ files: [file] })); $('#resAttachHint').hidden = !file;
      form.hidden = true; $('.res-steps', box).hidden = true; $('#resDone').hidden = false;
    });
    $('#resShare').addEventListener('click', async () => { try { await navigator.share({ files: [file], title: 'Comprobante de reserva' }); } catch (_) { } });
    $('#resAgain').addEventListener('click', () => {
      form.reset(); file = null; pick = null; qty = 1; abono = R.abonos[0]; $('#resQty').textContent = 1; $('#resPreview').hidden = true;
      $('#resFileTxt').textContent = 'Subir comprobante de transferencia'; $('#resDone').hidden = true; form.hidden = false; $('.res-steps', box).hidden = false; go(1); update();
    });
    update();
  })();

  mountShots();

  // Inclinación 3D suave: la vitrina (marco + bandeja) gira unos grados siguiendo el cursor
  if (matchMedia('(hover:hover) and (pointer:fine)').matches && !reduce) {
    document.addEventListener('pointermove', e => {
      const sh = e.target.closest && e.target.closest('.shot');
      $$('.tilt.tilting').forEach(el => { if (el !== sh) { el.classList.remove('tilting'); el.style.transform = ''; } });
      if (!sh || sh.closest('.spin-item') || sh.closest('.mirror')) return;
      const r = sh.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      sh.classList.add('tilt', 'tilting');
      sh.style.transform = `perspective(900px) rotateY(${(x * 9).toFixed(2)}deg) rotateX(${(-y * 6).toFixed(2)}deg)`;
    }, { passive: true });
  }
})();
