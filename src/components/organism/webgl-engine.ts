/**
 * WebGL2 Particle Swarm Engine
 * Inspired by Da7em (CC BY 4.0 Da7_Tech — https://da7tech.com)
 * Adapted for The Armchair Futurist (HP-inspired palette, high performance, modular).
 */

export interface ParticleTheme {
  bg: [number, number, number];
  colA: [number, number, number];
  colB: [number, number, number];
  glow: [number, number, number];
  spring: number;
  turb: number;
  push: number;
  swirl: number;
  cursorR: number;
  bloom: number;
}

export const HP_THEMES: Record<string, ParticleTheme> = {
  hero: {
    bg: [0.031, 0.051, 0.090], // #080d17 dark ink navy
    colA: [0.360, 0.470, 0.620], // #5c789e cool chaos steel
    colB: [0.949, 0.651, 0.431], // #f2a66e purposeful warm word
    glow: [1.0, 0.72, 0.48],
    spring: 8.8,
    turb: 0.10,
    push: 5.6,
    swirl: 3.4,
    cursorR: 0.34,
    bloom: 1.0,
  },
  dream: {
    bg: [0.025, 0.040, 0.075],
    colA: [0.161, 0.431, 0.976], // #296ef9 signal blue
    colB: [0.557, 0.741, 0.808], // #8ebdce storm mist
    glow: [0.20, 0.55, 0.90],
    spring: 6.0,
    turb: 0.26,
    push: 5.6,
    swirl: 3.4,
    cursorR: 0.34,
    bloom: 1.0,
  },
};

const NOISE_GLSL = `
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  float a = hash21(i), b = hash21(i+vec2(1.0,0.0)), c = hash21(i+vec2(0.0,1.0)), d = hash21(i+vec2(1.0,1.0));
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  mat2 R = mat2(0.8,-0.6,0.6,0.8);
  for(int i=0;i<4;i++){ v += a * vnoise(p); p = R * p * 2.03 + vec2(11.7, 7.3); a *= 0.5; }
  return v;
}`;

const SIM_VS = `#version 300 es
precision highp float;
layout(location=0) in vec2 a_pos;
layout(location=1) in vec2 a_vel;
layout(location=2) in float a_seed;
layout(location=3) in vec2 a_homeA;
layout(location=4) in vec2 a_homeB;

uniform float u_dt, u_time, u_morph, u_spring, u_turb, u_push, u_swirl, u_cursorR, u_shock, u_scramble, u_aspect;
uniform vec2 u_cursor, u_shockPos, u_centerOffset;

out vec2 v_pos;
out vec2 v_vel;

${NOISE_GLSL}

vec2 curl2(vec2 p, float t){
  float e = 0.35;
  float s = 0.9;
  vec2 dr = vec2(t*0.11, t*0.07);
  float t1 = vnoise(p*s + dr + vec2(0.0, e));
  float t2 = vnoise(p*s + dr - vec2(0.0, e));
  float t3 = vnoise(p*s + dr + vec2(e, 0.0));
  float t4 = vnoise(p*s + dr - vec2(e, 0.0));
  return vec2(t1 - t2, -(t3 - t4)) / (2.0*e);
}

void main(){
  float amb = step(0.94, a_seed);
  float m = clamp(u_morph * 1.55 - fract(a_seed*7.31) * 0.55, 0.0, 1.0);
  m = m*m*(3.0-2.0*m);
  vec2 home = mix(a_homeA, a_homeB, m) + u_centerOffset;

  vec2 f = vec2(0.0);
  f += (home - a_pos) * u_spring * mix(1.0, 0.25, amb) * (1.0 - u_scramble * 0.8);

  vec2 flow = curl2(a_pos + a_seed*13.7, u_time + a_seed*4.0);
  f += flow * u_turb * mix(1.0, 2.2, amb) * (0.55 + 0.9*fract(a_seed*3.7)) * 2.4;

  vec2 d = a_pos - u_cursor;
  float r = length(d) + 1e-5;
  float R = u_cursorR;
  if (r < R){
    float k = 1.0 - r/R;
    f += (d/r) * k*k * u_push * 24.0;
    f += vec2(-d.y, d.x)/r * k * u_swirl * 8.0;
  }

  vec2 sd = a_pos - u_shockPos;
  float sr = length(sd) + 1e-5;
  f += (sd/sr) * u_shock * 110.0 * exp(-sr * 4.2 / u_aspect);

  if (u_scramble > 0.001) {
    vec2 sdir = vec2(fract(a_seed * 13.37) - 0.5, fract(a_seed * 7.77) - 0.5);
    f += normalize(sdir + vec2(1e-4, 1e-4)) * u_scramble * u_aspect * (0.34 + fract(a_seed * 5.13) * 0.48);
    f += curl2(a_pos * 2.2 + a_seed * 9.1, u_time * 2.6) * u_scramble * 2.4 * u_aspect / 1.5;
  }

  vec2 vel = a_vel + f * u_dt;
  vel *= pow(0.885, u_dt * 60.0);
  float sp = length(vel);
  float vmax = 3.2 * u_aspect;
  if (sp > vmax) vel = vel / sp * vmax;
  vel += curl2(a_pos*0.7 - u_time*0.3, u_time*1.7) * 0.012 * (1.0 - amb*0.5);

  v_pos = a_pos + vel * u_dt;
  v_vel = vel;
  gl_PointSize = 1.0;
  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
}`;

