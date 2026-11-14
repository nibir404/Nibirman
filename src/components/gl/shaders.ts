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

// cover-fit a texture of aspect texA into the canvas; uFocus = which point of the photo stays in frame
uniform vec2 uFocus;
vec2 cover(vec2 uv, float texA){
  float canA = uRes.x / uRes.y;
  vec2 s = canA > texA ? vec2(1.0, texA / canA) : vec2(canA / texA, 1.0);
  vec2 c = clamp(uFocus, s * 0.5, 1.0 - s * 0.5);
  return (uv - 0.5) * s + c;
}

// tone curve for real photos: lift shadows a touch, keep contrast
float tone(float l){ return smoothstep(0.03, 0.92, pow(l, 0.85)); }

// engraved line-screen: parallel lines that thicken in the shadows (copper-plate look)
vec3 engraveCol(float l, vec2 px){
  float wob = sin(px.y * 0.045) * 2.0 + sin(px.x * 0.013) * 3.0;
  float d = fract((px.x * 0.28 + px.y * 0.96 + wob) / 4.2);   // ~4px pitch, steep angle
  float w = (1.0 - l) * 0.95;                                    // line width from darkness
  float a = smoothstep(w + 0.12, w - 0.12, abs(d - 0.5) * 2.0);
  return mix(uPaper, uInk, a);
}`;

/**
 * Machine passes on one photo. Everything ends as a cobalt engraving (no colour photos on the site).
 * uMode: 0 = pixelate, 1 = Bayer dither, 2 = ASCII, 3 = resolve (ASCII → dither → engraving), 4 = engraving
 * uProgress: 0 → the machine pass, 1 → the engraving
 */
export const machineFrag = /* glsl */ `
${common}
uniform sampler2D uTex;
uniform sampler2D uAtlas;   // 10 glyphs in a row: " .:-=+*#%@"
uniform float uTexA;
uniform float uMode;
uniform float uProgress;
uniform float uCell;        // pixel cell (mode 0) in px

float lumAt(vec2 uv){ return tone(luma(texture2D(uTex, cover(uv, uTexA)).rgb)); }

vec3 engrave(vec2 uv){ return engraveCol(lumAt(uv), uv * uRes); }

vec3 pixelate(vec2 uv, float cell){
  vec2 px = uv * uRes;
  vec2 q = (floor(px / cell) + 0.5) * cell / uRes;
  return mix(uInk, uPaper, lumAt(q));
}

vec3 dither(vec2 uv){
  vec2 px = floor(uv * uRes / 3.0);                 // 3px dither dots
  float l = lumAt((px + 0.5) * 3.0 / uRes);
  return l > bayer4(px) ? uPaper : uInk;
}

vec3 ascii(vec2 uv){
  vec2 cell = vec2(8.0, 14.0);
  vec2 px = uv * uRes;
  vec2 id = floor(px / cell);
  float l = lumAt((id + 0.5) * cell / uRes);
  float g = floor((1.0 - l) * 9.99);                // dark → dense glyph
  vec2 f = fract(px / cell);
  float m = texture2D(uAtlas, vec2((g + f.x) / 10.0, f.y)).r;
  return mix(uPaper, uInk, m);
}

void main(){
  vec2 uv = vUv;
  vec3 eng = engrave(uv);
  vec3 col;
  if (uMode < 0.5) {
    float cell = mix(uCell, 1.0, uProgress);
    col = cell > 1.5 ? pixelate(uv, cell) : eng;
  } else if (uMode < 1.5) {
    col = mix(dither(uv), eng, smoothstep(0.0, 1.0, uProgress));
  } else if (uMode < 2.5) {
    col = mix(ascii(uv), eng, smoothstep(0.0, 1.0, uProgress));
  } else if (uMode < 3.5) {
    float a = smoothstep(0.30, 0.42, uProgress);
    float b = smoothstep(0.70, 0.95, uProgress);
    col = mix(mix(ascii(uv), dither(uv), a), eng, b);
  } else {
    col = eng;
  }
  gl_FragColor = vec4(col, 1.0);
}`;

/**
 * Hero: one photo, split by a draggable seam — Bayer dither on the left, engraving on the right,
 * a hairline between (exactly the cobalt print from the design).
 */
export const seamFrag = /* glsl */ `
${common}
uniform sampler2D uTex;
uniform float uTexA;
uniform float uSeam;
uniform float uTime;

void main(){
  vec2 uv = vUv;
  vec2 px = uv * uRes;
  float x = px.x, s = uSeam * uRes.x;
  vec3 col;
  if (x < s) {
    vec2 c = floor(px / 3.0);
    float l = tone(luma(texture2D(uTex, cover((c + 0.5) * 3.0 / uRes, uTexA)).rgb));
    col = l > bayer4(c) ? uPaper : uInk;
  } else {
    col = engraveCol(tone(luma(texture2D(uTex, cover(uv, uTexA)).rgb)), px);
  }
  col = mix(uInk, col, smoothstep(0.0, 1.4, abs(x - s)));
  gl_FragColor = vec4(col, 1.0);
}`;
