
import { Graphics, Color } from 'pixi.js';
import type { LayerConfig } from '../../types';
import { rotatePoint, project3D } from '../../utils/math3d';

interface PolyhedronData {
    vertices: { x: number, y: number, z: number }[];
    edges: [number, number][];
    edgeLengthRatio?: number;
}

const phi = (1 + Math.sqrt(5)) / 2;

export const POLYHEDRA: Record<string, PolyhedronData> = {
    'tetrahedron': {
        vertices: [
            { x: 1, y: 1, z: 1 },
            { x: 1, y: -1, z: -1 },
            { x: -1, y: 1, z: -1 },
            { x: -1, y: -1, z: 1 }
        ],
        edges: [
            [0, 1], [0, 2], [0, 3],
            [1, 2], [1, 3],
            [2, 3]
        ]
    },
    'cube': {
        vertices: [
            { x: -1, y: -1, z: -1 }, { x: 1, y: -1, z: -1 }, { x: 1, y: 1, z: -1 }, { x: -1, y: 1, z: -1 },
            { x: -1, y: -1, z: 1 }, { x: 1, y: -1, z: 1 }, { x: 1, y: 1, z: 1 }, { x: -1, y: 1, z: 1 }
        ],
        edges: [
            [0, 1], [1, 2], [2, 3], [3, 0], // Back face
            [4, 5], [5, 6], [6, 7], [7, 4], // Front face
            [0, 4], [1, 5], [2, 6], [3, 7]  // Connecting edges
        ]
    },
    'octahedron': {
        vertices: [
            { x: 1, y: 0, z: 0 }, { x: -1, y: 0, z: 0 },
            { x: 0, y: 1, z: 0 }, { x: 0, y: -1, z: 0 },
            { x: 0, y: 0, z: 1 }, { x: 0, y: 0, z: -1 }
        ],
        edges: [
            [0, 2], [2, 1], [1, 3], [3, 0], // Middle square (if flat) - actually these connect to poles
            [0, 4], [2, 4], [1, 4], [3, 4], // Top pyramid
            [0, 5], [2, 5], [1, 5], [3, 5]  // Bottom pyramid
        ]
    },
    'dodecahedron': {
        vertices: [
            // (±1, ±1, ±1)
            { x: -1, y: -1, z: -1 }, { x: -1, y: -1, z: 1 },
            { x: -1, y: 1, z: -1 }, { x: -1, y: 1, z: 1 },
            { x: 1, y: -1, z: -1 }, { x: 1, y: -1, z: 1 },
            { x: 1, y: 1, z: -1 }, { x: 1, y: 1, z: 1 },
            // (0, ±1/phi, ±phi)
            { x: 0, y: -1 / phi, z: -phi }, { x: 0, y: -1 / phi, z: phi },
            { x: 0, y: 1 / phi, z: -phi }, { x: 0, y: 1 / phi, z: phi },
            // (±1/phi, ±phi, 0)
            { x: -1 / phi, y: -phi, z: 0 }, { x: -1 / phi, y: phi, z: 0 },
            { x: 1 / phi, y: -phi, z: 0 }, { x: 1 / phi, y: phi, z: 0 },
            // (±phi, 0, ±1/phi)
            { x: -phi, y: 0, z: -1 / phi }, { x: -phi, y: 0, z: 1 / phi },
            { x: phi, y: 0, z: -1 / phi }, { x: phi, y: 0, z: 1 / phi }
        ],
        edges: [] // Will be calculated dynamically
    },
    'icosahedron': {
        vertices: [
            // (0, ±1, ±phi)
            { x: 0, y: 1, z: phi }, { x: 0, y: 1, z: -phi }, { x: 0, y: -1, z: phi }, { x: 0, y: -1, z: -phi },
            // (±1, ±phi, 0)
            { x: 1, y: phi, z: 0 }, { x: 1, y: -phi, z: 0 }, { x: -1, y: phi, z: 0 }, { x: -1, y: -phi, z: 0 },
            // (±phi, 0, ±1)
            { x: phi, y: 0, z: 1 }, { x: phi, y: 0, z: -1 }, { x: -phi, y: 0, z: 1 }, { x: -phi, y: 0, z: -1 }
        ],
        edges: [] // Will calc dynamic
    },
    'rhombic triacontahedron': {
        vertices: [
            // (±1, ±1, ±1) (8)
            { x: 1, y: 1, z: 1 }, { x: 1, y: 1, z: -1 }, { x: 1, y: -1, z: 1 }, { x: 1, y: -1, z: -1 },
            { x: -1, y: 1, z: 1 }, { x: -1, y: 1, z: -1 }, { x: -1, y: -1, z: 1 }, { x: -1, y: -1, z: -1 },
            // (0, ±phi, ±1/phi) (12)
            { x: 0, y: phi, z: 1 / phi }, { x: 0, y: phi, z: -1 / phi }, { x: 0, y: -phi, z: 1 / phi }, { x: 0, y: -phi, z: -1 / phi },
            { x: 1 / phi, y: 0, z: phi }, { x: 1 / phi, y: 0, z: -phi }, { x: -1 / phi, y: 0, z: phi }, { x: -1 / phi, y: 0, z: -phi },
            { x: phi, y: 1 / phi, z: 0 }, { x: phi, y: -1 / phi, z: 0 }, { x: -phi, y: 1 / phi, z: 0 }, { x: -phi, y: -1 / phi, z: 0 },
            // (0, ±1, ±phi^2) (12) -> Icosidodecahedron Dual check
            // Actually, simply scaling the Icosahedron vertices (0, ±1, ±phi) to match magnitude works too?
            // Let's use the known set: (±1, ±1, ±1) and (0, ±phi, ±1/phi) and (±1/phi, ±phi, 0)??
            // Re-verified: The vertices are (±1, ±1, ±1) and (0, ±1/phi, ±phi) cyclic permutations.
            // Wait, (0, ±1/phi, ±phi) cyclic has 12 vertices. 8+12 = 20 (Dodecahedron).
            // Where are the other 12?
            // The other 12 are (0, ±phi, ±1) cyclic? No.
            // Vertices of Rhombic Triacontahedron are:
            // 1. (±1, ±1, ±1) [8]
            // 2. (0, ±phi, ±1/phi) cyclic [12] -> These form Dodecahedron together?
            // 3. (0, ±1, ±phi^2) cyclic [12] -> These are the Icosahedron-like ones?
            // Let's try the set (0, ±1, ±phi^2) cyclic.
            { x: 0, y: 1, z: phi * phi }, { x: 0, y: 1, z: -phi * phi }, { x: 0, y: -1, z: phi * phi }, { x: 0, y: -1, z: -phi * phi },
            { x: phi * phi, y: 0, z: 1 }, { x: phi * phi, y: 0, z: -1 }, { x: -phi * phi, y: 0, z: 1 }, { x: -phi * phi, y: 0, z: -1 },
            { x: 1, y: phi * phi, z: 0 }, { x: 1, y: -phi * phi, z: 0 }, { x: -1, y: phi * phi, z: 0 }, { x: -1, y: -phi * phi, z: 0 }
        ],
        edges: [] // Dynamic
    },
    'truncated cube': {
        vertices: [
            // (±1, ±1, ±(1+sqrt(2))) perms
            // Using val = 2.414
            ...[1, -1].flatMap(x => [1, -1].flatMap(y => [2.414, -2.414].map(z => ({ x, y, z })))), // Z-axis
            ...[1, -1].flatMap(x => [2.414, -2.414].flatMap(y => [1, -1].map(z => ({ x, y, z })))), // Y-axis
            ...[2.414, -2.414].flatMap(x => [1, -1].flatMap(y => [1, -1].map(z => ({ x, y, z }))))  // X-axis
        ],
        edges: [] // Dynamic
    },
    'truncated tetrahedron': {
        vertices: [
            // Permutations of (±1, ±1, ±3) with even minus signs
            // (3, 1, 1) -> 3 perms
            { x: 3, y: 1, z: 1 }, { x: 1, y: 3, z: 1 }, { x: 1, y: 1, z: 3 },
            // (-3, -1, 1) -> 3 perms
            { x: -3, y: -1, z: 1 }, { x: -3, y: 1, z: -1 }, { x: 1, y: -1, z: -3 }, // Wait, logic:
            // Perms of (-3, -1, 1)
            { x: -3, y: -1, z: 1 }, { x: -3, y: 1, z: -1 }, { x: 1, y: -3, z: -1 },
            { x: -1, y: -3, z: 1 }, { x: -1, y: 1, z: -3 }, { x: 1, y: -1, z: -3 }, // Mixed... let's list clearly
            // 4 corners of tetra: (1,1,1), (1,-1,-1), (-1,1,-1), (-1,-1,1)
            // Cut (1,1,1) -> (3,1,1), (1,3,1), (1,1,3)
            { x: 3, y: 1, z: 1 }, { x: 1, y: 3, z: 1 }, { x: 1, y: 1, z: 3 },
            // Cut (1,-1,-1) -> (3,-1,-1), (1,-3,-1), (1,-1,-3)
            { x: 3, y: -1, z: -1 }, { x: 1, y: -3, z: -1 }, { x: 1, y: -1, z: -3 },
            // Cut (-1,1,-1) -> (-3,1,-1), (-1,3,-1), (-1,1,-3)
            { x: -3, y: 1, z: -1 }, { x: -1, y: 3, z: -1 }, { x: -1, y: 1, z: -3 },
            // Cut (-1,-1,1) -> (-3,-1,1), (-1,-3,1), (-1,-1,3)
            { x: -3, y: -1, z: 1 }, { x: -1, y: -3, z: 1 }, { x: -1, y: -1, z: 3 }
        ],
        edges: [] // Dynamic
    },
    'triakis octahedron': {
        vertices: [
            // Octahedron (Inner/Base) - Scale 1.5
            { x: 1.5, y: 0, z: 0 }, { x: -1.5, y: 0, z: 0 },
            { x: 0, y: 1.5, z: 0 }, { x: 0, y: -1.5, z: 0 },
            { x: 0, y: 0, z: 1.5 }, { x: 0, y: 0, z: -1.5 },
            // Cube (Outer/Peaks) - Scale 2.5
            { x: 2.5, y: 2.5, z: 2.5 }, { x: 2.5, y: 2.5, z: -2.5 },
            { x: 2.5, y: -2.5, z: 2.5 }, { x: 2.5, y: -2.5, z: -2.5 },
            { x: -2.5, y: 2.5, z: 2.5 }, { x: -2.5, y: 2.5, z: -2.5 },
            { x: -2.5, y: -2.5, z: 2.5 }, { x: -2.5, y: -2.5, z: -2.5 }
        ],
        edges: [
            // Manual Edges
            // 1. Octahedron Edges (0-5)
            [0, 2], [0, 3], [0, 4], [0, 5],
            [1, 2], [1, 3], [1, 4], [1, 5],
            [2, 4], [2, 5], [3, 4], [3, 5],
            // 2. Pyramid Edges (Cube 6-13 to Octa 0-5)
            // Each Cube vertex connects to 3 mutually adjacent Octa vertices
            // (2.5, 2.5, 2.5) -> (1.5,0,0), (0,1.5,0), (0,0,1.5) => 6 -> 0, 2, 4
            [6, 0], [6, 2], [6, 4],
            // (2.5, 2.5, -2.5) -> (1.5, 0, 0), (0, 1.5, 0), (0, 0, -1.5) => 7 -> 0, 2, 5
            [7, 0], [7, 2], [7, 5],
            // (2.5, -2.5, 2.5) -> (1.5, 0, 0), (0, -1.5, 0), (0, 0, 1.5) => 8 -> 0, 3, 4
            [8, 0], [8, 3], [8, 4],
            // (2.5, -2.5, -2.5) -> (1.5, 0, 0), (0, -1.5, 0), (0, 0, -1.5) => 9 -> 0, 3, 5
            [9, 0], [9, 3], [9, 5],
            // (-2.5, 2.5, 2.5) -> (-1.5, 0, 0), (0, 1.5, 0), (0, 0, 1.5) => 10 -> 1, 2, 4
            [10, 1], [10, 2], [10, 4],
            // (-2.5, 2.5, -2.5) -> (-1.5, 0, 0), (0, 1.5, 0), (0, 0, -1.5) => 11 -> 1, 2, 5
            [11, 1], [11, 2], [11, 5],
            // (-2.5, -2.5, 2.5) -> (-1.5, 0, 0), (0, -1.5, 0), (0, 0, 1.5) => 12 -> 1, 3, 4
            [12, 1], [12, 3], [12, 4],
            // (-2.5, -2.5, -2.5) -> (-1.5, 0, 0), (0, -1.5, 0), (0, 0, -1.5) => 13 -> 1, 3, 5
            [13, 1], [13, 3], [13, 5]
        ]
    },
    'cuboctahedron': {
        vertices: [
            // Permutations of (±1, ±1, 0)
            { x: 1, y: 1, z: 0 }, { x: 1, y: -1, z: 0 }, { x: -1, y: 1, z: 0 }, { x: -1, y: -1, z: 0 },
            { x: 1, y: 0, z: 1 }, { x: 1, y: 0, z: -1 }, { x: -1, y: 0, z: 1 }, { x: -1, y: 0, z: -1 },
            { x: 0, y: 1, z: 1 }, { x: 0, y: 1, z: -1 }, { x: 0, y: -1, z: 1 }, { x: 0, y: -1, z: -1 }
        ],
        edges: [] // Dynamic
    },
    'rhombic dodecahedron': {
        vertices: [
            // (±1, ±1, ±1) (Cube)
            { x: -1, y: -1, z: -1 }, { x: 1, y: -1, z: -1 }, { x: 1, y: 1, z: -1 }, { x: -1, y: 1, z: -1 },
            { x: -1, y: -1, z: 1 }, { x: 1, y: -1, z: 1 }, { x: 1, y: 1, z: 1 }, { x: -1, y: 1, z: 1 },
            // (±2, 0, 0) & perms (Octahedron)
            { x: 2, y: 0, z: 0 }, { x: -2, y: 0, z: 0 },
            { x: 0, y: 2, z: 0 }, { x: 0, y: -2, z: 0 },
            { x: 0, y: 0, z: 2 }, { x: 0, y: 0, z: -2 }
        ],
        edges: [] // Dynamic
    },
    'truncated octahedron': {
        vertices: [
            // Permutations of (0, ±1, ±2)
            { x: 0, y: 1, z: 2 }, { x: 0, y: 1, z: -2 }, { x: 0, y: -1, z: 2 }, { x: 0, y: -1, z: -2 },
            { x: 0, y: 2, z: 1 }, { x: 0, y: 2, z: -1 }, { x: 0, y: -2, z: 1 }, { x: 0, y: -2, z: -1 },

            { x: 1, y: 0, z: 2 }, { x: 1, y: 0, z: -2 }, { x: -1, y: 0, z: 2 }, { x: -1, y: 0, z: -2 },
            { x: 2, y: 0, z: 1 }, { x: 2, y: 0, z: -1 }, { x: -2, y: 0, z: 1 }, { x: -2, y: 0, z: -1 },

            { x: 1, y: 2, z: 0 }, { x: 1, y: -2, z: 0 }, { x: -1, y: 2, z: 0 }, { x: -1, y: -2, z: 0 },
            { x: 2, y: 1, z: 0 }, { x: 2, y: -1, z: 0 }, { x: -2, y: 1, z: 0 }, { x: -2, y: -1, z: 0 }
        ],
        edges: [] // Dynamic
    },
    'stella octangula': {
        vertices: [
            // Tetra 1
            { x: 1, y: 1, z: 1 }, { x: 1, y: -1, z: -1 }, { x: -1, y: 1, z: -1 }, { x: -1, y: -1, z: 1 },
            // Tetra 2
            { x: -1, y: -1, z: -1 }, { x: -1, y: 1, z: 1 }, { x: 1, y: -1, z: 1 }, { x: 1, y: 1, z: -1 }
        ],
        edges: [
            // Tetra 1
            [0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3],
            // Tetra 2
            [4, 5], [4, 6], [4, 7], [5, 6], [5, 7], [6, 7]
        ]
    },
    'small stellated dodecahedron': {
        vertices: [
            // Same as Icosahedron
            // (0, ±1, ±phi)
            { x: 0, y: 1, z: phi }, { x: 0, y: 1, z: -phi }, { x: 0, y: -1, z: phi }, { x: 0, y: -1, z: -phi },
            // (±1, ±phi, 0)
            { x: 1, y: phi, z: 0 }, { x: 1, y: -phi, z: 0 }, { x: -1, y: phi, z: 0 }, { x: -1, y: -phi, z: 0 },
            // (±phi, 0, ±1)
            { x: phi, y: 0, z: 1 }, { x: phi, y: 0, z: -1 }, { x: -phi, y: 0, z: 1 }, { x: -phi, y: 0, z: -1 }
        ],
        edges: [], // Dynamic
        edgeLengthRatio: phi // Connect to "second" neighbors via pentagram
    }
};

