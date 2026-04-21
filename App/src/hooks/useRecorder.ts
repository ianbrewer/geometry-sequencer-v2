import { useState, useRef, useCallback } from 'react';

interface UseRecorderReturn {
    isRecording: boolean;
    startRecording: (canvas: HTMLCanvasElement, mimeType?: string) => void;
    stopRecording: () => Promise<Blob>;
    downloadVideo: (blob: Blob, filename: string) => void;
}

export const useRecorder = (): UseRecorderReturn & { getSupportedMimeTypes: () => string[] } => {
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const getSupportedMimeTypes = useCallback(() => {
        const types = [
            'video/webm;codecs=vp9',
            'video/webm',
            'video/mp4;codecs=avc1', // Standard MP4
            'video/mp4;codecs=h264',
            'video/mp4'
        ];
        return types.filter(type => MediaRecorder.isTypeSupported(type));
    }, []);

    const startRecording = useCallback((canvas: HTMLCanvasElement, mimeType?: string) => {
        if (!canvas) return;

        chunksRef.current = [];
        // Capture stream at 60 FPS (approximate)
        const stream = canvas.captureStream(60);

        let options: MediaRecorderOptions = {};

        if (mimeType && MediaRecorder.isTypeSupported(mimeType)) {
            options.mimeType = mimeType;
        } else {
            // Auto-detect best supported
            const supported = getSupportedMimeTypes();
            if (supported.length > 0) {
                options.mimeType = supported[0];
            }
        }

        console.log(`Starting recording with mimeType: ${options.mimeType || 'default'}`);

        try {
            const recorder = new MediaRecorder(stream, options);

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            recorder.start();
            mediaRecorderRef.current = recorder;
            setIsRecording(true);
        } catch (err) {
            console.error('Failed to start recording:', err);
        }
    }, [getSupportedMimeTypes]);

    const stopRecording = useCallback((): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const recorder = mediaRecorderRef.current;
            if (!recorder) {
                reject('No recorder active');
                return;
            }

            recorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'video/webm' });
                setIsRecording(false);
                mediaRecorderRef.current = null;
                resolve(blob);
            };

            recorder.stop();
        });
    }, []);

    const downloadVideo = useCallback((blob: Blob, filename: string) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    }, []);

    return {
        isRecording,
        startRecording,
        stopRecording,
        downloadVideo,
        getSupportedMimeTypes
    };
};
