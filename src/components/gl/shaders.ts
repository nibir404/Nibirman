// GLSL for "how the machine sees you". All passes share these helpers.

export const vert = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

const common = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform vec2 uRes;      // canvas size in px
uniform vec3 uInk;      // act ink colour
uniform vec3 uPaper;    // act paper colour

float luma(vec3 c){ return dot(c, vec3(0.299, 0.587, 0.114)); }

// ordered 4x4 Bayer threshold, 0..1
float bayer2(vec2 a){ a = floor(a); return fract(dot(a, vec2(0.5, a.y * 0.75))); }
float bayer4(vec2 a){ return bayer2(0.5 * a) * 0.25 + bayer2(a); }

// cover-fit a texture of aspect texA into the canvas
vec2 cover(vec2 uv, float texA){
  float canA = uRes.x / uRes.y;
  vec2 s = canA > texA ? vec2(1.0, texA / canA) : vec2(canA / texA, 1.0);
  return (uv - 0.5) * s + 0.5;
}`;

/**
 * Machine passes on one image.
 * uMode: 0 = pixelate, 1 = Bayer dither, 2 = ASCII, 3 = resolve (ASCII → dither → oil by uProgress)
 * uProgress: 0 → fully "machine", 1 → original oil (for modes 0–2 it blends back to oil)
 */
export const machineFrag = /* glsl */ `
${common}
uniform sampler2D uTex;
uniform sampler2D uAtlas;   // 10 glyphs in a row: " .:-=+*#%@"
uniform float uTexA;
uniform float uMode;
uniform float uProgress;
uniform float uCell;        // pixel cell (mode 0) in px

vec3 oilAt(vec2 uv){
  vec4 c = texture2D(uTex, cover(uv, uTexA));
  return mix(uPaper, c.rgb, c.a);
}

vec3 pixelate(vec2 uv, float cell){
  vec2 px = uv * uRes;
  vec2 q = (floor(px / cell) + 0.5) * cell / uRes;
  return oilAt(q);
}

vec3 dither(vec2 uv){
  vec2 px = floor(uv * uRes / 3.0);                 // 3px dither dots
  vec3 c = oilAt((px + 0.5) * 3.0 / uRes);
  float l = luma(c);
  return l > bayer4(px) ? uPaper : uInk;
}

vec3 ascii(vec2 uv){
  vec2 cell = vec2(8.0, 14.0);
  vec2 px = uv * uRes;
  vec2 id = floor(px / cell);
  vec3 c = oilAt((id + 0.5) * cell / uRes);
  float g = floor((1.0 - luma(c)) * 9.99);          // dark → dense glyph
  vec2 f = fract(px / cell);
  float m = texture2D(uAtlas, vec2((g + f.x) / 10.0, f.y)).r;
  return mix(uPaper, uInk, m);
}

void main(){
  vec2 uv = vUv;
  vec3 oil = oilAt(uv);
  vec3 col;
  if (uMode < 0.5) {
    float cell = mix(uCell, 1.0, uProgress);
    col = pixelate(uv, max(cell, 1.0));
  } else if (uMode < 1.5) {
    col = mix(dither(uv), oil, smoothstep(0.0, 1.0, uProgress));
  } else if (uMode < 2.5) {
    col = mix(ascii(uv), oil, smoothstep(0.0, 1.0, uProgress));
  } else {
    // resolve: 0–.35 ascii, .35–.75 dither, .75–1 oil
    float a = smoothstep(0.30, 0.42, uProgress);
    float b = smoothstep(0.70, 0.95, uProgress);
    col = mix(mix(ascii(uv), dither(uv), a), oil, b);
  }
  gl_FragColor = vec4(col, 1.0);
}`;

/**
 * Hero: oil | dither band | manga ink, split at uSeam (0..1 across the arch).
 * Both figures are the same pose, so the seam lines up perfectly.
 */
export const oilInkFrag = /* glsl */ `
${common}
uniform sampler2D uOil;   // painted figure, transparent bg
uniform sampler2D uInkT;  // manga twin, transparent bg
uniform sampler2D uSky;   // full painting for the soft sky
uniform float uTexA;
uniform float uSeam;
uniform float uBand;      // px
uniform float uTime;

vec3 sky(vec2 uv){
  vec2 s = cover(uv, uTexA);
  vec3 acc = vec3(0.0);
  for (int i = 0; i < 9; i++) {
    vec2 o = vec2(mod(float(i), 3.0) - 1.0, floor(float(i) / 3.0) - 1.0) * 0.018;
    acc += texture2D(uSky, s + o, 3.0).rgb;
  }
  return acc / 9.0;
}

void main(){
  vec2 uv = vUv;
  vec2 tuv = cover(uv, uTexA);
  vec4 o = texture2D(uOil, tuv);
  vec3 oil = mix(sky(uv), o.rgb, o.a);

  vec4 k = texture2D(uInkT, tuv);
  float kl = luma(mix(vec3(1.0), k.rgb, k.a));
  vec3 ink = mix(uInk, uPaper, smoothstep(0.15, 0.85, kl));

  vec2 px = floor(uv * uRes / 3.0);
  vec3 dc = mix(uPaper, o.rgb, o.a);
  vec3 dith = luma(dc) > bayer4(px + floor(uTime * 6.0)) ? uPaper : uInk;

  float x = uv.x * uRes.x;
  float s = uSeam * uRes.x;
  float h = uBand * 0.5;
  vec3 col = x < s - h ? oil : (x > s + h ? ink : dith);
  // hairlines at the band edges
  float edge = min(abs(x - (s - h)), abs(x - (s + h)));
  col = mix(uInk, col, smoothstep(0.0, 1.2, edge));
  gl_FragColor = vec4(col, 1.0);
}`;
