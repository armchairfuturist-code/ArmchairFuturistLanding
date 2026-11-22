// The organism, statically: the hero's particle field reduced to an orbital
// mark -- bright signal arcs, a scattering of particles, a few warm flecks.
// Deterministic (seeded LCG) so every render of the card is identical.
(function () {
  var svg = document.getElementById('organism');
  if (!svg) return;
  var NS = 'http://www.w3.org/2000/svg';
  var cx = 280, cy = 280;
  var seed = 20261117;
  function rnd() { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; }
  function el(name, attrs) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    svg.appendChild(e);
    return e;
  }

  // Signal arcs: open strokes, so the eye reads rotation rather than a ring.
  function arc(rx, ratio, rot, a0, a1, stroke, width, opacity, dash) {
    var steps = 72, d = '';
    for (var s = 0; s <= steps; s++) {
      var t = (a0 + (a1 - a0) * s / steps) * Math.PI / 180;
      var x = cx + Math.cos(t) * rx, y = cy + Math.sin(t) * rx * ratio;
      d += (s === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1);
    }
    el('path', {
      d: d, fill: 'none', stroke: stroke, 'stroke-width': width,
      'stroke-linecap': 'round', opacity: opacity,
      'stroke-dasharray': dash || 'none',
      transform: 'rotate(' + rot + ' ' + cx + ' ' + cy + ')'
    });
  }
  arc(126, 0.90, -14, 28, 250, '#5b8cff', 7, 0.95);
  arc(176, 0.86, 10, -34, 200, '#296ef9', 5, 0.70);
  arc(226, 0.92, -8, 96, 348, '#296ef9', 3.5, 0.42, '26 18');
  arc(272, 0.94, 4, 150, 330, '#5b8cff', 2.2, 0.26);

  // Particles: cool field, denser at the core, a few warm flecks.
  for (var p = 0; p < 120; p++) {
    var a = rnd() * Math.PI * 2, rad = Math.pow(rnd(), 0.62) * 262;
    var x = cx + Math.cos(a) * rad, y = cy + Math.sin(a) * rad * 0.94;
    var warm = rnd() > 0.94, big = rnd() > 0.88;
    el('circle', {
      cx: x.toFixed(1), cy: y.toFixed(1),
      r: (big ? 2.0 + rnd() * 1.6 : 0.8 + rnd() * 1.2).toFixed(2),
      fill: warm ? '#f2a66e' : (rnd() > 0.4 ? '#5b8cff' : '#296ef9'),
      opacity: (warm ? 0.7 + rnd() * 0.3 : 0.25 + rnd() * 0.5).toFixed(2)
    });
  }

  // The core: one steady point the field gathers around.
  el('circle', { cx: cx, cy: cy, r: 6, fill: '#5b8cff', opacity: 0.30 });
  el('circle', { cx: cx, cy: cy, r: 2.6, fill: '#c9e0fc', opacity: 0.95 });
})();
