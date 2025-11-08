import Helper from '@/utils/Helper.ts';
import { chunk } from '@/utils/StringHelper.ts';
import type { HSLA, HSVA, LCHA, RGBA } from '@/utils/types/colorUtils';

/**
 * Convert HSL to HSV color space.
 *
 * @param color The HSLA color value.
 * @return The HSVA color value.
 */
export function hslaToHsva(color: HSLA): HSVA {
  const sat = color.s >= 0 && color.s <= 1 ? color.s : color.s / 100;
  const light = color.l >= 0 && color.l <= 1 ? color.l : color.l / 100;

  const value = light + sat * Math.min(light, 1 - light);
  const saturation = value === 0 ? 0 : 2 - (2 * light) / value;

  return {
    h: color.h,
    s: saturation * 100,
    v: value * 100,
    a: color.a,
  };
}

/**
 * Convert HSL to sRGB color space.
 *
 * @param color The HSLA color value.
 * @return The RGBA color value.
 */
export function hslaToRgba(color: HSLA): RGBA {
  const hsva = hslaToHsva(color);

  return hsvaToRgba(hsva);
}

/**
 * Convert HSV to HSL color space.
 *
 * @param color The HSV color value.
 * @return The HSL color value.
 * `Hue` as degrees [0..360], `Saturation` and `Lightness` in reference range [0..100]
 */
export function hsvaToHsla(color: HSVA): HSLA {
  const value = color.v / 100;
  const lightness = value * (1 - color.s / 100 / 2);
  let saturation: number | undefined;

  if (lightness > 0 && lightness < 1) {
    saturation = Math.round(((value - lightness) / Math.min(lightness, 1 - lightness)) * 100);
  }

  return {
    h: color.h,
    s: saturation || 0,
    l: Math.round(lightness * 100),
    a: color.a,
  };
}

/**
 * Convert HSV to sRGB color space.
 *
 * @param color The HSVA color value.
 * @return The RGBA color value.
 */
export function hsvaToRgba(color: HSVA): RGBA {
  const saturation = color.s / 100;
  const value = color.v / 100;
  const hueBy60 = color.h / 60;
  let chroma = saturation * value;
  let x = chroma * (1 - Math.abs((hueBy60 % 2) - 1));
  const m = value - chroma;

  chroma = chroma + m;
  x = x + m;

  const index = Math.floor(hueBy60) % 6;
  const red = [chroma, x, m, m, x, chroma][index]!;
  const green = [x, chroma, chroma, x, m, m][index]!;
  const blue = [m, m, x, chroma, chroma, x][index]!;

  return {
    r: Math.round(red * 255),
    g: Math.round(green * 255),
    b: Math.round(blue * 255),
    a: color.a,
  };
}

/**
 * Convert CSS HEX color format to sRGB color space.
 *
 * @param color The css HEX color value.
 * @return The RGBA color value.
 */
export function hexToRgba(color: string): RGBA {
  const hexColor = color.replace('#', '');

  const [r, g, b, a] = chunk(hexColor, 2).map((c: string) => parseInt(c, 16));
  const a1 = a == null ? 1 : Math.round((a / 255) * 100) / 100;

  return { r: r!, g: g!, b: b!, a: a1 };
}

/**
 * Convert sRGB to HSL color space.
 *
 * @param color The RGBA color value
 * @return The HSL color value.
 * Hue as degrees [0..360], Saturation and Lightness as range [0..100]
 */
export function rgbaToHsla(color: RGBA): HSLA {
  const hsva = rgbaToHsva(color);
  return hsvaToHsla(hsva);
}

/**
 * Convert sRGB to HSV color space.
 *
 * @param color The RGBA color value.
 * @return The HSVA color value.
 */
export function rgbaToHsva(color: RGBA): HSVA {
  const red = color.r / 255;
  const green = color.g / 255;
  const blue = color.b / 255;
  const xMax = Math.max(red, green, blue);
  const xMin = Math.min(red, green, blue);
  const chroma = xMax - xMin;
  const value = xMax;
  let hue = 0;
  let saturation = 0;

  if (chroma) {
    if (xMax === red) {
      hue = (green - blue) / chroma;
    }
    if (xMax === green) {
      hue = 2 + (blue - red) / chroma;
    }
    if (xMax === blue) {
      hue = 4 + (red - green) / chroma;
    }
    if (xMax) {
      saturation = chroma / xMax;
    }
  }

  hue = Math.floor(hue * 60);

  return {
    h: hue < 0 ? hue + 360 : hue,
    s: Math.round(saturation * 100),
    v: Math.round(value * 100),
    a: color.a,
  };
}

