import React from 'react';
import { useStore } from '../store/useStore';
import { Eye, EyeOff, Plus, Layers as LayersIcon, CornerDownLeft, Repeat } from 'lucide-react';

const LayerStack: React.FC = () => {
    const { project, activeLayerId, setActiveLayerId, addLayer, toggleLayerVisibility, clipboardLayers, pasteClipboard } = useStore();

    return (
        <div className="w-[240px] border-r border-white/10 flex flex-col bg-black/10 shrink-0">
            <div className="p-3 border-b border-white/5 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-2">
                    <LayersIcon size={12} className="text-[#D4AF37]" />
                    <h2 className="text-[9px] uppercase font-bold tracking-widest text-white/60">Layers</h2>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => clipboardLayers && clipboardLayers.length > 0 && pasteClipboard()}
                        className={`w-7 h-7 flex items-center justify-center rounded transition-all border ${clipboardLayers && clipboardLayers.length > 0
                            ? 'bg-[#D4AF37] border-[#D4AF37] text-black hover:bg-[#F2D06B] shadow-sm shadow-black/50'
                            : 'bg-white/10 border-white/10 text-white/50 cursor-not-allowed'
                            }`}
                        title={clipboardLayers && clipboardLayers.length > 0 ? "Paste Layers" : "Copy layers first to paste"}
                    >
                        <CornerDownLeft size={14} />
                    </button>
                    <button
                        onClick={addLayer}
                        className="p-1 hover:bg-white/10 rounded transition-colors text-[#D4AF37]"
                        title="Add Layer"
                    >
                        <Plus size={14} />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-none">
                {project.layers.map((layer) => (
                    <div
                        key={layer.id}
                        onClick={() => {
                            setActiveLayerId(layer.id);
                            useStore.getState().setSelectedLayerIds([layer.id]);
                        }}
                        className={`flex items-center gap-3 px-3 py-4 cursor-pointer transition-colors border-b border-white/5 group ${activeLayerId === layer.id ? 'bg-[#D4AF37]/10' : 'hover:bg-white/5'
                            }`}
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleLayerVisibility(layer.id);
                            }}
                            className={`p-1 transition-colors ${layer.visible ? 'text-[#D4AF37]' : 'text-white/20'
                                }`}
                        >
                            {layer.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                        </button>
                        <span className={`text-[10px] font-medium tracking-wide truncate flex-1 ${activeLayerId === layer.id ? 'text-[#D4AF37]' : 'text-white/60'
                            }`}>
                            {layer.name}
                        </span>
                        {layer.config.loopIndependently && (
                            <Repeat size={10} className="text-[#D4AF37] opacity-80" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LayerStack;
