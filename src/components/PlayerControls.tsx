import { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  // Maximize,
  Minimize,
  PictureInPicture,
} from 'lucide-react';
import { useVideoStore } from '@/store/videoStore';
import { formatDuration, calculatePercentage } from '@/utils/helpers';

interface PlayerControlsProps {
  onSeek: (percentage: number) => void;
  onMinimize?: () => void;
  onTogglePiP?: () => void;
  isPiPSupported?: boolean;
}

const PlayerControls: React.FC<PlayerControlsProps> = memo(({ onSeek, onMinimize, onTogglePiP, isPiPSupported }) => {
  const isPlaying = useVideoStore((state) => state.isPlaying);
  const currentTime = useVideoStore((state) => state.currentTime);
  const duration = useVideoStore((state) => state.duration);
  const volume = useVideoStore((state) => state.volume);
  const isMuted = useVideoStore((state) => state.isMuted);
  const showControls = useVideoStore((state) => state.showControls);
  const togglePlay = useVideoStore((state) => state.togglePlay);
  const skipForward = useVideoStore((state) => state.skipForward);
  const skipBackward = useVideoStore((state) => state.skipBackward);
  const setVolume = useVideoStore((state) => state.setVolume);
  const toggleMute = useVideoStore((state) => state.toggleMute);
  
  const [isDragging, setIsDragging] = useState(false);
  const [showSkipAnimation, setShowSkipAnimation] = useState<'forward' | 'backward' | null>(null);
  
  const progress = calculatePercentage(currentTime, duration);
  
  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = ((e.clientX - rect.left) / rect.width) * 100;
    onSeek(percentage);
  }, [onSeek]);
  
  const handleProgressDrag = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = ((e.clientX - rect.left) / rect.width) * 100;
    onSeek(Math.max(0, Math.min(100, percentage)));
  }, [isDragging, onSeek]);
  
  const handleSkipForward = useCallback(() => {
    skipForward();
    setShowSkipAnimation('forward');
    setTimeout(() => setShowSkipAnimation(null), 500);
  }, [skipForward]);
  
  const handleSkipBackward = useCallback(() => {
    skipBackward();
    setShowSkipAnimation('backward');
    setTimeout(() => setShowSkipAnimation(null), 500);
  }, [skipBackward]);
  
  return (
    <AnimatePresence>
      {showControls && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
        >
          <AnimatePresence>
            {showSkipAnimation && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className={`absolute top-1/2 ${showSkipAnimation === 'forward' ? 'right-8' : 'left-8'} -translate-y-1/2 text-white`}
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  {showSkipAnimation === 'forward' ? (
                    <SkipForward className="h-10 w-10" />
                  ) : (
                    <SkipBack className="h-10 w-10" />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="absolute bottom-0 left-0 right-0 space-y-2 p-4">
            <div
              className="group relative h-1 cursor-pointer rounded-full bg-white/30"
              onClick={handleProgressClick}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseMove={handleProgressDrag}
              onMouseLeave={() => setIsDragging(false)}
            >
              <div
                className="h-full rounded-full bg-primary-500 transition-all"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary-500 opacity-0 transition-opacity group-hover:opacity-100"
                style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
              />
            </div>
            
            <div className="flex items-center justify-between text-xs text-white">
              <span>{formatDuration(currentTime)}</span>
              <span>{formatDuration(duration)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleSkipBackward}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
                  aria-label="Skip backward 10 seconds"
                >
                  <SkipBack className="h-5 w-5" />
                </button>
                
                <button
                  onClick={togglePlay}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-dark-900 transition-transform hover:scale-110"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6 fill-current" />
                  ) : (
                    <Play className="h-6 w-6 fill-current" />
                  )}
                </button>
                
                <button
                  onClick={handleSkipForward}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
                  aria-label="Skip forward 10 seconds"
                >
                  <SkipForward className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="group flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </button>
                  
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="hidden w-20 cursor-pointer md:block"
                  />
                </div>
                
                {isPiPSupported && onTogglePiP && (
                  <button
                    onClick={onTogglePiP}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
                    aria-label="Picture-in-Picture"
                  >
                    <PictureInPicture className="h-5 w-5" />
                  </button>
                )}
                
                {onMinimize && (
                  <button
                    onClick={onMinimize}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
                    aria-label="Minimize player"
                  >
                    <Minimize className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export {PlayerControls}
export default PlayerControls