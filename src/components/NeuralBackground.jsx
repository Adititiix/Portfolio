import { useEffect, useRef } from 'react';
import useReducedMotion from '../hooks/useReducedMotion.js';

const COLORS = {
  blush: [255, 196, 196],
  coral: [238, 105, 131],
  maroon: [133, 14, 53],
};

const LINK_DISTANCE = 120;
const PARALLAX = 16; // Maximum cursor shift in px for the nearest layer.

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

// Approximately normal sample, used to gather stars along the dust band.
function gaussian(rand = Math.random) {
  return (rand() + rand() + rand() - 1.5) / 1.5;
}

// Small seeded generator so the nebula looks identical every time it is redrawn.
function seeded(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Geometry of the galactic band: it rises from the lower left to the upper right,
// with its brightest core just left of centre.
function bandFrame(width, height) {
  const angle = Math.max(-0.95, -Math.atan2(height * 0.72, width));
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const cx = width * 0.42;
  const cy = height * 0.54;
  return {
    angle,
    span: Math.hypot(width, height),
    thick: Math.min(width, height) * 0.36,
    point: (along, across) => [cx + along * cos - across * sin, cy + along * sin + across * cos],
    cos,
    sin,
  };
}

function softBlob(ctx, x, y, rx, ry, rotation, [r, g, b], alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.scale(rx, ry);
  const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
  grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
  grad.addColorStop(0.45, `rgba(${r}, ${g}, ${b}, ${alpha * 0.45})`);
  grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, 1, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

const CORE_LIGHT = [255, 252, 246];

// The nebula is painted once into its own canvas: a broad band of blush dust, wispy
// coral filaments along it, two light cores, and turbulent clouds near the edges.
// It is rendered at reduced resolution, which keeps it cheap and naturally soft.
function renderNebula(canvas, width, height) {
  const scale = 0.5;
  canvas.width = Math.max(1, Math.round(width * scale));
  canvas.height = Math.max(1, Math.round(height * scale));
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const rand = seeded(20251022);
  const band = bandFrame(width, height);
  const { span, thick, angle } = band;

  // Broad, patchy body of the band: blobs gather around clumps, so density varies along it.
  const clumps = Array.from({ length: 10 }, () => [gaussian(rand) * span * 0.45, gaussian(rand) * thick * 0.45]);
  for (let i = 0; i < 240; i++) {
    const [ca, cb] = clumps[Math.floor(rand() * clumps.length)];
    const [x, y] = band.point(ca + gaussian(rand) * span * 0.12, cb + gaussian(rand) * thick * 0.5);
    const rx = thick * (0.35 + rand() * 0.8);
    softBlob(ctx, x, y, rx, rx * (0.25 + rand() * 0.35), angle + (rand() - 0.5) * 0.7, COLORS.blush, 0.05 + rand() * 0.08);
  }

  // Wispy filaments: long, thin streaks roughly following the band.
  for (let i = 0; i < 380; i++) {
    const [ca, cb] = clumps[Math.floor(rand() * clumps.length)];
    const [x, y] = band.point(ca + gaussian(rand) * span * 0.16, cb + gaussian(rand) * thick * 0.7);
    const rx = 40 + rand() * 190;
    const color = rand() < 0.94 ? COLORS.coral : COLORS.maroon;
    const alpha = color === COLORS.maroon ? 0.01 + rand() * 0.015 : 0.015 + rand() * 0.04;
    softBlob(ctx, x, y, rx, 1.5 + rand() * 6, angle + (rand() - 0.5) * 0.7, color, alpha);
  }

  // Turbulent clouds near the edges, as in the lower right and upper left of a galaxy field.
  const clouds = [
    [0.88, 0.86, 0.9],
    [0.06, 0.12, 0.7],
    [0.97, 0.38, 0.55],
    [0.12, 0.9, 0.45],
  ];
  for (const [fx, fy, weight] of clouds) {
    // Each cloud is a loose swirl of thin streaks rather than one round patch.
    const swirl = rand() * Math.PI;
    for (let i = 0; i < 90 * weight; i++) {
      const x = width * fx + gaussian(rand) * width * 0.17;
      const y = height * fy + gaussian(rand) * height * 0.17;
      const rx = 30 + rand() * 140;
      const coral = rand() < 0.4;
      softBlob(
        ctx,
        x,
        y,
        rx,
        rx * (0.08 + rand() * 0.3),
        swirl + (rand() - 0.5) * 1.6,
        coral ? COLORS.coral : COLORS.blush,
        coral ? 0.015 + rand() * 0.03 : 0.04 + rand() * 0.08
      );
    }
  }

  // Two light cores. On cream the brightest point is a near-white glow ringed in blush.
  const cores = [
    [band.point(-span * 0.05, 0), 1],
    [band.point(span * 0.12, -thick * 0.08), 0.6],
  ];
  for (const [[x, y], weight] of cores) {
    softBlob(ctx, x, y, thick * 1.5 * weight, thick * 0.7 * weight, angle, COLORS.blush, 0.26);
    softBlob(ctx, x, y, thick * 0.9 * weight, thick * 0.36 * weight, angle, COLORS.coral, 0.06);
    softBlob(ctx, x, y, thick * 0.75 * weight, thick * 0.32 * weight, angle, CORE_LIGHT, 0.85);
  }
}

// Pre-rendered soft dots, drawn with drawImage so hundreds of stars stay cheap.
function makeSprite([r, g, b], size, core) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const half = size / 2;
  const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
  grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
  grad.addColorStop(core, `rgba(${r}, ${g}, ${b}, 0.85)`);
  grad.addColorStop(Math.min(1, core * 2.4), `rgba(${r}, ${g}, ${b}, 0.18)`);
  grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return canvas;
}

function pickColor() {
  const roll = Math.random();
  if (roll < 0.6) return 'coral';
  if (roll < 0.94) return 'blush';
  return 'maroon';
}

// Most stars are tiny pinpoints. Blush is close to the cream base, so blush grains are
// drawn larger and softer, as dust; coral and maroon read as sharper points of light.
function starSize(color, depth) {
  const r = Math.pow(Math.random(), 3);
  if (color === 'blush') return 2.6 + r * 4.5 + depth * 1.2;
  if (color === 'maroon') return 1.1 + r * 1.1 + depth * 0.4;
  return 1.3 + r * 2.6 + depth * 0.8;
}

// A star placed inside the band, weighted toward the core like a real galaxy.
function placeInBand(star, band) {
  // Half the band stars spread along the whole band; the rest gather toward the core.
  const along = Math.random() < 0.5 ? (Math.random() - 0.5) * band.span * 0.9 : gaussian() * band.span * 0.35;
  const [x, y] = band.point(along, gaussian() * band.thick * 0.7);
  star.x = x;
  star.y = y;
  const speed = (Math.random() < 0.5 ? -1 : 1) * (0.02 + Math.random() * 0.05);
  star.vx = band.cos * speed + (Math.random() - 0.5) * 0.01;
  star.vy = band.sin * speed + (Math.random() - 0.5) * 0.01;
}

function createStars(width, height) {
  const mobile = width < 700;
  const count = Math.round(clamp((width * height) / (mobile ? 700 : 760), 240, mobile ? 560 : 1750));
  const band = bandFrame(width, height);

  return Array.from({ length: count }, () => {
    const depth = Math.random(); // 0 = far, 1 = near.
    const bright = Math.random() < 0.028;
    const color = bright ? 'coral' : pickColor();
    const star = {
      inBand: Math.random() < 0.62,
      depth,
      size: bright ? 4.5 + Math.random() * 3 : starSize(color, depth),
      bright,
      // About a third of the bright stars carry thin diffraction spikes.
      flare: bright && Math.random() < 0.35,
      color,
      base: bright ? 0.9 : color === 'maroon' ? 0.16 + Math.random() * 0.22 : 0.5 + Math.random() * 0.5,
      // Each star twinkles on its own period and phase, so nothing pulses in sync.
      twinkleSpeed: 0.0004 + Math.random() * 0.0022,
      twinkleDepth: 0.25 + Math.random() * 0.55,
      phase: Math.random() * Math.PI * 2,
      fade: 1,
      // Opening burst: how tightly the star starts, how far it sweeps, and how long it takes.
      // Near stars settle last, which gives the spread some depth.
      burstK: 0.2 + Math.random() * 0.26,
      sweep: 1.3 + Math.random() * 0.9,
      burstDelay: Math.random() * 0.12,
      burstDuration: 2.1 + depth * 0.7 + Math.random() * 0.2,
      // Ambient motion: a small ellipse traced around the star's place in its orbital group.
      loopR: (3 + Math.random() * 9) * (0.6 + depth * 0.8),
      loopEcc: 0.5 + Math.random() * 0.5,
      loopSpeed: 0.7 + Math.random() * 0.6,
      loopPhase: Math.random() * Math.PI * 2,
      group: 0,
    };
    if (star.inBand) {
      placeInBand(star, band);
    } else {
      star.x = Math.random() * width;
      star.y = Math.random() * height;
      star.vx = (Math.random() - 0.5) * (0.02 + depth * 0.06);
      star.vy = (Math.random() - 0.5) * (0.02 + depth * 0.06) - 0.01;
    }
    return star;
  });
}

// Loose orbital groups for the ambient motion. Centres are stored as viewport fractions so
// they survive resizes. Each group sways around its centre on a long, bounded cycle, so
// stars circle visibly without wandering off and breaking up the band.
function createOrbitGroups() {
  return Array.from({ length: 5 }, (_, i) => ({
    fx: 0.12 + Math.random() * 0.76,
    fy: 0.12 + Math.random() * 0.76,
    dir: i % 2 === 0 ? 1 : -1,
    loop: 0.25 + Math.random() * 0.25, // rad/s for each star's own ellipse
    sway: 0.018 + Math.random() * 0.02, // maximum rotation of the group, in radians
    swayFreq: (Math.PI * 2) / (70 + Math.random() * 50), // one sway every 70 to 120 seconds
    swayPhase: Math.random() * Math.PI * 2,
    cos: 1,
    sin: 0,
  }));
}

function assignGroup(star, groups, width, height) {
  let best = 0;
  let bestD = Infinity;
  groups.forEach((g, i) => {
    const d = (star.x - g.fx * width) ** 2 + (star.y - g.fy * height) ** 2;
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  });
  star.group = best;
}

const easeOutCubic = (p) => 1 - (1 - p) ** 3;
const unit = (p) => Math.min(1, Math.max(0, p));

// Opening sequence timing, in seconds.
const BURST_END = 3.2;
const FLASH_PEAK = 0.18;
const FLASH_END = 1.9;
// The burst spins around a broad centre left of middle and travels to the right as it opens.
const BURST_CX = 0.38;
const BURST_CY = 0.55;
const BURST_TRAVEL = 0.24;

// Seconds of the opening sequence already played. Kept at module level so the burst runs
// once per page load, even if React remounts the component.
let burstElapsed = 0;

// A fixed moment in the twinkle and orbit cycles, used for the static reduced-motion frame.
const STATIC_TIME = 1500;

// Thin four-way diffraction spikes, pre-rendered once like the other sprites.
function makeFlare([r, g, b], size) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const half = size / 2;
  for (const [dx, dy] of [
    [1, 0],
    [0, 1],
  ]) {
    const grad = ctx.createLinearGradient(half - dx * half, half - dy * half, half + dx * half, half + dy * half);
    grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
    grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.9)`);
    grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
    ctx.fillStyle = grad;
    if (dx) ctx.fillRect(0, half - 0.6, size, 1.2);
    else ctx.fillRect(half - 0.6, 0, 1.2, size);
  }
  return canvas;
}

function createNodes(width, height) {
  const count = Math.round(clamp((width * height) / 52000, 10, 30));
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.16,
    vy: (Math.random() - 0.5) * 0.16,
  }));
}

function createSparkle(width, height, life = 0) {
  return {
    x: width * (0.05 + Math.random() * 0.9),
    y: height * (0.05 + Math.random() * 0.9),
    size: 3.5 + Math.random() * 3.5,
    life,
    duration: 2500 + Math.random() * 2000, // ms
    color: Math.random() < 0.7 ? COLORS.coral : COLORS.maroon,
  };
}

function drawSparkle(ctx, s) {
  const alpha = Math.sin(Math.PI * (s.life / s.duration)) * 0.6;
  const size = s.size * (0.7 + 0.3 * alpha);
  const [r, g, b] = s.color;
  ctx.save();
  ctx.translate(s.x, s.y);
  // Four-point star: concave curves pulled toward the centre.
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.quadraticCurveTo(0, 0, size, 0);
  ctx.quadraticCurveTo(0, 0, 0, size);
  ctx.quadraticCurveTo(0, 0, -size, 0);
  ctx.quadraticCurveTo(0, 0, 0, -size);
  ctx.fill();
  ctx.restore();
}

// One fixed, full-viewport layer behind every section: a nebula painted once, a slowly
// drifting CSS haze, and a canvas of drifting stars and faint neural links. It never takes pointer
// events, so it cannot block clicks, selection, or keyboard focus.
export default function NeuralBackground() {
  const canvasRef = useRef(null);
  const nebulaRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const nebula = nebulaRef.current;
    if (!canvas || !nebula) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const sprites = {
      dot: {
        blush: makeSprite(COLORS.blush, 24, 0.12),
        coral: makeSprite(COLORS.coral, 16, 0.46),
        maroon: makeSprite(COLORS.maroon, 16, 0.38),
      },
      // Hard-cored sprites for pinpoints: a soft sprite shrunk to a pixel or two loses its brightness.
      pin: {
        blush: makeSprite(COLORS.blush, 8, 0.6),
        coral: makeSprite(COLORS.coral, 8, 0.6),
        maroon: makeSprite(COLORS.maroon, 8, 0.6),
      },
      glow: {
        coral: makeSprite(COLORS.coral, 64, 0.07),
      },
      flare: makeFlare(COLORS.coral, 64),
    };

    let width = 0;
    let height = 0;
    let band = null;
    let nebulaSize = [0, 0];
    let stars = [];
    let nodes = [];
    let sparkles = [];
    const groups = createOrbitGroups();
    let frame = 0;
    let running = false;
    let scrollY = window.scrollY;
    // Pointer position normalised to -1..1 around the viewport centre, eased toward its target.
    const pointer = { tx: 0, ty: 0, x: 0, y: 0 };

    const resize = () => {
      const nextW = window.innerWidth;
      const nextH = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, nextW < 700 ? 1.5 : 2);
      canvas.width = Math.round(nextW * dpr);
      canvas.height = Math.round(nextH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // The nebula is stretched by CSS for small resizes such as a mobile toolbar,
      // and only repainted (identically, from its seed) when the size changes a lot.
      const [nw, nh] = nebulaSize;
      const repaint = !nw || Math.abs(nextW - nw) / nw > 0.15 || Math.abs(nextH - nh) / nh > 0.15;
      if (repaint) {
        renderNebula(nebula, nextW, nextH);
        nebulaSize = [nextW, nextH];
      }
      band = bandFrame(nextW, nextH);

      if (!stars.length) {
        stars = createStars(nextW, nextH);
        for (const star of stars) assignGroup(star, groups, nextW, nextH);
        nodes = createNodes(nextW, nextH);
        sparkles = reduced ? [createSparkle(nextW, nextH, 1300), createSparkle(nextW, nextH, 2000)] : [];
      } else {
        // Rescale instead of regenerating, so mobile toolbar resizes do not reset the field.
        const sx = nextW / width;
        const sy = nextH / height;
        for (const list of [stars, nodes, sparkles]) {
          for (const p of list) {
            p.x *= sx;
            p.y *= sy;
          }
        }
        // A large resize reshapes the band, so band stars move into the new one.
        if (repaint) {
          for (const star of stars) {
            if (star.inBand) placeInBand(star, band);
            assignGroup(star, groups, nextW, nextH);
          }
        }
      }
      width = nextW;
      height = nextH;
      if (!running) draw(STATIC_TIME);
    };

    const wrap = (value, size) => ((value % size) + size) % size;

    // Advances everything by dt milliseconds, so speeds do not depend on the frame rate.
    // Velocities are expressed per 60 Hz frame and scaled by k.
    const step = (dt) => {
      const k = dt / 16.667;
      const ease = 1 - Math.pow(1 - 0.04, k);
      pointer.x += (pointer.tx - pointer.x) * ease;
      pointer.y += (pointer.ty - pointer.y) * ease;
      if (burstElapsed < BURST_END) burstElapsed += dt / 1000;

      for (const s of stars) {
        s.x += s.vx * k;
        s.y += s.vy * k;
        if (s.fade < 1) s.fade = Math.min(1, s.fade + 0.01 * k);
        if (s.inBand) {
          // Band stars that drift off screen fade back in elsewhere in the band, so the
          // band keeps its shape instead of smearing across the page over time.
          if (s.x < -10 || s.x > width + 10 || s.y < -10 || s.y > height + 10) {
            placeInBand(s, band);
            assignGroup(s, groups, width, height);
            s.fade = 0;
          }
        } else {
          s.x = wrap(s.x, width);
          s.y = wrap(s.y, height);
        }
      }
      for (const n of nodes) {
        n.x += n.vx * k;
        n.y += n.vy * k;
        if (n.x < -20 || n.x > width + 20) n.vx *= -1;
        if (n.y < -20 || n.y > height + 20) n.vy *= -1;
      }
      for (const s of sparkles) s.life += dt;
      sparkles = sparkles.filter((s) => s.life < s.duration);
      // Sparkles only start once the galaxy has settled.
      if (burstElapsed >= BURST_END && sparkles.length < 2 && Math.random() < 0.004 * k) {
        sparkles.push(createSparkle(width, height));
      }
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      // Reduced motion keeps the field completely still, including scroll parallax.
      const scrollOffset = reduced ? 0 : scrollY;
      const t = time / 1000;
      const bt = burstElapsed;
      const inBurst = bt < BURST_END;
      const settle = easeOutCubic(unit(bt / (BURST_END - 0.4)));
      // Soft flash: rises quickly, then fades out well before the burst ends.
      const flash = bt < FLASH_PEAK ? bt / FLASH_PEAK : Math.max(0, 1 - (bt - FLASH_PEAK) / (FLASH_END - FLASH_PEAK)) ** 2;
      const appear = unit(bt / 0.35);
      const cx = width * BURST_CX;
      const cy = height * BURST_CY;
      const travel = width * BURST_TRAVEL;

      // The nebula turns into place with the stars, then only follows the cursor slightly.
      const px = pointer.x * PARALLAX * 0.35;
      const py = pointer.y * PARALLAX * 0.35;
      if (inBurst) {
        // Scale and travel stay within the canvas margin, so its edges never come into view.
        const rest = 1 - settle;
        nebula.style.opacity = (0.3 + 0.7 * settle).toFixed(3);
        nebula.style.transform = `translate3d(${(px - travel * 0.15 * rest).toFixed(2)}px, ${py.toFixed(2)}px, 0) scale(${(1.04 + 0.08 * rest).toFixed(4)})`;
      } else {
        nebula.style.opacity = '';
        nebula.style.transform = `translate3d(${px.toFixed(2)}px, ${py.toFixed(2)}px, 0) scale(1.04)`;
      }

      // A soft blush bloom at the heart of the burst; never a full-screen flash.
      if (flash > 0.01) {
        const fx = cx - travel * (1 - settle);
        const radius = Math.min(width, height) * (0.3 + 0.35 * settle);
        const grad = ctx.createRadialGradient(fx, cy, 0, fx, cy, radius);
        grad.addColorStop(0, `rgba(255, 196, 196, ${0.55 * flash})`);
        grad.addColorStop(0.3, `rgba(238, 105, 131, ${0.12 * flash})`);
        grad.addColorStop(0.65, `rgba(255, 196, 196, ${0.18 * flash})`);
        grad.addColorStop(1, 'rgba(255, 196, 196, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // Faint neural links sit underneath the stars and fade in as the galaxy settles.
      const maxD2 = LINK_DISTANCE * LINK_DISTANCE;
      const nx = pointer.x * PARALLAX * 0.3;
      const ny = pointer.y * PARALLAX * 0.3;
      ctx.globalAlpha = settle * settle;
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxD2) {
            ctx.strokeStyle = `rgba(133, 14, 53, ${(1 - d2 / maxD2) * 0.09})`;
            ctx.beginPath();
            ctx.moveTo(a.x + nx, a.y + ny);
            ctx.lineTo(b.x + nx, b.y + ny);
            ctx.stroke();
          }
        }
      }
      ctx.fillStyle = 'rgba(133, 14, 53, 0.18)';
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x + nx, n.y + ny, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const g of groups) {
        const angle = g.dir * g.sway * Math.sin(g.swayFreq * t + g.swayPhase);
        g.cos = Math.cos(angle);
        g.sin = Math.sin(angle);
        g.x = g.fx * width;
        g.y = g.fy * height;
      }

      for (const s of stars) {
        // Ambient orbit: the group's slow rotation about its centre plus the star's own ellipse.
        const g = groups[s.group];
        const dx = s.x - g.x;
        const dy = s.y - g.y;
        const la = s.loopPhase + g.dir * g.loop * s.loopSpeed * t;
        let x = g.x + dx * g.cos - dy * g.sin + s.loopR * Math.cos(la);
        let y = g.y + dx * g.sin + dy * g.cos + s.loopR * s.loopEcc * Math.sin(la);

        const shift = 0.25 + s.depth * 0.75;
        x += pointer.x * PARALLAX * shift;
        y += pointer.y * PARALLAX * shift;
        if (!s.inBand) {
          // Scattered stars move a little with the page, which keeps the field alive while
          // scrolling; band stars stay locked to the nebula behind them.
          x = wrap(x, width);
          y = wrap(y - scrollOffset * (0.02 + s.depth * 0.06), height);
        }

        if (inBurst) {
          // Opening burst, interpolated in polar coordinates around the burst centre: the star
          // starts close in and rotated back, then spirals out to its on-screen place. Ease-out
          // brings angular speed and spread to zero exactly as it arrives, so there is no jump.
          // The burst is applied after wrapping, so no star is wrapped mid-flight.
          const e = easeOutCubic(unit((bt - s.burstDelay) / s.burstDuration));
          if (e < 1) {
            const rx = x - cx;
            const ry = y - cy;
            const r = Math.hypot(rx, ry) * (s.burstK + (1 - s.burstK) * e);
            const angle = Math.atan2(ry, rx) - s.sweep * (1 - e);
            x = cx + r * Math.cos(angle) - travel * (1 - e);
            y = cy + r * Math.sin(angle);
          }
        }

        const twinkle = 1 - s.twinkleDepth * (0.5 + 0.5 * Math.sin(time * s.twinkleSpeed + s.phase));
        const alpha = s.base * twinkle * s.fade * appear;
        ctx.globalAlpha = Math.min(1, alpha * (1 + 0.8 * flash));
        if (s.bright) {
          const glow = s.size * 3.2 * (1 + 0.9 * flash);
          ctx.drawImage(sprites.glow[s.color], x - glow / 2, y - glow / 2, glow, glow);
          if (s.flare) {
            const spike = s.size * 4.5 * (1 + 0.5 * flash);
            ctx.drawImage(sprites.flare, x - spike / 2, y - spike / 2, spike, spike);
          }
          ctx.drawImage(sprites.dot[s.color], x - s.size / 2, y - s.size / 2, s.size, s.size);
        } else {
          if (flash > 0.03 && s.color === 'coral') {
            // During the flash ordinary stars carry a brief soft halo.
            const halo = s.size * 4;
            ctx.globalAlpha = alpha * 0.6 * flash;
            ctx.drawImage(sprites.glow.coral, x - halo / 2, y - halo / 2, halo, halo);
            ctx.globalAlpha = Math.min(1, alpha * (1 + 0.8 * flash));
          }
          if (s.size < 2.6 && s.color !== 'blush') {
            const pin = s.size + 1;
            ctx.drawImage(sprites.pin[s.color], x - pin / 2, y - pin / 2, pin, pin);
          } else {
            ctx.drawImage(sprites.dot[s.color], x - s.size / 2, y - s.size / 2, s.size, s.size);
          }
        }
      }
      ctx.globalAlpha = 1;

      for (const s of sparkles) drawSparkle(ctx, s);
    };

    let last = 0;
    const loop = (time) => {
      // Clamp the step so a stalled frame or a returning tab never causes a jump.
      const dt = last ? Math.min(100, time - last) : 16.667;
      last = time;
      step(dt);
      draw(time);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced || document.hidden) return;
      running = true;
      last = 0;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onPointerMove = (event) => {
      if (event.pointerType !== 'mouse') return;
      pointer.tx = (event.clientX / width) * 2 - 1;
      pointer.ty = (event.clientY / height) * 2 - 1;
    };
    const onPointerLeave = () => {
      pointer.tx = 0;
      pointer.ty = 0;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    // Reduced motion skips the opening burst entirely and shows the settled field.
    if (reduced) burstElapsed = BURST_END;
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('blur', onPointerLeave);
    document.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);

    if (reduced) draw(STATIC_TIME);
    else start();

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', onPointerLeave);
      document.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduced]);

  return (
    <div className="neural-bg" aria-hidden="true">
      <canvas ref={nebulaRef} className="neural-bg__nebula" />
      <div className="neural-bg__haze neural-bg__haze--a" />
      <div className="neural-bg__haze neural-bg__haze--b" />
      <canvas ref={canvasRef} className="neural-bg__canvas" />
    </div>
  );
}
