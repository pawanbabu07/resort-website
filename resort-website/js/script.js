/* Paradise Escape Resort — vanilla JS. Static dummy data below; swap for API calls later. */
const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];
const img = (el, f) => { el.classList.add('ph'); el.style.backgroundImage = `url(images/${f})`; }; // drop real photos into /images
const stars = n => '★'.repeat(n) + '☆'.repeat(5 - n);

/* ---------- Dummy data ---------- */
const ROOMS = [
  { n: 'Deluxe Ocean View', t: 'ocean', f: 'room-ocean.jpg', d: 'Wake to the sea from your private balcony, with a king bed and marble bath.', g: 2, p: 220, r: 5 },
  { n: 'Luxury Garden Suite', t: 'garden', f: 'room-garden.jpg', d: 'A quiet suite opening onto tropical gardens, with a sunken tub and lounge.', g: 3, p: 310, r: 5 },
  { n: 'Presidential Suite', t: 'suite', f: 'room-presidential.jpg', d: 'Two bedrooms, a private pool, butler service and panoramic ocean views.', g: 4, p: 780, r: 5 },
  { n: 'Beachfront Villa', t: 'ocean', f: 'room-villa.jpg', d: 'Step from your terrace straight onto the sand. Ideal for families.', g: 5, p: 540, r: 5 },
  { n: 'Garden Deluxe Room', t: 'garden', f: 'room-deluxe.jpg', d: 'A calm, light-filled room with garden views and a private patio.', g: 2, p: 160, r: 4 },
  { n: 'Honeymoon Suite', t: 'suite', f: 'room-honeymoon.jpg', d: 'Canopy bed, rose-petal turndown and a candle-lit outdoor bath for two.', g: 2, p: 420, r: 5 }];
const FACS = [['🏊', 'Swimming Pool'], ['🍽️', 'Fine Dining'], ['💆', 'Spa & Wellness'], ['🏋️', 'Fitness Center'], ['📶', 'Free Wi-Fi'], ['🚗', 'Free Parking'], ['🛎️', 'Room Service'], ['🌴', 'Private Beach']];
const EXPS = [['Beach Activities', 'exp-beach.jpg', 'Kayaking, snorkelling and sunrise yoga on the sand.'], ['Romantic Dinner', 'exp-dinner.jpg', 'A candle-lit table for two, right at the water’s edge.'], ['Nature Exploration', 'exp-nature.jpg', 'Guided rainforest walks and birdwatching at dawn.'], ['Adventure Activities', 'exp-adventure.jpg', 'Zip-lines, jet skis and sunset sailing trips.']];
const GAL = [['Resort', 'g-resort.jpg'], ['Rooms', 'g-room.jpg'], ['Swimming Pool', 'g-pool.jpg'], ['Restaurant', 'g-restaurant.jpg'], ['Beach', 'g-beach.jpg'], ['Spa', 'g-spa.jpg'], ['Garden', 'g-garden.jpg'], ['Activities', 'g-activities.jpg']];
const OFFERS = [['Weekend Escape', '20% OFF', 'Friday to Sunday stays, all room types.'], ['Honeymoon Package', 'Luxury stay + romantic dinner', 'Includes spa session for two.'], ['Family Vacation', 'Kids stay free', 'Children under 12 stay and eat free.']];
const TESTI = [['Ananya Rao', 5, 'The most relaxing holiday we have ever had. The staff remembered our names on day one.'], ['James Carter', 5, 'Stunning ocean view, superb food and a spa that melts every worry away.'], ['Meera Das', 4, 'Beautiful rooms and gardens. The private beach dinner was unforgettable.'], ['Lucas Meyer', 5, 'Perfect family trip. The kids loved the pools and the adventure activities.']];
const LINKS = [['Home', 'index.html'], ['Rooms', 'rooms.html'], ['About', 'about.html'], ['Facilities', 'index.html#facilities'], ['Gallery', 'gallery.html'], ['Contact', 'contact.html']];

