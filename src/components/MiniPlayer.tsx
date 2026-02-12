import { motion } from 'framer-motion';
import { Play, Pause, X } from 'lucide-react';
import { useVideoStore } from '@/store/videoStore';

export const MiniPlayer: React.FC = () => {
  const { 
    currentVideo, 
    isPlaying, 
    togglePlay, 
    maximizePlayer, 
    closePlayer 
  } = useVideoStore();
  
  if (!currentVideo) return null;
  
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-dark-700 bg-dark-900 shadow-2xl"
    >
      <div className="flex items-center gap-3 p-3">
        {/* Video thumbnail */}
        <div
          onClick={maximizePlayer}
          className="relative aspect-video w-24 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg bg-dark-800"
        >
          <img
            src={currentVideo.thumbnail}
            alt={currentVideo.title}
            className="h-full w-full object-cover"
          />
          
          {/* Play indicator */}
          {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="flex space-x-1">
                <div className="h-4 w-1 animate-pulse-slow rounded-full bg-white" style={{ animationDelay: '0ms' }} />
                <div className="h-4 w-1 animate-pulse-slow rounded-full bg-white" style={{ animationDelay: '150ms' }} />
                <div className="h-4 w-1 animate-pulse-slow rounded-full bg-white" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>
        
        {/* Video info */}
        <div
          onClick={maximizePlayer}
          className="flex-1 cursor-pointer overflow-hidden"
        >
          <h3 className="line-clamp-2 text-sm font-semibold text-dark-50">
            {currentVideo.title}
          </h3>
        </div>
        
        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Play/Pause */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-dark-700"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 fill-current" />
            ) : (
              <Play className="h-5 w-5 fill-current" />
            )}
          </button>
          
          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closePlayer();
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-dark-700"
            aria-label="Close player"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