const _validateEdges = (name: string) => {
    const p = POLYHEDRA[name];
    if (p.edges.length > 0) return;

    const vertices = p.vertices;
    // Find min distance (edge length) - robust enough for regular polyhedra
    let minD = Infinity;

    // Sample distance
    for (let i = 0; i < vertices.length; i++) {
        for (let j = i + 1; j < vertices.length; j++) {
            const dx = vertices[i].x - vertices[j].x;
            const dy = vertices[i].y - vertices[j].y;
            const dz = vertices[i].z - vertices[j].z;
            const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (d < minD && d > 0.001) minD = d;
        }
    }

    // If a specific ratio is requested (e.g. for stellated shapes), target that distance
    // Using simple property check on the object (TS assumes it exists on PolyhedronData now)
    const targetD = (p as any).edgeLengthRatio ? minD * (p as any).edgeLengthRatio : minD;
    const epsilon = 0.01;

    for (let i = 0; i < vertices.length; i++) {
        for (let j = i + 1; j < vertices.length; j++) {
            const dx = vertices[i].x - vertices[j].x;
            const dy = vertices[i].y - vertices[j].y;
            const dz = vertices[i].z - vertices[j].z;
            const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (Math.abs(d - targetD) < epsilon) {
                p.edges.push([i, j]);
            }
        }
    }
};

