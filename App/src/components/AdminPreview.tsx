import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import GeometryPlayer from './GeometryPlayer';
import type { Project } from '../types';

interface AdminPreviewProps {
    projectId: string | null;
}

const AdminPreview: React.FC<AdminPreviewProps> = ({ projectId }) => {
    const { adminGetProjectData } = useStore();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if (!projectId) {
            setProject(null);
            return;
        }

        let aborted = false;
        const load = async () => {
            setLoading(true);
            try {
                const data = await adminGetProjectData(projectId);
                if (!aborted && data) {
                    setProject(data);
                    setCurrentTime(0); // Reset time on new project
                }
            } finally {
                if (!aborted) setLoading(false);
            }
        };

        load();

        return () => { aborted = true; };
    }, [projectId]);

    if (!projectId) {
        return <div className="flex items-center justify-center h-full text-white/20 italic text-xs">select a project to preview</div>;
    }

    if (loading) {
        return <div className="flex items-center justify-center h-full text-white/20 text-xs">loading preview...</div>;
    }

    if (!project) {
        return <div className="flex items-center justify-center h-full text-white/20 text-xs">failed to load</div>;
    }

    return (
        <div className="w-full h-full bg-black relative">
            <GeometryPlayer
                project={project}
                width={300}
                height={300}
                currentTime={currentTime}
                isPlaying={true}
                disableTicker={false}
                onTick={(dt) => {
                    setCurrentTime(prev => {
                        const next = prev + dt;
                        const duration = project.duration || 10; // Default 10s if missing
                        return next > duration ? 0 : next;
                    });
                }}
            />
            {/* Overlay name */}
            <div className="absolute bottom-2 left-2 text-[10px] text-white/50 pointer-events-none">
                {project.name}
            </div>
        </div>
    );
};

export default AdminPreview;