/* ---------- Toast ---------- */
function toast(msg, bad) {
  let box = $('#toasts'); if (!box) { box = document.createElement('div'); box.id = 'toasts'; document.body.append(box); }
  const t = document.createElement('div'); t.className = 'toast' + (bad ? ' bad' : ''); t.textContent = msg; box.append(t);
  setTimeout(() => t.remove(), 3600);
}

/* ---------- Shared navbar & footer (injected so every page stays in sync) ---------- */
function renderShell() {
  const page = location.pathname.split('/').pop() || 'index.html';
  $('#nav').innerHTML = `<div class="wrap"><a class="logo" href="index.html">Paradise <b>Escape</b></a>
    <button class="burger" aria-label="Menu"><span></span></button>
    <nav class="menu">${LINKS.map(([l, h]) => `<a href="${h}" class="${h === page ? 'on' : ''}">${l}</a>`).join('')}<a class="btn sm" href="index.html#booking">Book Now</a></nav></div>`;
  $('#footer').innerHTML = `<div class="wrap"><div class="fgrid">
    <div><a class="logo" href="index.html">Paradise <b>Escape</b></a><p style="margin-top:10px">A 5-star beachfront resort where luxury meets nature.</p>
      <div class="soc"><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="Instagram">in</a><a href="#" aria-label="X">x</a><a href="#" aria-label="YouTube">▶</a></div></div>
    <div><h4>Quick Links</h4><ul>${LINKS.map(([l, h]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul></div>
    <div><h4>Contact</h4><ul><li>12 Palm Beach Road, Puri, Odisha</li><li>+91 98765 43210</li><li>stay@paradiseescape.example</li></ul></div>
    <div><h4>Newsletter</h4><p>Get offers and travel inspiration.</p><form class="nl" id="nlForm" novalidate><input type="email" placeholder="Your email" aria-label="Email"><button class="btn sm">Join</button></form></div>
  </div><p class="copy">© <span id="yr"></span> Paradise Escape Resort. All rights reserved.</p></div>`;
  $('#yr').textContent = new Date().getFullYear();
  const top = document.createElement('button'); top.id = 'top'; top.textContent = '↑'; top.setAttribute('aria-label', 'Back to top');
  top.onclick = () => scrollTo({ top: 0, behavior: 'smooth' }); document.body.append(top);
  const burger = $('.burger'), menu = $('.menu');
  burger.onclick = () => { burger.classList.toggle('open'); menu.classList.toggle('open'); };
  $$('.menu a').forEach(a => a.addEventListener('click', () => { burger.classList.remove('open'); menu.classList.remove('open'); }));
  const onScroll = () => { $('#nav').classList.toggle('scrolled', scrollY > 60); top.classList.toggle('show', scrollY > 500); };
  addEventListener('scroll', onScroll); onScroll();
  $('#nlForm').onsubmit = e => { e.preventDefault(); const i = $('input', e.target);
    /^\S+@\S+\.\S+$/.test(i.value.trim()) ? (toast('Subscribed! Watch your inbox for offers.'), i.value = '') : toast('Please enter a valid email address.', true); };
}