const DUMMY_FS = `#version 300 es
precision mediump float;
out vec4 o;
void main(){ o = vec4(0.0); }`;

const PTS_VS = `#version 300 es
precision highp float;
layout(location=0) in vec2 a_pos;
layout(location=1) in vec2 a_vel;
layout(location=2) in float a_seed;

uniform float u_aspect, u_px, u_opacity, u_morph;
uniform vec3 u_colA, u_colB;
out vec3 v_col;
out float v_a;

void main(){
  float amb = step(0.94, a_seed);
  float sp = clamp(length(a_vel) * 1.25 + fract(a_seed*5.13)*0.18, 0.0, 1.0);
  float tone = smoothstep(0.08, 0.78, u_morph);
  vec3 base = mix(u_colA, u_colB, tone);
  v_col = mix(base, u_colB, tone * sp * 0.32);
  float radial = 1.0 - 0.35 * smoothstep(0.5, 1.1, length(a_pos));
  v_col *= (1.38 + 0.55*sp) * mix(1.0, 0.22, amb) * radial;
  v_a = mix(1.0, 0.8, sp) * mix(1.0, 0.35, amb) * u_opacity;
  gl_Position = vec4(a_pos.x / u_aspect, a_pos.y, 0.0, 1.0);
  gl_PointSize = mix(2.9, 4.4, sp) * mix(1.0, 0.6, amb) * u_px;
}`;

const PTS_FS = `#version 300 es
precision mediump float;
in vec3 v_col;
in float v_a;
out vec4 o;
void main(){
  vec2 q = gl_PointCoord - 0.5;
  float d = length(q);
  float fall = smoothstep(0.5, 0.04, d);
  float core = smoothstep(0.18, 0.0, d) * 0.9;
  o = vec4(v_col * (fall + core), fall * v_a);
}`;

const FLAT_VS = `#version 300 es
precision mediump float;
out vec2 v_uv;
void main(){
  vec2 p = vec2(gl_VertexID == 1 ? 3.0 : -1.0, gl_VertexID == 2 ? 3.0 : -1.0);
  v_uv = p * 0.5 + 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}`;

const FLAT_FS = `#version 300 es
precision mediump float;
uniform vec4 u_color;
out vec4 o;
void main(){ o = u_color; }`;

const COMPOSITE_FS = `#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_trail;
uniform float u_time, u_aspect, u_bloomAmt, u_opacity;
uniform vec3 u_bg;
out vec4 o;

vec3 aces(vec3 x){
  return clamp((x*(2.51*x + 0.03)) / (x*(2.43*x + 0.59) + 0.14), 0.0, 1.0);
}

void main(){
  vec3 trail = texture(u_trail, v_uv).rgb;
  float energy = dot(trail, vec3(0.2126, 0.7152, 0.0722));
  float alpha = clamp(energy * (1.15 + u_bloomAmt * 0.35), 0.0, 0.88) * u_opacity;
  vec3 col = aces(trail * (1.18 + u_bloomAmt * 0.22));
  col = pow(col, vec3(0.94));
  o = vec4(col, alpha);
}`;

export function mulberry32(seed: number) {
  let s = seed | 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}


// A chaotic scattered cloud: everyday friction and admin chaos.
export function generateChaosCloudPoints(count: number, aspect: number): Float32Array {
  const out = new Float32Array(count * 2);
  const rng = mulberry32(4404);
  for (let i = 0; i < count; i += 1) {
    out[i * 2] = (rng() * 2 - 1) * aspect * 0.92;
    out[i * 2 + 1] = (rng() * 2 - 1) * 0.92;
  }
  return out;
}

