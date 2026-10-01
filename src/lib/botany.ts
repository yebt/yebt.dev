/**
 * Procedural botanical line drawings for the "server herbarium".
 * Everything is generated at build time from a seed, so each specimen is
 * stable between builds but different from its neighbours.
 */

export type Species = 'flower' | 'fern' | 'grass' | 'branch' | 'dandelion' | 'sprout';

export type Kind = 'draw' | 'thin' | 'ht' | 'acc' | 'solid';

export interface Mark {
  tag: 'path' | 'circle';
  kind: Kind;
  /** draw order 0..1 (mapped to an animation delay) */
  at: number;
  attrs: Record<string, string | number>;
}

export interface Specimen {
  marks: Mark[];
  collage?: { x: number; y: number; w: number; h: number; fill: 'ht' | 'panel' | 'acc' };
  crop?: { x: number; y: number; w: number; h: number };
}

export const W = 240;
export const H = 360;
const GROUND = 318;

/* ---------- seeded random ---------- */

function hash(str: string) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

function rng(seed: string) {
  let a = hash(seed);
  const next = () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const r = (min = 0, max = 1) => min + (max - min) * next();
  const int = (min: number, max: number) => Math.floor(r(min, max + 1));
  const pick = <T,>(arr: readonly T[]) => arr[Math.floor(next() * arr.length)];
  const chance = (p: number) => next() < p;
  return { r, int, pick, chance };
}

type R = ReturnType<typeof rng>;
type P = [number, number];

const f = (n: number) => Math.round(n * 10) / 10;
const deg = (rad: number) => (rad * 180) / Math.PI;

/* ---------- geometry ---------- */

function cubic(p0: P, p1: P, p2: P, p3: P) {
  const at = (t: number): P => {
    const u = 1 - t;
    return [
      u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
      u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
    ];
  };
  const tangent = (t: number) => {
    const u = 1 - t;
    const dx = 3 * u * u * (p1[0] - p0[0]) + 6 * u * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0]);
    const dy = 3 * u * u * (p1[1] - p0[1]) + 6 * u * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1]);
    return Math.atan2(dy, dx);
  };
  const d = `M${f(p0[0])} ${f(p0[1])}C${f(p1[0])} ${f(p1[1])} ${f(p2[0])} ${f(p2[1])} ${f(p3[0])} ${f(p3[1])}`;
  return { at, tangent, d };
}

function stem(r: R, base: P, height: number, lean: number, wobble = 28) {
  const top: P = [base[0] + lean, base[1] - height];
  return cubic(
    base,
    [base[0] + r.r(-wobble, wobble), base[1] - height * 0.35],
    [top[0] + r.r(-wobble, wobble), base[1] - height * 0.7],
    top,
  );
}

const tf = (p: P, angleRad: number) => `translate(${f(p[0])} ${f(p[1])}) rotate(${f(deg(angleRad))})`;

/** Leaf in local space: base at 0,0 pointing to +x. */
function leafPath(len: number, w: number, r: R) {
  const a = r.r(0.35, 0.5);
  return `M0 0C${f(len * a)} ${f(-w)} ${f(len * 0.85)} ${f(-w * 0.7)} ${f(len)} 0C${f(len * 0.8)} ${f(w * 0.8)} ${f(len * (a - 0.05))} ${f(w)} 0 0`;
}

function veins(len: number, w: number, n: number) {
  let d = `M0 0L${f(len * 0.9)} 0`;
  for (let i = 1; i <= n; i++) {
    const x = (len * i) / (n + 1);
    d += `M${f(x)} 0L${f(x + len * 0.14)} ${f(-w * 0.55)}M${f(x)} 0L${f(x + len * 0.14)} ${f(w * 0.55)}`;
  }
  return d;
}

function petalPath(len: number, w: number) {
  return `M0 0C${f(len * 0.25)} ${f(-w)} ${f(len * 0.95)} ${f(-w * 0.9)} ${f(len)} 0C${f(len * 0.95)} ${f(w * 0.9)} ${f(len * 0.25)} ${f(w)} 0 0`;
}

/* ---------- builders ---------- */

class Builder {
  marks: Mark[] = [];
  constructor(public r: R) {}

