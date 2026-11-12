import * as THREE from "three";

/* A small, living low-poly market: stalls, shoppers, a delivery rider and a
   keke circling the square. Static props are batched into a handful of
   instanced meshes; only the things that move are individual meshes. */

type Kind = "box" | "cyl" | "cone" | "taper" | "prism" | "ico" | "blob";

const C = {
  sand: 0xe7c188,
  pave: 0xf1d7a6,
  road: 0x857c72,
  line: 0xfff1d0,
  wood: 0xa06c3a,
  woodDark: 0x6d4626,
  green: 0x1f9d4d,
  deep: 0x0f3d2b,
  leaf: 0x4caf3f,
  lime: 0x8ccb3f,
  yellow: 0xf8b71e,
  red: 0xe2412a,
  orange: 0xf28a1f,
  blue: 0x2b7fd6,
  teal: 0x14a79d,
  pink: 0xe8487f,
  purple: 0x7b3fa9,
  cream: 0xfff4de,
  sack: 0xd9c39a,
  zinc: 0x9fb0b5,
  rust: 0xb4532e,
  dark: 0x23282a,
};
const SKIN = [0x5b3824, 0x6c4530, 0x4a2d1d, 0x7b4f36];
const CLOTH = [C.red, C.yellow, C.blue, C.pink, C.purple, C.teal, C.orange, C.green, 0xffffff, 0x2a4bb0];

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

class Builder {
  items: Record<Kind, { m: THREE.Matrix4; c: number }[]> = {
    box: [], cyl: [], cone: [], taper: [], prism: [], ico: [], blob: [],
  };
  private cur = new THREE.Matrix4();
  private tmp = new THREE.Matrix4();
  private q = new THREE.Quaternion();
  private e = new THREE.Euler();

  at(x: number, y: number, z: number, ry: number, fn: () => void) {
    const prev = this.cur.clone();
    this.tmp.compose(
      new THREE.Vector3(x, y, z),
      this.q.setFromEuler(this.e.set(0, ry, 0)),
      new THREE.Vector3(1, 1, 1),
    );
    this.cur.multiply(this.tmp);
    fn();
    this.cur.copy(prev);
  }

  add(kind: Kind, c: number, sx: number, sy: number, sz: number, x: number, y: number, z: number, rx = 0, ry = 0, rz = 0) {
    const m = new THREE.Matrix4().compose(
      new THREE.Vector3(x, y, z),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)),
      new THREE.Vector3(sx, sy, sz),
    );
    this.items[kind].push({ m: this.cur.clone().multiply(m), c });
  }

  build(scene: THREE.Scene, disposables: { dispose(): void }[]) {
    const tri = new THREE.Shape();
    tri.moveTo(-0.5, 0);
    tri.lineTo(0.5, 0);
    tri.lineTo(0, 1);
    tri.closePath();
    const geos: Record<Kind, THREE.BufferGeometry> = {
      box: new THREE.BoxGeometry(1, 1, 1),
      cyl: new THREE.CylinderGeometry(0.5, 0.5, 1, 10),
      cone: new THREE.ConeGeometry(0.5, 1, 8),
      taper: new THREE.CylinderGeometry(0.5, 0.32, 1, 10),
      prism: new THREE.ExtrudeGeometry(tri, { depth: 1, bevelEnabled: false }).translate(0, 0, -0.5),
      ico: new THREE.IcosahedronGeometry(0.5, 0),
      blob: new THREE.IcosahedronGeometry(0.5, 1),
    };
    const mat = new THREE.MeshStandardMaterial({ flatShading: true, roughness: 0.82, metalness: 0 });
    disposables.push(mat);
    const col = new THREE.Color();
    (Object.keys(geos) as Kind[]).forEach((k) => {
      disposables.push(geos[k]);
      const list = this.items[k];
      if (!list.length) return;
      const mesh = new THREE.InstancedMesh(geos[k], mat, list.length);
      list.forEach((it, i) => {
        mesh.setMatrixAt(i, it.m);
        mesh.setColorAt(i, col.set(it.c));
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.frustumCulled = false;
      scene.add(mesh);
    });
  }
}

/* ---------- static props ---------- */

function pile(b: Builder, x: number, y: number, z: number, c: number, r = 0.2, c2 = c) {
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    b.add("ico", i % 2 ? c : c2, r, r, r, x + Math.cos(a) * r * 0.95, y + r * 0.45, z + Math.sin(a) * r * 0.95);
  }
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + 0.5;
    b.add("ico", c, r, r, r, x + Math.cos(a) * r * 0.5, y + r * 1.15, z + Math.sin(a) * r * 0.5);
  }
  b.add("ico", c2, r, r, r, x, y + r * 1.8, z);
}

function basin(b: Builder, x: number, y: number, z: number, rim: number, goods: number, goods2 = goods) {
  b.add("taper", rim, 0.78, 0.26, 0.78, x, y + 0.13, z);
  pile(b, x, y + 0.14, z, goods, 0.19, goods2);
}

function crate(b: Builder, x: number, y: number, z: number, c: number, goods: number) {
  b.add("box", c, 0.72, 0.3, 0.52, x, y + 0.15, z);
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 2; j++)
      b.add("ico", goods, 0.21, 0.21, 0.21, x - 0.22 + i * 0.22, y + 0.34, z - 0.11 + j * 0.22);
}

function yams(b: Builder, x: number, y: number, z: number) {
  for (let i = 0; i < 4; i++) b.add("cyl", 0x7a5536, 0.2, 0.8, 0.2, x - 0.3 + i * 0.2, y + 0.1, z, Math.PI / 2, 0, 0);
  for (let i = 0; i < 3; i++) b.add("cyl", 0x8a6240, 0.2, 0.8, 0.2, x - 0.2 + i * 0.2, y + 0.27, z, Math.PI / 2, 0.15, 0);
}

function sack(b: Builder, x: number, z: number, fill: number) {
  b.add("cyl", C.sack, 0.8, 0.75, 0.8, x, 0.375, z);
  b.add("cyl", 0xe8d6b0, 0.9, 0.12, 0.9, x, 0.75, z);
  b.add("cone", fill, 0.74, 0.34, 0.74, x, 0.95, z);
}

function jerrycan(b: Builder, x: number, z: number, ry = 0) {
  b.at(x, 0, z, ry, () => {
    b.add("box", C.yellow, 0.36, 0.5, 0.26, 0, 0.25, 0);
    b.add("cyl", 0x2a2a2a, 0.09, 0.08, 0.09, 0.09, 0.54, 0);
  });
}

function umbrella(b: Builder, x: number, z: number, c1: number, c2: number, h = 2.7, r = 3.3) {
  b.add("cyl", C.cream, 0.09, h, 0.09, x, h / 2, z);
  b.add("cone", c1, r, 0.62, r, x, h + 0.05, z);
  b.add("cone", c2, r * 0.52, 0.36, r * 0.52, x, h + 0.26, z);
  b.add("ico", C.cream, 0.16, 0.16, 0.16, x, h + 0.48, z);
}

