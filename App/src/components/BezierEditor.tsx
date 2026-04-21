import React, { useRef, useState } from 'react';

interface BezierEditorProps {
    value: [number, number, number, number];
    onChange: (value: [number, number, number, number]) => void;
    disabled?: boolean;
    label?: string;
}

const BezierEditor: React.FC<BezierEditorProps> = ({ value, onChange, disabled, label }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [dragging, setDragging] = useState<'p1' | 'p2' | null>(null);

    const size = 80; // Compact size for dual view
    const padding = 12;
    const innerSize = size - padding * 2;

    const [x1, y1, x2, y2] = value || [0.42, 0, 0.58, 1];

    // Convert normalized coords (0-1) to SVG coords
    const toSVG = (x: number, y: number) => ({
        x: padding + x * innerSize,
        y: padding + (1 - y) * innerSize // Y is inverted in SVG
    });

    const p1 = toSVG(x1, y1);
    const p2 = toSVG(x2, y2);
    const start = toSVG(0, 0);
    const end = toSVG(1, 1);

    const handlePointerDown = (e: React.PointerEvent, point: 'p1' | 'p2') => {
        if (disabled) return;
        setDragging(point);
        (e.target as Element).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!dragging || !svgRef.current || disabled) return;

        const rect = svgRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - padding) / innerSize;
        const y = 1 - (e.clientY - rect.top - padding) / innerSize;

        // Clamp values 0-1 (or allow slightly outside? typically cubic-bezier allows y outside 0-1 but x must be 0-1)
        const clampedX = Math.max(0, Math.min(1, x));
        const clampedY = y; // Allow y to go outside for overshoot effects

        if (dragging === 'p1') {
            onChange([clampedX, clampedY, x2, y2]);
        } else {
            onChange([x1, y1, clampedX, clampedY]);
        }
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        setDragging(null);
        (e.target as Element).releasePointerCapture(e.pointerId);
    };

    const opacityClass = disabled ? 'opacity-30 pointer-events-none' : 'opacity-100';

    return (
        <div className={`flex flex-col items-center gap-1 ${opacityClass}`}>
            {label && <span className="text-[9px] uppercase font-bold text-white/40">{label}</span>}
            <div className="bg-black/20 rounded p-2">
                <svg
                    ref={svgRef}
                    width={size}
                    height={size}
                    className={`bg-white/5 rounded border border-white/10 touch-none select-none ${!disabled ? 'cursor-pointer' : ''}`}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                >
                    {/* Grid/Guide lines */}
                    <line x1={padding} y1={padding + innerSize} x2={padding + innerSize} y2={padding} stroke="rgba(255,255,255,0.1)" strokeDasharray="2,2" />

                    {/* Handles */}
                    <line x1={start.x} y1={start.y} x2={p1.x} y2={p1.y} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                    <line x1={end.x} y1={end.y} x2={p2.x} y2={p2.y} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

                    {/* Curve */}
                    <path
                        d={`M ${start.x} ${start.y} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${end.x} ${end.y}`}
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                    />

                    {/* Control Points */}
                    <circle
                        cx={p1.x} cy={p1.y} r={4}
                        fill={dragging === 'p1' ? 'white' : 'rgba(255,255,255,0.5)'}
                        stroke="white" strokeWidth="1"
                        className="cursor-grab active:cursor-grabbing hover:fill-white transition-colors"
                        onPointerDown={(e) => handlePointerDown(e, 'p1')}
                    />
                    <circle
                        cx={p2.x} cy={p2.y} r={4}
                        fill={dragging === 'p2' ? 'white' : 'rgba(255,255,255,0.5)'}
                        stroke="white" strokeWidth="1"
                        className="cursor-grab active:cursor-grabbing hover:fill-white transition-colors"
                        onPointerDown={(e) => handlePointerDown(e, 'p2')}
                    />
                </svg>
            </div>

            {/* Readout */}
            {/* 
            <div className="flex gap-2 text-[8px] font-mono text-white/50">
                <div>{x1.toFixed(2)}, {y1.toFixed(2)}</div>
            </div> 
            */}
        </div>
    );
};

export default BezierEditor;
