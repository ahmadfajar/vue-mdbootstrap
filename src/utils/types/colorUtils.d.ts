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
 * Red, Green, Blue and Alpha color values.
 */
export declare type RGBA = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export declare type TColor = HSVA & RGBA;

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
 */
export function hslaToRgba(color: HSLA): RGBA;

/**
 * Convert HSV to HSL color space.
 *
 * @param color The HSV color value.
 * @return The HSL color value: Hue as degrees 0..360, Saturation and Lightness in reference range [0,100]
 */
export declare function hsvaToHsla(color: HSVA): HSLA;

/**
 * Convert HSV to sRGB color space.
 *
 * @param color The HSVA color value.
 * @return The RGBA color value.
 */
export declare function hsvaToRgba(color: HSVA): RGBA;

/**
 * Convert CSS HEX color format to sRGB color space.
 *
 * @param color The css HEX color value.
 * @return The RGBA color value.
 */
export declare function hexToRgba(color: string): RGBA;

/**
 * Convert sRGB to HSL color space.
 *
 * @param color The RGBA color
 * @return The HSL color value.
 * Hue as degrees [0..360], Saturation and Lightness as range [0..100]
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
 * Parse a string to sRGB color space.
 *
 * @param canvasCtx  The canvas rendering context
 * @param source     String representing a color.
 * @return The RGBA color value.
 */
export declare function rgbaFromString(canvasCtx: CanvasRenderingContext2D, source: string): RGBA;

/**
 * Convert RGB/RGBA color to CSS HEX color format.
 *
 * @param rgba The RGBA color value.
 * @return CSS Hex color.
 */
export declare function rgbaToHex(rgba: RGBA): string;

/**
 * Convert RGB/RGBA color to string.
 *
 * @param rgba The RGBA color value.
 * @return CSS color string.
 */
export declare function rgbaToString(rgba: RGBA): string;

/**
 * Convert HSL/HSLA color to string.
 *
 * @param hsla  The HSLA color value.
 * @return CSS color string.
 */
export declare function hslaToString(hsla: HSLA): string;

/**
 * Get brightness level from RGBA color.
 *
 * @param rgba The RGBA color value.
 * @return The brightness level.
 */
export declare function brightnessLevel(rgba: RGBA): number;

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