type Goods = "tomato" | "pepper" | "orange" | "plantain" | "yam" | "onion" | "greens" | "crate";
function goodsAt(b: Builder, g: Goods, x: number, y: number, z: number) {
  if (g === "tomato") basin(b, x, y, z, 0x3b6fd0, C.red, 0xf0552f);
  else if (g === "pepper") basin(b, x, y, z, C.cream, 0xd92a1c, C.orange);
  else if (g === "orange") basin(b, x, y, z, C.pink, C.orange, 0x9bc53d);
  else if (g === "plantain") crate(b, x, y, z, C.woodDark, C.yellow);
  else if (g === "onion") basin(b, x, y, z, C.teal, 0x9b3f8f, 0xc55aa5);
  else if (g === "greens") {
    b.add("box", C.woodDark, 0.72, 0.22, 0.52, x, y + 0.11, z);
    b.add("blob", 0x2f8f3a, 0.62, 0.36, 0.46, x, y + 0.3, z);
    b.add("blob", C.lime, 0.36, 0.28, 0.32, x + 0.14, y + 0.4, z + 0.05);
  } else if (g === "yam") yams(b, x, y, z);
  else crate(b, x, y, z, C.red, 0x7a4a22);
}

function stall(b: Builder, x: number, z: number, ry: number, a: number, a2: number, goods: Goods[]) {
  const W = 3.5, D = 2.1, H = 2.45;
  b.at(x, 0, z, ry, () => {
    for (const sx of [-1, 1]) {
      b.add("box", C.woodDark, 0.14, H + 0.55, 0.14, (sx * W) / 2, (H + 0.55) / 2, -D / 2);
      b.add("box", C.woodDark, 0.14, H - 0.15, 0.14, (sx * W) / 2, (H - 0.15) / 2, D / 2 + 0.3);
    }
    // striped awning, higher at the back
    const n = 7, AW = W + 0.6, AD = D + 1.1;
    const tilt = Math.atan(0.7 / AD);
    for (let i = 0; i < n; i++) {
      const cx = -AW / 2 + (AW / n) * (i + 0.5);
      b.add("box", i % 2 ? a2 : a, AW / n + 0.01, 0.09, AD, cx, H + 0.2, 0.25, tilt);
      b.add("box", i % 2 ? a2 : a, AW / n + 0.01, 0.34, 0.07, cx, H - 0.32, 0.25 + AD / 2 - 0.02);
    }
    // table and goods
    b.add("box", C.wood, W - 0.1, 0.12, D - 0.5, 0, 0.98, 0.15);
    b.add("box", C.woodDark, W - 0.3, 0.9, 0.1, 0, 0.47, D / 2 - 0.2);
    for (let i = 0; i < 4; i++) {
      const gx = -W / 2 + 0.55 + i * ((W - 1.1) / 3);
      goodsAt(b, goods[i % goods.length], gx, 1.04, 0.5);
      goodsAt(b, goods[(i + 2) % goods.length], gx, 1.04, -0.2);
    }
  });
}

function tree(b: Builder, x: number, z: number, s = 1) {
  b.at(x, 0, z, 0, () => {
    b.add("cyl", 0x7a5230, 0.55 * s, 2.8 * s, 0.55 * s, 0, 1.4 * s, 0);
    b.add("blob", 0x3f9b3f, 3.6 * s, 3 * s, 3.6 * s, 0, 3.9 * s, 0);
    b.add("blob", 0x57b043, 2.6 * s, 2.3 * s, 2.6 * s, 1.3 * s, 3.4 * s, 0.6 * s);
    b.add("blob", 0x2f8a45, 2.7 * s, 2.3 * s, 2.7 * s, -1.2 * s, 3.5 * s, -0.4 * s);
    b.add("blob", C.lime, 2.3 * s, 2 * s, 2.3 * s, 0.2 * s, 5.1 * s, 0.1 * s);
  });
}

function palm(b: Builder, x: number, z: number, h = 6) {
  b.at(x, 0, z, 0, () => {
    const segs = 6;
    for (let i = 0; i < segs; i++)
      b.add("cyl", i % 2 ? 0x8a623c : 0x9a7046, 0.36 - i * 0.02, h / segs + 0.05, 0.36 - i * 0.02, i * 0.1, (h / segs) * (i + 0.5), 0);
    const tx = segs * 0.1 - 0.1;
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const droop = 0.45 + (i % 2) * 0.2;
      const L = 2.6;
      b.add("box", i % 2 ? 0x2f8a45 : 0x3f9b3f, L, 0.07, 0.55,
        tx + Math.cos(a) * (L / 2) * Math.cos(droop), h - Math.sin(droop) * (L / 2) + 0.1, -Math.sin(a) * (L / 2) * Math.cos(droop),
        0, a, -droop);
    }
    b.add("ico", 0x6b4a2a, 0.34, 0.34, 0.34, tx + 0.2, h - 0.15, 0.15);
    b.add("ico", 0x6b4a2a, 0.34, 0.34, 0.34, tx - 0.2, h - 0.2, -0.1);
  });
}

function building(b: Builder, x: number, z: number, ry: number, w: number, h: number, d: number, wall: number, roof: number, accent: number, sign: number, floors = 1) {
  b.at(x, 0, z, ry, () => {
    b.add("box", wall, w, h, d, 0, h / 2, 0);
    b.add("box", 0x8a7a66, w + 0.15, 0.4, d + 0.15, 0, 0.2, 0);
    b.add("prism", roof, w + 0.8, 1.7, d + 0.8, 0, h, 0);
    const fz = d / 2 + 0.04;
    const fh = h / floors;
    for (let f = 0; f < floors; f++) {
      const n = Math.max(2, Math.round(w / 2.3));
      for (let i = 0; i < n; i++) {
        const wx = -w / 2 + (w / n) * (i + 0.5);
        if (f === 0 && Math.abs(wx) < 0.9) continue;
        const wy = f * fh + fh * 0.58;
        b.add("box", C.cream, 1.0, 1.15, 0.08, wx, wy, fz);
        b.add("box", 0x2f5564, 0.78, 0.92, 0.1, wx, wy, fz + 0.01);
        b.add("box", accent, 0.2, 0.92, 0.12, wx - 0.42, wy, fz + 0.03);
        b.add("box", accent, 0.2, 0.92, 0.12, wx + 0.42, wy, fz + 0.03);
      }
    }
    b.add("box", C.woodDark, 1.1, 1.9, 0.1, 0, 0.95, fz);
    // shop awning + signboard
    b.add("box", accent, w * 0.92, 0.1, 1.5, 0, Math.min(2.75, fh - 0.2), fz + 0.7, 0.32);
    b.add("box", sign, w * 0.72, 0.72, 0.14, 0, Math.min(3.45, fh + 0.35), fz + 0.1);
    b.add("box", C.cream, w * 0.5, 0.16, 0.16, 0, Math.min(3.5, fh + 0.4), fz + 0.12);
    if (floors > 1) {
      b.add("box", 0x8a7a66, w * 0.86, 0.14, 1.0, 0, fh + 0.9, fz + 0.5);
      for (let i = 0; i <= 6; i++) b.add("box", C.cream, 0.08, 0.6, 0.08, -w * 0.4 + ((w * 0.8) / 6) * i, fh + 1.25, fz + 0.95);
      b.add("box", C.cream, w * 0.84, 0.08, 0.08, 0, fh + 1.55, fz + 0.95);
    }
  });
}

