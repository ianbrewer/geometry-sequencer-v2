import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { Eye, EyeOff, GripVertical, Plus, ChevronRight, Square, Trash2, Copy, Edit3, RotateCw, Folder, ChevronDown, FolderPlus, Clipboard, ClipboardPaste } from 'lucide-react';
import type { Layer } from '../types';

type DragType = 'scrub' | 'reorder' | 'move' | 'resize-duration' | 'move-keyframe';

interface DragState {
    type: DragType;
    layerId?: string;
    keyframeId?: string;
    startIndex?: number;
    currentIndex?: number;
    startY?: number;
    startDuration?: number;
    startX?: number;
    initialTimeOffset?: number;
    cachedLayer?: Layer;
}

// Helper interface for flattened tree items
interface VisualLayerItem {
    layer: Layer;
    depth: number;
    hasChildren: boolean;
    isExpanded: boolean;
    isVisible: boolean; // Rendered in list (parent expanded)
}

interface DropTarget {
    targetId: string;
    position: 'above' | 'below' | 'inside';
}

const Timeline: React.FC = () => {
    const {
        project,
        currentTime,
        setCurrentTime,
        activeLayerId,
        setActiveLayerId,
        selectedLayerIds,
        setSelectedLayerIds,
        updateLayer,
        toggleLayerVisibility,
        moveLayer,
        addLayer,
        isPlaying,
        setIsPlaying,
        duplicateLayer,
        deleteLayer,
        updateProject,
        clipboardLayers,
        pasteClipboard,
        activeKeyframeId,
        setActiveKeyframeId,
        updateKeyframe,
        addKeyframe,
        deleteKeyframe,
        addFolder,
        toggleLayerCollapse,
        copySelection,
        isFreshProject,
    } = useStore((state) => state);

    const timelineRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dragState, setDragState] = useState<DragState | null>(null);
    const [dropTarget, setDropTarget] = useState<DropTarget | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [layerToDelete, setLayerToDelete] = useState<string | null>(null);
    const [tempName, setTempName] = useState('');
    const [tempDuration, setTempDuration] = useState(project.duration.toString());

    // --- Resizing Logic (Sidebar) ---
    const [sidebarWidth, setSidebarWidth] = useState(() => {
        const stored = localStorage.getItem('timelineSidebarWidth');
        return stored ? parseInt(stored, 10) : 250;
    });
    const [isResizingSidebar, setIsResizingSidebar] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isResizingSidebar) {
                // Use containerRef for stable coordinate
                const containerLeft = containerRef.current?.getBoundingClientRect().left || 0;
                const newWidth = Math.max(150, Math.min(600, e.clientX - containerLeft));
                setSidebarWidth(newWidth);
            }
        };

        const handleMouseUp = () => {
            if (isResizingSidebar) {
                setIsResizingSidebar(false);
                localStorage.setItem('timelineSidebarWidth', sidebarWidth.toString());
            }
        };

        if (isResizingSidebar) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'col-resize';
        } else {
            document.body.style.cursor = '';
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = '';
        };
    }, [isResizingSidebar, sidebarWidth]);

    // --- Hierarchy Logic ---

    // Build flattened list of visible layers respecting hierarchy
    const visualLayers = useMemo(() => {
        const result: VisualLayerItem[] = [];

        // Helper to find children
        const getChildren = (parentId?: string) => {
            // Filter layers with this parentId
            // We must preserve some order. Currently using array index order.
            return project.layers.filter(l => l.parentId === parentId);
        };

        const traverse = (parentId: string | undefined, depth: number) => {
            const children = getChildren(parentId);
            children.forEach(layer => {
                const layerChildren = getChildren(layer.id);
                const hasChildren = layerChildren.length > 0 || layer.type === 'group';
                const isExpanded = !layer.collapsed;

                result.push({
                    layer,
                    depth,
                    hasChildren,
                    isExpanded,
                    isVisible: true
                });

                if (isExpanded) {
                    traverse(layer.id, depth + 1);
                }
            });
        };

        traverse(undefined, 0);
        return result;
    }, [project.layers]);

    useEffect(() => {
        setTempDuration(project.duration.toString());
    }, [project.duration]);

    const getTimeAtX = (clientX: number, clamp = true) => {
        if (!timelineRef.current) return 0;
        const rect = timelineRef.current.getBoundingClientRect();
        const pos = (clientX - rect.left) / rect.width;
        const clampedPos = clamp ? Math.max(0, Math.min(1, pos)) : Math.max(0.1, pos);
        return clampedPos * project.duration;
    };

    const handleLayerClick = (e: React.MouseEvent, layerId: string, index: number) => {
        e.stopPropagation();

        // Selection Logic
        let newSelection = [...(selectedLayerIds || [])]; // Safety check if initialized

        if (e.metaKey || e.ctrlKey) {
            // Toggle
            if (newSelection.includes(layerId)) {
                newSelection = newSelection.filter(id => id !== layerId);
            } else {
                newSelection.push(layerId);
            }
            if (newSelection.includes(layerId)) {
                setActiveLayerId(layerId);
            }
        } else if (e.shiftKey) {
            // Range Select
            const activeIdx = visualLayers.findIndex(item => item.layer.id === activeLayerId);
            const clickedIdx = index;

            if (activeIdx !== -1 && clickedIdx !== -1) {
                const start = Math.min(activeIdx, clickedIdx);
                const end = Math.max(activeIdx, clickedIdx);
                const range = visualLayers.slice(start, end + 1).map(item => item.layer.id);
                newSelection = Array.from(new Set([...newSelection, ...range]));
            } else {
                newSelection = [layerId];
                setActiveLayerId(layerId);
            }
        } else {
            // Single Select
            newSelection = [layerId];
            setActiveLayerId(layerId);
        }

        setSelectedLayerIds(newSelection);
    };

    const confirmDeleteFolder = () => {
        if (layerToDelete) {
            deleteLayer(layerToDelete);
            setLayerToDelete(null);
        }
    };

    const onMouseDown = (e: React.MouseEvent, type: DragType, layerId?: string, indexOrParams?: any) => {
        e.stopPropagation();

        if (type === 'reorder') {
            // Check if draggable?
            if (layerId) setDragState({ type, layerId });
            return;
        } else if (type === 'move' && layerId) {
            const layer = project.layers.find(l => l.id === layerId);
            const initialTimeOffset = layer ? getTimeAtX(e.clientX) - layer.timeline.start : 0;
            setDragState({ type, layerId, initialTimeOffset });
        } else if (type === 'move-keyframe' && layerId && indexOrParams) {
            const layer = project.layers.find(l => l.id === layerId);

            setDragState({
                type,
                layerId,
                keyframeId: indexOrParams,
                cachedLayer: layer ? JSON.parse(JSON.stringify(layer)) : undefined
            });
        } else {
            setDragState({ type, layerId });
        }

        if (type === 'scrub') {
            setCurrentTime(getTimeAtX(e.clientX));
        } else if (type === 'resize-duration') {
            setDragState({
                type,
                startDuration: project.duration,
                startX: e.clientX
            });
        }
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!dragState) return;

            if (dragState.type === 'scrub') {
                setCurrentTime(getTimeAtX(e.clientX));
            } else if (dragState.type === 'move' && dragState.layerId) {
                const layer = project.layers.find(l => l.id === dragState.layerId);
                if (layer) {
                    const currentTimeAtMouse = getTimeAtX(e.clientX);
                    const offset = dragState.initialTimeOffset || 0;

                    // Calculate proposed new start time based on offset
                    let newStart = currentTimeAtMouse - offset;

                    const duration = layer.timeline.end - layer.timeline.start;

                    // Clamp to valid range
                    newStart = Math.max(0, Math.min(project.duration - duration, newStart));

                    updateLayer(dragState.layerId, { timeline: { start: newStart, end: newStart + duration } });
                }
            } else if (dragState.type === 'reorder' && dragState.layerId) {
                // We need to match Y coordinate to the list rows
                // Rows use h-10 class which is 40px (10 * 4px)
                const ROW_HEIGHT = 40;

                // Calculate index relative to scroll container
                const scrollContainer = scrollContainerRef.current;
                if (!scrollContainer) return;

                const rect = scrollContainer.getBoundingClientRect();
                const sy = scrollContainer.scrollTop;

                // Relative Y within the scroll content
                const relativeY = e.clientY - rect.top + sy;
                const index = Math.floor(relativeY / ROW_HEIGHT);

                if (index >= 0 && index < visualLayers.length) {
                    const targetItem = visualLayers[index];
                    const targetId = targetItem.layer.id;

                    // If dragging over itself, ignore
                    if (targetId === dragState.layerId) {
                        setDropTarget(null);
                        return;
                    }

                    // Check for Circular Reference (Target is descendant of Source)
                    const isDescendant = (parent: string, child: string): boolean => {
                        let current = project.layers.find(l => l.id === child);
                        while (current && current.parentId) {
                            if (current.parentId === parent) return true;
                            current = project.layers.find(l => l.id === current?.parentId);
                        }
                        return false;
                    };

                    if (isDescendant(dragState.layerId, targetId)) {
                        setDropTarget(null);
                        return;
                    }

                    const offsetInRow = relativeY % ROW_HEIGHT;
                    let position: 'above' | 'below' | 'inside' = 'below';

                    if (targetItem.layer.type === 'group') {
                        // Group: Top 25% Above, Middle 50% Inside, Bottom 25% Below
                        if (offsetInRow < ROW_HEIGHT * 0.25) position = 'above';
                        else if (offsetInRow > ROW_HEIGHT * 0.75) position = 'below';
                        else position = 'inside';
                    } else {
                        // Non-Group: 50/50 Split
                        if (offsetInRow < ROW_HEIGHT * 0.5) position = 'above';
                        else position = 'below';
                    }

                    setDropTarget({ targetId, position });
                } else {
                    setDropTarget(null);
                }
            } else if (dragState.type === 'resize-duration' && timelineRef.current) {
                const rect = timelineRef.current.getBoundingClientRect();
                const initialDuration = dragState.startDuration || project.duration;
                const pixelsPerSecond = rect.width / initialDuration;

                // Calculate new duration based on mouse position relative to the start of the timeline
                const newDuration = Math.max(1, (e.clientX - rect.left) / pixelsPerSecond);

                // Adjust layers if needed
                const updatedLayers = project.layers.map(layer => {
                    if (layer.timeline.end > newDuration) {
                        const newStart = Math.min(layer.timeline.start, Math.max(0, newDuration - 0.5));
                        return {
                            ...layer,
                            timeline: {
                                start: newStart,
                                end: newDuration
                            }
                        };
                    }
                    return layer;
                });

                updateProject({
                    duration: newDuration,
                    layers: updatedLayers
                });
            } else if (dragState.type === 'move-keyframe' && dragState.layerId && dragState.keyframeId && dragState.cachedLayer) {
                const layer = dragState.cachedLayer;
                const keyframe = layer?.keyframes.find(k => k.id === dragState.keyframeId);

                if (layer && keyframe) {
                    const rawTime = getTimeAtX(e.clientX);
                    // Snap
                    const rounded = Math.round(rawTime * 10) / 10;
                    let newAbsTime = Math.abs(rawTime - rounded) < 0.05 ? rounded : rawTime;

                    newAbsTime = Math.max(0, Math.min(project.duration, newAbsTime));

                    // Reconstruct absolute times
                    const absoluteTimes = layer.keyframes.map(k => {
                        if (k.id === dragState.keyframeId) return newAbsTime;
                        return layer.timeline.start + k.time;
                    });

                    const newStart = Math.min(...absoluteTimes);
                    const newEnd = Math.max(...absoluteTimes);

                    // Re-map to relative
                    const newKeyframes = layer.keyframes.map((k, idx) => ({
                        ...k,
                        time: absoluteTimes[idx] - newStart
                    })).sort((a, b) => a.time - b.time);

                    updateLayer(dragState.layerId, {
                        timeline: { start: newStart, end: newEnd },
                        keyframes: newKeyframes
                    }, true);
                }
            }
        };

        const handleMouseUp = () => {
            if (dragState?.type === 'reorder' && dropTarget && dragState.layerId) {
                moveLayer(dragState.layerId, dropTarget.targetId, dropTarget.position);
            } else if (dragState?.type === 'move-keyframe' && dragState.layerId && dragState.keyframeId) {
                updateKeyframe(dragState.layerId, dragState.keyframeId, {});
            }
            setDropTarget(null);
            setDragState(null);
        };

        if (dragState) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragState, project.duration, project.layers, setCurrentTime, updateLayer, moveLayer, updateProject, updateKeyframe, dropTarget]);

    const commitDurationChange = () => {
        let newDuration = parseFloat(tempDuration);
        if (isNaN(newDuration) || newDuration < 0.1) {
            setTempDuration(project.duration.toString());
            return;
        }

        // Limit to 1 decimal point
        newDuration = Math.round(newDuration * 10) / 10;
        setTempDuration(newDuration.toString());

        if (newDuration === project.duration) return;

        // Adjust layers if needed (capping their end time to the new duration)
        const updatedLayers = project.layers.map(layer => {
            if (layer.timeline.end > newDuration) {
                const newStart = Math.min(layer.timeline.start, Math.max(0, newDuration - 0.5));
                return {
                    ...layer,
                    timeline: {
                        ...layer.timeline,
                        start: newStart,
                        end: newDuration
                    }
                };
            }
            return layer;
        });

        updateProject({
            duration: newDuration,
            layers: updatedLayers
        });
    };

    return (
        <div ref={containerRef} className="flex-1 flex flex-col relative bg-[#1e1e1e] overflow-hidden select-none">
            {/* Header: Layers Title + Time Markers */}
            <div className="flex border-b border-white/10 bg-black/20">
                <div
                    style={{ width: sidebarWidth }}
                    className="border-r border-white/10 flex items-center px-3 h-8 shrink-0 gap-2 relative group/resize"
                >
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors flex items-center justify-center p-1"
                        title={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? <Square size={12} fill="currentColor" /> : <ChevronRight size={12} fill="currentColor" />}
                    </button>

                    <div className="bg-white/10 w-px h-4 mx-1" />

                    <button
                        onClick={addLayer}
                        className="p-1 hover:bg-white/10 rounded transition-colors text-[#D4AF37]"
                        title="Add Layer"
                    >
                        <Plus size={12} />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (selectedLayerIds && selectedLayerIds.length > 0) {
                                copySelection();
                            }
                        }}
                        className={`p-1 hover:bg-white/10 rounded transition-colors ${selectedLayerIds && selectedLayerIds.length > 0 ? 'text-[#D4AF37]' : 'text-white/20'}`}
                        title="Copy Selected Layers"
                        disabled={!selectedLayerIds || selectedLayerIds.length === 0}
                    >
                        <Clipboard size={12} />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            pasteClipboard();
                        }}
                        className={`p-1 hover:bg-white/10 rounded transition-colors ${clipboardLayers && clipboardLayers.length > 0 ? 'text-[#D4AF37]' : 'text-white/20'}`}
                        title="Paste Layers"
                        disabled={!clipboardLayers || clipboardLayers.length === 0}
                    >
                        <ClipboardPaste size={12} />
                    </button>

                    <div className="bg-white/10 w-px h-4 mx-1" />

                    <button
                        onClick={addFolder}
                        className="p-1 hover:bg-white/10 rounded transition-colors text-[#D4AF37]"
                        title="Add Folder"
                    >
                        <FolderPlus size={12} />
                    </button>

                    <div className="bg-white/10 w-px h-4 mx-1" />

                    {/* Resize Handle (Sidebar) - Only visible/active on hover of the header area */}
                    <div
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-[#D4AF37]/50 z-50 transition-colors opacity-0 group-hover/resize:opacity-100 flex items-center justify-center"
                        onMouseDown={() => setIsResizingSidebar(true)}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-[1px] h-4 bg-[#D4AF37]/40" />
                    </div>
                </div>

                {/* Timeline Header (Ruler) */}
                <div className="flex-1 h-8 relative overflow-hidden">
                    <div
                        ref={timelineRef}
                        className="absolute inset-0 cursor-pointer"
                        onMouseDown={(e) => onMouseDown(e, 'scrub')}
                        onDoubleClick={(e) => {
                            e.stopPropagation();
                            setCurrentTime(getTimeAtX(e.clientX));
                        }}
                    >
                        {Array.from({ length: Math.ceil(project.duration) * 2 + 1 }).map((_, i) => {
                            const time = i * 0.5;
                            const isWholeSecond = time % 1 === 0;
                            if (time > project.duration) return null;

                            return (
                                <div
                                    key={i}
                                    className={`absolute top-0 bottom-0 w-px pointer-events-none transition-colors ${isWholeSecond ? 'bg-white/20' : 'bg-white/5 h-1/2 mt-auto'}`}
                                    style={{ left: `${(time / project.duration) * 100}%` }}
                                >
                                    {isWholeSecond && (
                                        <div className="text-[9px] font-bold text-white/40 ml-1.5 mt-1 tracking-tighter">
                                            {Math.floor(time)}s
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* Playhead */}
                        <div
                            className="absolute top-0 bottom-0 w-[1px] bg-[#D4AF37] z-10 pointer-events-none"
                            style={{ left: `${(currentTime / project.duration) * 100}%` }}
                        >
                            <div className="absolute top-0 -translate-x-1/2 -mt-[2px] text-[#D4AF37]">
                                <ChevronDown size={12} fill="currentColor" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scrollable Content Area */}
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden relative">
                {/* Layer List & Tracks */}
                <div className="min-w-full">
                    {visualLayers.map((item, index) => {
                        const { layer, depth, hasChildren, isExpanded, isVisible } = item;
                        if (!isVisible) return null;

                        const isSelected = selectedLayerIds?.includes(layer.id) || activeLayerId === layer.id;

                        // Drop Target Indicator
                        const isDropTarget = dropTarget?.targetId === layer.id;
                        let dropStyle = '';
                        if (isDropTarget) {
                            if (dropTarget?.position === 'above') dropStyle = 'border-t-[2px] border-t-[#D4AF37]';
                            else if (dropTarget?.position === 'below') dropStyle = 'border-b-[2px] border-b-[#D4AF37]';
                            else if (dropTarget?.position === 'inside') dropStyle = 'bg-[#D4AF37]/20';
                        }

                        return (
                            <div
                                key={layer.id}
                                className={`flex h-10 border-b border-white/5 relative group transition-colors ${isSelected ? 'bg-white/[0.08]' : 'hover:bg-white/[0.02]'
                                    } ${dropStyle}`}
                                onClick={(e) => handleLayerClick(e, layer.id, index)}
                                onDoubleClick={(e) => {
                                    e.stopPropagation();

                                    // Move playhead to double-click position
                                    const clickedTime = getTimeAtX(e.clientX);
                                    setCurrentTime(clickedTime);

                                    // Keyframe management
                                    const threshold = 0.05; // 50ms threshold for deletion
                                    const existing = layer.keyframes.find(kf => Math.abs((layer.timeline.start + kf.time) - clickedTime) < threshold);

                                    if (existing) {
                                        // Delete if exists and not the only one? Or let user decide?
                                        // The requirement says "Double clicking on an existing keyframe should remove it"
                                        deleteKeyframe(layer.id, existing.id);
                                    } else {
                                        addKeyframe(layer.id, clickedTime);
                                    }
                                }}
                            >
                                {/* Layer Info Sidebar Item */}
                                <div style={{ width: sidebarWidth }} className="border-r border-white/10 flex items-center h-full shrink-0 bg-black/10 group/sidebar z-10 relative">

                                    {/* Drag Handle (Left Edge, Hover Only) */}
                                    <div
                                        className="w-6 h-full flex items-center justify-center cursor-grab active:cursor-grabbing text-white/10 group-hover:text-white/40 transition-colors opacity-0 group-hover:opacity-100 hover:!text-[#D4AF37]"
                                        onMouseDown={(e) => onMouseDown(e, 'reorder', layer.id, index)}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <GripVertical size={12} />
                                    </div>

                                    {/* Indentation */}
                                    <div style={{ width: depth * 10 }} className="shrink-0" />

                                    {/* Collapse Chevron (for Groups/Parents) */}
                                    <div
                                        className={`w-4 flex items-center justify-center text-white/40 hover:text-white cursor-pointer ${!hasChildren ? 'opacity-0 pointer-events-none' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleLayerCollapse(layer.id);
                                        }}
                                    >
                                        {isExpanded ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
                                    </div>

                                    {/* Per-Layer Loop Toggle */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            updateLayer(layer.id, { config: { ...layer.config, loopIndependently: !layer.config.loopIndependently } });
                                        }}
                                        className={`w-6 flex items-center justify-center transition-all ${layer.config.loopIndependently
                                            ? 'text-[#D4AF37] opacity-100'
                                            : 'text-white/40 opacity-0 group-hover:opacity-100 hover:text-white'
                                            }`}
                                        title={layer.config.loopIndependently ? 'Looping On' : 'Looping Off'}
                                    >
                                        <RotateCw size={10} />
                                    </button>

                                    {/* Visibility Toggle */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleLayerVisibility(layer.id);
                                        }}
                                        className={`w-6 flex items-center justify-center transition-colors ${layer.visible ? 'text-[#D4AF37]' : 'text-white/20'}`}
                                        title={layer.visible ? 'Hide Layer' : 'Show Layer'}
                                    >
                                        {layer.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                                    </button>

                                    {/* Group Icon (if group) */}
                                    {layer.type === 'group' && (
                                        <div className="mr-1 text-[#D4AF37]">
                                            <Folder size={12} />
                                        </div>
                                    )}

                                    {/* Layer Name */}
                                    <div className="flex-1 flex items-center min-w-0 pr-2">
                                        {editingId === layer.id ? (
                                            <input
                                                autoFocus
                                                className="bg-black/40 border border-[#D4AF37]/50 rounded text-[10px] text-[#D4AF37] px-1 py-0.5 w-full outline-none"
                                                value={tempName}
                                                onChange={(e) => setTempName(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        updateLayer(layer.id, { name: tempName });
                                                        setEditingId(null);
                                                    } else if (e.key === 'Escape') {
                                                        setEditingId(null);
                                                    }
                                                }}
                                                onBlur={() => {
                                                    updateLayer(layer.id, { name: tempName });
                                                    setEditingId(null);
                                                }}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        ) : (
                                            <div
                                                className="flex-1 flex items-center min-w-0 gap-1 group/name cursor-text"
                                                onDoubleClick={(e) => {
                                                    e.stopPropagation();
                                                    setEditingId(layer.id);
                                                    setTempName(layer.name);
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleLayerClick(e, layer.id, index);
                                                }}
                                            >
                                                <span className={`text-[10px] font-medium truncate ${activeLayerId === layer.id ? 'text-[#D4AF37]' : 'text-white/60'} group-hover/name:text-white transition-colors`}>
                                                    {layer.name}
                                                </span>

                                                <Edit3 size={8} className="text-white/20 opacity-0 group-hover/name:opacity-100 transition-opacity" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Quick Actions (Hover) */}
                                    <div className="flex items-center gap-0 opacity-0 group-hover/sidebar:opacity-100 transition-opacity pr-1 absolute right-0 h-full">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                duplicateLayer(layer.id);
                                            }}
                                            className="p-1 px-2 text-white/20 hover:text-[#D4AF37] transition-colors"
                                            title="Duplicate Layer"
                                        >
                                            <Copy size={10} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const hasChildren = project.layers.some(l => l.parentId === layer.id);
                                                if (layer.type === 'group' && hasChildren) {
                                                    setLayerToDelete(layer.id);
                                                } else {
                                                    deleteLayer(layer.id);
                                                }
                                            }}
                                            className="p-1 px-2 text-white/20 hover:text-red-400 transition-colors"
                                            title="Delete Layer"
                                        >
                                            <Trash2 size={10} />
                                        </button>
                                    </div>
                                </div>

                                {/* Timeline Track */}
                                <div className="flex-1 relative border-l border-white/5 h-full" title="double-click to add keyframe.">
                                    {/* Layer Duration Bar */}
                                    <div
                                        className={`absolute h-6 top-2 rounded-sm cursor-grab active:cursor-grabbing overflow-hidden ${layer.type === 'group' ? 'bg-[#D4AF37]/20 border border-[#D4AF37]/30' : 'bg-white/10 hover:bg-white/15'}`}
                                        style={{
                                            left: `${(layer.timeline.start / project.duration) * 100}%`,
                                            width: `${((layer.timeline.end - layer.timeline.start) / project.duration) * 100}%`
                                        }}
                                        onMouseDown={(e) => onMouseDown(e, 'move', layer.id)}
                                    >
                                        {/* Label logic - just simple name for now if wide enough */}
                                    </div>

                                    {/* Keyframes */}
                                    {layer.keyframes.map(kf => {
                                        const isKfSelected = activeKeyframeId === kf.id;
                                        const isOnboardingPulse = isFreshProject
                                            && layer.id === project.layers[0]?.id
                                            && kf.id === project.layers[0]?.keyframes[0]?.id;
                                        return (
                                            <div
                                                key={kf.id}
                                                className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rotate-45 border cursor-pointer transition-colors z-20 ${isKfSelected ? 'bg-[#D4AF37] border-[#D4AF37] scale-125' : 'bg-[#1e1e1e] border-white/40 hover:border-white'} ${isOnboardingPulse ? 'fresh-keyframe-pulse' : ''}`}
                                                style={{
                                                    left: `${((layer.timeline.start + kf.time) / project.duration) * 100}%`
                                                }}
                                                title="double-click to delete keyframe."
                                                onMouseDown={(e) => onMouseDown(e, 'move-keyframe', layer.id, kf.id)}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveKeyframeId(kf.id, layer.id);
                                                }}
                                                onDoubleClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteKeyframe(layer.id, kf.id);
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}

                    {/* Add Button at bottom if empty? */}
                </div>

                {/* Spacer at bottom */}
                <div className="h-20" />
            </div>

            {/* Footer / Status Bar - Optional */}
            <div className="border-t border-white/10 bg-black/20 h-6 flex items-center px-2 text-[10px] text-white/40 gap-4">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded border border-white/5 hover:border-white/10 transition-colors group/duration">
                    <span className="text-[9px] uppercase font-bold text-white/30 group-hover/duration:text-white/50 transition-colors">Duration</span>
                    <div className="flex items-center gap-0.5">
                        <input
                            type="number"
                            className="bg-transparent text-[#D4AF37] w-10 text-[10px] font-bold outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-right"
                            value={tempDuration}
                            onChange={(e) => setTempDuration(e.target.value)}
                            onBlur={commitDurationChange}
                            onKeyDown={(e) => e.key === 'Enter' && commitDurationChange()}
                        />
                        <span className="text-[9px] font-bold text-white/20">s</span>
                    </div>
                </div>
                <div className="flex-1" />
                <div>{selectedLayerIds ? selectedLayerIds.length : 0} Selected</div>
            </div>

            {/* Delete Folder Modal */}
            {layerToDelete && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#1e1e1e] border border-white/10 p-6 rounded-lg w-[400px] shadow-2xl flex flex-col gap-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                                <Trash2 className="text-red-500" size={20} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Delete Folder</h3>
                                <p className="text-white/60 text-xs mt-1">This action cannot be undone.</p>
                            </div>
                        </div>

                        <div className="text-sm text-white/80 leading-relaxed bg-white/5 p-4 rounded-md border border-white/5">
                            Are you sure you want to delete <strong className="text-white">{project.layers.find(l => l.id === layerToDelete)?.name}</strong>?
                            <br /><br />
                            This folder contains <strong className="text-red-400">{project.layers.filter(l => l.parentId === layerToDelete).length}</strong> layers. All contained layers and their keyframes and animations will also be permanently deleted.
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                                onClick={() => setLayerToDelete(null)}
                                className="px-4 py-2 rounded font-bold text-xs uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDeleteFolder}
                                className="px-6 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] active:scale-95"
                            >
                                Delete Everything
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Timeline;
