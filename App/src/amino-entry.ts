/**
 * Amino Data Entry — Amino Acid Molecule SVG Paths
 * 
 * Bundles the 20 amino acid molecular structure SVG paths as a global.
 * The player bundle accesses these via window.AMINO_DATA.AMINO_PATHS.
 * 
 * Build: npm run build:amino
 */
import { AMINO_PATHS } from './data/amino';

(window as any).AMINO_DATA = { AMINO_PATHS };