/**
 * Convert OKLCH value to OKLAB value.
 */
function oklchToOklab([L, C, H]: [number, number, number]): [number, number, number] {
  const hRad = (H * Math.PI) / 180;

  return [L, C * Math.cos(hRad), C * Math.sin(hRad)];
}

/**
 * Convert OKLAB value to LMS value.
 */
function oklabToLms([L, a, b]: [number, number, number]): [number, number, number] {
  const lmsPrime = [
    L + 0.3963377774 * a + 0.2158037573 * b,
    L - 0.1055613458 * a - 0.0638541728 * b,
    L - 0.0894841775 * a - 1.291485548 * b,
  ];

  // Convert back from cube root
  return lmsPrime.map((v) => v ** 3) as [number, number, number];
}

/**
 * Convert LMS value to Linear sRGB value.
 */
function lmsToLinearRgb([l, m, s]: [number, number, number]): [number, number, number] {
  return [
    l * 4.0767416621 - m * 3.3077115913 + s * 0.2309699292,
    l * -1.2684380046 + m * 2.6097574011 - s * 0.3413193965,
    l * -0.0041960863 - m * 0.7034186147 + s * 1.707614701,
  ];
}

/**
 * Convert Linear sRGB value to RGB value.
 */
function linearRgbToRgb(rgb: [number, number, number]): [number, number, number] {
  return rgb.map((v) => {
    v = v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;

    return Math.round(Math.max(0, Math.min(1, v)) * 255);
  }) as [number, number, number];
}

/**
 * Convert OKLCH to sRGB color space.
 *
 * @param color The OKLCH color value.
 * @return The RGBA color value.
 */
export function oklchToRgba(color: LCHA): RGBA {
  const oklab = oklchToOklab([color.l, color.c, color.h]);
  const lms = oklabToLms(oklab);
  const linearRgb = lmsToLinearRgb(lms);
  const result = linearRgbToRgb(linearRgb);

  return {
    r: result[0],
    g: result[1],
    b: result[2],
    a: color.a,
  };
}

/**
 * Convert sRGB value to Linear RGB value.
 */
function rgbToLinear([r, g, b]: [number, number, number]): [number, number, number] {
  const gammaCorrection = (v: number) => {
    v /= 255;

    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };

  return [gammaCorrection(r), gammaCorrection(g), gammaCorrection(b)];
}

/**
 * Convert Linear sRGB value to LMS value.
 */
function linearRgbToLms([r, g, b]: [number, number, number]): [number, number, number] {
  return [
    r * 0.412165612 + g * 0.536275208 + b * 0.0514575653,
    r * 0.211859107 + g * 0.6807189584 + b * 0.107406579,
    r * 0.0883097947 + g * 0.2818474174 + b * 0.6298384131,
  ];
}

/**
 * Convert LMS value to OKLAB value.
 */
function lmsToOklab(lms: [number, number, number]): [number, number, number] {
  const lmsPrime = lms.map((v) => Math.cbrt(v)) as [number, number, number];

  return [
    0.2104542553 * lmsPrime[0] + 0.793617785 * lmsPrime[1] - 0.0040720468 * lmsPrime[2],
    1.9779984951 * lmsPrime[0] - 2.428592205 * lmsPrime[1] + 0.4505937099 * lmsPrime[2],
    0.0259040371 * lmsPrime[0] + 0.7827717662 * lmsPrime[1] - 0.808675766 * lmsPrime[2],
  ];
}

/**
 * Convert OKLAB value to OKLCH value.
 */
function oklabToOklch([L, a, b]: [number, number, number]): [number, number, number] {
  const C = Math.sqrt(a * a + b * b);
  const H = (Math.atan2(b, a) * (180 / Math.PI) + 360) % 360;

  return [
    parseFloat(L.toFixed(5)), // Lightness
    parseFloat(C.toFixed(5)), // Chroma
    parseFloat(H.toFixed(3)), // Hue
  ];
}