  path(d: string, kind: Kind, at: number, extra: Record<string, string | number> = {}) {
    this.marks.push({ tag: 'path', kind, at: Math.min(1, Math.max(0, at)), attrs: { d, ...extra } });
  }

  circle(c: P, rad: number, kind: Kind, at: number) {
    this.marks.push({ tag: 'circle', kind, at, attrs: { cx: f(c[0]), cy: f(c[1]), r: f(rad) } });
  }

  leaf(p: P, angle: number, len: number, w: number, at: number, fill?: Kind) {
    const transform = tf(p, angle);
    const d = leafPath(len, w, this.r);
    if (fill) this.path(d, fill, at + 0.15, { transform });
    this.path(d, 'draw', at, { transform });
    this.path(veins(len, w, this.r.int(2, 4)), 'thin', at + 0.08, { transform });
  }

  flowerHead(c: P, n: number, len: number, w: number, at: number, accent: number) {
    const rot = this.r.r(0, Math.PI);
    for (let i = 0; i < n; i++) {
      const a = rot + (i / n) * Math.PI * 2 + this.r.r(-0.12, 0.12);
      const l = len * this.r.r(0.85, 1.1);
      const transform = tf(c, a);
      const d = petalPath(l, w * this.r.r(0.85, 1.15));
      const fill: Kind | undefined = this.r.chance(accent) ? 'acc' : this.r.chance(0.45) ? 'ht' : undefined;
      if (fill) this.path(d, fill, at + 0.2, { transform });
      this.path(d, 'draw', at + i * 0.015, { transform });
      this.path(`M0 0L${f(l * 0.75)} 0`, 'thin', at + 0.1, { transform });
    }
    this.circle(c, len * 0.18, 'solid', at + 0.25);
    for (let i = 0; i < 7; i++) {
      const a = this.r.r(0, Math.PI * 2);
      const l = len * this.r.r(0.3, 0.5);
      const e: P = [c[0] + Math.cos(a) * l, c[1] + Math.sin(a) * l];
      this.path(`M${f(c[0])} ${f(c[1])}L${f(e[0])} ${f(e[1])}`, 'thin', at + 0.3);
      this.circle(e, 1.1, 'solid', at + 0.4);
    }
  }

  roots(base: P, at: number) {
    const n = this.r.int(3, 6);
    for (let i = 0; i < n; i++) {
      const len = this.r.r(14, 34);
      const end: P = [base[0] + this.r.r(-26, 26), base[1] + len];
      const c = cubic(base, [base[0] + this.r.r(-8, 8), base[1] + len * 0.4], [end[0] + this.r.r(-8, 8), end[1] - len * 0.3], end);
      this.path(c.d, 'thin', at + i * 0.02);
    }
  }

  ground(at: number) {
    const y = GROUND;
    this.path(`M18 ${y}L${W - 18} ${y}`, 'thin', at);
    for (let x = 26; x < W - 22; x += this.r.r(10, 22)) {
      this.path(`M${f(x)} ${y}l${f(this.r.r(-3, 3))} ${f(this.r.r(2, 5))}`, 'thin', at + 0.02);
    }
  }
}

function flower(b: Builder) {
  const { r } = b;
  const base: P = [W / 2 + r.r(-20, 20), GROUND];
  const s = stem(r, base, r.r(170, 230), r.r(-30, 30));
  b.path(s.d, 'draw', 0);
  const leaves = r.int(2, 4);
  for (let i = 0; i < leaves; i++) {
    const t = 0.15 + (i / leaves) * 0.55 + r.r(0, 0.06);
    const side = i % 2 ? 1 : -1;
    b.leaf(s.at(t), s.tangent(t) + side * r.r(0.7, 1.1), r.r(38, 60), r.r(9, 15), 0.1 + t * 0.4, r.chance(0.5) ? 'ht' : undefined);
  }
  b.flowerHead(s.at(1), r.int(5, 9), r.r(28, 40), r.r(8, 13), 0.55, 0.35);
  // a bud on a side shoot
  if (r.chance(0.7)) {
    const t = r.r(0.55, 0.75);
    const p = s.at(t);
    const a = s.tangent(t) + (r.chance(0.5) ? 1 : -1) * r.r(0.4, 0.7);
    const end: P = [p[0] + Math.cos(a) * 46, p[1] + Math.sin(a) * 46];
    b.path(`M${f(p[0])} ${f(p[1])}Q${f((p[0] + end[0]) / 2 + r.r(-8, 8))} ${f((p[1] + end[1]) / 2)} ${f(end[0])} ${f(end[1])}`, 'draw', 0.45);
    b.path(petalPath(16, 6), 'acc', 0.75, { transform: tf(end, a) });
    b.path(petalPath(16, 6), 'draw', 0.7, { transform: tf(end, a) });
  }
  b.roots(base, 0.05);
}