/* ---------- moving things ---------- */

type Rig = {
  group: THREE.Group;
  legL: THREE.Object3D; legR: THREE.Object3D; armL: THREE.Object3D; armR: THREE.Object3D;
  holding: boolean;
};

function makePeopleKit(disposables: { dispose(): void }[]) {
  const g = {
    leg: new THREE.BoxGeometry(0.17, 0.8, 0.19).translate(0, -0.4, 0),
    arm: new THREE.BoxGeometry(0.12, 0.62, 0.12).translate(0, -0.31, 0),
    torso: new THREE.CylinderGeometry(0.21, 0.27, 0.8, 8),
    gown: new THREE.CylinderGeometry(0.21, 0.4, 1.3, 8),
    head: new THREE.IcosahedronGeometry(0.2, 1),
    gele: new THREE.IcosahedronGeometry(0.28, 0),
    cap: new THREE.CylinderGeometry(0.17, 0.2, 0.16, 8),
    basin: new THREE.CylinderGeometry(0.44, 0.28, 0.22, 10),
    load: new THREE.IcosahedronGeometry(0.33, 1),
  };
  Object.values(g).forEach((x) => disposables.push(x));
  const mats = new Map<number, THREE.MeshStandardMaterial>();
  const mat = (c: number) => {
    let m = mats.get(c);
    if (!m) {
      m = new THREE.MeshStandardMaterial({ color: c, flatShading: true, roughness: 0.85 });
      mats.set(c, m);
      disposables.push(m);
    }
    return m;
  };
  const mesh = (geo: THREE.BufferGeometry, c: number, parent: THREE.Object3D, x = 0, y = 0, z = 0) => {
    const m = new THREE.Mesh(geo, mat(c));
    m.position.set(x, y, z);
    m.castShadow = true;
    parent.add(m);
    return m;
  };

  function person(o: { skin: number; top: number; bottom: number; gown?: boolean; gele?: number; cap?: number; load?: [number, number]; scale?: number }): Rig {
    const group = new THREE.Group();
    const legL = new THREE.Group(), legR = new THREE.Group(), armL = new THREE.Group(), armR = new THREE.Group();
    legL.position.set(-0.11, 0.8, 0);
    legR.position.set(0.11, 0.8, 0);
    armL.position.set(-0.3, 1.52, 0);
    armR.position.set(0.3, 1.52, 0);
    armL.rotation.z = -0.1;
    armR.rotation.z = 0.1;
    group.add(legL, legR, armL, armR);
    mesh(g.leg, o.gown ? o.skin : o.bottom, legL);
    mesh(g.leg, o.gown ? o.skin : o.bottom, legR);
    mesh(g.arm, o.gown ? o.top : o.skin, armL);
    mesh(g.arm, o.gown ? o.top : o.skin, armR);
    if (o.gown) mesh(g.gown, o.top, group, 0, 0.98, 0);
    else mesh(g.torso, o.top, group, 0, 1.2, 0);
    mesh(g.head, o.skin, group, 0, 1.82, 0);
    if (o.gele !== undefined) mesh(g.gele, o.gele, group, 0, 1.97, -0.02).scale.set(1.1, 0.72, 1.05);
    if (o.cap !== undefined) mesh(g.cap, o.cap, group, 0, 2.02, 0);
    let holding = false;
    if (o.load) {
      const top = o.gele !== undefined ? 2.22 : 2.12;
      mesh(g.basin, o.load[0], group, 0, top, 0);
      mesh(g.load, o.load[1], group, 0, top + 0.16, 0).scale.set(1, 0.7, 1);
      armR.rotation.set(0, 0, 2.75);
      holding = true;
    }
    group.scale.setScalar(o.scale ?? 1);
    return { group, legL, legR, armL, armR, holding };
  }

  return { person, mesh, mat };
}

type Path = { pts: THREE.Vector2[]; lens: number[]; total: number };
function makePath(coords: [number, number][]): Path {
  const pts = coords.map(([x, z]) => new THREE.Vector2(x, z));
  const lens: number[] = [];
  let total = 0;
  for (let i = 0; i < pts.length; i++) {
    const l = pts[i].distanceTo(pts[(i + 1) % pts.length]);
    lens.push(l);
    total += l;
  }
  return { pts, lens, total };
}
function samplePath(p: Path, dist: number, out: { x: number; z: number; dx: number; dz: number }) {
  let d = ((dist % p.total) + p.total) % p.total;
  for (let i = 0; i < p.pts.length; i++) {
    if (d <= p.lens[i]) {
      const a = p.pts[i], b = p.pts[(i + 1) % p.pts.length];
      const t = d / p.lens[i];
      out.x = a.x + (b.x - a.x) * t;
      out.z = a.y + (b.y - a.y) * t;
      out.dx = b.x - a.x;
      out.dz = b.y - a.y;
      return;
    }
    d -= p.lens[i];
  }
}

function turnTo(obj: THREE.Object3D, target: number, k: number) {
  let diff = target - obj.rotation.y;
  diff = Math.atan2(Math.sin(diff), Math.cos(diff));
  obj.rotation.y += diff * k;
}

/* ---------- scene ---------- */

