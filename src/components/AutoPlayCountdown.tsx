import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useVideoStore } from '@/store/videoStore';

export const AutoPlayCountdown: React.FC = () => {
  const { 
    showCountdown, 
    countdownValue, 
    relatedVideos,
    cancelCountdown, 
    decrementCountdown 
  } = useVideoStore();
  
  useEffect(() => {
    if (!showCountdown || countdownValue <= 0) return;
    
    const timer = setTimeout(() => {
      decrementCountdown();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [showCountdown, countdownValue, decrementCountdown]);
  
  if (!showCountdown || relatedVideos.length === 0) return null;
  
  const nextVideo = relatedVideos[0];
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="absolute bottom-24 right-4 z-30 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl bg-dark-900/95 shadow-2xl backdrop-blur-sm"
      >
        <div className="relative p-4">
          {/* Close button */}
          <button
            onClick={cancelCountdown}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-dark-800 text-white transition-colors hover:bg-dark-700"
            aria-label="Cancel autoplay"
          >
            <X className="h-4 w-4" />
          </button>
          
          <div className="space-y-3">
            {/* Countdown text */}
            <div className="pr-8">
              <p className="text-sm text-dark-400">Up next</p>
              <p className="text-xs text-dark-500">
                Playing in {countdownValue} second{countdownValue !== 1 ? 's' : ''}
              </p>
            </div>
            
            {/* Next video preview */}
            <div className="flex gap-3">
              <div className="relative aspect-video w-32 flex-shrink-0 overflow-hidden rounded-lg bg-dark-800">
                <img
                  src={nextVideo.thumbnail}
                  alt={nextVideo.title}
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div className="flex-1 space-y-1">
                <h4 className="line-clamp-2 text-sm font-semibold text-dark-50">
                  {nextVideo.title}
                </h4>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="h-1 overflow-hidden rounded-full bg-dark-800">
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 3, ease: 'linear' }}
                className="h-full bg-primary-500"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
