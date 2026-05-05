// Usage: npm run scene:new -- "<project name>"
//
// Creates a fresh scene file at App/scenes/<v2_uuid>.json with one default
// layer and one keyframe. Edit the file, then `npm run scene:push -- <id>`
// to upload. The id is printed on stdout.
//
// The default layer mirrors createDefaultLayer() in App/src/store/useStore.ts.
// Defaults change rarely; if they drift this script just produces a slightly
// different starting point, not a broken project.

import { writeFileSync } from 'node:fs';
import { DEFAULT_ANIMATABLES } from '../../src/constants/defaults';
import type { Project } from '../../src/types';
import { getArg, newProjectId, sceneFilePath, shortId } from './lib';

function buildDefaultProject(name: string): Project {
  const layerId = shortId('layer');
  const kfId = shortId('kf');
  return {
    id: newProjectId(),
    name,
    duration: 10,
    backgroundColor: '#000000',
    gradientColor: '#d4af37',
    globalLineColor: '#7a7a7a',
    globalStrokeWeight: 1,
    globalStyleEnabled: false,
    globalGradientEnabled: false,
    globalGradientStops: [
      { id: '1', offset: 36, color: '#793720' },
      { id: '2', offset: 63, color: '#FCC698' },
    ],
    layers: [
      {
        id: layerId,
        name: 'Layer 1',
        type: 'polygon',
        visible: true,
        timeline: { start: 0, end: 0 },
        fadeIn: { enabled: false, duration: 2 },
        fadeOut: { enabled: false, duration: 2 },
        config: {
          sides: 6,
          instances: 1,
          density: 0,
          densitySelective: false,
          drawOutline: true,
          drawSpokes: true,
          drawStar: false,
          drawWeb: false,
          starSkip: 2,
          starInnerRadius: 0.5,
          internalLines: 'none',
          gridLayout: '',
          gridSpacing: 0,
          instances2: 0,
          gridLayout2: '',
          strokeColor: '#ffffff',
          strokeEnabled: true,
          fillColor: '#ffffff',
          fillEnabled: false,
          scaleLocked: true,
          dotsEnabled: false,
          dotSize: 3,
          dotType: 'filled',
          dotOffset: false,
          gradientEnabled: false,
          gradientStops: [],
          strokeStyleType: 'solid',
          dashLength: 10,
          gapLength: 10,
          lineAnchor: 'center',
          shapeArc: 360,
          radialArc: 360,
          alignToPath: false,
          molecule: 'threonine',
          persistVisible: false,
          styleOverrideEnabled: false,
        },
        keyframes: [
          {
            id: kfId,
            time: 0,
            value: { ...DEFAULT_ANIMATABLES, radiusX: 100, radiusY: 100, strokeWeight: 1 },
            easing: 'easeInOutSine',
          },
        ],
        symmetry: { enabled: false, mode: '3-way', masked: true, mirrorSegments: false },
      },
    ],
  };
}

async function main() {
  const name = getArg(0, 'project_name');
  const project = buildDefaultProject(name);
  const path = sceneFilePath(project.id);
  writeFileSync(path, JSON.stringify(project, null, 2));
  console.log(project.id);
  console.log(path);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
