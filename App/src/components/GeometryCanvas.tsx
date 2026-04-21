import React, { useRef, useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import GeometryPlayer from './GeometryPlayer';

const GeometryCanvas: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const {
        project,
        currentTime,
        isPlaying,
        isLooping,
        exportSettings,
        setCurrentTime,
        setIsPlaying
    } = useStore();

    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

    // Handle Resizing
    useEffect(() => {
        const updateDimensions = () => {
            if (exportSettings.isActive) {
                setDimensions({ width: exportSettings.width, height: exportSettings.height });
            } else if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight
                });
            }
        };

        const observer = new ResizeObserver(() => updateDimensions());
        if (containerRef.current) observer.observe(containerRef.current);

        updateDimensions();

        return () => observer.disconnect();
    }, [exportSettings.isActive, exportSettings.width, exportSettings.height]);

    // Handle Ticker from GeometryPlayer
    const handleTick = (dt: number) => {
        if (!isPlaying) return;

        let nextTime = currentTime + dt;
        if (nextTime >= project.duration) {
            if (isLooping) {
                nextTime = 0;
            } else {
                nextTime = project.duration;
                setIsPlaying(false);
            }
        }
        setCurrentTime(nextTime);
    };

    return (
        <div ref={containerRef} className="w-full h-full bg-black overflow-hidden relative">
            <GeometryPlayer
                project={project}
                width={dimensions.width}
                height={dimensions.height}
                currentTime={currentTime}
                isPlaying={isPlaying}
                backgroundColor={project.backgroundColor}
                onTick={handleTick}

            />
        </div>
    );
};

export default GeometryCanvas;
