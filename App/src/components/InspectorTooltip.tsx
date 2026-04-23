import React, { createContext, useContext, useState } from 'react';

const TooltipContext = createContext<{
    tooltip: string | null;
    setTooltip: (t: string | null) => void;
}>({ tooltip: null, setTooltip: () => {} });

export const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tooltip, setTooltip] = useState<string | null>(null);
    return (
        <TooltipContext.Provider value={{ tooltip, setTooltip }}>
            {children}
        </TooltipContext.Provider>
    );
};

export const useInspectorTooltip = () => useContext(TooltipContext);

export const TooltipOverlay: React.FC = () => {
    const { tooltip } = useInspectorTooltip();
    if (!tooltip) return null;
    return (
        <div className="absolute bottom-3 right-3 max-w-[360px] bg-black/85 text-white/90 text-[10px] px-2.5 py-1.5 rounded border border-white/10 pointer-events-none z-30 leading-snug">
            {tooltip}
        </div>
    );
};
