import { useRef, useEffect, useCallback, RefObject } from 'react';
import { useVideoStore } from '@/store/videoStore';

export const useVideoPlayer = (videoRef: RefObject<HTMLVideoElement>) => {
  const {
    isPlaying,
    currentTime,
    volume,
    isMuted,
    setPlaying,
    setCurrentTime,
    setDuration,
    setVolume,
    setShowControls,
    startCountdown,
  } = useVideoStore();
  
  const controlsTimeoutRef = useRef<any>(null);
  const isSeekingRef = useRef(false);
  const lastTimeUpdateRef = useRef(0);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(console.error);
      }
    } else {
      video.pause();
    }
  }, [isPlaying, videoRef]);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isSeekingRef.current) return;
    
    video.currentTime = currentTime;
    isSeekingRef.current = false;
  }, [currentTime, videoRef]);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    video.volume = volume;
  }, [volume, videoRef]);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = isMuted;
  }, [isMuted, videoRef]);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };
    
    const handleTimeUpdate = () => {
      const now = Date.now();
      if (now - lastTimeUpdateRef.current < 250) return; 
      lastTimeUpdateRef.current = now;
      
      setCurrentTime(video.currentTime);
    };
    
    const handleEnded = () => {
      setPlaying(false);
      startCountdown();
    };
    
    const handlePlay = () => {
      setPlaying(true);
    };
    
    const handlePause = () => {
      setPlaying(false);
    };
    
    const handleVolumeChange = () => {
      setVolume(video.volume);
    };
    
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('volumechange', handleVolumeChange);
    
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [videoRef, setDuration, setCurrentTime, setPlaying, setVolume, startCountdown]);
  
  const resetControlsTimer = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    setShowControls(true);
    
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, [isPlaying, setShowControls]);
  
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);
  
  const seekTo = useCallback((time: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    isSeekingRef.current = true;
    video.currentTime = time;
    setCurrentTime(time);
  }, [videoRef, setCurrentTime]);
  
  const handleSeek = useCallback((percentage: number) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    
    const newTime = (percentage / 100) * video.duration;
    seekTo(newTime);
  }, [videoRef, seekTo]);
  
  return {
    seekTo,
    handleSeek,
    resetControlsTimer,
  };
};