/* ---------- Section renderers ---------- */
const hide = (id, fn) => { const el = $(id); if (el) fn(el); };
function renderRooms(el) {
  const limit = +el.dataset.limit || ROOMS.length, fb = $('#roomFilters');
  const draw = type => {
    const list = ROOMS.filter(r => type === 'all' || r.t === type).slice(0, limit);
    el.innerHTML = list.map((r, i) => `<article class="card rv in"><div class="im"><div class="ph" style="background-image:url(images/${r.f})"></div></div><div class="body">
      <div class="meta"><span class="stars" aria-label="${r.r} stars">${stars(r.r)}</span><span>👥 Up to ${r.g} guests</span></div>
      <h3>${r.n}</h3><p>${r.d}</p><div class="meta"><span class="price">$${r.p} <small>/ night</small></span></div>
      <div class="row"><button class="btn sm dark" data-view="${ROOMS.indexOf(r)}">View Details</button><button class="btn sm" data-book="${ROOMS.indexOf(r)}">Book Now</button></div></div></article>`).join('')
      || '<p>No rooms match this filter.</p>';
  };
  if (fb) { fb.innerHTML = [['all', 'All'], ['ocean', 'Ocean View'], ['garden', 'Garden'], ['suite', 'Suites']].map(([v, l], i) => `<button data-f="${v}" class="${i ? '' : 'on'}">${l}</button>`).join('');
    fb.onclick = e => { const b = e.target.closest('button'); if (!b) return; $$('button', fb).forEach(x => x.classList.toggle('on', x === b)); draw(b.dataset.f); }; }
  draw('all');
  el.onclick = e => { const v = e.target.closest('[data-view]'), b = e.target.closest('[data-book]');
    if (v) openRoom(ROOMS[v.dataset.view]);
    if (b) { const r = ROOMS[b.dataset.book]; toast(`${r.n} selected — choose your dates to continue.`);
      if ($('#bookForm')) { $('#roomType').value = r.t; $('#booking').scrollIntoView({ behavior: 'smooth' }); } else setTimeout(() => location.href = 'index.html#booking', 900); } };
}
function openRoom(r) {
  let m = $('#modal'); if (!m) { m = document.createElement('div'); m.id = 'modal'; document.body.append(m); m.onclick = e => { if (e.target === m || e.target.className === 'x') m.classList.remove('open'); }; }
  m.innerHTML = `<div class="box"><button class="x" aria-label="Close">×</button><div class="ph" style="background-image:url(images/${r.f})"></div><div class="body"><h3 style="font-size:1.9rem;color:var(--green)">${r.n}</h3><p class="stars">${stars(r.r)}</p>
    <p style="margin:8px 0">${r.d}</p><p>👥 Up to ${r.g} guests · 🛏️ Breakfast included · 📶 Free Wi-Fi</p><p class="price" style="margin:10px 0">$${r.p} <small>/ night</small></p><button class="btn" data-book-modal>Book this room</button></div></div>`;
  m.classList.add('open'); $('[data-book-modal]', m).onclick = () => { m.classList.remove('open'); toast(`${r.n} added. Pick your dates to book.`); location.href = 'index.html#booking'; };
}
function renderMisc() {
  hide('#facGrid', el => el.innerHTML = FACS.map(([i, n]) => `<div class="fac rv"><i>${i}</i><h3>${n}</h3></div>`).join(''));
  hide('#expGrid', el => el.innerHTML = EXPS.map(([n, f, d]) => `<div class="exp ph rv" style="background-image:url(images/${f})"><div><h3>${n}</h3><p>${d}</p></div></div>`).join(''));
  hide('#offerGrid', el => { el.innerHTML = OFFERS.map(([n, b, d], i) => `<div class="offer rv"><h3>${n}</h3><div class="big">${b}</div><p style="margin-bottom:18px">${d}</p><button class="btn" data-offer="${i}">Claim Offer</button></div>`).join('');
    el.onclick = e => { const b = e.target.closest('[data-offer]'); if (b) toast(`"${OFFERS[b.dataset.offer][0]}" offer saved. Mention it when booking.`); }; });
  hide('#testi', el => { el.innerHTML = `<div class="slider"><div class="track">${TESTI.map(([n, s, t]) => `<div class="slide"><div class="glass"><div class="av">${n[0]}</div><p class="stars">${stars(s)}</p><p style="margin:10px 0;font-size:1.1rem">“${t}”</p><b>${n}</b></div></div>`).join('')}</div></div><div class="dots"></div>`;
    const track = $('.track', el), dots = $('.dots', el); let i = 0, timer;
    dots.innerHTML = TESTI.map((_, k) => `<button aria-label="Review ${k + 1}"></button>`).join('');
    const go = n => { i = (n + TESTI.length) % TESTI.length; track.style.transform = `translateX(-${i * 100}%)`; $$('button', dots).forEach((d, k) => d.classList.toggle('on', k === i)); };
    const auto = () => { clearInterval(timer); timer = setInterval(() => go(i + 1), 5000); };
    dots.onclick = e => { const k = $$('button', dots).indexOf(e.target); if (k > -1) { go(k); auto(); } };
    go(0); auto(); });
  hide('#aboutBlock', el => el.innerHTML = `<div class="two"><div class="ph rv" style="background-image:url(images/about.jpg)"></div><div class="rv"><h2>Welcome to Paradise Escape</h2>
    <p>Set along a quiet stretch of golden coastline, Paradise Escape blends warm hospitality with natural beauty. Every room, meal and experience is designed to help you slow down and enjoy the moment.</p>
    <div class="stats">${[['50+', 'Luxury Rooms'], ['4', 'Restaurants'], ['3', 'Swimming Pools'], ['10+', 'Years Experience']].map(([n, l]) => `<div><b data-n="${n}">${n}</b><span>${l}</span></div>`).join('')}</div>
    ${el.dataset.more ? '<a class="btn dark" href="about.html">Read More</a>' : '<a class="btn dark" href="rooms.html">Explore Rooms</a>'}</div></div>`);
  hide('#contactBlock', el => el.innerHTML = `<div class="two" style="align-items:start"><div class="rv"><div class="head" style="text-align:left;margin:0 0 20px"><h2>Find Us</h2></div>
    <ul class="info"><li><b>Address:</b> 12 Palm Beach Road, Puri, Odisha, India</li><li><b>Phone:</b> +91 98765 43210</li><li><b>Email:</b> stay@paradiseescape.example</li>
    <li><b>Nearby:</b> Sun Temple (35 km), Chilika Lake (45 km), Golden Beach (2 km)</li></ul><div class="map"><div><p style="font-size:2rem">📍</p><p>Map placeholder<br>Embed Google Maps here</p></div></div></div>
    <form class="form glass rv" id="contactForm" novalidate><h3 style="font-size:1.8rem;color:var(--green)">Send us a message</h3>
    <div class="two2"><div><label>Full Name</label><input name="name"></div><div><label>Email</label><input name="email" type="email"></div></div>
    <div class="two2"><div><label>Phone</label><input name="phone" type="tel"></div><div><label>Subject</label><input name="subject"></div></div>
    <div><label>Message</label><textarea name="message" rows="5"></textarea></div><button class="btn">Send Message</button><p class="msg" role="status"></p></form></div>`);
  hide('#galGrid', el => { el.innerHTML = GAL.map(([n, f], i) => `<div class="ph rv" tabindex="0" role="button" aria-label="Open ${n}" data-i="${i}" style="background-image:url(images/${f})"><span>${n}</span></div>`).join(''); initLightbox(el); });
}

