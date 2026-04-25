import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    FolderPlus,
    Folder as FolderIcon,
    Trash2,
    Edit2,
    Upload,
    Image as ImageIcon,
    Loader2,
    AlertCircle,
} from 'lucide-react';
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    closestCenter,
    type DragEndEvent,
} from '@dnd-kit/core';
import {
    SortableContext,
    rectSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useStore } from '../store/useStore';
import type { Asset, AssetFolder, AssetMimeType } from '../types';

const ALLOWED: AssetMimeType[] = ['image/svg+xml', 'image/png', 'image/jpeg'];

type UploadState =
    | { status: 'pending'; name: string }
    | { status: 'uploading'; name: string }
    | { status: 'done'; name: string }
    | { status: 'error'; name: string; reason: string };

type ThumbState = { status: 'loading' } | { status: 'ready'; url: string } | { status: 'failed' };

const Thumbnail = ({ asset }: { asset: Asset }) => {
    const signedUrlForAsset = useStore(s => s.signedUrlForAsset);
    const [state, setState] = useState<ThumbState>({ status: 'loading' });

    useEffect(() => {
        let cancelled = false;
        signedUrlForAsset(asset.id).then(u => {
            if (cancelled) return;
            setState(u ? { status: 'ready', url: u } : { status: 'failed' });
        });
        return () => { cancelled = true; };
    }, [asset.id, signedUrlForAsset]);

    const failed = state.status === 'failed';
    const url = state.status === 'ready' ? state.url : null;
    const setFailed = (v: boolean) => { if (v) setState({ status: 'failed' }); };

    if (failed) {
        return (
            <div className="w-full h-full flex items-center justify-center text-white/20">
                <AlertCircle size={16} />
            </div>
        );
    }
    if (!url) {
        return (
            <div className="w-full h-full flex items-center justify-center text-white/20">
                <Loader2 size={14} className="animate-spin" />
            </div>
        );
    }
    return (
        <img
            src={url}
            alt={asset.name}
            className="w-full h-full object-contain"
            onError={() => setFailed(true)}
        />
    );
};

