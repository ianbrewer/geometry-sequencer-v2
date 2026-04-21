
import { Graphics, Color } from 'pixi.js';
import type { LayerConfig } from '../../types';
import { MOLECULES, ATOM_PROPERTIES } from '../../data/molecules';
import { rotatePoint, project3D } from '../../utils/math3d';

interface DrawCommand {
    type: 'atom' | 'bond';
    z: number;
    draw: () => void;
}

export const drawMolecule = (g: Graphics, rx: number, _ry: number, layerConfig: LayerConfig, strokeColor: Color, fillColor: Color, rotateX: number, rotateY: number) => {
    if (layerConfig?.molecule && MOLECULES[layerConfig.molecule]) {
        const data = MOLECULES[layerConfig.molecule];
        const scale = rx / 10;
        const filled = layerConfig.moleculeFill ?? false;

        const commands: DrawCommand[] = [];

        // Bonds
        if (Array.isArray(data.bonds)) {
            data.bonds.forEach(bond => {
                if (!bond || bond.length < 2) return;
                const a1 = data.atoms[bond[0]];
                const a2 = data.atoms[bond[1]];
                if (!a1 || !a2) return;

                const p1Raw = rotatePoint(a1.x * scale, a1.y * scale, a1.z * scale, rotateX, rotateY);
                const p2Raw = rotatePoint(a2.x * scale, a2.y * scale, a2.z * scale, rotateX, rotateY);

                const p1 = project3D(p1Raw);
                const p2 = project3D(p2Raw);
                const avgZ = (p1Raw.z + p2Raw.z) / 2;
                const thickness = (p1.scale + p2.scale) / 2;

                commands.push({
                    type: 'bond',
                    z: avgZ,
                    draw: () => {
                        g.moveTo(p1.x, p1.y);
                        g.lineTo(p2.x, p2.y);
                        g.stroke({ width: 1 * thickness, color: strokeColor, cap: 'round', join: 'round' });
                    }
                });
            });
        }

        // Atoms
        if (Array.isArray(data.atoms)) {
            data.atoms.forEach(atom => {
                const pRaw = rotatePoint(atom.x * scale, atom.y * scale, atom.z * scale, rotateX, rotateY);
                const p = project3D(pRaw);
                const props = (ATOM_PROPERTIES && ATOM_PROPERTIES[atom.element]) ? ATOM_PROPERTIES[atom.element] : { size: 0.2 };
                const size = props.size * scale * 2 * p.scale;

                commands.push({
                    type: 'atom',
                    z: pRaw.z,
                    draw: () => {
                        if (filled) {
                            g.circle(p.x, p.y, size);
                            g.fill({ color: fillColor });
                        } else {
                            g.circle(p.x, p.y, size);
                            g.stroke({ width: 1, color: strokeColor });
                        }
                    }
                });
            });
        }

        // Sort by Z (depth)
        commands.sort((a, b) => a.z - b.z);

        // Execute
        commands.forEach(cmd => cmd.draw());
    }
};
