const fs = require('fs');
const glob = require('glob');
const path = require('path');
const parsePath = require('parse-svg-path');
const absPath = require('abs-svg-path');
const { svgPathBbox } = require('svg-path-bbox');

const IN_SVG = 'visual Assets/astro_line.svg';
const OUT_DIR = 'visual Assets/astro_line_extracted';

if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR);
}

// Clean out dir
const files = fs.readdirSync(OUT_DIR);
for (const file of files) {
    fs.unlinkSync(path.join(OUT_DIR, file));
}

const svgContent = fs.readFileSync(IN_SVG, 'utf8');

// Match all path d="...." properties
const pathRegex = /<path[^>]*d="([^"]+)"[^>]*>/gi;
let match;
const pathDatas = [];
while ((match = pathRegex.exec(svgContent)) !== null) {
    pathDatas.push(match[1]);
}

const signs = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const TARGET_SIZE = 100;
const PADDING = 10;
const SVG_SIZE = TARGET_SIZE + (PADDING * 2);

let htmlItems = "";

for (let i = 0; i < Math.min(pathDatas.length, signs.length); i++) {
    const d = pathDatas[i];
    const signName = signs[i];

    // Get actual bounding box of the geometric path, properly accounting for curves and H/V commands
    const [minX, minY, maxX, maxY] = svgPathBbox(d);

    const width = maxX - minX;
    const height = maxY - minY;

    const cx = minX + width / 2;
    const cy = minY + height / 2;

    // Determine scale value to fit into 100x100 TARGET_SIZE
    const scale = Math.min(TARGET_SIZE / width, TARGET_SIZE / height);

    // Convert to absolute path, then scale and translate it to exactly fit in the center of a 120x120 viewBox
    const absD = absPath(parsePath(d));

    const newPathCmds = absD.map(cmd => {
        const type = cmd[0];
        const newCmd = [type];

        switch (type) {
            case 'M':
            case 'L':
            case 'T':
                newCmd.push((cmd[1] - cx) * scale + SVG_SIZE / 2);
                newCmd.push((cmd[2] - cy) * scale + SVG_SIZE / 2);
                break;
            case 'H':
                newCmd.push((cmd[1] - cx) * scale + SVG_SIZE / 2);
                break;
            case 'V':
                newCmd.push((cmd[1] - cy) * scale + SVG_SIZE / 2);
                break;
            case 'C':
                newCmd.push((cmd[1] - cx) * scale + SVG_SIZE / 2);
                newCmd.push((cmd[2] - cy) * scale + SVG_SIZE / 2);
                newCmd.push((cmd[3] - cx) * scale + SVG_SIZE / 2);
                newCmd.push((cmd[4] - cy) * scale + SVG_SIZE / 2);
                newCmd.push((cmd[5] - cx) * scale + SVG_SIZE / 2);
                newCmd.push((cmd[6] - cy) * scale + SVG_SIZE / 2);
                break;
            case 'S':
            case 'Q':
                newCmd.push((cmd[1] - cx) * scale + SVG_SIZE / 2);
                newCmd.push((cmd[2] - cy) * scale + SVG_SIZE / 2);
                newCmd.push((cmd[3] - cx) * scale + SVG_SIZE / 2);
                newCmd.push((cmd[4] - cy) * scale + SVG_SIZE / 2);
                break;
            case 'A':
                newCmd.push(cmd[1] * scale); // rx
                newCmd.push(cmd[2] * scale); // ry
                newCmd.push(cmd[3]); // x-axis-rotation
                newCmd.push(cmd[4]); // large-arc-flag
                newCmd.push(cmd[5]); // sweep-flag
                newCmd.push((cmd[6] - cx) * scale + SVG_SIZE / 2);
                newCmd.push((cmd[7] - cy) * scale + SVG_SIZE / 2);
                break;
            case 'Z':
                break;
        }
        return newCmd;
    });

    // Reconstruct d string
    const newD = newPathCmds.map(cmd => {
        return cmd[0] + cmd.slice(1).map(n => typeof n === 'number' ? Number(n.toFixed(3)) : n).join(' ');
    }).join(' ');

    const outSvg = `<?xml version='1.0' encoding='utf-8'?>
<svg xmlns="http://www.w3.org/2000/svg" width="${SVG_SIZE}" height="${SVG_SIZE}" viewBox="0 0 ${SVG_SIZE} ${SVG_SIZE}">
    <path d="${newD}" fill="none" stroke="#8667A5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

    const fileName = `${String(i + 1).padStart(2, '0')}_${signName}.svg`;
    fs.writeFileSync(path.join(OUT_DIR, fileName), outSvg);

    htmlItems += `
        <div class="item">
            <img src="${fileName}" alt="${signName}" />
            <div class="label">${fileName}</div>
        </div>
    `;
}

const htmlContent = `<!DOCTYPE html>
<html>
<head>
<title>Astro Lined Extracted Preview</title>
<style>
    body { font-family: sans-serif; background: #f5f5f5; margin: 20px; }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
    .item { background: white; padding: 10px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    img { max-width: 100%; height: 60px; object-fit: contain; }
    .label { margin-top: 10px; font-weight: bold; color: #333; }
</style>
</head>
<body>
    <h1>Extracted Astro Line Drawings (120x120 SVG)</h1>
    <div class="grid">
${htmlItems}
    </div>
</body>
</html>`;

fs.writeFileSync(path.join(OUT_DIR, 'preview.html'), htmlContent);
console.log("Processed Extracted 120x120 Lined Astro SVGs successfully.");