function fern(b: Builder) {
  const { r } = b;
  const base: P = [W / 2 + r.r(-30, 10), GROUND];
  const s = stem(r, base, r.r(220, 270), r.r(10, 60), 36);
  b.path(s.d, 'draw', 0);
  const n = r.int(14, 20);
  for (let i = 1; i < n; i++) {
    const t = i / n;
    const len = (1 - t * 0.85) * r.r(40, 52);
    const ang = r.r(0.9, 1.15);
    const p = s.at(t);
    for (const side of [-1, 1]) {
      b.leaf(p, s.tangent(t) + side * ang, len, len * 0.22, 0.05 + t * 0.6, i % 4 === 0 && side === 1 ? 'ht' : undefined);
    }
  }
  b.roots(base, 0.05);
}

function grass(b: Builder) {
  const { r } = b;
  const cx = W / 2 + r.r(-15, 15);
  const blades = r.int(9, 15);
  for (let i = 0; i < blades; i++) {
    const base: P = [cx + r.r(-22, 22), GROUND];
    const h = r.r(90, 230);
    const lean = r.r(-80, 80);
    const s = cubic(base, [base[0], base[1] - h * 0.5], [base[0] + lean * 0.4, base[1] - h * 0.85], [base[0] + lean, base[1] - h]);
    b.path(s.d, 'draw', i * 0.03);
    if (r.chance(0.35)) {
      // seed head
      for (let k = 0; k < 6; k++) {
        const t = 0.82 + k * 0.03;
        const p = s.at(Math.min(t, 1));
        const a = s.tangent(t) + (k % 2 ? 0.5 : -0.5);
        const transform = tf(p, a);
        b.path(petalPath(9, 3), k % 3 === 0 ? 'acc' : 'ht', 0.6 + k * 0.03, { transform });
        b.path(petalPath(9, 3), 'draw', 0.55 + k * 0.03, { transform });
      }
    }
  }
  b.roots([cx, GROUND], 0.05);
}

function branch(b: Builder) {
  const { r } = b;
  const base: P = [W / 2 + r.r(-40, -10), GROUND];
  const s = stem(r, base, r.r(200, 250), r.r(20, 70), 40);
  b.path(s.d, 'draw', 0);
  const shoots = r.int(3, 5);
  for (let i = 0; i < shoots; i++) {
    const t = 0.3 + (i / shoots) * 0.65;
    const p = s.at(t);
    const side = i % 2 ? 1 : -1;
    const a = s.tangent(t) + side * r.r(0.5, 0.9);
    const len = r.r(40, 70);
    const end: P = [p[0] + Math.cos(a) * len, p[1] + Math.sin(a) * len];
    const sh = cubic(p, [p[0] + Math.cos(a) * len * 0.4, p[1] + Math.sin(a) * len * 0.4 - 6], [end[0], end[1] + 6], end);
    b.path(sh.d, 'draw', 0.2 + t * 0.3);
    b.leaf(sh.at(0.5), sh.tangent(0.5) - side * 0.9, r.r(22, 32), r.r(6, 9), 0.35 + t * 0.3, r.chance(0.4) ? 'ht' : undefined);
    // blossom cluster
    const k = r.int(3, 6);
    for (let j = 0; j < k; j++) {
      const c: P = [end[0] + r.r(-14, 14), end[1] + r.r(-14, 14)];
      b.flowerHead(c, r.int(4, 5), r.r(6, 9), r.r(3, 4.5), 0.55 + j * 0.03, 0.65);
    }
  }
  b.flowerHead(s.at(1), 5, r.r(10, 14), 5, 0.7, 0.6);
  b.roots(base, 0.05);
}

