/**
 * Maps an input ID (1-64) to a 6-line I-Ching hexagram configuration.
 * Returns an array of booleans where:
 * true = Gap (Broken Line)
 * false = Solid (Continuous Line)
 * 
 * We use a standard binary mapping for simplicity, unless a specific sequence is required.
 * ID 1 -> 000000 -> All Solid (Heaven/Creative) - Wait, in binary 0 usually means off. 
 * Let's standarize: 
 * 0 = Solid (Yang)
 * 1 = Broken (Yin)
 * 
 * Note: I-Ching usually builds from Bottom (Line 1) to Top (Line 6).
 */
export const getHexagramConfig = (id: number): boolean[] => {
    // Clamp ID to 1-64
    const safeId = Math.max(1, Math.min(64, Math.floor(id)));

    // Convert to 0-63 index
    const index = safeId - 1;

    // binary string, padded to 6 bits. e.g. 0 -> "000000"
    const binary = index.toString(2).padStart(6, '0');

    // Convert string to boolean array.
    // We reverse it to map index 0 to the "Bottom" line if we treat string LSB/MSB a certain way.
    // "000001" -> 1 is at end.
    // Let's assume standard binary counting where LSB changes fastest.
    // ID 1: 000000
    // ID 2: 000001
    // ...
    // Map char '1' to true (Gap/Broken) and '0' to false (Solid).

    return binary.split('').map(char => char === '1').reverse();
    // Reversing ensures LSB (fastest changing) is at index 0 (Bottom Line) 
    // or we can keep it as is. 
    // Usually Hexagrams are read Bottom to Top.
    // Let's assume index 0 = Bottom Line.
};
