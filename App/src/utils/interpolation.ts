import type { EasingType, Keyframe } from '../types';

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Easing Library
export const easings: Record<string, (t: number) => number> = {
    linear: (t) => t,

    // Sine
    easeInSine: (t) => 1 - Math.cos((t * Math.PI) / 2),
    easeOutSine: (t) => Math.sin((t * Math.PI) / 2),
    easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,

    // Quad
    easeInQuad: (t) => t * t,
    easeOutQuad: (t) => 1 - (1 - t) * (1 - t),
    easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,

    // Cubic
    easeInCubic: (t) => t * t * t,
    easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
    easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,

    // Quart
    easeInQuart: (t) => t * t * t * t,
    easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
    easeInOutQuart: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,

    // Quint
    easeInQuint: (t) => t * t * t * t * t,
    easeOutQuint: (t) => 1 - Math.pow(1 - t, 5),
    easeInOutQuint: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2,

    // Expo
    easeInExpo: (t) => t === 0 ? 0 : Math.pow(2, 10 * t - 10),
    easeOutExpo: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
    easeInOutExpo: (t) => t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2,

    // Circ
    easeInCirc: (t) => 1 - Math.sqrt(1 - Math.pow(t, 2)),
    easeOutCirc: (t) => Math.sqrt(1 - Math.pow(t - 1, 2)),
    easeInOutCirc: (t) => t < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2,

    // Back
    easeInBack: (t) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return c3 * t * t * t - c1 * t * t;
    },
    easeOutBack: (t) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    },
    easeInOutBack: (t) => {
        const c1 = 1.70158;
        const c2 = c1 * 1.525;
        return t < 0.5
            ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
            : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
    },

    // Elastic
    easeInElastic: (t) => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
    },
    easeOutElastic: (t) => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
    },
    easeInOutElastic: (t) => {
        const c5 = (2 * Math.PI) / 4.5;
        return t === 0 ? 0 : t === 1 ? 1 : t < 0.5
            ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2
            : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) / 2 + 1;
    },

    // Bounce
    easeOutBounce: (t) => {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (t < 1 / d1) return n1 * t * t;
        else if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
        else if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
        else return n1 * (t -= 2.625 / d1) * t + 0.984375;
    },
    easeInBounce: (t) => 1 - easings.easeOutBounce(1 - t),
    easeInOutBounce: (t) => t < 0.5 ? (1 - easings.easeOutBounce(1 - 2 * t)) / 2 : (1 + easings.easeOutBounce(2 * t - 1)) / 2,
};

export const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
};

export const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map(x => {
        const hex = Math.round(pMath.clamp(x, 0, 255)).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
};

const pMath = {
    clamp: (val: number, min: number, max: number) => Math.min(Math.max(val, min), max)
};

// Cubic Bezier Solver
const NEWTON_ITERATIONS = 4;

const A = (aA1: number, aA2: number) => 1.0 - 3.0 * aA2 + 3.0 * aA1;
const B = (aA1: number, aA2: number) => 3.0 * aA2 - 6.0 * aA1;
const C = (aA1: number) => 3.0 * aA1;

const calcBezier = (aT: number, aA1: number, aA2: number) => {
    return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
};

const getSlope = (aT: number, aA1: number, aA2: number) => {
    return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
};

const newtonRaphsonIterate = (aX: number, aGuessT: number, mX1: number, mX2: number) => {
    for (let i = 0; i < NEWTON_ITERATIONS; ++i) {
        const currentSlope = getSlope(aGuessT, mX1, mX2);
        if (currentSlope === 0.0) return aGuessT;
        const currentX = calcBezier(aGuessT, mX1, mX2) - aX;
        aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
};

export const solveCubicBezier = (x: number, mX1: number, mY1: number, mX2: number, mY2: number) => {
    if (mX1 === mY1 && mX2 === mY2) return x; // Linear
    let tGuess = x;
    tGuess = newtonRaphsonIterate(x, tGuess, mX1, mX2);
    return calcBezier(tGuess, mY1, mY2);
};

function applyEasing(t: number, easing: EasingType, bezier?: [number, number, number, number]): number {
    if (easing === 'custom' && bezier) {
        return solveCubicBezier(t, bezier[0], bezier[1], bezier[2], bezier[3]);
    }
    return easings[easing]?.(t) ?? t;
}

function interpolateValues<T>(start: T, end: T, t: number): T {
    // Both numbers
    if (typeof start === 'number' && typeof end === 'number') {
        return (start + (end - start) * t) as unknown as T;
    }

    // Handle missing start or end (treat as 0 for numbers)
    if (typeof start === 'number' && end === undefined) {
        return (start + (0 - start) * t) as unknown as T;
    }
    if (start === undefined && typeof end === 'number') {
        return (0 + (end - 0) * t) as unknown as T;
    }

    // Objects (recurse on union of keys)
    if ((typeof start === 'object' && start !== null) || (typeof end === 'object' && end !== null)) {
        const s = (start || {}) as any;
        const e = (end || {}) as any;
        const result: any = {};

        // Get unique keys from both objects
        const keys = new Set([...Object.keys(s), ...Object.keys(e)]);

        keys.forEach(key => {
            result[key] = interpolateValues(s[key], e[key], t);
        });

        return result as T;
    }

    return start ?? end;
}

/**
 * Interpolates between keyframes for any numeric value or object of numeric values.
 */
export function interpolateGeneric<T>(
    currentTime: number,
    layerStartTime: number,
    keyframes: Keyframe<T>[]
): T {
    if (!keyframes || keyframes.length === 0) {
        return {} as T;
    }

    // Optimization: assume sorted if we maintain sort on insert
    const sorted = keyframes; // Assumption: Caller ensures sort for performance

    // Calculate local time
    const localTime = Math.max(0, currentTime - layerStartTime);

    // Handle boundaries
    if (localTime <= sorted[0].time) return sorted[0].value;
    if (localTime >= sorted[sorted.length - 1].time) return sorted[sorted.length - 1].value;

    // Find segment
    // Binary search could be faster for many keyframes, linear is fine for < 100
    let startIndex = 0;
    for (let i = 0; i < sorted.length - 1; i++) {
        if (localTime >= sorted[i].time && localTime < sorted[i + 1].time) {
            startIndex = i;
            break;
        }
    }

    const startKey = sorted[startIndex];
    const endKey = sorted[startIndex + 1];

    const segmentDuration = endKey.time - startKey.time;
    if (segmentDuration === 0) return endKey.value;

    const t = (localTime - startKey.time) / segmentDuration;
    const easedT = applyEasing(t, startKey.easing, startKey.bezier);

    return interpolateValues(startKey.value, endKey.value, easedT);
}
export const easePolyIn = (t: number) => t * t * t;
