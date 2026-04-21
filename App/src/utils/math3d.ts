
export const CAMERA_Z = 1200;

export const rotatePoint = (x: number, y: number, z: number, rotateX: number, rotateY: number, rotateZ: number = 0) => {
    const radX = rotateX * (Math.PI / 180);
    const radY = rotateY * (Math.PI / 180);
    const radZ = rotateZ * (Math.PI / 180);

    const cosX = Math.cos(radX);
    const sinX = Math.sin(radX);
    const cosY = Math.cos(radY);
    const sinY = Math.sin(radY);
    const cosZ = Math.cos(radZ);
    const sinZ = Math.sin(radZ);

    // 1. Rotate around X
    const y1 = y * cosX - z * sinX;
    const z1 = y * sinX + z * cosX;
    const x1 = x;

    // 2. Rotate around Y
    const x2 = x1 * cosY + z1 * sinY;
    const z2 = -x1 * sinY + z1 * cosY;
    const y2 = y1;

    // 3. Rotate around Z
    const x3 = x2 * cosZ - y2 * sinZ;
    const y3 = x2 * sinZ + y2 * cosZ;
    const z3 = z2;

    return { x: x3, y: y3, z: z3 };
};

export const project3D = (p: { x: number, y: number, z: number }, cameraZ: number = CAMERA_Z) => {
    // Safety check to avoid division by zero if point is at camera
    const dist = cameraZ - p.z;
    const perspective = dist > 1 ? cameraZ / dist : 100; // Fallback if too close/behind
    return {
        x: p.x * perspective,
        y: p.y * perspective,
        scale: perspective,
        z: p.z // Keep z for sorting
    };
};
