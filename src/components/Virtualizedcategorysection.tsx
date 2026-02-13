import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Video } from '@/types';
import { VideoCard } from './VideoCard';
import { useVideoStore } from '@/store/videoStore';
import { useInfiniteScroll } from '@/hooks/useVirtualScroll';

interface VirtualizedCategorySectionProps {
  category: string;
  videos: Video[];
  initialCount?: number;
}

const VirtualizedCategorySection: React.FC<VirtualizedCategorySectionProps> = ({ 
  category, 
  videos,
  initialCount = 8,
}) => {
  const { playVideo } = useVideoStore();
  const [displayCount, setDisplayCount] = useState(initialCount);
  
  const loadMore = useCallback(() => {
    if (displayCount < videos.length) {
      setDisplayCount(prev => Math.min(prev + 8, videos.length));
    }
  }, [displayCount, videos.length]);
  
  const triggerRef = useInfiniteScroll(loadMore, 200);
  
  const displayedVideos = videos.slice(0, displayCount);
  
  if (videos.length === 0) return null;
  
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold text-dark-50"
        >
          {category}
        </motion.h2>
        <span className="text-sm text-dark-400">
          {displayCount} of {videos.length}
        </span>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {displayedVideos.map((video, index) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={() => playVideo(video)}
            index={index}
          />
        ))}
      </div>
      
      {displayCount < videos.length && (
        <div ref={triggerRef} className="flex justify-center py-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
        </div>
      )}
    </section>
  );
};

export {VirtualizedCategorySection}
export default VirtualizedCategorySection;