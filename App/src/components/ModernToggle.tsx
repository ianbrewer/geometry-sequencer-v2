import React from 'react';

export const ModernToggle: React.FC<{
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    className?: string;
}> = ({ checked, onChange, label, icon, disabled, className }) => (
    <div
        className={`flex items-center gap-2 cursor-pointer group select-none ${disabled ? 'opacity-40 pointer-events-none' : ''} ${className || ''}`}
        onClick={() => onChange(!checked)}
    >
        <div className={`w-7 h-4 rounded-full relative transition-all duration-200 ${checked ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'}`}>
            <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all duration-200 ${checked ? 'left-[15px] bg-white' : 'left-0.5 border border-white/30 bg-transparent'} shadow-md`} />
        </div>
        {(icon || label) && (
            <div className="flex items-center gap-1.5">
                {icon && React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement, {
                    size: 10,
                    className: `transition-colors duration-200 ${checked ? 'text-white/90' : 'text-white/30 group-hover:text-white/50'}`
                } as any)}
                {label && (
                    <span className={`text-[9px] font-bold tracking-[0.15em] transition-colors duration-200 ${checked ? 'text-white/90' : 'text-white/30 group-hover:text-white/50'}`}>
                        {label}
                    </span>
                )}
            </div>
        )}
    </div>
);
