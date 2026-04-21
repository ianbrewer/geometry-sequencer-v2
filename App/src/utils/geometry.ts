
const polygonCache = new Map<number, { x: number, y: number }[]>();
const starCache = new Map<number, { x: number, y: number, type: 'inner' | 'outer' }[]>();
const customShapeCache = new Map<string, { x: number, y: number }[]>();

export const getUnitPolygon = (sides: number) => {
    if (polygonCache.has(sides)) return polygonCache.get(sides)!;
    const points = [];
    const angle = 360 / sides;
    const offset = -90;
    for (let a = 0; a < 360; a += angle) {
        const sx = Math.cos((a + offset) * Math.PI / 180);
        const sy = Math.sin((a + offset) * Math.PI / 180);
        points.push({ x: sx, y: sy });
    }
    polygonCache.set(sides, points);
    return points;
};

export const getUnitStar = (npoints: number) => {
    if (starCache.has(npoints)) return starCache.get(npoints)!;
    const points: { x: number, y: number, type: 'inner' | 'outer' }[] = [];
    const angle = 360 / npoints;
    const halfAngle = angle / 2.0;
    const offset = -90;
    for (let a = 0; a < 360; a += angle) {
        // Outer point (Tip)
        const ox = Math.cos((a + offset) * Math.PI / 180);
        const oy = Math.sin((a + offset) * Math.PI / 180);
        points.push({ x: ox, y: oy, type: 'outer' });

        // Inner point (Valley)
        const ix = Math.cos((a + halfAngle + offset) * Math.PI / 180);
        const iy = Math.sin((a + halfAngle + offset) * Math.PI / 180);
        points.push({ x: ix, y: iy, type: 'inner' });
    }
    starCache.set(npoints, points);
    return points;
};

export const getUnitCustomShape = (pathData: string) => {
    if (customShapeCache.has(pathData)) return customShapeCache.get(pathData)!;

    // Split complex SVG paths into their constituent sub-paths
    // Match 'M' or 'm' followed by any characters until the next 'M' or 'm'
    const subPaths = pathData.match(/[Mm][^Mm]*/g) || [pathData];

    const allPoints = [];
    const svgNS = 'http://www.w3.org/2000/svg';
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

    for (let subData of subPaths) {
        subData = subData.trim();
        if (!subData) continue;

        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', subData);
        const len = path.getTotalLength();
        if (len === 0) continue;

        // Sample
        const points = [];
        const samples = Math.max(10, Math.min(200, Math.floor(len / 2)));
        for (let i = 0; i < samples; i++) {
            const pt = path.getPointAtLength((i / samples) * len);
            points.push({ x: pt.x, y: pt.y });

            if (pt.x < minX) minX = pt.x;
            if (pt.x > maxX) maxX = pt.x;
            if (pt.y < minY) minY = pt.y;
            if (pt.y > maxY) maxY = pt.y;
        }

        const endPt = path.getPointAtLength(len);
        points.push({ x: endPt.x, y: endPt.y });
        if (endPt.x < minX) minX = endPt.x;
        if (endPt.x > maxX) maxX = endPt.x;
        if (endPt.y < minY) minY = endPt.y;
        if (endPt.y > maxY) maxY = endPt.y;

        allPoints.push(...points); // Flatten for the single path legacy format
    }

    if (allPoints.length === 0) return [];

    const width = maxX - minX;
    const height = maxY - minY;
    // Prevent division by zero
    if (width === 0 && height === 0) return [];

    const maxSize = Math.max(width, height);
    const centerX = minX + width / 2;
    const centerY = minY + height / 2;

    const normalizedPoints = allPoints.map(p => ({
        x: (p.x - centerX) / (maxSize / 2),
        y: (p.y - centerY) / (maxSize / 2)
    }));

    customShapeCache.set(pathData, normalizedPoints);
    return normalizedPoints;
};

const customShapesCache = new Map<string, { x: number, y: number }[][]>();

export const getUnitCustomShapes = (pathDatas: string[]) => {
    // We can use a hash of pathDatas or simple string joined by pipe for caching
    const cacheKey = pathDatas.join('|');
    if (customShapesCache.has(cacheKey)) return customShapesCache.get(cacheKey)!;

    const allPathsPoints: { x: number, y: number }[][] = [];
    const svgNS = 'http://www.w3.org/2000/svg';

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

    for (const pathData of pathDatas) {
        if (!pathData) continue;

        // Split complex SVG paths into their constituent sub-paths
        // Match 'M' or 'm' followed by any characters until the next 'M' or 'm'
        const subPaths = pathData.match(/[Mm][^Mm]*/g) || [pathData];

        for (let subData of subPaths) {
            subData = subData.trim();
            if (!subData) continue;

            const path = document.createElementNS(svgNS, 'path');
            path.setAttribute('d', subData);
            const len = path.getTotalLength();
            if (len === 0) continue;

            // Sample points for this specific sub-path
            const points = [];

            // Adjust samples based on length to keep small details but don't oversample
            const samples = Math.max(10, Math.min(200, Math.floor(len / 2)));

            for (let i = 0; i < samples; i++) {
                const pt = path.getPointAtLength((i / samples) * len);
                points.push({ x: pt.x, y: pt.y });
                // Track global bounds across all paths and sub-paths
                if (pt.x < minX) minX = pt.x;
                if (pt.x > maxX) maxX = pt.x;
                if (pt.y < minY) minY = pt.y;
                if (pt.y > maxY) maxY = pt.y;
            }
            // Always add the end point directly to close gaps for precision
            const endPt = path.getPointAtLength(len);
            points.push({ x: endPt.x, y: endPt.y });
            if (endPt.x < minX) minX = endPt.x;
            if (endPt.x > maxX) maxX = endPt.x;
            if (endPt.y < minY) minY = endPt.y;
            if (endPt.y > maxY) maxY = endPt.y;

            allPathsPoints.push(points);
        }
    }

    if (allPathsPoints.length === 0) return [];

    const width = maxX - minX;
    const height = maxY - minY;

    // Prevent division by zero
    if (width === 0 && height === 0) return [];

    const maxSize = Math.max(width, height);
    const centerX = minX + width / 2;
    const centerY = minY + height / 2;

    const normalizedPaths = allPathsPoints.map(points =>
        points.map(p => ({
            x: (p.x - centerX) / (maxSize / 2),
            y: (p.y - centerY) / (maxSize / 2)
        }))
    );

    customShapesCache.set(cacheKey, normalizedPaths);
    return normalizedPaths;
};
