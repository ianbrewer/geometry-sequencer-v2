export interface Atom {
    element: string;
    x: number;
    y: number;
    z: number;
}

export interface MoleculeData {
    name: string;
    formula: string;
    atoms: Atom[];
    bonds: number[][]; // [index1, index2, bondType]
}

export const MOLECULES: Record<string, MoleculeData> = {
    threonine: {
        name: "Threonine",
        formula: "C₄H₉NO₃",
        atoms: [
            { element: 'C', x: 0, y: 0, z: 0 }, { element: 'C', x: 1.4, y: 0.5, z: 0.3 },
            { element: 'O', x: 1.8, y: 1.5, z: -0.2 }, { element: 'O', x: 2.0, y: -0.4, z: 0.8 },
            { element: 'H', x: 2.8, y: -0.6, z: 0.6 }, { element: 'N', x: -1.0, y: 1.0, z: -0.5 },
            { element: 'H', x: -1.5, y: 1.5, z: 0.1 }, { element: 'H', x: -1.5, y: 0.8, z: -1.3 },
            { element: 'H', x: -0.5, y: -0.8, z: -0.5 }, { element: 'C', x: -0.5, y: -0.5, z: 1.5 },
            { element: 'H', x: -1.0, y: -1.3, z: 1.8 }, { element: 'O', x: 0.6, y: -1.0, z: 2.2 },
            { element: 'H', x: 0.9, y: -0.4, z: 2.8 }, { element: 'C', x: -1.7, y: 0.5, z: 2.0 },
            { element: 'H', x: -1.4, y: 1.3, z: 2.5 }, { element: 'H', x: -2.5, y: 0.8, z: 1.4 },
            { element: 'H', x: -2.0, y: -0.0, z: 2.9 }
        ],
        bonds: [
            [0, 1, 1], [0, 5, 1], [0, 8, 1], [0, 9, 1], [1, 2, 2], [1, 3, 1], [3, 4, 1],
            [5, 6, 1], [5, 7, 1], [9, 10, 1], [9, 11, 1], [9, 13, 1], [11, 12, 1],
            [13, 14, 1], [13, 15, 1], [13, 16, 1]
        ]
    },
    alanine: {
        name: "Alanine",
        formula: "C₃H₇NO₂",
        atoms: [
            { element: 'C', x: 0, y: 0, z: 0 }, { element: 'C', x: 1.4, y: 0.5, z: 0.3 },
            { element: 'O', x: 1.8, y: 1.5, z: -0.2 }, { element: 'O', x: 2.0, y: -0.4, z: 0.8 },
            { element: 'H', x: 2.8, y: -0.6, z: 0.6 }, { element: 'N', x: -1.0, y: 1.0, z: -0.5 },
            { element: 'H', x: -1.5, y: 1.5, z: 0.1 }, { element: 'H', x: -1.5, y: 0.8, z: -1.3 },
            { element: 'H', x: -0.5, y: -0.8, z: -0.5 }, { element: 'C', x: -0.5, y: -0.5, z: 1.5 },
            { element: 'H', x: -0.5, y: -1.6, z: 1.5 }, { element: 'H', x: -1.5, y: -0.2, z: 1.8 },
            { element: 'H', x: 0.2, y: -0.1, z: 2.2 }
        ],
        bonds: [
            [0, 1, 1], [0, 5, 1], [0, 8, 1], [0, 9, 1], [1, 2, 2], [1, 3, 1], [3, 4, 1],
            [5, 6, 1], [5, 7, 1], [9, 10, 1], [9, 11, 1], [9, 12, 1]
        ]
    },
    serine: {
        name: "Serine",
        formula: "C₃H₇NO₃",
        atoms: [
            { element: 'C', x: 0, y: 0, z: 0 }, { element: 'C', x: 1.4, y: 0.5, z: 0.3 },
            { element: 'O', x: 1.8, y: 1.5, z: -0.2 }, { element: 'O', x: 2.0, y: -0.4, z: 0.8 },
            { element: 'H', x: 2.8, y: -0.6, z: 0.6 }, { element: 'N', x: -1.0, y: 1.0, z: -0.5 },
            { element: 'H', x: -1.5, y: 1.5, z: 0.1 }, { element: 'H', x: -1.5, y: 0.8, z: -1.3 },
            { element: 'H', x: -0.5, y: -0.8, z: -0.5 }, { element: 'C', x: -0.5, y: -0.5, z: 1.5 },
            { element: 'H', x: -1.5, y: -0.3, z: 1.8 }, { element: 'H', x: -0.3, y: -1.6, z: 1.5 },
            { element: 'O', x: 0.3, y: 0.2, z: 2.4 }, { element: 'H', x: 0.1, y: 0.0, z: 3.3 }
        ],
        bonds: [
            [0, 1, 1], [0, 5, 1], [0, 8, 1], [0, 9, 1], [1, 2, 2], [1, 3, 1], [3, 4, 1],
            [5, 6, 1], [5, 7, 1], [9, 10, 1], [9, 11, 1], [9, 12, 1], [12, 13, 1]
        ]
    },
    cysteine: {
        name: "Cysteine",
        formula: "C₃H₇NO₂S",
        atoms: [
            { element: 'C', x: 0, y: 0, z: 0 }, { element: 'C', x: 1.4, y: 0.5, z: 0.3 },
            { element: 'O', x: 1.8, y: 1.5, z: -0.2 }, { element: 'O', x: 2.0, y: -0.4, z: 0.8 },
            { element: 'H', x: 2.8, y: -0.6, z: 0.6 }, { element: 'N', x: -1.0, y: 1.0, z: -0.5 },
            { element: 'H', x: -1.5, y: 1.5, z: 0.1 }, { element: 'H', x: -1.5, y: 0.8, z: -1.3 },
            { element: 'H', x: -0.5, y: -0.8, z: -0.5 }, { element: 'C', x: -0.5, y: -0.5, z: 1.5 },
            { element: 'H', x: -1.5, y: -0.3, z: 1.8 }, { element: 'H', x: -0.3, y: -1.6, z: 1.5 },
            { element: 'S', x: 0.4, y: 0.4, z: 2.7 }, { element: 'H', x: 0.1, y: -0.3, z: 3.7 }
        ],
        bonds: [
            [0, 1, 1], [0, 5, 1], [0, 8, 1], [0, 9, 1], [1, 2, 2], [1, 3, 1], [3, 4, 1],
            [5, 6, 1], [5, 7, 1], [9, 10, 1], [9, 11, 1], [9, 12, 1], [12, 13, 1]
        ]
    }
};

export const ATOM_PROPERTIES: Record<string, { size: number }> = {
    'C': { size: 0.24 },
    'H': { size: 0.14 },
    'O': { size: 0.21 },
    'N': { size: 0.23 },
    'S': { size: 0.28 }
};
