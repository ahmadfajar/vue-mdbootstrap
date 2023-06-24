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
 * Convert HSLA to HSVA.
 *
 * @param color The HSLA color values.
 * @return The HSVA color values.
 */
export declare function hslaToHsva(color: HSLA): HSVA;

/**
 * Convert HSVA to HSLA.
 *
 * @param color The HSV color values.
 * @return The HSL color values.
 */
export declare function hsvaToHsla(color: HSVA): {
    h: number;
    s: number;
    l: number;
    a: number;
};

/**
 * Convert HSVA to RGBA.
 *
 * @param color The HSVA color values.
 * @return The RGBA color values.
 */
export declare function hsvaToRgba(color: HSVA): {
    r: number;
    g: number;
    b: number;
    a: number;
};

/**
 * Convert CSS HEX color format to RGBA color.
 *
 * @param color The css HEX color value.
 * @return The RGBA color values.
 */
export declare function hexToRgba(color: string): RGBA;

/**
 * Convert RGBA to HSVA.
 *
 * @param color The RGBA color values.
 * @return The HSVA color values.
 */
export declare function rgbaToHsva(color: RGBA): {
    h: number;
    s: number;
    v: number;
    a: number;
};

/**
 * Parse a string to RGBA.
 *
 * @param canvasCtx  The canvas rendering context
 * @param source     String representing a color.
 * @return The RGBA color values.
 */
export declare function rgbaFromString(canvasCtx: CanvasRenderingContext2D, source: string): RGBA;

/**
 * Convert RGB/RGBA color to CSS HEX color format.
 *
 * @param rgba The RGBA color values.
 * @return CSS Hex color.
 */
export declare function rgbaToHex(rgba: RGBA): string;

/**
 * Convert RGB/RGBA color to string.
 *
 * @param rgba The RGBA color values.
 * @return CSS color string.
 */
export declare function rgbaToString(rgba: RGBA): string;

/**
 * Convert HSL/HSLA color to string.
 *
 * @param hsla  The HSLA color values.
 * @return CSS color string.
 */
export declare function hslaToString(hsla: HSLA): string;

/**
 * Get brightness level from RGBA color.
 *
 * @param rgba The RGBA color values.
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