/* ---------- Lightbox ---------- */
function initLightbox(grid) {
  const lb = document.createElement('div'); lb.id = 'lb';
  lb.innerHTML = '<button id="lbx" aria-label="Close">×</button><button id="lbp" aria-label="Previous">‹</button><div class="ph"></div><button id="lbn" aria-label="Next">›</button><p id="lbc"></p>'; document.body.append(lb);
  let i = 0; const show = n => { i = (n + GAL.length) % GAL.length; $('.ph', lb).style.backgroundImage = `url(images/${GAL[i][1]})`; $('#lbc').textContent = `${GAL[i][0]} (${i + 1}/${GAL.length})`; };
  const open = n => { show(n); lb.classList.add('open'); }, close = () => lb.classList.remove('open');
  grid.onclick = e => { const t = e.target.closest('[data-i]'); if (t) open(+t.dataset.i); };
  grid.onkeydown = e => { if (e.key === 'Enter') { const t = e.target.closest('[data-i]'); if (t) open(+t.dataset.i); } };
  $('#lbx').onclick = close; $('#lbp').onclick = () => show(i - 1); $('#lbn').onclick = () => show(i + 1);
  lb.onclick = e => { if (e.target === lb) close(); };
  addEventListener('keydown', e => { if (!lb.classList.contains('open')) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') show(i - 1); if (e.key === 'ArrowRight') show(i + 1); });
}

/* ---------- Forms ---------- */
function setMsg(form, text, ok) { const m = $('.msg', form); m.textContent = text; m.className = 'msg ' + (ok ? 'ok' : 'bad'); }
function initForms() {
  const bf = $('#bookForm');
  if (bf) {
    const today = new Date().toISOString().split('T')[0]; $('#cin').min = today; $('#cout').min = today;
    $('#cin').onchange = () => { $('#cout').min = $('#cin').value || today; };
    bf.onsubmit = e => { e.preventDefault(); const a = $('#cin'), b = $('#cout'), g = $('#guests'); let bad = '';
      [a, b, g].forEach(x => x.classList.remove('err'));
      if (!a.value) { bad = 'Please choose a check-in date.'; a.classList.add('err'); }
      else if (!b.value) { bad = 'Please choose a check-out date.'; b.classList.add('err'); }
      else if (new Date(b.value) <= new Date(a.value)) { bad = 'Check-out must be after check-in.'; b.classList.add('err'); }
      else if (!(+g.value >= 1 && +g.value <= 10)) { bad = 'Guests must be between 1 and 10.'; g.classList.add('err'); }
      if (bad) { setMsg(bf, bad); return toast(bad, true); }
      const nights = Math.round((new Date(b.value) - new Date(a.value)) / 864e5), type = $('#roomType').selectedOptions[0].text;
      const ok = `Good news! ${type} is available for ${nights} night${nights > 1 ? 's' : ''}, ${g.value} guest${g.value > 1 ? 's' : ''}.`; setMsg(bf, ok, true); toast(ok); };
  }
  const cf = $('#contactForm');
  if (cf) cf.onsubmit = e => { e.preventDefault(); let bad = '';
    const f = cf.elements; $$('input,textarea', cf).forEach(x => x.classList.remove('err'));
    const rules = [['name', v => v.trim().length >= 2, 'Please enter your full name.'], ['email', v => /^\S+@\S+\.\S+$/.test(v.trim()), 'Please enter a valid email address.'],
      ['phone', v => /^[+\d][\d\s-]{7,14}$/.test(v.trim()), 'Please enter a valid phone number.'], ['subject', v => v.trim().length >= 3, 'Please enter a subject.'], ['message', v => v.trim().length >= 10, 'Message must be at least 10 characters.']];
    for (const [k, test, m] of rules) if (!test(f[k].value)) { f[k].classList.add('err'); bad = bad || m; }
    if (bad) { setMsg(cf, bad); return toast(bad, true); }
    const ok = 'Thank you! Your message has been submitted successfully.'; setMsg(cf, ok, true); toast(ok); cf.reset(); }; // TODO: POST to backend here
}

/* ---------- Scroll reveal ---------- */
function reveal() {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0, rootMargin: '0px 0px -8% 0px' });
  $$('.rv:not(.in)').forEach(el => io.observe(el));
  // safety net: anything already above/at the viewport (e.g. after an anchor jump) is shown
  const sweep = () => $$('.rv:not(.in)').forEach(el => el.getBoundingClientRect().top < innerHeight * .92 && el.classList.add('in'));
  addEventListener('scroll', sweep, { passive: true }); sweep();
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderShell(); hide('#roomsGrid', renderRooms); renderMisc(); initForms();
  $$('[data-bg]').forEach(el => img(el, el.dataset.bg)); reveal();
  if (location.hash && $(location.hash)) setTimeout(() => $(location.hash).scrollIntoView(), 120); // hash targets render via JS
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const t = $(a.getAttribute('href')); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); } }));
});
