/**
 * Hue, Saturation, Value and Alpha color values.
 */
export declare type HSVA = {
  h: number;
  s: number;
  v: number;
  a: number;
};

/**
 * Hue, Saturation, Lightness and Alpha color values.
 */
export declare type HSLA = {
  h: number;
  s: number;
  l: number;
  a: number;
};

/**
 * Lightness, Chroma, Hue and Alpha color values.
 */
export declare type LCHA = {
  l: number;
  c: number;
  h: number;
  a: number;
};

/**
 * Red, Green, Blue and Alpha color values.
 */
export declare type RGBA = {
  r: number;
  g: number;
  b: number;
  a: number;
};

/**
 * Convert HSL to HSV color space.
 *
 * @param color The HSLA color value.
 * @return The HSVA color value.
 */
export declare function hslaToHsva(color: HSLA): HSVA;

/**
 * Convert HSL to sRGB color space.
 *
 * @param color The HSLA color value.
 * @return The RGBA color value.
 * `Red`, `Green`, and `Blue` as number in range [0..255],
 * and `Alpha` as number in range [0..1].
 */
export function hslaToRgba(color: HSLA): RGBA;

/**
 * Convert HSV to HSL color space.
 *
 * @param color The HSV color value.
 * @return The HSL color value.
 * `Hue` as degrees [0..360], `Saturation` and `Lightness` in reference range [0..100].
 */
export declare function hsvaToHsla(color: HSVA): HSLA;

/**
 * Convert HSV to sRGB color space.
 *
 * @param color The HSVA color value.
 * @return The RGBA color value.
 * `Red`, `Green`, and `Blue` as number in range [0..255],
 * and `Alpha` as number in range [0..1].
 */
export declare function hsvaToRgba(color: HSVA): RGBA;

/**
 * Convert CSS HEX color format to sRGB color space.
 *
 * @param color The css HEX color value.
 * @return The RGBA color value.
 * `Red`, `Green`, and `Blue` as number in range [0..255],
 * and `Alpha` as number in range [0..1].
 */
export declare function hexToRgba(color: string): RGBA;

/**
 * Convert OKLCH to sRGB color space.
 *
 * @param color The OKLCH color value.
 * @return The RGBA color value.
 * `Red`, `Green`, and `Blue` as number in range [0..255],
 * and `Alpha` as number in range [0..1].
 */
export declare function oklchToRgba(color: LCHA): RGBA;

/**
 * Convert sRGB to HSL color space.
 *
 * @param color The RGBA color value
 * @return The HSL color value.
 * `Hue` as degrees [0..360], `Saturation` and `Lightness` as range [0..100].
 */
export function rgbaToHsla(color: RGBA): HSLA;

/**
 * Convert sRGB to HSV color space.
 *
 * @param color The RGBA color value.
 * @return The HSVA color value.
 */
export declare function rgbaToHsva(color: RGBA): HSVA;

/**
 * Convert sRGB to OKLCH color space.
 *
 * @param color The RGBA color value.
 * @return The OKLCH color value.
 * `Lightness` and `Chroma` as number in range [0..1], `Hue` as degrees [0..360].
 */
export declare function rgbaToOklch(color: RGBA): LCHA;

/**
 * Parse a string to sRGB color space.
 *
 * @param canvasCtx  The canvas rendering context
 * @param source     String representing a color.
 * @return The RGBA color value.
 * `Red`, `Green`, and `Blue` as number in range [0..255],
 * and `Alpha` as number in range [0..1].
 */
export declare function rgbaFromString(canvasCtx: CanvasRenderingContext2D, source: string): RGBA;

/**
 * Convert RGB/RGBA color to CSS HEX color format.
 *
 * @param color The RGBA value.
 *              `Red`, `Green`, `Blue` as number in range [0..255],
 *              and `Alpha` as number in range [0..1].
 * @return CSS Hex color.
 */
export declare function rgbaToHex(color: RGBA): string;

/**
 * Convert RGB/RGBA color to string.
 *
 * @param color The RGBA value.
 *              `Red`, `Green`, `Blue` as number in range [0..255],
 *              and `Alpha` as number in range [0..1].
 * @return CSS color string.
 */
export declare function rgbaToString(color: RGBA): string;

/**
 * Convert HSL/HSLA color to string.
 *
 * @param color  The HSLA value.
 *               `Hue` as degrees [0..360] and `Saturation`, `Lightness` as number in range [0..1].
 * @return CSS color string.
 */
export declare function hslaToString(color: HSLA): string;

/**
 * Convert OKLCH color to string.
 *
 * @param color  The OKLCH value.
 *               `Lightness`, `Chroma` as number in range [0..1] and `Hue` as degrees [0..360].
 * @return CSS color string.
 */
export declare function oklchToString(color: LCHA): string;

/**
 * Parse a string that represent `oklch` color formatted string.
 *
 * @param source The `oklch` color formatted string.
 * @return The OKLCH color value
 * `Lightness`, `Chroma` as number in range [0..1] and `Hue` as degrees [0..360].
 */
export declare function oklchFromString(source: string): LCHA;

/**
 * Get Lightness level from `RGBA`, `HSLA` or `OKLCH` color object.
 *
 * @param color The `RGBA`, `HSLA` or `OKLCH` color value.
 * @return The Lightness level in range [1..100].
 */
export function lightnessLevel(color: RGBA | HSLA | LCHA): number;

/**
 * Get brightness level from RGBA color.
 *
 * @param color The RGBA color value or HEX color formatted string.
 * @return The brightness level in range [1..255].
 */
export declare function brightnessLevel(color: string | RGBA): number;

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
export declare function shadeColor(color: string | RGBA, lightness: number): string;