// Sample a word rendered to an offscreen Canvas2D into particle home positions.
// The word keeps its glyph proportions and is anchored at (xCenter, yCenter)
// in clip space, spanning widthFactor of the viewport width.
export function sampleWordPoints(
  word: string,
  count: number,
  aspect: number,
  options: { widthFactor?: number; yCenter?: number; xCenter?: number; weight?: string } = {}
): Float32Array {
  const fallback = generateChaosCloudPoints(count, aspect);
  if (typeof document === "undefined" || !word.trim()) return fallback;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return fallback;

  const w = 1600;
  const h = 460;
  canvas.width = w;
  canvas.height = h;

  const weight = options.weight || "700";
  let fontSize = 300;
  const setFont = () => {
    ctx.font = weight + " " + fontSize + 'px "Space Grotesk", "DM Mono", ui-sans-serif, sans-serif';
    // Letter gaps must survive particle wander + trail glow, so space generously.
    if ("letterSpacing" in ctx) ctx.letterSpacing = "0.20em";
  };
  setFont();

  const measured = ctx.measureText(word).width;
  if (measured > 0) {
    fontSize = Math.floor(fontSize * Math.min(1, (w * 0.94) / measured));
    setFont();
  }

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(word, w / 2, h / 2);

  const imgData = ctx.getImageData(0, 0, w, h).data;
  const xs: number[] = [];
  const ys: number[] = [];
  const step = 3;
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const idx = (y * w + x) * 4;
      if (imgData[idx] > 170) {
        xs.push(x);
        ys.push(y);
      }
    }
  }

  if (xs.length === 0) return fallback;

  const widthFactor = options.widthFactor ?? 0.62;
  const yCenter = options.yCenter ?? 0;
  const xCenter = options.xCenter ?? 0;
  // Uniform pos-units-per-pixel keeps glyph aspect ratio intact.
  const scale = (widthFactor * 2 * aspect) / w;

  const out = new Float32Array(count * 2);
  const rng = mulberry32(word.length * 1013 + 7);
  const n = xs.length;
  for (let i = 0; i < count; i += 1) {
    const j = Math.floor(rng() * n) % n;
    out[i * 2] = (xs[j] - w / 2) * scale + xCenter + (rng() * 2 - 1) * 0.004;
    out[i * 2 + 1] = -(ys[j] - h / 2) * scale + yCenter + (rng() * 2 - 1) * 0.004;
  }
  return out;
}

// A clean, forward-moving geometric wave: applied systems in flow.
export function generateWaveStreamPoints(count: number, aspect: number): Float32Array {
  const out = new Float32Array(count * 2);
  const rng = mulberry32(3113);
  const strands = 7;
  for (let i = 0; i < count; i += 1) {
    const strand = i % strands;
    const laneY = -0.30 + (strand / (strands - 1)) * 0.60;
    const x = -aspect * 0.62 + rng() * aspect * 1.24;
    const phase = strand * 1.31;
    const y = laneY + Math.sin((x / aspect) * 3.1 + phase) * 0.055 + (x / aspect) * 0.07;
    out[i * 2] = x + (rng() * 2 - 1) * 0.008;
    out[i * 2 + 1] = y + (rng() * 2 - 1) * 0.008;
  }
  return out;
}

// Chevron formation (The Armchair Futurist brand signature)
export function generateChevronPoints(count: number, aspect: number): Float32Array {
  const out = new Float32Array(count * 2);
  const rng = mulberry32(42);
  for (let i = 0; i < count; i++) {
    const t = rng();
    let x = 0;
    let y = 0;
    if (t < 0.5) {
      const s = t * 2;
      x = -0.3 + s * 0.6;
      y = 0.5 - s * 0.5;
    } else {
      const s = (t - 0.5) * 2;
      x = 0.3 - s * 0.6;
      y = 0.0 - s * 0.5;
    }
    out[i * 2] = x + (rng() * 2 - 1) * 0.03;
    out[i * 2 + 1] = y + (rng() * 2 - 1) * 0.03;
  }
  return out;
}

export class ParticleOrganism {
  private gl: WebGL2RenderingContext;
  private canvas: HTMLCanvasElement;
  private count: number;
  private width = 0;
  private height = 0;
  private aspect = 1.0;
  private dpr = 1.0;
  private running = false;
  private rafId = 0;

