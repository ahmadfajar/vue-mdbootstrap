import { chunk } from './StringHelper';

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
export function hslaToHsva(color: HSLA): HSVA {
    const s = (color.s >= 0 && color.s <= 1) ? color.s : color.s / 100;
    const l = (color.l >= 0 && color.l <= 1) ? color.l : color.l / 100;

    const value = l + s * Math.min(l, 1 - l);
    const saturation = value === 0 ? 0 : 2 - (2 * l / value);

    return {
        h: color.h,
        s: saturation * 100,
        v: value * 100,
        a: color.a
    }
}

/**
 * Convert HSVA to HSLA.
 *
 * @param color The HSV color values.
 * @return The HSL color values.
 */
export function hsvaToHsla(color: HSVA) {
    const value = color.v / 100;
    const lightness = value * (1 - (color.s / 100) / 2);
    let saturation: number | undefined;

    if (lightness > 0 && lightness < 1) {
        saturation = Math.round((value - lightness) / Math.min(lightness, 1 - lightness) * 100);
    }

    return {
        h: color.h,
        s: saturation || 0,
        l: Math.round(lightness * 100),
        a: color.a
    };
}

/**
 * Convert HSVA to RGBA.
 *
 * @param color The HSVA color values.
 * @return The RGBA color values.
 */
export function hsvaToRgba(color: HSVA) {
    const saturation = color.s / 100;
    const value = color.v / 100;
    const hueBy60 = color.h / 60;
    let chroma = saturation * value;
    let x = chroma * (1 - Math.abs(hueBy60 % 2 - 1));
    const m = value - chroma;

    chroma = (chroma + m);
    x = (x + m);

    const index = Math.floor(hueBy60) % 6;
    const red = [chroma, x, m, m, x, chroma][index];
    const green = [x, chroma, chroma, x, m, m][index];
    const blue = [m, m, x, chroma, chroma, x][index];

    return {
        r: Math.round(red * 255),
        g: Math.round(green * 255),
        b: Math.round(blue * 255),
        a: color.a
    };
}

/**
 * Convert CSS HEX color format to RGBA color.
 *
 * @param color The css HEX color value.
 * @return The RGBA color values.
 */
export function hexToRgba(color: string): RGBA {
    const hexColor = color.replace('#', '');
    // console.info('hexColor:', hexColor)
    // const r = parseInt(hexColor.substring(0, 2), 16);
    // const g = parseInt(hexColor.substring(2, 4), 16);
    // const b = parseInt(hexColor.substring(4, 6), 16);
    // const a = hexColor.length > 6 ? parseInt(hexColor.substring(6, 2), 16) : undefined;

    const [r, g, b, a] = chunk(hexColor, 2).map((c: string) => parseInt(c, 16));
    const a1 = a === undefined ? 1 : Math.round((a / 255) * 100) / 100;

    return {r, g, b, a: a1}
}

/**
 * Convert RGBA to HSVA.
 *
 * @param color The RGBA color values.
 * @return The HSVA color values.
 */
export function rgbaToHsva(color: RGBA) {
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
            hue = ((green - blue) / chroma);
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
        a: color.a
    };
}

/**
 * Parse a string to RGBA.
 *
 * @param canvasCtx  The canvas rendering context
 * @param source     String representing a color.
 * @return The RGBA color values.
 */
export function rgbaFromString(canvasCtx: CanvasRenderingContext2D, source: string): RGBA {
    const regex = /^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i;
    let rgba: RGBA = {r: 0, g: 0, b: 0, a: 1};

    // Default to black for invalid color strings
    canvasCtx.fillStyle = '#000';

    // Use canvas to convert the string to a valid color string
    canvasCtx.fillStyle = source;
    const match = regex.exec(canvasCtx.fillStyle);

    if (match) {
        rgba = {
            r: parseInt(match[3]),
            g: parseInt(match[4]),
            b: parseInt(match[5]),
            a: parseFloat(match[6])
        };

        // Workaround to mitigate a Chromium bug where the alpha value is rounded incorrectly
        rgba.a = +rgba.a.toFixed(2);
    } else {
        const match1 = canvasCtx.fillStyle
            .replace('#', '')
            .match(/.{2}/g)?.map(h => parseInt(h, 16));

        if (match1) {
            rgba = {
                r: match1[0],
                g: match1[1],
                b: match1[2],
                a: 1
            };
        }
    }

    return rgba;
}

/**
 * Convert RGB/RGBA color to CSS HEX color format.
 *
 * @param rgba The RGBA color values.
 * @return CSS Hex color.
 */
export function rgbaToHex(rgba: RGBA): string {
    let R = rgba.r.toString(16);
    let G = rgba.g.toString(16);
    let B = rgba.b.toString(16);
    let A = '';

    if (rgba.r < 16) {
        R = '0' + R;
    }

    if (rgba.g < 16) {
        G = '0' + G;
    }

    if (rgba.b < 16) {
        B = '0' + B;
    }

    if (rgba.a < 1) {
        const alpha = rgba.a * 255 | 0;
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
 * @param rgba The RGBA color values.
 * @return CSS color string.
 */
export function rgbaToString(rgba: RGBA): string {
    if (rgba.a < 1) {
        return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
    } else {
        return `rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`;
    }
}

/**
 * Convert HSL/HSLA color to string.
 *
 * @param hsla  The HSLA color values.
 * @return CSS color string.
 */
export function hslaToString(hsla: HSLA): string {
    if (hsla.a < 1) {
        return `hsla(${hsla.h}, ${hsla.s}%, ${hsla.l}%, ${hsla.a})`;
    } else {
        return `hsl(${hsla.h}, ${hsla.s}%, ${hsla.l}%)`;
    }
}

/**
 * Get brightness level from RGBA color.
 *
 * @param rgba The RGBA color values.
 * @return The brightness level.
 */
export function brightnessLevel(rgba: RGBA): number {
    return ((rgba.r * 299) + (rgba.g * 587) + (rgba.b * 114)) / 1000;
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
    } else if (typeof color === 'object' && Object.keys(color).length > 2 &&
        Object.keys(color).every(it => ['r', 'g', 'b', 'a'].includes(it))) {
        hex = rgbaToHex(color).replace('#', '');
    } else {
        return color.toString();
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