export function createMarket(host: HTMLElement, onReady: () => void): () => void {
  const disposables: { dispose(): void }[] = [];
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const small = window.matchMedia("(max-width: 760px)").matches;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.75 : 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);

  const HAZE = 0xf8e2b8;
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(HAZE, 46, 96);

  const camera = new THREE.PerspectiveCamera(36, 1.6, 1, 220);

  scene.add(new THREE.HemisphereLight(0xfff0d2, 0xc9925a, 1.15));
  const sun = new THREE.DirectionalLight(0xffe7bd, 2.7);
  sun.position.set(-24, 30, 18);
  sun.target.position.set(0, 0, -3);
  sun.castShadow = true;
  sun.shadow.mapSize.setScalar(small ? 1024 : 2048);
  const sc = sun.shadow.camera;
  sc.left = -34; sc.right = 34; sc.top = 30; sc.bottom = -30; sc.near = 1; sc.far = 110;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.05;
  scene.add(sun, sun.target);

  const RX = 13.5, RZ = 8.4, RW = 3.1;
  const rand = rng(7);
  const b = new Builder();

  // ground
  const groundGeo = new THREE.CircleGeometry(150, 48).rotateX(-Math.PI / 2);
  const groundMat = new THREE.MeshStandardMaterial({ color: C.sand, roughness: 1 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.receiveShadow = true;
  scene.add(ground);
  disposables.push(groundGeo, groundMat);

  const roadShape = new THREE.Shape();
  roadShape.absellipse(0, 0, RX + RW / 2, RZ + RW / 2, 0, Math.PI * 2, false, 0);
  const hole = new THREE.Path();
  hole.absellipse(0, 0, RX - RW / 2, RZ - RW / 2, 0, Math.PI * 2, true, 0);
  roadShape.holes.push(hole);
  const roadGeo = new THREE.ShapeGeometry(roadShape, 72).rotateX(-Math.PI / 2);
  const roadMat = new THREE.MeshStandardMaterial({ color: C.road, roughness: 1 });
  const road = new THREE.Mesh(roadGeo, roadMat);
  road.position.y = 0.03;
  road.receiveShadow = true;
  scene.add(road);
  disposables.push(roadGeo, roadMat);

  const squareGeo = new THREE.CircleGeometry(1, 64).rotateX(-Math.PI / 2);
  const squareMat = new THREE.MeshStandardMaterial({ color: C.pave, roughness: 1 });
  const square = new THREE.Mesh(squareGeo, squareMat);
  square.scale.set(RX - RW / 2, 1, RZ - RW / 2);
  square.position.y = 0.02;
  square.receiveShadow = true;
  scene.add(square);
  disposables.push(squareGeo, squareMat);

  // lane dashes + zebra crossing
  for (let i = 0; i < 44; i++) {
    const t = (i / 44) * Math.PI * 2;
    if (Math.abs(Math.cos(t)) < 0.16 && Math.sin(t) > 0) continue;
    b.add("box", C.line, 0.13, 0.03, 0.85, Math.cos(t) * RX, 0.045, Math.sin(t) * RZ, 0, Math.atan2(-RX * Math.sin(t), RZ * Math.cos(t)), 0);
  }
  for (let i = 0; i < 6; i++) b.add("box", C.line, 0.34, 0.03, RW - 0.5, -1.55 + i * 0.62, 0.05, RZ);

  // paving tiles for texture
  for (let i = 0; i < 150; i++) {
    const x = (rand() - 0.5) * 70, z = (rand() - 0.5) * 50;
    const e = (x / (RX + RW / 2 + 0.4)) ** 2 + (z / (RZ + RW / 2 + 0.4)) ** 2;
    const inner = (x / (RX - RW / 2 - 0.4)) ** 2 + (z / (RZ - RW / 2 - 0.4)) ** 2;
    if (e < 1 && inner > 1) continue;
    const s = 0.7 + rand() * 1.1;
    b.add("box", rand() > 0.5 ? 0xdfb679 : 0xf0cf98, s, 0.03, s * (0.7 + rand() * 0.5), x, 0.03, z, 0, rand() * 0.4, 0);
  }

  // --- the square: stalls face the camera, low goods behind them ---
  stall(b, -6.6, 1.6, 0, C.green, C.cream, ["tomato", "pepper", "greens", "onion"]);
  stall(b, -2.2, 1.9, 0, C.yellow, C.cream, ["orange", "plantain", "yam", "tomato"]);
  stall(b, 2.2, 1.9, 0, C.red, C.cream, ["pepper", "greens", "crate", "orange"]);
  stall(b, 6.6, 1.6, 0, C.blue, C.cream, ["plantain", "onion", "tomato", "yam"]);

  // tarps on the ground, sacks, umbrellas at the back of the square
  b.add("box", C.blue, 3.0, 0.04, 2.0, -5.4, 0.05, -3.2, 0, 0.12, 0);
  basin(b, -6.2, 0.07, -3.4, C.cream, C.red, 0xf0552f);
  basin(b, -5.3, 0.07, -2.8, C.pink, C.orange);
  basin(b, -4.5, 0.07, -3.5, 0x3b6fd0, 0x9bc53d, C.lime);
  yams(b, -5.3, 0.07, -3.9);
  umbrella(b, -3.2, -3.6, C.red, C.yellow);
  sack(b, -2.6, -2.7, 0xf5efe0);
  sack(b, -1.7, -3.0, 0x8a4f2a);
  sack(b, -2.0, -3.9, 0xf3c95a);
  sack(b, -1.0, -3.8, 0xc22f1f);

  umbrella(b, 3.4, -3.4, C.teal, C.cream);
  b.add("box", 0xd95c2b, 2.6, 0.04, 1.8, 4.6, 0.05, -2.9, 0, -0.1, 0);
  crate(b, 4.0, 0.07, -3.2, C.red, 0x7a4a22);
  crate(b, 4.0, 0.39, -3.2, C.red, 0x7a4a22);
  crate(b, 4.9, 0.07, -2.6, C.yellow, 0x2f8f3a);
  basin(b, 5.5, 0.07, -3.3, C.cream, 0x9b3f8f, 0xc55aa5);
  for (let i = 0; i < 4; i++) jerrycan(b, 6.7 + (i % 2) * 0.45, -3.1 - Math.floor(i / 2) * 0.4, 0.2);

  umbrella(b, -9.6, -0.8, C.yellow, C.green, 2.6, 3.0);
  sack(b, -9.9, 0.3, 0x8a4f2a);
  sack(b, -9.0, 0.5, 0xf5efe0);
  umbrella(b, 9.8, -0.6, C.pink, C.cream, 2.6, 3.0);
  basin(b, 9.6, 0.05, 0.5, 0x3b6fd0, C.yellow, C.lime);
  basin(b, 10.3, 0.05, -0.1, C.cream, C.red);

  // food stand with a grill (smoke rises from here)
  const GRILL = new THREE.Vector3(0.2, 1.25, -3.7);
  b.at(GRILL.x, 0, GRILL.z, 0, () => {
    b.add("box", C.woodDark, 1.5, 0.95, 0.8, 0, 0.48, 0);
    b.add("box", C.dark, 1.3, 0.16, 0.66, 0, 1.03, 0);
    b.add("box", 0xff6a2a, 1.1, 0.05, 0.5, 0, 1.12, 0);
    for (let i = 0; i < 4; i++) b.add("box", 0x7a3d1e, 0.08, 0.06, 0.6, -0.42 + i * 0.28, 1.17, 0);
  });

  // --- behind the road: a row of stalls, then shops ---
  stall(b, -10.6, -12.6, 0.1, C.red, C.yellow, ["tomato", "orange", "greens", "pepper"]);
  stall(b, -5.6, -13, 0, C.teal, C.cream, ["yam", "plantain", "onion", "crate"]);
  stall(b, 5.2, -13, 0, C.orange, C.cream, ["orange", "tomato", "greens", "plantain"]);
  stall(b, 10.4, -12.6, -0.1, C.green, C.yellow, ["pepper", "crate", "yam", "onion"]);
  umbrella(b, -1.6, -12.4, C.blue, C.yellow);
  umbrella(b, 1.6, -12.8, C.yellow, C.red);
  sack(b, -1.2, -11.6, 0xf3c95a);
  sack(b, -0.2, -11.9, 0xf5efe0);
  sack(b, 0.9, -11.6, 0x8a4f2a);
  basin(b, 2.2, 0.05, -11.7, C.pink, C.red);

  building(b, -21, -19.5, 0.12, 7, 5.2, 6, 0xf2c84b, C.rust, C.green, C.deep);
  building(b, -13, -20, 0, 6.6, 8.2, 6, 0xf6e7c8, 0x7b4a35, C.red, C.red, 2);
  building(b, -5.4, -20, 0, 6.4, 5.4, 6, 0x7cc0d8, C.zinc, C.yellow, C.blue);
  building(b, 2.2, -20.2, 0, 7, 8.6, 6, 0xf0a04b, C.rust, C.teal, C.deep, 2);
  building(b, 10, -20, 0, 6.2, 5.2, 6, 0xf6d9d0, 0x7b4a35, C.pink, C.purple);
  building(b, 18, -19.6, -0.12, 7.4, 8, 6, 0xcfe3a8, C.zinc, C.orange, C.green, 2);
  building(b, 27, -18.6, -0.25, 7, 5.4, 6, 0xf2c84b, C.rust, C.blue, C.red);
  building(b, -30, -18.6, 0.3, 7, 5.6, 6, 0xf6e7c8, C.zinc, C.orange, C.teal);
  // a hazy second street for depth
  for (let i = 0; i < 9; i++) {
    const hues = [0xf0d9a0, 0xe9b98c, 0xcfe0c8, 0xf3cf7a, 0xd8c6e0];
    building(b, -34 + i * 8.6 + rand() * 2, -33 - rand() * 3, 0, 7, 6 + rand() * 6, 6, hues[i % 5], i % 2 ? C.rust : C.zinc, C.cream, C.sack, i % 2 ? 2 : 1);
  }

  palm(b, -17.4, -15.2, 7);
  palm(b, -1.6, -16.4, 8);
  palm(b, 14.2, -15.4, 6.6);
  palm(b, 23, -13, 7.4);
  tree(b, -25, -11, 1.15);
  tree(b, 21.5, -8, 1);
  tree(b, -20, 3.5, 1.2);
  tree(b, 22, 6, 1.1);
  tree(b, -27, 9, 1);

  // sides
  stall(b, -18.6, -5.4, Math.PI / 2 - 0.2, C.yellow, C.green, ["plantain", "orange", "tomato", "greens"]);
  stall(b, 18.4, -1.4, -Math.PI / 2 + 0.15, C.red, C.cream, ["yam", "onion", "pepper", "crate"]);
  umbrella(b, -17.6, -0.4, C.pink, C.yellow);
  sack(b, -17.2, 0.7, 0xf5efe0);
  sack(b, -18.3, 0.5, 0xc22f1f);
  umbrella(b, 18.2, 3.6, C.blue, C.cream);
  basin(b, 17.6, 0.05, 4.6, C.cream, C.orange);
  basin(b, 18.6, 0.05, 4.8, 0x3b6fd0, C.red);

  // foreground, near the camera
  umbrella(b, -9.5, 13.2, C.green, C.yellow, 2.5, 3.2);
  sack(b, -8.6, 12.4, 0xf3c95a);
  sack(b, -10.2, 12.2, 0x8a4f2a);
  umbrella(b, 6.2, 13.6, C.red, C.cream, 2.5, 3.2);
  basin(b, 5.4, 0.05, 12.5, C.pink, C.red, 0xf0552f);
  basin(b, 6.6, 0.05, 12.3, C.teal, 0x9bc53d);
  crate(b, 7.6, 0.05, 12.7, C.yellow, C.orange);
  umbrella(b, 14.6, 12.6, C.yellow, C.blue, 2.5, 3.0);
  for (let i = 0; i < 3; i++) jerrycan(b, 13.6 + i * 0.45, 11.7, 0.3);

  // power poles
  const poleTops: THREE.Vector3[] = [];
  for (const px of [-24, -8.6, 7.4, 22]) {
    const pz = -15.6;
    b.add("cyl", 0x5c4630, 0.26, 9, 0.26, px, 4.5, pz);
    b.add("box", 0x5c4630, 2.2, 0.16, 0.16, px, 8.4, pz);
    poleTops.push(new THREE.Vector3(px, 8.5, pz));
  }

  // bunting poles along the front of the square
  const flagPosts: [number, number][] = [[-9.2, 4.6], [0, 5.6], [9.2, 4.6]];
  flagPosts.forEach(([x, z]) => {
    b.add("cyl", C.cream, 0.1, 4.1, 0.1, x, 2.05, z);
    b.add("ico", C.yellow, 0.26, 0.26, 0.26, x, 4.2, z);
  });

  b.build(scene, disposables);

  // wires
  const lineMat = new THREE.LineBasicMaterial({ color: 0x4a3b2e });
  disposables.push(lineMat);
  const sag = (a: THREE.Vector3, c: THREE.Vector3, drop: number, n = 14) => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      pts.push(new THREE.Vector3().lerpVectors(a, c, t).setY(a.y + (c.y - a.y) * t - Math.sin(t * Math.PI) * drop));
    }
    return pts;
  };
  for (let i = 0; i < poleTops.length - 1; i++)
    for (const off of [-0.9, 0.9]) {
      const g = new THREE.BufferGeometry().setFromPoints(
        sag(poleTops[i].clone().setX(poleTops[i].x + off), poleTops[i + 1].clone().setX(poleTops[i + 1].x + off), 0.9),
      );
      disposables.push(g);
      scene.add(new THREE.Line(g, lineMat));
    }

  // bunting
  const flagGeo = new THREE.BufferGeometry();
  flagGeo.setAttribute("position", new THREE.Float32BufferAttribute([-0.2, 0, 0, 0.2, 0, 0, 0, -0.46, 0], 3));
  flagGeo.computeVertexNormals();
  disposables.push(flagGeo);
  const flagColors = [C.red, C.yellow, C.green, C.blue, C.pink, C.cream];
  const flagMats = flagColors.map((c) => {
    const m = new THREE.MeshStandardMaterial({ color: c, side: THREE.DoubleSide, flatShading: true, roughness: 0.9 });
    disposables.push(m);
    return m;
  });
  const flags: THREE.Mesh[] = [];
  for (let s = 0; s < flagPosts.length - 1; s++) {
    const a = new THREE.Vector3(flagPosts[s][0], 4.05, flagPosts[s][1]);
    const c = new THREE.Vector3(flagPosts[s + 1][0], 4.05, flagPosts[s + 1][1]);
    const pts = sag(a, c, 0.75, 13);
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    disposables.push(g);
    scene.add(new THREE.Line(g, lineMat));
    for (let i = 1; i < pts.length - 1; i++) {
      const f = new THREE.Mesh(flagGeo, flagMats[(i + s * 2) % flagMats.length]);
      f.position.copy(pts[i]);
      f.rotation.y = Math.atan2(-(c.z - a.z), c.x - a.x);
      f.castShadow = true;
      scene.add(f);
      flags.push(f);
    }
  }

  /* people */
  const kit = makePeopleKit(disposables);
  const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)];
  const randomPerson = (load = false, scale = 1) => {
    const woman = rand() > 0.45;
    const top = pick(CLOTH);
    return kit.person({
      skin: pick(SKIN),
      top,
      bottom: pick([0x2c3a4a, 0x3a2f28, 0x1f4a6b, 0x4a4a4a, C.deep]),
      gown: woman || rand() > 0.75,
      gele: woman ? pick(CLOTH.filter((c) => c !== top)) : undefined,
      cap: !woman && rand() > 0.5 ? pick([C.cream, C.red, C.deep, C.yellow]) : undefined,
      load: load ? [pick([C.cream, 0x3b6fd0, C.pink, C.teal]), pick([C.red, C.orange, C.yellow, 0x2f8f3a, 0xf5efe0])] : undefined,
      scale,
    });
  };

  type Walker = { rig: Rig; path: Path; dist: number; speed: number; phase: number };
  const walkers: Walker[] = [];
  const addWalkers = (coords: [number, number][], n: number, loadEvery = 3) => {
    const path = makePath(coords);
    for (let i = 0; i < n; i++) {
      const rig = randomPerson(i % loadEvery === 0, 0.95 + rand() * 0.14);
      scene.add(rig.group);
      walkers.push({ rig, path, dist: (path.total / n) * i + rand() * 2, speed: 0.9 + rand() * 0.55, phase: rand() * 6 });
    }
  };
  addWalkers([[-8.4, 3.6], [8.4, 3.6], [8.6, 4.5], [-8.6, 4.5]], 6, 3);
  addWalkers([[-16, -10.6], [16, -10.6], [16, -11.4], [-16, -11.4]], 6, 2);
  addWalkers([[-17, 10.9], [17, 10.9], [17, 11.6], [-17, 11.6]], 4, 2);
  addWalkers([[-11.2, -1.8], [-8.6, -4.6], [-0.6, -5.0], [8.4, -4.6], [11.2, -1.6], [8.6, -4.9], [-0.4, -5.4], [-8.8, -4.9]], 3, 3);

  type Idler = { rig: Rig; base: number; phase: number; wave: boolean };
  const idlers: Idler[] = [];
  const stand = (x: number, z: number, face: number, wave = false, scale = 1) => {
    const rig = randomPerson(false, scale);
    rig.group.position.set(x, 0, z);
    rig.group.rotation.y = face;
    scene.add(rig.group);
    idlers.push({ rig, base: face, phase: rand() * 6, wave });
  };
  // vendors behind the stalls, customers in front
  for (const [sx, sz] of [[-6.6, 1.6], [-2.2, 1.9], [2.2, 1.9], [6.6, 1.6]] as [number, number][]) {
    stand(sx + 0.4, sz - 0.85, 0, true);
    stand(sx - 0.7 + rand() * 0.6, sz + 1.75, Math.PI, false);
  }
  stand(-9.2, 2.9 - 2.3, Math.PI * 0.7);
  stand(-5.2, -4.4, Math.PI, false);
  stand(-2.9, -2.2, 0.6, true);
  stand(4.6, -4.2, Math.PI, false);
  stand(GRILL.x, GRILL.z - 0.8, 0, true);
  stand(GRILL.x + 1.2, GRILL.z + 0.9, Math.PI * 1.1);
  for (const [sx, sz] of [[-10.6, -12.6], [-5.6, -13], [5.2, -13], [10.4, -12.6]] as [number, number][]) {
    stand(sx, sz - 0.85, 0, true);
    if (rand() > 0.3) stand(sx + 0.6, sz + 1.8, Math.PI);
  }
  stand(-17.6, 1.4, Math.PI * 0.4, true);
  stand(-8.9, 12.9, Math.PI, true);
  stand(6.1, 14.3, Math.PI, true);
  stand(4.8, 11.5, 0.3);

  /* goat */
  const goat = new THREE.Group();
  const goatLegs: THREE.Object3D[] = [];
  {
    const body = kit.mesh(new THREE.BoxGeometry(0.42, 0.42, 0.9), 0xf2ead8, goat, 0, 0.62, 0);
    disposables.push(body.geometry);
    const head = kit.mesh(new THREE.BoxGeometry(0.26, 0.3, 0.36), 0x6b4a32, goat, 0, 0.92, 0.55);
    disposables.push(head.geometry);
    const patch = kit.mesh(new THREE.BoxGeometry(0.44, 0.3, 0.34), 0x6b4a32, goat, 0, 0.7, -0.2);
    disposables.push(patch.geometry);
    const legGeo = new THREE.BoxGeometry(0.1, 0.44, 0.1).translate(0, -0.22, 0);
    disposables.push(legGeo);
    for (const [lx, lz] of [[-0.14, 0.32], [0.14, 0.32], [-0.14, -0.32], [0.14, -0.32]]) {
      const pivot = new THREE.Group();
      pivot.position.set(lx, 0.44, lz);
      kit.mesh(legGeo, 0x3a2c22, pivot);
      goat.add(pivot);
      goatLegs.push(pivot);
    }
    scene.add(goat);
  }
  const goatPath = makePath([[-12.5, 12.4], [-4, 13.4], [1.5, 12.2], [-5, 11.6]]);

  /* delivery rider */
  const wheelGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.16, 12).rotateZ(Math.PI / 2);
  const hubGeo = new THREE.BoxGeometry(0.18, 0.5, 0.1);
  disposables.push(wheelGeo, hubGeo);
  const wheels: THREE.Object3D[] = [];
  const wheel = (parent: THREE.Object3D, x: number, y: number, z: number, s = 1) => {
    const w = new THREE.Group();
    w.position.set(x, y, z);
    w.scale.setScalar(s);
    kit.mesh(wheelGeo, 0x1f2224, w);
    kit.mesh(hubGeo, 0xc9ccd0, w);
    parent.add(w);
    wheels.push(w);
    return w;
  };
  const part = (parent: THREE.Object3D, c: number, sx: number, sy: number, sz: number, x: number, y: number, z: number, rx = 0) => {
    const g = new THREE.BoxGeometry(sx, sy, sz);
    disposables.push(g);
    const m = kit.mesh(g, c, parent, x, y, z);
    m.rotation.x = rx;
    return m;
  };

  const rider = new THREE.Group();
  const riderTilt = new THREE.Group();
  rider.add(riderTilt);
  wheel(riderTilt, 0, 0.34, 0.78);
  wheel(riderTilt, 0, 0.34, -0.72);
  part(riderTilt, C.green, 0.36, 0.14, 1.1, 0, 0.44, 0.05);
  part(riderTilt, C.green, 0.46, 0.46, 0.8, 0, 0.72, -0.55);
  part(riderTilt, C.dark, 0.38, 0.1, 0.74, 0, 1.0, -0.42);
  part(riderTilt, C.green, 0.42, 0.86, 0.14, 0, 0.84, 0.6, -0.28);
  part(riderTilt, C.cream, 0.2, 0.16, 0.08, 0, 1.0, 0.76);
  part(riderTilt, C.dark, 0.78, 0.07, 0.07, 0, 1.32, 0.5);
  part(riderTilt, 0x2f8a45, 0.3, 0.1, 0.5, 0, 0.72, 0.78);
  // delivery box
  part(riderTilt, C.deep, 0.66, 0.62, 0.62, 0, 1.38, -1.0);
  part(riderTilt, C.yellow, 0.68, 0.1, 0.64, 0, 1.72, -1.0);
  part(riderTilt, C.cream, 0.3, 0.3, 0.04, 0, 1.38, -1.32);
  // the rider
  part(riderTilt, 0x24a455, 0.44, 0.62, 0.3, 0, 1.42, -0.3, 0.2);
  part(riderTilt, 0x24a455, 0.12, 0.56, 0.12, -0.27, 1.42, 0.08, -1.05);
  part(riderTilt, 0x24a455, 0.12, 0.56, 0.12, 0.27, 1.42, 0.08, -1.05);
  part(riderTilt, 0x1d2b3a, 0.16, 0.5, 0.18, -0.16, 0.98, -0.02, -1.15);
  part(riderTilt, 0x1d2b3a, 0.16, 0.5, 0.18, 0.16, 0.98, -0.02, -1.15);
  part(riderTilt, C.cream, 0.16, 0.12, 0.3, -0.16, 0.56, 0.24);
  part(riderTilt, C.cream, 0.16, 0.12, 0.3, 0.16, 0.56, 0.24);
  {
    const headGeo = new THREE.IcosahedronGeometry(0.2, 1);
    const helmetGeo = new THREE.IcosahedronGeometry(0.26, 1);
    disposables.push(headGeo, helmetGeo);
    kit.mesh(headGeo, SKIN[0], riderTilt, 0, 1.92, -0.2);
    kit.mesh(helmetGeo, C.green, riderTilt, 0, 1.99, -0.24).scale.set(1, 0.86, 1.08);
    part(riderTilt, C.dark, 0.3, 0.08, 0.12, 0, 1.96, 0.0);
  }
  rider.scale.setScalar(1.18);
  scene.add(rider);

  /* keke */
  const keke = new THREE.Group();
  wheel(keke, 0, 0.3, 1.25, 0.88);
  wheel(keke, -0.62, 0.3, -0.75, 0.88);
  wheel(keke, 0.62, 0.3, -0.75, 0.88);
  part(keke, C.yellow, 1.36, 0.55, 2.0, 0, 0.72, -0.2);
  part(keke, C.yellow, 0.6, 0.5, 0.7, 0, 0.7, 1.05);
  part(keke, C.dark, 1.38, 0.1, 2.02, 0, 0.98, -0.2);
  part(keke, C.yellow, 1.36, 0.95, 0.1, 0, 1.5, -1.18);
  part(keke, 0xbfe3ee, 1.1, 0.8, 0.06, 0, 1.55, 0.72, -0.22);
  part(keke, C.dark, 1.44, 0.12, 2.2, 0, 2.05, -0.22);
  part(keke, C.yellow, 1.3, 0.1, 2.0, 0, 2.14, -0.22);
  for (const sx of [-0.66, 0.66]) {
    part(keke, C.dark, 0.07, 1.05, 0.07, sx, 1.5, 0.82);
    part(keke, C.dark, 0.07, 1.05, 0.07, sx, 1.5, -0.1);
  }
  part(keke, C.cream, 0.18, 0.14, 0.06, 0, 0.8, 1.42);
  part(keke, 0x3a5fb0, 0.4, 0.55, 0.28, 0, 1.3, 0.2);
  part(keke, 0xd1447a, 0.42, 0.55, 0.28, -0.3, 1.3, -0.72);
  {
    const headGeo = new THREE.IcosahedronGeometry(0.18, 1);
    disposables.push(headGeo);
    kit.mesh(headGeo, SKIN[1], keke, 0, 1.74, 0.2);
    kit.mesh(headGeo, SKIN[2], keke, -0.3, 1.74, -0.72);
  }
  keke.scale.setScalar(1.1);
  scene.add(keke);

  /* map pins that hover over the market and a home */
  const pinGeoTop = new THREE.IcosahedronGeometry(0.5, 1);
  const pinGeoTip = new THREE.ConeGeometry(0.42, 0.8, 8).rotateX(Math.PI);
  const pinDot = new THREE.IcosahedronGeometry(0.2, 1);
  disposables.push(pinGeoTop, pinGeoTip, pinDot);
  const pins: { g: THREE.Group; y: number; p: number }[] = [];
  const pin = (x: number, y: number, z: number, c: number) => {
    const g = new THREE.Group();
    kit.mesh(pinGeoTop, c, g, 0, 0.55, 0);
    kit.mesh(pinGeoTip, c, g, 0, -0.05, 0);
    kit.mesh(pinDot, C.cream, g, 0, 0.6, 0.38);
    g.position.set(x, y, z);
    scene.add(g);
    pins.push({ g, y, p: x });
  };
  pin(-2.2, 4.6, 1.9, C.green);

  /* smoke from the grill */
  const puffGeo = new THREE.IcosahedronGeometry(0.5, 1);
  disposables.push(puffGeo);
  const puffs = Array.from({ length: 7 }, (_, i) => {
    const m = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0, flatShading: true, depthWrite: false });
    disposables.push(m);
    const mesh = new THREE.Mesh(puffGeo, m);
    scene.add(mesh);
    return { mesh, m, off: i / 7 };
  });

  /* birds */
  const wingGeo = new THREE.BoxGeometry(0.7, 0.04, 0.24).translate(0.35, 0, 0);
  disposables.push(wingGeo);
  const birds = Array.from({ length: 4 }, (_, i) => {
    const g = new THREE.Group();
    const l = new THREE.Group(), r = new THREE.Group();
    kit.mesh(wingGeo, 0x2b3a33, l);
    kit.mesh(wingGeo, 0x2b3a33, r);
    r.scale.x = -1;
    g.add(l, r);
    scene.add(g);
    return { g, l, r, off: i * 1.7, rad: 9 + i * 2.2, h: 11 + i * 0.9 };
  });

  /* camera + sizing */
  const look = new THREE.Vector3(0, 1.2, -1.5);
  const camBase = new THREE.Vector3(0, 19, 33);
  let aspect = 1.6;
  function resize() {
    const w = host.clientWidth || 1, h = host.clientHeight || 1;
    aspect = w / h;
    renderer.setSize(w, h, false);
    camera.aspect = aspect;
    const wide = aspect > 1.25;
    const hFov = wide ? 66 : 54;
    camera.fov = Math.min(64, THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(hFov / 2)) / aspect)));
    if (wide) {
      camBase.set(0, 19, 33);
      look.set(0, 1.2, -1.5);
      camera.setViewOffset(w, h, -w * 0.165, -h * 0.02, w, h);
    } else {
      camBase.set(0, 20, 29);
      look.set(0, 0.5, 0.2);
      camera.clearViewOffset();
    }
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(() => {
    resize();
    if (reduced) frame(0, true);
  });
  ro.observe(host);

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const onPointer = (e: PointerEvent) => {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  const s = { x: 0, z: 0, dx: 0, dz: 1 };
  let riderT = 0.9, kekeT = 3.6;
  let last = 0, time = 0, raf = 0, visible = true, started = false;

  function frame(now: number, force = false) {
    const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
    last = now;
    if (!force) time += dt;
    const t = time + 4;

    // camera drift + pointer parallax
    pointer.x += (pointer.tx - pointer.x) * 0.04;
    pointer.y += (pointer.ty - pointer.y) * 0.04;
    camera.position.set(
      camBase.x + Math.sin(t * 0.13) * 1.6 + pointer.x * 2.6,
      camBase.y + Math.sin(t * 0.17) * 0.4 - pointer.y * 1.2,
      camBase.z + Math.cos(t * 0.13) * 0.8,
    );
    camera.lookAt(look.x + pointer.x * 0.6, look.y, look.z);

    // walkers
    for (const w of walkers) {
      w.dist += w.speed * dt;
      samplePath(w.path, w.dist, s);
      const g = w.rig.group;
      const swing = Math.sin(t * w.speed * 5.2 + w.phase);
      g.position.set(s.x, Math.abs(swing) * 0.05, s.z);
      turnTo(g, Math.atan2(s.dx, s.dz), 0.12);
      w.rig.legL.rotation.x = swing * 0.55;
      w.rig.legR.rotation.x = -swing * 0.55;
      w.rig.armL.rotation.x = -swing * 0.45;
      if (!w.rig.holding) w.rig.armR.rotation.x = swing * 0.45;
    }
    for (const p of idlers) {
      const g = p.rig.group;
      g.rotation.y = p.base + Math.sin(t * 0.6 + p.phase) * 0.25;
      g.rotation.z = Math.sin(t * 1.1 + p.phase) * 0.03;
      if (p.wave) {
        const k = Math.max(0, Math.sin(t * 0.7 + p.phase));
        p.rig.armR.rotation.x = -k * 1.5 + Math.sin(t * 6 + p.phase) * 0.18 * k;
      } else {
        p.rig.armL.rotation.x = -0.5 + Math.sin(t * 0.9 + p.phase) * 0.25;
      }
    }

    // goat
    samplePath(goatPath, t * 0.55, s);
    goat.position.set(s.x, 0, s.z);
    turnTo(goat, Math.atan2(s.dx, s.dz), 0.08);
    goatLegs.forEach((l, i) => (l.rotation.x = Math.sin(t * 6 + (i % 2 ? 0 : Math.PI) + (i > 1 ? 0.6 : 0)) * 0.5));

    // rider (outer lane) and keke (inner lane, other way)
    const ra = RX + 0.72, rc = RZ + 0.72;
    riderT -= (5.2 * dt) / Math.hypot(ra * Math.sin(riderT), rc * Math.cos(riderT));
    rider.position.set(ra * Math.cos(riderT), 0.03 + Math.abs(Math.sin(t * 9)) * 0.015, rc * Math.sin(riderT));
    rider.rotation.y = Math.atan2(ra * Math.sin(riderT), -rc * Math.cos(riderT));
    riderTilt.rotation.z = -0.1 - Math.abs(Math.cos(riderT)) * 0.08;
    const ka = RX - 0.74, kc = RZ - 0.74;
    kekeT += (3.6 * dt) / Math.hypot(ka * Math.sin(kekeT), kc * Math.cos(kekeT));
    keke.position.set(ka * Math.cos(kekeT), 0.03 + Math.abs(Math.sin(t * 11)) * 0.012, kc * Math.sin(kekeT));
    keke.rotation.y = Math.atan2(-ka * Math.sin(kekeT), kc * Math.cos(kekeT));
    wheels.forEach((w) => (w.rotation.x += dt * 13));

    // bunting, pins, smoke, birds
    flags.forEach((f, i) => (f.rotation.x = Math.sin(t * 3.2 + i * 0.7) * 0.42));
    pins.forEach((p) => {
      p.g.position.y = p.y + Math.sin(t * 1.8 + p.p) * 0.28;
      p.g.rotation.y = Math.sin(t * 0.8 + p.p) * 0.5;
    });
    for (const p of puffs) {
      const k = (t * 0.22 + p.off) % 1;
      p.mesh.position.set(GRILL.x + Math.sin(k * 5 + p.off * 9) * 0.35 + k * 1.2, GRILL.y + k * 4.2, GRILL.z + Math.cos(k * 4 + p.off * 5) * 0.25);
      p.mesh.scale.setScalar(0.3 + k * 1.1);
      p.m.opacity = Math.sin(k * Math.PI) * 0.5;
    }
    for (const bd of birds) {
      const a = t * 0.28 + bd.off;
      bd.g.position.set(4 + Math.cos(a) * bd.rad, bd.h + Math.sin(t + bd.off) * 0.5, -6 + Math.sin(a) * bd.rad * 0.7);
      bd.g.rotation.y = -a;
      const flap = Math.sin(t * 9 + bd.off) * 0.6;
      bd.l.rotation.z = flap;
      bd.r.rotation.z = -flap;
    }

    renderer.render(scene, camera);
    if (!started) {
      started = true;
      onReady();
    }
  }

  function loop(now: number) {
    raf = 0;
    if (!visible || document.hidden) {
      last = 0;
      return;
    }
    frame(now);
    raf = requestAnimationFrame(loop);
  }
  const wake = () => {
    if (!raf && !reduced && visible && !document.hidden) raf = requestAnimationFrame(loop);
  };
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    wake();
  });
  io.observe(host);
  document.addEventListener("visibilitychange", wake);

  resize();
  if (reduced) frame(0, true);
  else raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
    window.removeEventListener("pointermove", onPointer);
    document.removeEventListener("visibilitychange", wake);
    disposables.forEach((d) => d.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