  private pSim: { p: WebGLProgram; u: Record<string, WebGLUniformLocation | null> };
  private pPts: { p: WebGLProgram; u: Record<string, WebGLUniformLocation | null> };
  private pFlat: { p: WebGLProgram; u: Record<string, WebGLUniformLocation | null> };
  private pComp: { p: WebGLProgram; u: Record<string, WebGLUniformLocation | null> };

  private posA: WebGLBuffer;
  private posB: WebGLBuffer;
  private velA: WebGLBuffer;
  private velB: WebGLBuffer;
  private seedBuf: WebGLBuffer;
  private homeBufA: WebGLBuffer;
  private homeBufB: WebGLBuffer;

  private vaoA: WebGLVertexArrayObject;
  private vaoB: WebGLVertexArrayObject;
  private tfA: WebGLTransformFeedback;
  private tfB: WebGLTransformFeedback;

  private trailFBO: { tex: WebGLTexture; fb: WebGLFramebuffer; w: number; h: number };

  private swap = false;
  private lastTime = 0;
  private time = 0;
  private morph = 0;
  private shock = 0;
  private scramble = 0;
  private shockPos: [number, number] = [0, 0];
  private cursor: [number, number] = [999, 999];
  private centerOffset: [number, number] = [0, 0];
  private opacity = 1.0;
  private currentTheme: ParticleTheme = HP_THEMES.hero;

