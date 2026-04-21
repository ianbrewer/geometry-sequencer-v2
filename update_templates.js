const fs = require('fs');
const path = require('path');

const templatesPath = path.join(__dirname, 'App/src/data/exportTemplates.ts');
let content = fs.readFileSync(templatesPath, 'utf8');

const filesToUpdate = [
    { constant: 'GEOMETRY_PLAYER', filePath: 'src/components/GeometryPlayer.tsx' },
    { constant: 'TYPES_TS', filePath: 'src/types/index.ts' },
    { constant: 'GEOMETRY_RENDERER', filePath: 'src/rendering/GeometryRenderer.ts' },
    { constant: 'PRIMITIVE_RENDERER', filePath: 'src/rendering/PrimitiveRenderer.ts' },
    { constant: 'INTERPOLATION_TS', filePath: 'src/utils/interpolation.ts' },
    { constant: 'GRADIENTS_TS', filePath: 'src/utils/gradients.ts' },
    { constant: 'GEOMETRY_TS', filePath: 'src/utils/geometry.ts' },
    { constant: 'ICHING_RENDERER', filePath: 'src/rendering/shapes/IChingRenderer.ts' },
    { constant: 'MOLECULE_RENDERER', filePath: 'src/rendering/shapes/MoleculeRenderer.ts' },
    { constant: 'POLYHEDRON_RENDERER', filePath: 'src/rendering/shapes/PolyhedronRenderer.ts' },
    { constant: 'SHAPE_UTILS', filePath: 'src/rendering/shapes/ShapeUtils.ts' },
    { constant: 'ICHING_UTILS', filePath: 'src/utils/iching.ts' },
    { constant: 'MATH3D_UTILS', filePath: 'src/utils/math3d.ts' },
    { constant: 'MOLECULES_DATA', filePath: 'src/data/molecules.ts' }
];

const basePath = path.join(__dirname, 'App');

// Read DEFAULT_ANIMATABLES from useStore.ts
const storeCode = fs.readFileSync(path.join(basePath, 'src/store/useStore.ts'), 'utf8');
const animatablesMatch = storeCode.match(/export const DEFAULT_ANIMATABLES: AnimatableProperties = \{[\s\S]*?\};/);
const defaultAnimatablesCode = animatablesMatch ? animatablesMatch[0] : '';

filesToUpdate.forEach(({ constant, filePath }) => {
    let fileContent = fs.readFileSync(path.join(basePath, '', filePath), 'utf8');
    
    // Custom Rewrites for the exported viewer
    if (constant === 'GEOMETRY_RENDERER') {
        fileContent = fileContent.replace(/from '\.\.\/store\/useStore'/g, "from '../types'");
    }
    
    if (constant === 'TYPES_TS') {
        // Append default animatables because they are not in types/index.ts anymore
        if (defaultAnimatablesCode && !fileContent.includes('DEFAULT_ANIMATABLES')) {
            fileContent += "\n" + defaultAnimatablesCode + "\n";
        }
    }
    
    // Escape backticks and dollars so they are proper template literals in the host file
    const escapedContent = fileContent.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
    
    const regex = new RegExp(`const ${constant} = \\\`[\\s\\S]*?^\\\`;`, 'm');
    content = content.replace(regex, `const ${constant} = \\\`\n${escapedContent}\n\\\`;`);
});

// Add new files for AMINO and ASTRO
const newFiles = [
    { constant: 'AMINO_TS', filePath: 'src/data/amino.ts', extKey: 'src/data/amino.ts' },
    { constant: 'ASTRO_TS', filePath: 'src/data/astro.ts', extKey: 'src/data/astro.ts' }
];

newFiles.forEach(({ constant, filePath, extKey }) => {
    const fileContent = fs.readFileSync(path.join(basePath, '', filePath), 'utf8');
    const escapedContent = fileContent.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
    
    // Check if constant exists
    const constRegex = new RegExp(`const ${constant} = \\\`[\\s\\S]*?^\\\`;`, 'm');
    if (constRegex.test(content)) {
        content = content.replace(constRegex, `const ${constant} = \\\`\n${escapedContent}\n\\\`;`);
    } else {
        // Find end of MOLECULES_DATA and insert after
        content = content.replace(/(const MOLECULES_DATA = \`[\s\S]*?^\`;)/m, `$1\n\nconst ${constant} = \`\n${escapedContent}\n\`;`);
    }

    // Add to EXPORT_TEMPLATES object
    if (!content.includes(`"${extKey}": ${constant}`)) {
        content = content.replace(/export const EXPORT_TEMPLATES = \{([\s\S]*?)\};/, (match, p1) => {
            // Remove trailing comma if any
            let inner = p1.trim().replace(/,$/, '');
            return `export const EXPORT_TEMPLATES = {\n    ${inner},\n    "${extKey}": ${constant}\n};`;
        });
    }
});

fs.writeFileSync(templatesPath, content, 'utf8');
console.log('Successfully updated exportTemplates.ts');
