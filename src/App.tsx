import { AnimatePresence } from 'framer-motion';
import { useVideoStore } from '@/store/videoStore';
import { HomePage } from '@/components/HomePage';
import { FullscreenPlayer } from '@/components/FullscreenPlayer';
import { MiniPlayer } from '@/components/MiniPlayer';

function App() {
  const { currentVideo, isMinimized } = useVideoStore();
  
  return (
    <div className="relative">
      {/* Home page - always rendered */}
      <HomePage />
      
      {/* Fullscreen player */}
      <AnimatePresence>
        {currentVideo && !isMinimized && <FullscreenPlayer />}
      </AnimatePresence>
      
      {/* Mini player */}
      <AnimatePresence>
        {currentVideo && isMinimized && <MiniPlayer />}
      </AnimatePresence>
    </div>
  );
}

export default App;