/**
 * Convert sRGB to OKLCH color space.
 *
 * @param color The RGBA color value.
 * @return The OKLCH color value.
 * `Lightness` and `Chroma` as number in range [0..1], `Hue` as degrees [0..360]
 */
export function rgbaToOklch(color: RGBA): LCHA {
  const linearRgb = rgbToLinear([color.r, color.g, color.b]);
  const lms = linearRgbToLms(linearRgb);
  const oklab = lmsToOklab(lms);
  const result = oklabToOklch(oklab);

  return {
    l: result[0],
    c: result[1],
    h: result[2],
    a: color.a,
  };
}

/**
 * Parse a string to sRGB color space.
 *
 * @param canvasCtx  The canvas rendering context
 * @param source     String representing a color.
 * @return The RGBA color value.
 */
export function rgbaFromString(canvasCtx: CanvasRenderingContext2D, source: string): RGBA {
  const regex = /^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i;
  let rgba: RGBA = { r: 0, g: 0, b: 0, a: 1 };

  // Default to black for invalid color strings
  canvasCtx.fillStyle = '#000';

  // Use canvas to convert the string to a valid color string
  canvasCtx.fillStyle = source;
  const match = regex.exec(canvasCtx.fillStyle);
  // console.log('Source: ', source);
  // console.log('Match: ', match);

  if (match) {
    rgba = {
      r: parseInt(match[3]!),
      g: parseInt(match[4]!),
      b: parseInt(match[5]!),
      a: parseFloat(match[6]!),
    };

    // Workaround to mitigate a Chromium bug where the alpha value is rounded incorrectly
    rgba.a = +rgba.a.toFixed(2);
  } else {
    const match1 = canvasCtx.fillStyle
      .replace('#', '')
      .match(/.{2}/g)
      ?.map((h) => parseInt(h, 16));

    if (match1) {
      rgba = {
        r: match1[0] as number,
        g: match1[1] as number,
        b: match1[2] as number,
        a: 1,
      };
    }
  }

  return rgba;
}

/**
 * Convert RGB/RGBA color to CSS HEX color format.
 *
 * @param color The RGBA color value.
 * @return CSS Hex color.
 */
export function rgbaToHex(color: RGBA): string {
  let R = color.r.toString(16);
  let G = color.g.toString(16);
  let B = color.b.toString(16);
  let A = '';

  if (color.r < 16) {
    R = '0' + R;
  }

  if (color.g < 16) {
    G = '0' + G;
  }

  if (color.b < 16) {
    B = '0' + B;
  }

  if (color.a < 1) {
    const alpha = (color.a * 255) | 0;
    A = alpha.toString(16);

    if (alpha < 16) {
      A = '0' + A;
    }
  }

  return '#' + (R + G + B + A).toUpperCase();
}

/**
 * Convert RGB/RGBA color to string.
 *
 * @param color The RGBA color value.
 * @return CSS color string.
 */
export function rgbaToString(color: RGBA): string {
  if (color.a < 1) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
  } else {
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
  }
}

/**
 * Convert HSL/HSLA color to string.
 *
 * @param color  The HSLA color value.
 * @return CSS color string.
 */
export function hslaToString(color: HSLA): string {
  if (color.a < 1) {
    return `hsla(${color.h}, ${Math.round(color.s * 100)}%, ${Math.round(color.l * 100)}%, ${color.a})`;
  } else {
    return `hsl(${color.h}, ${Math.round(color.s * 100)}%, ${Math.round(color.l * 100)}%)`;
  }
}

/**
 * Convert OKLCH color to string.
 *
 * @param color  The OKLCH color value.
 * @return CSS color string.
 */
export function oklchToString(color: LCHA): string {
  const lightness = Helper.roundNumber(color.l, 3);
  const chroma = Helper.roundNumber(color.c, 3);
  const hue = Helper.roundNumber(color.h, 2);

  if (color.a < 1) {
    return `oklch(${lightness} ${chroma} ${hue} / ${color.a.toFixed(2)})`;
  } else {
    return `oklch(${lightness} ${chroma} ${hue})`;
  }
}

