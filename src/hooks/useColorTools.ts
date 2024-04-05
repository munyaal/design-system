import {useCallback} from "react";
import {HSL, Palette} from "@/utils/types";

export const useColorTools = () => {
    /**
     * Transforma un color de HSL a Hexadecimal
     * @param {HSL} hsl - Color en formato HSL
     * @returns {string} - Color en formato Hexadecimal
     * */
    const convertHSLToHex = useCallback((hsl: HSL): string => {
        const {h, s, l} = hsl;

        const hDecimal = l / 100;

        const a = (s * Math.min(hDecimal, 1 - hDecimal)) / 100;

        const f = (n: number) => {
            const k = (n + h / 30) % 12;

            const color = hDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

            return Math.round(255 * color).toString(16).padStart(2, "0");
        };

        return `#${f(0)}${f(8)}${f(4)}`;
    }, []);

    /**
     * Transforma un color de Hexadecimal a HSL
     * @param {string} hex - Color en formato Hexadecimal
     * @returns {string} - Color en formato HSL
     * */
    const convertHexToHsl = useCallback((hex: string): HSL => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        if (!result) {
            throw new Error("Could not parse Hex Color");
        }

        const rHex = parseInt(result[1], 16);
        const gHex = parseInt(result[2], 16);
        const bHex = parseInt(result[3], 16);

        const r = rHex / 255;
        const g = gHex / 255;
        const b = bHex / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);

        let h = (max + min) / 2;
        let s = h;
        let l = h;

        if (max === min) {
            // Achromatic
            return {h: 0, s: 0, l};
        }

        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;

        s = s * 100;
        s = Math.round(s);
        l = l * 100;
        l = Math.round(l);
        h = Math.round(360 * h);

        return {h, s, l};
    }, []);

    /**
     * Ajusta el color principal HSL a una paleta de saturación y brillo
     * @param {HSL} hsl - Color en formato HSL
     * @param {number} saturation - Saturación
     * @param {number} lightness - luminosidad
     * @returns {HSL} - Color en formato HSL
     */
    const adjustHSL = useCallback((hsl: HSL, saturation: number, lightness: number): HSL => {
        const {h, s, l} = hsl;

        const adjustedSaturation = Math.max(0, Math.min(100, s + saturation));

        const adjustedLightness = Math.max(0, Math.min(100, lightness));

        return {
            h,
            s: adjustedSaturation,
            l: adjustedLightness
        };
    }, []);

    /**
     * Crear una paleta de colores de acuerdo a un color en Hexadecimal
     * @param {string} hex - Color en formato Hexadecimal
     * @returns {Palette} - Paleta de colores
     * */
    const createPalette = useCallback((hex: string): Palette => {
        const hslColor: HSL = convertHexToHsl(hex);

        return {
            10: convertHSLToHex(adjustHSL(hslColor, -1,10)),
            20: convertHSLToHex(adjustHSL(hslColor, -0.8,20)),
            30: convertHSLToHex(adjustHSL(hslColor, -0.6,30)),
            40: convertHSLToHex(adjustHSL(hslColor, -0.4,40)),
            50: convertHSLToHex(adjustHSL(hslColor, -0.2,50)),
            60: convertHSLToHex(adjustHSL(hslColor, -0.2,60)),
            70: convertHSLToHex(adjustHSL(hslColor, 0.2,70)),
            80: convertHSLToHex(adjustHSL(hslColor, 0.4,80)),
            90: convertHSLToHex(adjustHSL(hslColor, 0.6,90)),
            95: convertHSLToHex(adjustHSL(hslColor, 0.8,95)),
            99: convertHSLToHex(adjustHSL(hslColor, 1,99)),
        };
    }, [convertHexToHsl, convertHSLToHex, adjustHSL]);

    return {
        convertHSLToHex,
        convertHexToHsl,
        createPalette
    }
}
