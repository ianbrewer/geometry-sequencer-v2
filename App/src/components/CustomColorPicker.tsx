import React, { useState, useRef, useEffect } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { Plus, X } from 'lucide-react';
import { useStore } from '../store/useStore';

interface CustomColorPickerProps {
    color: string;
    onChange: (color: string) => void;
    className?: string;
}

export const CustomColorPicker: React.FC<CustomColorPickerProps> = ({ color, onChange, className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);
    const savedColors = useStore((s) => s.savedColors);
    const addSavedColor = useStore((s) => s.addSavedColor);
    const deleteSavedColor = useStore((s) => s.deleteSavedColor);

    // Close the popover when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const isCurrentSaved = savedColors.some((c) => c.color.toLowerCase() === color.toLowerCase());

    return (
        <div className="relative">
            <button
                className={`w-4 h-4 rounded overflow-hidden cursor-pointer border-0 p-0 ${className}`}
                style={{ backgroundColor: color }}
                onClick={() => setIsOpen(!isOpen)}
                title="Choose Color"
            />

            {isOpen && (
                <div
                    ref={popoverRef}
                    className="absolute right-0 top-6 z-50 p-3 bg-[#1A1A1A] border border-white/10 rounded-lg shadow-2xl flex flex-col gap-3 w-[224px]"
                >
                    <HexColorPicker color={color} onChange={onChange} />

                    <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">HEX</span>
                        <HexColorInput
                            color={color}
                            onChange={onChange}
                            prefixed
                            className="w-full bg-black/30 text-[10px] text-white p-1.5 rounded border border-white/10 focus:outline-none focus:border-white/30 font-mono uppercase"
                        />
                    </div>

                    {/* Saved palette */}
                    <div className="border-t border-white/5 pt-2">
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[9px] uppercase font-bold text-white/40 tracking-widest">Saved</span>
                            <button
                                onClick={(e) => { e.stopPropagation(); addSavedColor(color); }}
                                disabled={isCurrentSaved}
                                title={isCurrentSaved ? 'Already saved' : 'Save current color'}
                                className="p-1 rounded text-white/40 hover:text-white hover:bg-white/5 disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-white/40"
                            >
                                <Plus size={11} />
                            </button>
                        </div>
                        {savedColors.length === 0 ? (
                            <div className="text-[9px] text-white/20 italic">No saved colors yet</div>
                        ) : (
                            <div className="grid grid-cols-8 gap-1">
                                {savedColors.map((c) => (
                                    <div key={c.id} className="relative group">
                                        <button
                                            onClick={() => onChange(c.color)}
                                            className="w-5 h-5 rounded border border-white/10 hover:border-white/40 hover:scale-110 transition-all"
                                            style={{ backgroundColor: c.color }}
                                            title={c.color}
                                        />
                                        <button
                                            onClick={(e) => { e.stopPropagation(); deleteSavedColor(c.id); }}
                                            className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-black/80 text-white/80 opacity-0 group-hover:opacity-100 hover:bg-red-500 flex items-center justify-center transition-opacity"
                                            title="Delete"
                                        >
                                            <X size={8} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