/**
 * Parse a string that represent `oklch` color formatted string.
 *
 * @param source The `oklch` color formatted string.
 * @return The OKLCH color value
 * `Lightness`, `Chroma` as number in range [0..1] and `Hue` as degrees [0..360].
 */
export function oklchFromString(source: string): LCHA {
  const temp = source.toLowerCase();

  if (temp.startsWith('oklch')) {
    let result = temp.replace('oklch(', '');
    result = result.replace(')', '');
    result = result.replace('deg', '');

    const rets = result.split(' ') as
      | [string, string, string]
      | [string, string, string, string, string];

    const oklch = { l: 0, c: parseFloat(rets[1]), h: parseFloat(rets[2]), a: 1 };

    if (rets.length > 3) {
      oklch.l = rets[0].endsWith('%') ? parseFloat(rets[0]) / 100 : parseFloat(rets[0]);
    } else {
      oklch.l = rets[0].endsWith('%') ? parseFloat(rets[0]) / 100 : parseFloat(rets[0]);
      oklch.a = parseFloat(rets[4]!);
    }

    return oklch;
  }

  // fallback if source is not recognized
  return { l: 0, c: 0, h: 0, a: 1 };
}

/**
 * Get Lightness level from `RGBA`, `HSLA` or `OKLCH` color object.
 *
 * @param color The `RGBA`, `HSLA` or `OKLCH` color value.
 * @return The Lightness level in range [1..100].
 */
export function lightnessLevel(color: RGBA | HSLA | LCHA): number {
  const lightness = (value: LCHA) => {
    if (value.l <= 1.0) {
      return value.l * 100;
    }

    return value.l;
  };

  if (typeof color === 'object' && Object.keys(color).length > 2) {
    if (Object.keys(color).every((it) => ['r', 'g', 'b', 'a'].includes(it))) {
      const oklch = rgbaToOklch(color as RGBA);

      return lightness(oklch);
    } else if (Object.keys(color).every((it) => ['h', 's', 'l', 'a'].includes(it))) {
      const rgb = hslaToRgba(color as HSLA);
      const oklch = rgbaToOklch(rgb);

      return lightness(oklch);
    } else if (Object.keys(color).every((it) => ['l', 'c', 'h', 'a'].includes(it))) {
      return lightness(color as LCHA);
    }
  }

  // fallback to zero if object is not recognized
  console.warn('Input argument "color" is invalid.');
  return 0;
}

/**
 * Get Brightness level from RGBA color.
 *
 * @param color The RGBA color value or HEX color formatted string.
 * @return The brightness level in range [1..255].
 */
export function brightnessLevel(color: string | RGBA): number {
  if (Helper.isString(color)) {
    color = hexToRgba(color);
  }

  return (color.r * 299 + color.g * 587 + color.b * 114) / 1000;
}

/**
 * Darken or lighten the input color.
 *
 * Use negative `lightness` value to darken the input color or otherwise
 * to lighten the input color.
 *
 * @param color      The color to darken/lighten.
 * @param lightness  The lightness level.
 * @return The color result in CSS HEX color format.
 */
export function shadeColor(color: string | RGBA, lightness: number): string {
  let hex;

  if (typeof color === 'string' && color.length >= 6) {
    hex = color.replace('#', '');
  } else if (
    typeof color === 'object' &&
    Object.keys(color).length > 2 &&
    Object.keys(color).every((it) => ['r', 'g', 'b', 'a'].includes(it))
  ) {
    hex = rgbaToHex(color).replace('#', '');
  } else {
    return JSON.stringify(color);
  }

  const decimalColor = parseInt(hex, 16);
  let r = (decimalColor >> 16) + lightness;
  r > 255 && (r = 255);
  r < 0 && (r = 0);
  let g = (decimalColor & 0x0000ff) + lightness;
  g > 255 && (g = 255);
  g < 0 && (g = 0);
  let b = ((decimalColor >> 8) & 0x00ff) + lightness;
  b > 255 && (b = 255);
  b < 0 && (b = 0);
  const str = (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');

  return `#${str}`;
}