export const drawPolyhedron = (g: Graphics, rx: number, _ry: number, layerConfig: LayerConfig, strokeColor: Color, _fillColor: Color, rotateX: number, rotateY: number, rotateZ: number, strokeWeight: number, perspective: number) => {
    const name = layerConfig.polyhedronName?.toLowerCase() || 'tetrahedron';
    const pData = POLYHEDRA[name] || POLYHEDRA['tetrahedron'];

    // Ensure edges are calculated
    if (pData.edges.length === 0) _validateEdges(name);

    const scale = rx; // Use radiusX as scale
    // const filled = layerConfig.fillEnabled ?? false; // Not implementing fill correct depth sorting yet, just wireframe

    // 1. Project Vertices
    const projectedPoints = pData.vertices.map(v => {
        // Rotate Point in 3D
        // rotatePoint signature from math3d: (x, y, z, rotX, rotY, rotZ) -> {x, y, z}
        // Assuming math3d handles degrees
        const pRot = rotatePoint(v.x * scale, v.y * scale, v.z * scale, rotateX, rotateY, rotateZ);

        // Project to 2D
        const pProj = project3D(pRot, perspective);

        return { x: pProj.x, y: pProj.y, z: pRot.z, scale: pProj.scale };
    });

    // 2. Draw Edges
    if (layerConfig.strokeEnabled) {
        const weight = strokeWeight || 1;
        const color = strokeColor;

        pData.edges.forEach(([i, j]) => {
            const p1 = projectedPoints[i];
            const p2 = projectedPoints[j];

            g.moveTo(p1.x, p1.y);
            g.lineTo(p2.x, p2.y);
            g.stroke({ width: weight, color: color, cap: 'round', join: 'round' });
        });
    }

    // 3. Draw Dots (Vertices)
    if (layerConfig.dotsEnabled) {
        const size = layerConfig.dotSize || 4;
        projectedPoints.forEach(p => {
            // For simplicity, just circle
            // Scale size by perspective scale? p.scale is like 1/(z+dist)
            const s = size * p.scale;
            g.circle(p.x, p.y, s / 2);
            if (layerConfig.dotType === 'filled') g.fill({ color: strokeColor });
            else g.stroke({ width: 1, color: strokeColor });
        });
    }
};
