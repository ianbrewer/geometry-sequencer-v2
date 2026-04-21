import React, { useState, useRef, useEffect } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';

interface CustomColorPickerProps {
    color: string;
    onChange: (color: string) => void;
    className?: string;
}

export const CustomColorPicker: React.FC<CustomColorPickerProps> = ({ color, onChange, className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

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
                    className="absolute right-0 top-6 z-50 p-3 bg-[#1A1A1A] border border-white/10 rounded-lg shadow-2xl flex flex-col gap-3"
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
                </div>
            )}
        </div>
    );
};
