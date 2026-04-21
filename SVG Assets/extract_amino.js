const fs = require('fs');
const path = require('path');
const parsePath = require('parse-svg-path');
const absPath = require('abs-svg-path');

const srcDir = path.join(__dirname, 'visual Assets', 'amino_extracted');
const destFile = path.join(__dirname, 'Geometry_Sequencer_App', 'App', 'src', 'data', 'amino.ts');

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.svg') && !f.startsWith('.')).sort();

let outTs = `// Extracted and transformed Amino SVG paths
export const AMINO_PATHS = [
`;

files.forEach((f, idx) => {
    const content = fs.readFileSync(path.join(srcDir, f), 'utf-8');

    // Extract the transform string
    const gMatch = content.match(/<g transform="translate\(([^,]+),([^)]+)\)\s*rotate\(([^)]+)\)\s*translate\(([^,]+),([^)]+)\)"/);
    if (!gMatch) {
        console.error(`Could not find transform in ${f}`);
        return;
    }
    const A = parseFloat(gMatch[1]);
    const B = parseFloat(gMatch[2]);
    const C_deg = parseFloat(gMatch[3]);
    const D = parseFloat(gMatch[4]);
    const E = parseFloat(gMatch[5]);
    const angle = C_deg * Math.PI / 180;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    const transformPoint = (x, y) => {
        let x1 = x + D;
        let y1 = y + E;
        let x2 = x1 * cosA - y1 * sinA;
        let y2 = x1 * sinA + y1 * cosA;
        return [x2 + A, y2 + B];
    };

    // Find all paths
    const pathRegex = /<path[^>]*d="([^"]+)"/g;
    let match;
    const allPaths = [];

    while ((match = pathRegex.exec(content)) !== null) {
        const d = match[1];
        const absD = absPath(parsePath(d));

        let currentX = 0;
        let currentY = 0;

        const newPathCmds = absD.map(cmd => {
            const type = cmd[0];
            const newCmd = [type];

            if (type === 'M' || type === 'L' || type === 'T') {
                const pt = transformPoint(cmd[1], cmd[2]);
                newCmd[0] = type === 'T' ? 'L' : type;
                newCmd.push(pt[0], pt[1]);
                currentX = cmd[1];
                currentY = cmd[2];
            } else if (type === 'H') {
                newCmd[0] = 'L';
                const pt = transformPoint(cmd[1], currentY);
                newCmd.push(pt[0], pt[1]);
                currentX = cmd[1];
            } else if (type === 'V') {
                newCmd[0] = 'L';
                const pt = transformPoint(currentX, cmd[1]);
                newCmd.push(pt[0], pt[1]);
                currentY = cmd[1];
            } else if (type === 'C') {
                const pt1 = transformPoint(cmd[1], cmd[2]);
                const pt2 = transformPoint(cmd[3], cmd[4]);
                const pt3 = transformPoint(cmd[5], cmd[6]);
                newCmd.push(pt1[0], pt1[1], pt2[0], pt2[1], pt3[0], pt3[1]);
                currentX = cmd[5];
                currentY = cmd[6];
            } else if (type === 'Q' || type === 'S') {
                const pt1 = transformPoint(cmd[1], cmd[2]);
                const pt2 = transformPoint(cmd[3], cmd[4]);
                newCmd.push(pt1[0], pt1[1], pt2[0], pt2[1]);
                currentX = cmd[3];
                currentY = cmd[4];
            } else if (type === 'A') {
                throw new Error("A not implemented");
            } else if (type === 'Z') {
                // Keep Z
            }

            return newCmd;
        });

        const newD = newPathCmds.map(cmd => {
            return cmd[0] + cmd.slice(1).map(n => typeof n === 'number' ? Number(n.toFixed(3)) : n).join(' ');
        }).join(' ');

        allPaths.push(newD);
    }

    outTs += `    [\n        '${allPaths.join("',\n        '")}'\n    ],\n`;
});

outTs += `];\n`;

fs.writeFileSync(destFile, outTs, 'utf-8');
console.log("Successfully generated amino.ts");
