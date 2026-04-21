import { useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';

export const useAnimation = () => {
    const isPlaying = useStore(s => s.isPlaying);
    const currentTime = useStore(s => s.currentTime);
    const setCurrentTime = useStore(s => s.setCurrentTime);
    const duration = useStore(s => s.project.duration);
    const requestRef = useRef<number | undefined>(undefined);
    const lastTimeRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const animate = (time: number) => {
            if (lastTimeRef.current !== undefined) {
                const deltaTime = (time - lastTimeRef.current) / 1000;

                if (isPlaying) {
                    let nextTime = currentTime + deltaTime;
                    if (nextTime >= duration) {
                        if (useStore.getState().isLooping) {
                            nextTime = 0; // Loop
                        } else {
                            nextTime = duration;
                            useStore.getState().setIsPlaying(false);
                        }
                    }
                    setCurrentTime(nextTime);
                }
            }
            lastTimeRef.current = time;
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isPlaying, currentTime, setCurrentTime, duration]);
};