  // initialPositions is uploaded before the transform feedback objects are
  // attached; after construction the position/velocity buffers are owned by
  // the GPU and must never be written from the CPU again.
  constructor(canvas: HTMLCanvasElement, count = 5000, initialPositions?: Float32Array) {
    this.canvas = canvas;
    this.count = count;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    });

    if (!gl) throw new Error("WebGL2 not supported");
    this.gl = gl;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src.trim());
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        throw new Error("Shader compile error: " + gl.getShaderInfoLog(s));
      }
      return s;
    };

    const makeProgram = (vs: string, fs: string, tfVaryings?: string[]) => {
      const p = gl.createProgram()!;
      gl.attachShader(p, compile(gl.VERTEX_SHADER, vs));
      gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs));
      if (tfVaryings) gl.transformFeedbackVaryings(p, tfVaryings, gl.SEPARATE_ATTRIBS);
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        throw new Error("Program link error: " + gl.getProgramInfoLog(p));
      }
      const u: Record<string, WebGLUniformLocation | null> = {};
      const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < n; i++) {
        const info = gl.getActiveUniform(p, i)!;
        u[info.name.replace("[0]", "")] = gl.getUniformLocation(p, info.name);
      }
      return { p, u };
    };

    this.pSim = makeProgram(SIM_VS, DUMMY_FS, ["v_pos", "v_vel"]);
    this.pPts = makeProgram(PTS_VS, PTS_FS);
    this.pFlat = makeProgram(FLAT_VS, FLAT_FS);
    this.pComp = makeProgram(FLAT_VS, COMPOSITE_FS);

    this.posA = gl.createBuffer()!;
    this.posB = gl.createBuffer()!;
    this.velA = gl.createBuffer()!;
    this.velB = gl.createBuffer()!;
    this.seedBuf = gl.createBuffer()!;
    this.homeBufA = gl.createBuffer()!;
    this.homeBufB = gl.createBuffer()!;

    const seeds = new Float32Array(count);
    const rng = mulberry32(777);
    for (let i = 0; i < count; i++) {
      seeds[i] = i >= count * 0.94 ? 0.94 + rng() * 0.06 : rng() * 0.94;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, this.seedBuf);
    gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW);

    const initPos = initialPositions ?? new Float32Array(count * 2);
    const initVel = new Float32Array(count * 2);
    if (!initialPositions) {
      for (let i = 0; i < count; i++) {
        initPos[i * 2] = (rng() * 2 - 1) * 1.5;
        initPos[i * 2 + 1] = rng() * 2 - 1;
      }
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this.posA);
    gl.bufferData(gl.ARRAY_BUFFER, initPos, gl.DYNAMIC_COPY);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.posB);
    gl.bufferData(gl.ARRAY_BUFFER, initPos, gl.DYNAMIC_COPY);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.velA);
    gl.bufferData(gl.ARRAY_BUFFER, initVel, gl.DYNAMIC_COPY);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.velB);
    gl.bufferData(gl.ARRAY_BUFFER, initVel, gl.DYNAMIC_COPY);

    const defaultHomes = generateChevronPoints(count, 1.78);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.homeBufA);
    gl.bufferData(gl.ARRAY_BUFFER, defaultHomes, gl.DYNAMIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.homeBufB);
    gl.bufferData(gl.ARRAY_BUFFER, defaultHomes, gl.DYNAMIC_DRAW);

    this.vaoA = gl.createVertexArray()!;
    this.vaoB = gl.createVertexArray()!;
    this.tfA = gl.createTransformFeedback()!;
    this.tfB = gl.createTransformFeedback()!;

    this.setupVAO(this.vaoA, this.posA, this.velA);
    this.setupVAO(this.vaoB, this.posB, this.velB);

    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, this.tfA);
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, this.posB);
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 1, this.velB);

    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, this.tfB);
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, this.posA);
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 1, this.velA);
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);

    this.trailFBO = this.createFBO(1024, 512);
  }

  private setupVAO(vao: WebGLVertexArrayObject, pos: WebGLBuffer, vel: WebGLBuffer) {
    const gl = this.gl;
    gl.bindVertexArray(vao);

    gl.bindBuffer(gl.ARRAY_BUFFER, pos);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vel);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.seedBuf);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 1, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.homeBufA);
    gl.enableVertexAttribArray(3);
    gl.vertexAttribPointer(3, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.homeBufB);
    gl.enableVertexAttribArray(4);
    gl.vertexAttribPointer(4, 2, gl.FLOAT, false, 0, 0);

    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  private createFBO(w: number, h: number) {
    const gl = this.gl;
    const tex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const fb = gl.createFramebuffer()!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    return { tex, fb, w, h };
  }

  public setFormations(formA: Float32Array, formB: Float32Array) {
    const gl = this.gl;
    // Only the home buffers are writable here: position/velocity buffers are
    // captured by the transform feedback objects, and CPU-side writes to a
    // captured buffer permanently break capture on some drivers.
    gl.bindBuffer(gl.ARRAY_BUFFER, this.homeBufA);
    gl.bufferData(gl.ARRAY_BUFFER, formA, gl.DYNAMIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.homeBufB);
    gl.bufferData(gl.ARRAY_BUFFER, formB, gl.DYNAMIC_DRAW);
  }

  public setMorph(morph: number) {
    this.morph = Math.max(0, Math.min(1, morph));
  }

  public setCenterOffset(x: number, y: number) {
    this.centerOffset = [x, y];
  }

  public setOpacity(opacity: number) {
    this.opacity = Math.max(0, Math.min(1, opacity));
  }

  public setTheme(theme: ParticleTheme) {
    this.currentTheme = theme;
  }

  public setPointer(xNorm: number, yNorm: number) {
    this.cursor = [xNorm * this.aspect, -yNorm];
  }

  public clearPointer() {
    this.cursor = [999, 999];
  }

  public triggerTap(xNorm: number, yNorm: number) {
    this.shock = 1.0;
    this.shockPos = [xNorm * this.aspect, -yNorm];
  }

  public setScramble(amount: number) {
    this.scramble = Math.max(0, Math.min(1, amount));
  }

  public resize() {
    const gl = this.gl;
    const bounds = this.canvas.getBoundingClientRect();
    this.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.width = Math.max(1, Math.floor(bounds.width * this.dpr));
    this.height = Math.max(1, Math.floor(bounds.height * this.dpr));
    this.aspect = this.width / this.height;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    if (Math.abs(this.trailFBO.w - this.width) > 50 || Math.abs(this.trailFBO.h - this.height) > 50) {
      gl.deleteTexture(this.trailFBO.tex);
      gl.deleteFramebuffer(this.trailFBO.fb);
      this.trailFBO = this.createFBO(this.width, this.height);
    }
  }

  public start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.resize();

    const loop = (now: number) => {
      if (!this.running) return;
      const dt = Math.min((now - this.lastTime) / 1000, 0.05);
      this.lastTime = now;
      this.time += dt;

      this.step(dt);
      this.render();

      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  public stop() {
    this.running = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  private step(dt: number) {
    const gl = this.gl;
    const theme = this.currentTheme;

    this.shock = Math.max(0, this.shock - dt * 2.5);

    gl.useProgram(this.pSim.p);
    gl.uniform1f(this.pSim.u.u_dt, dt);
    gl.uniform1f(this.pSim.u.u_time, this.time);
    gl.uniform1f(this.pSim.u.u_morph, this.morph);
    gl.uniform1f(this.pSim.u.u_spring, theme.spring);
    gl.uniform1f(this.pSim.u.u_turb, theme.turb);
    gl.uniform1f(this.pSim.u.u_push, theme.push);
    gl.uniform1f(this.pSim.u.u_swirl, theme.swirl);
    gl.uniform1f(this.pSim.u.u_cursorR, theme.cursorR * this.aspect);
    gl.uniform1f(this.pSim.u.u_shock, this.shock);
    gl.uniform1f(this.pSim.u.u_scramble, this.scramble);
    gl.uniform1f(this.pSim.u.u_aspect, this.aspect);
    gl.uniform2f(this.pSim.u.u_cursor, this.cursor[0], this.cursor[1]);
    gl.uniform2f(this.pSim.u.u_shockPos, this.shockPos[0], this.shockPos[1]);
    gl.uniform2f(this.pSim.u.u_centerOffset, this.centerOffset[0], this.centerOffset[1]);

    gl.bindVertexArray(this.swap ? this.vaoB : this.vaoA);
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, this.swap ? this.tfB : this.tfA);

    gl.enable(gl.RASTERIZER_DISCARD);
    gl.beginTransformFeedback(gl.POINTS);
    gl.drawArrays(gl.POINTS, 0, this.count);
    gl.endTransformFeedback();
    gl.disable(gl.RASTERIZER_DISCARD);

    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
    gl.bindVertexArray(null);

    this.swap = !this.swap;
  }

  private render() {
    const gl = this.gl;
    const theme = this.currentTheme;

    gl.bindFramebuffer(gl.FRAMEBUFFER, this.trailFBO.fb);
    gl.viewport(0, 0, this.trailFBO.w, this.trailFBO.h);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.useProgram(this.pFlat.p);
    gl.uniform4f(this.pFlat.u.u_color, 0.0, 0.0, 0.0, 0.28);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    gl.blendFunc(gl.ONE, gl.ONE);

    gl.useProgram(this.pPts.p);
    gl.uniform1f(this.pPts.u.u_aspect, this.aspect);
    gl.uniform1f(this.pPts.u.u_px, this.dpr);
    gl.uniform1f(this.pPts.u.u_opacity, this.opacity);
    gl.uniform1f(this.pPts.u.u_morph, this.morph);
    gl.uniform3f(this.pPts.u.u_colA, theme.colA[0], theme.colA[1], theme.colA[2]);
    gl.uniform3f(this.pPts.u.u_colB, theme.colB[0], theme.colB[1], theme.colB[2]);

    gl.bindVertexArray(this.swap ? this.vaoA : this.vaoB);
    gl.drawArrays(gl.POINTS, 0, this.count);
    gl.bindVertexArray(null);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, this.width, this.height);
    gl.disable(gl.BLEND);

    gl.useProgram(this.pComp.p);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.trailFBO.tex);
    gl.uniform1i(this.pComp.u.u_trail, 0);
    gl.uniform1f(this.pComp.u.u_time, this.time);
    gl.uniform1f(this.pComp.u.u_aspect, this.aspect);
    gl.uniform1f(this.pComp.u.u_bloomAmt, theme.bloom);
    gl.uniform1f(this.pComp.u.u_opacity, this.opacity);
    gl.uniform3f(this.pComp.u.u_bg, theme.bg[0], theme.bg[1], theme.bg[2]);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  public destroy() {
    this.stop();
    const gl = this.gl;
    gl.deleteBuffer(this.posA);
    gl.deleteBuffer(this.posB);
    gl.deleteBuffer(this.velA);
    gl.deleteBuffer(this.velB);
    gl.deleteBuffer(this.seedBuf);
    gl.deleteBuffer(this.homeBufA);
    gl.deleteBuffer(this.homeBufB);
    gl.deleteVertexArray(this.vaoA);
    gl.deleteVertexArray(this.vaoB);
    gl.deleteTransformFeedback(this.tfA);
    gl.deleteTransformFeedback(this.tfB);
    gl.deleteTexture(this.trailFBO.tex);
    gl.deleteFramebuffer(this.trailFBO.fb);
    gl.deleteProgram(this.pSim.p);
    gl.deleteProgram(this.pPts.p);
    gl.deleteProgram(this.pFlat.p);
    gl.deleteProgram(this.pComp.p);
  }
}
