import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import type { ProjectMetadata, Profile, Folder } from '../types';
import AdminPreview from './AdminPreview';

const AdminDashboard: React.FC = () => {
    const {
        adminProfiles,
        fetchProfiles,
        adminFetchProjects,
        adminFetchFolders,
        adminCopyProject,
        adminCopyFolder,
        setView
    } = useStore();

    const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
    const [userProjects, setUserProjects] = useState<ProjectMetadata[]>([]);
    const [userFolders, setUserFolders] = useState<Folder[]>([]);
    const [targetUser, setTargetUser] = useState<string>(''); // For copying
    const [loading, setLoading] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

    useEffect(() => {
        fetchProfiles();
    }, []);

    const handleSelectUser = async (profile: Profile) => {
        setSelectedUser(profile);
        setSelectedProjectId(null);
        setLoading(true);
        try {
            const [projects, folders] = await Promise.all([
                adminFetchProjects(profile.id),
                adminFetchFolders(profile.id)
            ]);
            setUserProjects(projects);
            setUserFolders(folders);
        } finally {
            setLoading(false);
        }
    };

    const handleCopyProject = async (e: React.MouseEvent, projectId: string) => {
        e.preventDefault();
        e.stopPropagation();
        if (!targetUser) {
            alert("Select a target user first");
            return;
        }
        if (confirm("Are you sure you want to copy this project?")) {
            await adminCopyProject(projectId, targetUser);
            // alert("Copied!"); 
        }
    };

    const handleCopyFolder = async (e: React.MouseEvent, folderId: string) => {
        e.preventDefault();
        e.stopPropagation();
        if (!targetUser) {
            alert("Select a target user first");
            return;
        }
        if (confirm("Are you sure you want to copy this entire folder and its projects?")) {
            try {
                await adminCopyFolder(folderId, targetUser);
                alert("Folder copied!");
            } catch (e: any) {
                alert(`Error copying folder: ${e.message || e}`);
            }
        }
    }

    // Group projects by folder
    const groupedProjects = React.useMemo(() => {
        const groups: { [key: string]: ProjectMetadata[] } = {};

        // Initialize groups for all folders (even empty ones)
        userFolders.forEach(f => {
            groups[f.id] = [];
        });
        groups['unsorted'] = [];

        userProjects.forEach(p => {
            const fId = p.folderId || 'unsorted';
            if (groups[fId]) {
                groups[fId].push(p);
            } else {
                // Should be covered by init, but just in case
                groups['unsorted'].push(p);
            }
        });

        return groups;
    }, [userProjects, userFolders]);

    return (
        <div className="flex flex-col h-screen w-screen bg-[#1a1a1a] text-white">
            <div className="h-14 border-b border-white/10 flex items-center px-4 justify-between bg-[#252525]">
                <h1 className="text-xl font-bold font-serif text-[#D4AF37]">Admin Dashboard</h1>
                <button
                    onClick={() => setView('dashboard')}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded transition-colors text-sm"
                >
                    Exit Admin
                </button>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* User List (Narrower) */}
                <div className="w-[200px] border-r border-white/10 p-2 overflow-y-auto bg-[#1e1e1e] flex-shrink-0">
                    <h2 className="text-xs font-bold mb-2 text-white/50 uppercase tracking-widest px-2">Users</h2>
                    <div className="space-y-1">
                        {adminProfiles.map(profile => (
                            <div
                                key={profile.id}
                                onClick={() => handleSelectUser(profile)}
                                className={`p-2 rounded cursor-pointer transition-colors flex flex-col gap-1 ${selectedUser?.id === profile.id ? 'bg-[#D4AF37]/20 border border-[#D4AF37]/50' : 'hover:bg-white/5'}`}
                            >
                                <div className="text-xs font-medium truncate" title={profile.email}>{profile.email || "No Email"}</div>
                                <div className="text-[9px] text-white/30 truncate font-mono">{profile.id.substr(0, 8)}...</div>
                                {profile.is_admin && <span className="text-[8px] bg-red-500/20 text-red-300 px-1 rounded self-start">ADMIN</span>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Projects List (Flexible) */}
                <div className="flex-1 p-4 overflow-y-auto bg-[#1a1a1a] border-r border-white/10">
                    {selectedUser ? (
                        <>
                            <div className="flex justify-between items-center mb-4 sticky top-0 bg-[#1a1a1a] z-10 pb-4 border-b border-white/10">
                                <div>
                                    <h2 className="text-lg font-bold">Projects for {selectedUser.email}</h2>
                                    <div className="flex gap-4 text-xs text-white/40 mt-1">
                                        <span>Total Projects: {userProjects.length}</span>
                                        <span>Total Folders: {userFolders.length}</span>
                                    </div>
                                </div>

                                {/* Target User Selector for Copying */}
                                <div className="flex items-center gap-2 bg-[#252525] p-2 rounded border border-white/10">
                                    <span className="text-xs text-white/60">Copy To:</span>
                                    <select
                                        value={targetUser}
                                        onChange={(e) => setTargetUser(e.target.value)}
                                        className="bg-black/50 border border-white/10 rounded px-2 py-1 text-sm outline-none focus:border-[#D4AF37] max-w-[150px]"
                                    >
                                        <option value="">Select...</option>
                                        {adminProfiles.filter(p => p.id !== selectedUser.id).map(p => (
                                            <option key={p.id} value={p.id}>
                                                {p.email}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {loading ? (
                                <div className="text-white/40 italic">Loading data...</div>
                            ) : (
                                <div className="space-y-6">
                                    {/* Render Folders First */}
                                    {userFolders.map(folder => (
                                        <div key={folder.id} className="border border-white/10 rounded-lg overflow-hidden bg-[#202020]">
                                            <div className="bg-[#2a2a2a] px-4 py-2 flex items-center justify-between border-b border-white/5">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-mono text-white/30">FOLDER</span>
                                                    <h3 className="font-bold text-[#D4AF37]">{folder.name}</h3>
                                                    <span className="text-xs text-white/40">({groupedProjects[folder.id]?.length || 0} items)</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={(e) => handleCopyFolder(e, folder.id)}
                                                    disabled={!targetUser}
                                                    className="px-2 py-1 bg-blue-500/10 hover:bg-blue-500/30 text-blue-300 text-[10px] rounded uppercase tracking-wider opacity-50 hover:opacity-100 transition-all disabled:opacity-0"
                                                >
                                                    Copy Folder
                                                </button>
                                            </div>

                                            <div>
                                                {groupedProjects[folder.id]?.length > 0 ? (
                                                    <div className="divide-y divide-white/5">
                                                        {groupedProjects[folder.id].map(project => (
                                                            <div
                                                                key={project.id}
                                                                className={`px-4 py-2 flex items-center justify-between cursor-pointer transition-colors group ${selectedProjectId === project.id ? 'bg-[#D4AF37]/20' : 'hover:bg-white/5'}`}
                                                                onClick={() => setSelectedProjectId(project.id)}
                                                            >
                                                                <div className="flex-1 flex items-center justify-between mr-4 overflow-hidden">
                                                                    <div className="text-sm font-medium truncate mr-2">{project.name}</div>
                                                                    <div className="text-[10px] text-white/30 font-mono whitespace-nowrap shrink-0">
                                                                        {new Date(project.lastModified).toLocaleDateString()} {new Date(project.lastModified).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => handleCopyProject(e, project.id)}
                                                                    disabled={!targetUser}
                                                                    className="px-2 py-1 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-[10px] rounded uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all disabled:opacity-0 shrink-0"
                                                                >
                                                                    Copy
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="p-4 text-center text-white/20 text-xs italic">
                                                        Empty Folder
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Render Unsorted */}
                                    {groupedProjects['unsorted']?.length > 0 && (
                                        <div className="border border-white/10 rounded-lg overflow-hidden bg-[#202020]">
                                            <div className="bg-[#2a2a2a] px-4 py-2 flex items-center justify-between border-b border-white/5">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-white/50 italic">Unsorted Projects</h3>
                                                    <span className="text-xs text-white/40">({groupedProjects['unsorted'].length} items)</span>
                                                </div>
                                            </div>
                                            <div className="divide-y divide-white/5">
                                                {groupedProjects['unsorted'].map(project => (
                                                    <div
                                                        key={project.id}
                                                        className={`px-4 py-2 flex items-center justify-between cursor-pointer transition-colors group ${selectedProjectId === project.id ? 'bg-[#D4AF37]/20' : 'hover:bg-white/5'}`}
                                                        onClick={() => setSelectedProjectId(project.id)}
                                                    >
                                                        <div className="flex-1 flex items-center justify-between mr-4 overflow-hidden">
                                                            <div className="text-sm font-medium truncate mr-2">{project.name}</div>
                                                            <div className="text-[10px] text-white/30 font-mono whitespace-nowrap shrink-0">
                                                                {new Date(project.lastModified).toLocaleDateString()} {new Date(project.lastModified).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={(e) => handleCopyProject(e, project.id)}
                                                            disabled={!targetUser}
                                                            className="px-2 py-1 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-[10px] rounded uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all disabled:opacity-0 shrink-0"
                                                        >
                                                            Copy
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {userProjects.length === 0 && userFolders.length === 0 && (
                                        <div className="text-white/30 text-sm p-4 text-center border border-white/5 rounded border-dashed">
                                            No projects or folders found.
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-white/20 uppercase tracking-widest">
                            Select a user to view projects
                        </div>
                    )}
                </div>

                {/* Preview Window (Fixed Width) */}
                <div className="w-[320px] bg-[#151515] flex flex-col border-l border-white/10">
                    <div className="h-10 border-b border-white/5 flex items-center px-4 bg-[#1e1e1e]">
                        <span className="text-xs font-bold uppercase tracking-widest text-white/50">Preview</span>
                    </div>
                    <div className="flex-1 p-4 flex items-center justify-center bg-black/50">
                        <div className="w-[300px] h-[300px] bg-black border border-white/10 shadow-lg relative overflow-hidden rounded-sm">
                            <AdminPreview projectId={selectedProjectId} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
