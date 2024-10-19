import { useEffect, useRef, useState } from 'react';

interface UseAudioReturn {
    isPlaying: boolean;
    togglePlayPause: () => void;
    volume: number;
    changeVolume: (volume: number) => void;
    progress: number;
    duration: number;
    seek: (time: number) => void;
}

function useAudio(src: string): UseAudioReturn {
    const audioRef = useRef<HTMLAudioElement | null>(new Audio(src));
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(1);
    const [progress, setProgress] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            setIsPlaying(!audioRef.current.paused);
        }
    }, [audioRef.current?.paused]);

    const changeVolume = (newVolume: number) => {
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
        setVolume(newVolume);
    };

    const seek = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
    };

    useEffect(() => {
        const updateProgress = () => {
            if (audioRef.current) {
                setProgress(audioRef.current.currentTime);
            }
        };

        const setAudioDuration = () => {
            if (audioRef.current) {
                setDuration(audioRef.current.duration);
            }
        };

        const handleAudioEnd = () => {
            setIsPlaying(false);
            setProgress(0);
            audioRef.current!.currentTime = 0;
        };

        if (audioRef.current) {
            audioRef.current.addEventListener('timeupdate', updateProgress);
            audioRef.current.addEventListener('loadedmetadata', setAudioDuration);
            audioRef.current.addEventListener('ended', handleAudioEnd);

            return () => {
                audioRef.current!.removeEventListener('timeupdate', updateProgress);
                audioRef.current!.removeEventListener('loadedmetadata', setAudioDuration);
                audioRef.current!.removeEventListener('ended', handleAudioEnd);
            };
        }
    }, []);

    return {
        isPlaying,
        togglePlayPause,
        volume,
        changeVolume,
        progress,
        duration,
        seek,
    };
}

export default useAudio;