const FolderRow = ({
    folder,
    count,
    selected,
    onSelect,
    onRename,
    onDelete,
}: {
    folder: AssetFolder;
    count: number;
    selected: boolean;
    onSelect: () => void;
    onRename: (name: string) => void;
    onDelete: () => void;
}) => {
    const [renaming, setRenaming] = useState(false);
    const [name, setName] = useState(folder.name);

    const submit = () => {
        const trimmed = name.trim();
        if (trimmed && trimmed !== folder.name) onRename(trimmed);
        setRenaming(false);
    };

    return (
        <div
            onClick={onSelect}
            className={`group flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors ${selected
                ? 'bg-[#252525] border border-[#D4AF37]/50'
                : 'bg-transparent border border-transparent hover:bg-[#252525]'
                }`}
        >
            <FolderIcon size={14} className={selected ? 'text-[#D4AF37]' : 'text-white/40'} />
            {renaming ? (
                <input
                    autoFocus
                    className="flex-1 bg-[#1a1a1a] border border-[#D4AF37]/50 rounded px-2 py-0.5 text-xs focus:outline-none"
                    value={name}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={submit}
                    onKeyDown={(e) => {
                        e.stopPropagation();
                        if (e.key === 'Enter') submit();
                        if (e.key === 'Escape') { setRenaming(false); setName(folder.name); }
                    }}
                />
            ) : (
                <>
                    <span
                        className={`flex-1 text-xs truncate ${selected ? 'text-white' : 'text-white/70 group-hover:text-white'}`}
                        onDoubleClick={(e) => { e.stopPropagation(); setRenaming(true); setName(folder.name); }}
                        title="Double-click to rename"
                    >
                        {folder.name}
                    </span>
                    <span className="text-[10px] text-white/30">{count}</span>
                    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            className="p-1 text-white/30 hover:text-white"
                            onClick={(e) => { e.stopPropagation(); setRenaming(true); setName(folder.name); }}
                            title="Rename folder"
                        >
                            <Edit2 size={11} />
                        </button>
                        <button
                            className="p-1 text-white/30 hover:text-red-400"
                            onClick={(e) => { e.stopPropagation(); onDelete(); }}
                            title="Delete folder"
                        >
                            <Trash2 size={11} />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

const AssetLibrary: React.FC = () => {
    const assetFolders = useStore(s => s.assetFolders);
    const assetsByFolder = useStore(s => s.assetsByFolder);
    const fetchAssetFolders = useStore(s => s.fetchAssetFolders);
    const fetchAssets = useStore(s => s.fetchAssets);
    const createAssetFolder = useStore(s => s.createAssetFolder);
    const renameAssetFolder = useStore(s => s.renameAssetFolder);
    const deleteAssetFolder = useStore(s => s.deleteAssetFolder);
    const uploadAsset = useStore(s => s.uploadAsset);
    const deleteAsset = useStore(s => s.deleteAsset);
    const reorderAssets = useStore(s => s.reorderAssets);

    // Distance activation keeps a plain click on the delete button from becoming a drag.
    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const startIndex = currentAssets.findIndex(a => a.id === active.id);
        const endIndex = currentAssets.findIndex(a => a.id === over.id);
        if (startIndex === -1 || endIndex === -1) return;
        reorderAssets(selectedFolderId, startIndex, endIndex);
    };

    // null means the virtual "Unfiled" folder (folder_id IS NULL in DB).
    const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploads, setUploads] = useState<UploadState[]>([]);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [folderToDelete, setFolderToDelete] = useState<{ folder: AssetFolder; count: number } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Initial hydration
    useEffect(() => {
        fetchAssetFolders();
        fetchAssets(null); // unfiled
    }, [fetchAssetFolders, fetchAssets]);

    // When a folder is selected, ensure its assets are loaded.
    useEffect(() => {
        fetchAssets(selectedFolderId);
    }, [selectedFolderId, fetchAssets]);

    const currentAssets = useMemo(() => {
        const key = selectedFolderId ?? '';
        return assetsByFolder[key] || [];
    }, [assetsByFolder, selectedFolderId]);

    const handleUploadFiles = async (files: File[]) => {
        if (files.length === 0) return;

        // Mixed-MIME rejection (per plan decision).
        const mimes = new Set(files.map(f => f.type));
        const allowedMimes = [...mimes].filter(m => ALLOWED.includes(m as AssetMimeType));
        const disallowed = [...mimes].filter(m => !ALLOWED.includes(m as AssetMimeType));
        if (disallowed.length > 0) {
            setErrorMsg(`Rejected — unsupported types: ${disallowed.join(', ')}. Allowed: SVG, PNG, JPEG.`);
            return;
        }
        if (allowedMimes.length > 1) {
            setErrorMsg(`Rejected — mixed types (${allowedMimes.join(', ')}). A folder must be all-SVG or all-raster.`);
            return;
        }

        setErrorMsg(null);
        const queue: UploadState[] = files.map(f => ({ status: 'pending', name: f.name }));
        setUploads(queue);

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            setUploads(u => u.map((s, idx) => idx === i ? { status: 'uploading', name: file.name } : s));
            try {
                const result = await uploadAsset(selectedFolderId, file);
                setUploads(u => u.map((s, idx) => idx === i
                    ? (result ? { status: 'done', name: file.name } : { status: 'error', name: file.name, reason: 'upload failed' })
                    : s));
            } catch (e) {
                const msg = e instanceof Error ? e.message : 'upload failed';
                setUploads(u => u.map((s, idx) => idx === i ? { status: 'error', name: file.name, reason: msg } : s));
            }
        }

        // Auto-clear completed upload list after a brief delay.
        setTimeout(() => setUploads([]), 3000);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = Array.from(e.dataTransfer.files).filter(f => f.size > 0);
        await handleUploadFiles(files);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        if (!isDragOver) setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        // Only clear when leaving the outer container.
        if (e.currentTarget === e.target) setIsDragOver(false);
    };

    const handleFilePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        await handleUploadFiles(files);
        e.target.value = '';
    };

    const handleNewFolder = async () => {
        const id = await createAssetFolder('New Folder');
        if (id) setSelectedFolderId(id);
    };

    const selectedFolder = assetFolders.find(f => f.id === selectedFolderId) || null;

    return (
        <div className="flex-1 flex flex-col min-h-0">
            {/* Folder list header */}
            <div className="flex items-center justify-between px-2 mb-2">
                <span className="text-[10px] uppercase tracking-widest text-white/40">Folders</span>
                <button
                    onClick={handleNewFolder}
                    className="p-1 text-white/40 hover:text-[#D4AF37] transition-colors"
                    title="New asset folder"
                >
                    <FolderPlus size={14} />
                </button>
            </div>

            {/* Folder list */}
            <div className="space-y-0.5 mb-4">
                <div
                    onClick={() => setSelectedFolderId(null)}
                    className={`group flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors ${selectedFolderId === null
                        ? 'bg-[#252525] border border-[#D4AF37]/50'
                        : 'bg-transparent border border-transparent hover:bg-[#252525]'
                        }`}
                >
                    <FolderIcon size={14} className={selectedFolderId === null ? 'text-[#D4AF37]' : 'text-white/40'} />
                    <span className={`flex-1 text-xs truncate italic ${selectedFolderId === null ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                        Unfiled
                    </span>
                    <span className="text-[10px] text-white/30">{(assetsByFolder[''] || []).length}</span>
                </div>
                {assetFolders.map(folder => (
                    <FolderRow
                        key={folder.id}
                        folder={folder}
                        count={(assetsByFolder[folder.id] || []).length}
                        selected={folder.id === selectedFolderId}
                        onSelect={() => setSelectedFolderId(folder.id)}
                        onRename={(name) => renameAssetFolder(folder.id, name)}
                        onDelete={() => setFolderToDelete({ folder, count: (assetsByFolder[folder.id] || []).length })}
                    />
                ))}
                {assetFolders.length === 0 && (
                    <div className="text-[10px] text-white/30 italic px-2 py-1">No folders yet. Create one to organize assets.</div>
                )}
            </div>

            {/* Current folder label + upload button */}
            <div className="flex items-center justify-between px-2 mb-2">
                <span className="text-[10px] uppercase tracking-widest text-white/40 truncate">
                    {selectedFolder ? selectedFolder.name : 'Unfiled'}
                </span>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                    <Upload size={11} /> Upload
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".svg,.png,.jpg,.jpeg,image/svg+xml,image/png,image/jpeg"
                    className="hidden"
                    onChange={handleFilePick}
                />
            </div>

            {/* Error / upload status */}
            {errorMsg && (
                <div className="mx-2 mb-2 flex items-start gap-2 p-2 rounded bg-red-500/10 border border-red-500/30 text-red-300 text-[10px]">
                    <AlertCircle size={12} className="mt-0.5 flex-shrink-0" />
                    <span className="flex-1">{errorMsg}</span>
                    <button onClick={() => setErrorMsg(null)} className="text-red-300/70 hover:text-red-200">×</button>
                </div>
            )}
            {uploads.length > 0 && (
                <div className="mx-2 mb-2 space-y-1">
                    {uploads.map((u, i) => (
                        <div key={i} className="flex items-center gap-2 text-[10px] text-white/60">
                            {u.status === 'uploading' && <Loader2 size={10} className="animate-spin text-[#D4AF37]" />}
                            {u.status === 'done' && <span className="text-[#D4AF37]">✓</span>}
                            {u.status === 'error' && <AlertCircle size={10} className="text-red-400" />}
                            {u.status === 'pending' && <span className="text-white/30">…</span>}
                            <span className="flex-1 truncate">{u.name}</span>
                            {u.status === 'error' && <span className="text-red-400 text-[9px]">{u.reason}</span>}
                        </div>
                    ))}
                </div>
            )}

            {/* Asset grid + drop zone */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`flex-1 mx-2 rounded border-2 border-dashed transition-colors overflow-y-auto p-2 ${isDragOver
                    ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                    : 'border-white/5'
                    }`}
            >
                {currentAssets.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-white/20 pointer-events-none">
                        <ImageIcon size={28} className="mb-2 opacity-50" />
                        <p className="text-[10px] uppercase tracking-widest">Drop files here</p>
                        <p className="text-[9px] mt-1">SVG, PNG, or JPEG</p>
                    </div>
                ) : (
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={currentAssets.map(a => a.id)} strategy={rectSortingStrategy}>
                            <div className="grid grid-cols-3 gap-2">
                                {currentAssets.map(asset => (
                                    <AssetTile key={asset.id} asset={asset} onDelete={() => deleteAsset(asset.id)} />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}
            </div>

            {/* Folder-delete confirmation modal */}
            {folderToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm pointer-events-auto">
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 w-[420px] shadow-2xl">
                        <h3 className="text-xl font-bold text-white mb-2">Delete Asset Folder</h3>
                        <p className="text-white/70 mb-6 text-sm">
                            Delete <span className="font-bold text-[#D4AF37]">{folderToDelete.folder.name}</span>?
                            {folderToDelete.count > 0 ? (
                                <> It contains {folderToDelete.count} asset{folderToDelete.count === 1 ? '' : 's'}. You can keep them (moved to Unfiled) or delete them permanently.</>
                            ) : (
                                <> It's empty.</>
                            )}
                        </p>
                        <div className="flex flex-wrap gap-2 justify-end">
                            <button
                                onClick={() => setFolderToDelete(null)}
                                className="px-4 py-2 rounded text-white/70 hover:text-white hover:bg-white/5 transition-colors text-sm font-bold"
                            >
                                Cancel
                            </button>
                            {folderToDelete.count > 0 && (
                                <button
                                    onClick={async () => {
                                        await deleteAssetFolder(folderToDelete.folder.id, false);
                                        if (selectedFolderId === folderToDelete.folder.id) setSelectedFolderId(null);
                                        setFolderToDelete(null);
                                    }}
                                    className="px-4 py-2 rounded text-sm font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10"
                                >
                                    Keep Assets
                                </button>
                            )}
                            <button
                                onClick={async () => {
                                    await deleteAssetFolder(folderToDelete.folder.id, folderToDelete.count > 0);
                                    if (selectedFolderId === folderToDelete.folder.id) setSelectedFolderId(null);
                                    setFolderToDelete(null);
                                }}
                                className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded transition-colors text-sm font-bold border border-red-500/20 hover:border-red-500"
                            >
                                {folderToDelete.count > 0 ? 'Delete Everything' : 'Delete Folder'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const AssetTile = ({ asset, onDelete }: { asset: Asset; onDelete: () => void }) => {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: asset.id });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
        zIndex: isDragging ? 10 : undefined,
    };

    const stopDrag = (e: React.PointerEvent) => e.stopPropagation();

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="group relative aspect-square rounded border border-white/5 bg-[#252525] overflow-hidden hover:border-[#D4AF37]/50 transition-colors cursor-grab active:cursor-grabbing touch-none"
        >
            {/* SVGs sit on a flat 50% gray so both black- and white-stroke art read clearly.
                Rasters keep a checkerboard so transparency is visible. */}
            <div
                className="absolute inset-0 p-2 pointer-events-none"
                style={asset.mimeType === 'image/svg+xml'
                    ? { backgroundColor: '#808080' }
                    : {
                        backgroundColor: '#8a8a8a',
                        backgroundImage: 'conic-gradient(#6f6f6f 25%, transparent 0 50%, #6f6f6f 0 75%, transparent 0)',
                        backgroundSize: '12px 12px',
                    }}
            >
                <Thumbnail asset={asset} />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-2 py-1 pointer-events-none">
                <p className="text-[9px] text-white/70 truncate" title={asset.name}>{asset.name}</p>
            </div>
            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity" onPointerDown={stopDrag}>
                {confirmDelete ? (
                    <div className="flex items-center gap-1 bg-black/80 rounded px-1 py-0.5">
                        <button
                            onClick={onDelete}
                            className="text-[9px] text-red-400 font-bold hover:underline"
                        >
                            DEL
                        </button>
                        <button
                            onClick={() => setConfirmDelete(false)}
                            className="text-[9px] text-white/50 hover:text-white"
                        >
                            ×
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setConfirmDelete(true)}
                        className="p-1 rounded bg-black/60 text-white/70 hover:text-red-400"
                        title="Delete asset"
                    >
                        <Trash2 size={10} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default AssetLibrary;
