/**
 * Hue, Saturation, Value and Alpha color values.
 */
export declare type THsva = {
    h: number;
    s: number;
    v: number;
    a: number;
};

/**
 * Hue, Saturation, Lightness and Alpha color values.
 */
export declare type THsla = {
    h: number;
    s: number;
    l: number;
    a: number;
};

/**
 * Red, Green, Blue and Alpha color values.
 */
export declare type TRgba = {
    r: number;
    g: number;
    b: number;
    a: number;
};

export declare type TColors = THsva & TRgba;

/**
 * Convert HSVA to HSLA.
 *
 * @param {THsva} hsva The HSVA color values.
 * @return {THsla} The HSLA color values.
 */
export function hsvaToHsla(hsva: THsva) {
    const value = hsva.v / 100;
    const lightness = value * (1 - (hsva.s / 100) / 2);
    let saturation: number | undefined;

    if (lightness > 0 && lightness < 1) {
        saturation = Math.round((value - lightness) / Math.min(lightness, 1 - lightness) * 100);
    }

    return {
        h: hsva.h,
        s: saturation || 0,
        l: Math.round(lightness * 100),
        a: hsva.a
    };
}

/**
 * Convert HSVA to RGBA.
 *
 * @param {THsva} hsva The HSVA color values.
 * @return {TRgba} The RGBA color values.
 */
export function hsvaToRgba(hsva: THsva) {
    const saturation = hsva.s / 100;
    const value = hsva.v / 100;
    const hueBy60 = hsva.h / 60;
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
        a: hsva.a
    };
}

/**
 * Convert RGBA to HSVA.
 *
 * @param {TRgba} rgba The RGBA color values.
 * @return {THsva} The HSVA color values.
 */
export function rgbaToHsva(rgba: TRgba) {
    const red = rgba.r / 255;
    const green = rgba.g / 255;
    const blue = rgba.b / 255;
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
        a: rgba.a
    };
}

/**
 * Parse a string to RGBA.
 *
 * @param {string} str String representing a color.
 * @return {TRgba} The RGBA color values.
 */
/*
function strToRgba(str: string): TRgba {
    const regex = /^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i;
    let match, rgba;

    // Default to black for invalid color strings
    ctx.fillStyle = '#000';

    // Use canvas to convert the string to a valid color string
    ctx.fillStyle = str;
    match = regex.exec(ctx.fillStyle);

    if (match) {
        rgba = {
            r: match[3] * 1,
            g: match[4] * 1,
            b: match[5] * 1,
            a: match[6] * 1
        };

        // Workaround to mitigate a Chromium bug where the alpha value is rounded incorrectly
        rgba.a = +rgba.a.toFixed(2);

    } else {
        match = ctx.fillStyle.replace('#', '').match(/.{2}/g).map(h => parseInt(h, 16));
        rgba = {
            r: match[0],
            g: match[1],
            b: match[2],
            a: 1
        };
    }

    return rgba;
}
*/

/**
 * Convert RGBA color values to Hex string.
 *
 * @param {object} rgba The RGBA color values.
 * @return {string} Hex color string.
 */
export function rgbaToHex(rgba: TRgba): string {
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

    return '#' + R + G + B + A;
}

/**
 * Convert RGB/RGBA color value string.
 *
 * @param {TRgba} rgba The RGBA color values.
 * @return {string} CSS color string.
 */
export function rgbaToString(rgba: TRgba): string {
    if (rgba.a < 1) {
        return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
    } else {
        return `rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`;
    }
}

/**
 * Convert HSL/HSLA color value to string.
 *
 * @param {THsla} hsla  The HSLA color values.
 * @return {string} CSS color string.
 */
export function hslaToString(hsla: THsla): string {
    if (hsla.a < 1) {
        return `hsla(${hsla.h}, ${hsla.s}%, ${hsla.l}%, ${hsla.a})`;
    } else {
        return `hsl(${hsla.h}, ${hsla.s}%, ${hsla.l}%)`;
    }
}