function dandelion(b: Builder) {
  const { r } = b;
  const base: P = [W / 2 + r.r(-10, 20), GROUND];
  const s = stem(r, base, r.r(190, 240), r.r(-40, 10), 20);
  b.path(s.d, 'draw', 0);
  // rosette of toothed leaves at the base
  for (let i = 0; i < 4; i++) {
    const a = -Math.PI / 2 + (i - 1.5) * 0.55 + r.r(-0.15, 0.15);
    b.leaf(base, a, r.r(50, 75), r.r(8, 12), 0.1 + i * 0.05, i === 1 ? 'ht' : undefined);
  }
  const c = s.at(1);
  const n = r.int(26, 38);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + r.r(-0.05, 0.05);
    const l = r.r(24, 32);
    const e: P = [c[0] + Math.cos(a) * l, c[1] + Math.sin(a) * l];
    b.path(`M${f(c[0])} ${f(c[1])}L${f(e[0])} ${f(e[1])}`, 'thin', 0.5 + i * 0.008);
    b.path(`M${f(e[0])} ${f(e[1])}l${f(Math.cos(a - 0.6) * 5)} ${f(Math.sin(a - 0.6) * 5)}M${f(e[0])} ${f(e[1])}l${f(Math.cos(a + 0.6) * 5)} ${f(Math.sin(a + 0.6) * 5)}`, 'thin', 0.6 + i * 0.008);
  }
  b.circle(c, 5, 'acc', 0.55);
  b.circle(c, 5, 'draw', 0.5);
  // drifting seeds
  for (let i = 0; i < 3; i++) {
    const p: P = [c[0] + r.r(30, 80), c[1] - r.r(10, 70)];
    const a = r.r(-0.6, 0.2) - Math.PI / 2;
    b.path(`M${f(p[0])} ${f(p[1])}l${f(Math.cos(a) * 14)} ${f(Math.sin(a) * 14)}`, 'thin', 0.85);
    b.circle(p, 1.4, 'solid', 0.9);
  }
  b.roots(base, 0.05);
}

function sprout(b: Builder) {
  const { r } = b;
  const base: P = [W / 2, GROUND];
  const s = stem(r, base, r.r(70, 110), r.r(-10, 10), 10);
  b.path(s.d, 'draw', 0);
  const top = s.at(1);
  b.leaf(top, -Math.PI / 2 - 0.9, r.r(34, 44), 13, 0.3, 'ht');
  b.leaf(top, -Math.PI / 2 + 0.9, r.r(34, 44), 13, 0.35);
  b.path(petalPath(14, 5), 'acc', 0.6, { transform: tf(top, -Math.PI / 2) });
  b.path(petalPath(14, 5), 'draw', 0.55, { transform: tf(top, -Math.PI / 2) });
  // seed coat
  b.path(`M${f(base[0] - 9)} ${GROUND + 6}q9 -12 18 0q-9 10 -18 0`, 'draw', 0.05);
  b.roots([base[0], GROUND + 6], 0.1);
}

const builders: Record<Species, (b: Builder) => void> = { flower, fern, grass, branch, dandelion, sprout };

export function grow(species: Species, seed: string, opts: { collage?: boolean; ground?: boolean } = {}): Specimen {
  const r = rng(`${species}:${seed}`);
  const b = new Builder(r);
  if (opts.ground !== false) b.ground(0);
  builders[species](b);

  const spec: Specimen = { marks: b.marks };
  if (opts.collage !== false) {
    const w = r.r(90, 150);
    const h = r.r(110, 190);
    spec.collage = { x: r.r(20, W - w - 20), y: r.r(30, GROUND - h - 20), w, h, fill: r.pick(['ht', 'panel', 'panel', 'acc'] as const) };
    if (r.chance(0.7)) {
      const cw = r.r(80, 140);
      const ch = r.r(80, 160);
      spec.crop = { x: r.r(10, W - cw - 10), y: r.r(20, GROUND - ch), w: cw, h: ch };
    }
  }
  return spec;
}

export const latin = [
  'Laravelia robusta',
  'Dockeria containensis',
  'Postgresia relationalis',
  'Cacheum velox',
  'Queueus asynchronus',
  'Cronus schedulensis',
  'Sentrya vigilans',
  'Bashium scriptorum',
  'Monolithus decompositus',
  'Hexagonia adaptatrix',
  'Idempotens perennis',
  'Mergerequestia lenta',
] as const;

export function pickLatin(seed: string) {
  return latin[hash(seed) % latin.length];
}
