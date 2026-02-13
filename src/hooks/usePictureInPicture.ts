import { useEffect, useCallback, RefObject } from 'react';
import { useVideoStore } from '@/store/videoStore';

export const usePictureInPicture = (videoRef: RefObject<HTMLVideoElement>) => {
  const { isPiPActive, setIsPiPActive } = useVideoStore();
  
  const isPiPSupported = typeof document !== 'undefined' && 'pictureInPictureEnabled' in document;
  
  const enterPiP = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !isPiPSupported) return;
    
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      }
      await video.requestPictureInPicture();
      setIsPiPActive(true);
    } catch (error) {
      console.error('Failed to enter Picture-in-Picture mode:', error);
    }
  }, [videoRef, isPiPSupported, setIsPiPActive]);
  
  const exitPiP = useCallback(async () => {
    if (!isPiPSupported || !document.pictureInPictureElement) return;
    
    try {
      await document.exitPictureInPicture();
      setIsPiPActive(false);
    } catch (error) {
      console.error('Failed to exit Picture-in-Picture mode:', error);
    }
  }, [isPiPSupported, setIsPiPActive]);
  
  const togglePiP = useCallback(async () => {
    if (isPiPActive) {
      await exitPiP();
    } else {
      await enterPiP();
    }
  }, [isPiPActive, enterPiP, exitPiP]);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isPiPSupported) return;
    
    const handleEnterPiP = () => {
      setIsPiPActive(true);
    };
    
    const handleLeavePiP = () => {
      setIsPiPActive(false);
    };
    
    video.addEventListener('enterpictureinpicture', handleEnterPiP);
    video.addEventListener('leavepictureinpicture', handleLeavePiP);
    
    return () => {
      video.removeEventListener('enterpictureinpicture', handleEnterPiP);
      video.removeEventListener('leavepictureinpicture', handleLeavePiP);
    };
  }, [videoRef, isPiPSupported, setIsPiPActive]);
  
  return {
    isPiPSupported,
    isPiPActive,
    enterPiP,
    exitPiP,
    togglePiP,
  };
};