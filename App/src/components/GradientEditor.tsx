import React, { useRef, useState, useEffect } from 'react';
import type { GradientStop } from '../types';
import { Trash2 } from 'lucide-react';
import { CustomColorPicker } from './CustomColorPicker';

interface GradientEditorProps {
    stops: GradientStop[];
    onChange: (stops: GradientStop[]) => void;
}

const GradientEditor: React.FC<GradientEditorProps> = ({ stops, onChange }) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [activeStopId, setActiveStopId] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Sort stops just for rendering the background, but keep original order or sorted order in state?
    // It's better to keep them sorted by offset for logic, but usually we just sort when generating the string.
    const sortedStops = [...stops].sort((a, b) => a.offset - b.offset);

    const gradientString = `linear-gradient(90deg, ${sortedStops.map(s => `${s.color} ${s.offset}%`).join(', ')})`;

    const handleTrackClick = (e: React.MouseEvent) => {
        if (!trackRef.current) return;
        if ((e.target as HTMLElement) !== trackRef.current) return; // Don't trigger if clicking a handle

        const rect = trackRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));

        const newStop: GradientStop = {
            id: Math.random().toString(36).substr(2, 9),
            offset: Math.round(percent),
            color: '#d4af37' // Default color
        };

        onChange([...stops, newStop]);
        setActiveStopId(newStop.id);
    };

    const handleMouseDown = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setActiveStopId(id);
        setIsDragging(true);
    };

    const updateStopPosition = (e: MouseEvent) => {
        if (!trackRef.current || !activeStopId) return;
        const rect = trackRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));

        const updatedStops = stops.map(s =>
            s.id === activeStopId ? { ...s, offset: Math.round(percent) } : s
        );
        onChange(updatedStops);
    };

    useEffect(() => {
        if (isDragging) {
            const handleMouseMove = (e: MouseEvent) => updateStopPosition(e);
            const handleMouseUp = () => setIsDragging(false);

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, activeStopId, stops]);

    const handleColorChange = (color: string) => {
        if (!activeStopId) return;
        const updatedStops = stops.map(s =>
            s.id === activeStopId ? { ...s, color } : s
        );
        onChange(updatedStops);
    };

    const handleDeleteStop = (id: string) => {
        if (stops.length <= 2) return; // Min 2 stops
        const updatedStops = stops.filter(s => s.id !== id);
        onChange(updatedStops);
        if (activeStopId === id) setActiveStopId(null);
    };

    return (
        <div className="p-4 bg-[#1a1a1a] rounded border border-white/10 w-[300px]">
            <div className="text-[10px] uppercase font-bold tracking-widest text-white/50 mb-3 flex justify-between">
                <span>Gradient Editor</span>
                <span className="text-[9px] opacity-50">Right-click handle to delete</span>
            </div>

            {/* Gradient Track */}
            <div className="relative h-6 w-full mb-4">
                <div
                    ref={trackRef}
                    className="absolute inset-0 rounded cursor-crosshair border border-white/20"
                    style={{ background: gradientString }}
                    onClick={handleTrackClick}
                />

                {/* Handles */}
                {stops.map(stop => (
                    <div
                        key={stop.id}
                        className={`absolute top-0 w-3 h-full -ml-1.5 cursor-ew-resize group z-10`}
                        style={{ left: `${stop.offset}%` }}
                        onMouseDown={(e) => handleMouseDown(e, stop.id)}
                        onContextMenu={(e) => {
                            e.preventDefault();
                            handleDeleteStop(stop.id);
                        }}
                    >
                        {/* Visual Handle */}
                        <div className={`w-3 h-7 -mt-0.5 bg-white rounded shadow-lg border-2 transition-transform ${activeStopId === stop.id ? 'scale-110 border-[#D4AF37] z-20' : 'border-black/50'} flex flex-col items-center gap-1`}>
                            <div className="w-full h-full" style={{ background: stop.color }} />
                        </div>
                        {/* Triangle Pointer */}
                        <div className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] mx-auto ${activeStopId === stop.id ? 'border-t-[#D4AF37]' : 'border-t-white'}`} />
                    </div>
                ))}
            </div>

            {/* Active Stop Controls */}
            {activeStopId && (() => {
                const stop = stops.find(s => s.id === activeStopId);
                if (!stop) return null;
                return (
                    <div className="flex items-center gap-3 animate-in fade-in slide-in-from-top-1">
                        <CustomColorPicker
                            color={stop.color}
                            onChange={(color) => handleColorChange(color)}
                            className="w-8 h-8 rounded border border-white/20 overflow-hidden relative cursor-pointer"
                        />

                        <div className="flex flex-col">
                            <label className="text-[9px] uppercase tracking-widest text-white/40">Position</label>
                            <input
                                type="number"
                                value={stop.offset}
                                onChange={(e) => {
                                    const val = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
                                    onChange(stops.map(s => s.id === stop.id ? { ...s, offset: val } : s));
                                }}
                                className="bg-transparent text-xs font-mono border-b border-white/20 w-12 text-[#D4AF37] focus:outline-none"
                            />
                        </div>
                        <div className="flex-1" />
                        <button
                            onClick={() => handleDeleteStop(stop.id)}
                            disabled={stops.length <= 2}
                            className="p-2 hover:bg-white/10 rounded text-white/50 hover:text-red-400 disabled:opacity-20 transition-colors"
                            title="Delete Stop"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                );
            })()}

            {!activeStopId && (
                <div className="text-[10px] text-white/30 italic text-center py-2">
                    Click track to add stop • Click handle to edit
                </div>
            )}
        </div>
    );
};

export default GradientEditor;
