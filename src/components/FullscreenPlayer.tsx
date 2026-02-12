import { useRef, useEffect } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useVideoStore } from '@/store/videoStore';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';
import { usePictureInPicture } from '@/hooks/usePictureInPicture';
import { PlayerControls } from './PlayerControls';
import { RelatedVideosList } from './RelatedVideosList';
import { AutoPlayCountdown } from './AutoPlayCountdown';
import { getCategoryColor } from '@/utils/helpers';

const FullscreenPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const {
    currentVideo,
    showRelatedList,
    minimizePlayer,
    setShowRelatedList,
  } = useVideoStore();
  
  const { handleSeek, resetControlsTimer } = useVideoPlayer(videoRef);
  const { isPiPSupported, togglePiP } = usePictureInPicture(videoRef);
  
  useEffect(() => {
    resetControlsTimer();
  }, [resetControlsTimer]);
  
  if (!currentVideo) return null;
  
  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 100;
    
    if (info.offset.y > threshold) {
      minimizePlayer();
    } else if (info.offset.y < -threshold) {
      setShowRelatedList(true);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-40 bg-dark-950 overflow-y-auto"
    >
      <div className="flex min-h-full flex-col">
        <motion.div
          ref={containerRef}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="relative flex-shrink-0 bg-dark-950"
          style={{ touchAction: 'pan-y' }}
        >
          <div className="absolute left-1/2 top-2 z-30 -translate-x-1/2">
            <div className="h-1 w-12 rounded-full bg-white/30" />
          </div>
          
          <div className="relative aspect-video w-full bg-black">
            <video
              ref={videoRef}
              src={currentVideo.url}
              className="h-full w-full"
              autoPlay
              playsInline
              preload="auto"
              onClick={resetControlsTimer}
              onTouchStart={resetControlsTimer}
            />
            
            <PlayerControls
              onSeek={handleSeek}
              onMinimize={minimizePlayer}
              onTogglePiP={togglePiP}
              isPiPSupported={isPiPSupported}
            />
            
            <AutoPlayCountdown />
          </div>
          
          <div className="bg-dark-900 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h1 className="text-lg font-bold text-dark-50">
                  {currentVideo.title}
                </h1>
                {currentVideo.description && (
                  <p className="mt-2 text-sm text-dark-400">
                    {currentVideo.description}
                  </p>
                )}
              </div>
              <span className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-semibold text-white ${getCategoryColor(currentVideo.category)}`}>
                {currentVideo.category}
              </span>
            </div>
          </div>
          
          <button
            onClick={() => setShowRelatedList(!showRelatedList)}
            className="flex w-full items-center justify-center gap-2 bg-dark-800 py-3 text-sm font-medium text-dark-300 transition-colors hover:bg-dark-700"
          >
            {showRelatedList ? (
              <>
                <ChevronDown className="h-4 w-4" />
                Hide related videos
              </>
            ) : (
              <>
                <ChevronUp className="h-4 w-4" />
                Show related videos
              </>
            )}
          </button>
        </motion.div>
        
        {showRelatedList && (
          <div className="flex-1 bg-dark-900 pb-20">
            <RelatedVideosList />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export {FullscreenPlayer}
export default FullscreenPlayer