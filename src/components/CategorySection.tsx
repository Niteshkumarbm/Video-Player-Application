import { motion } from 'framer-motion';
import { Video } from '@/types';
import { VideoCard } from './VideoCard';
import { useVideoStore } from '@/store/videoStore';

interface CategorySectionProps {
  category: string;
  videos: Video[];
}

export const CategorySection: React.FC<CategorySectionProps> = ({ category, videos }) => {
  const { playVideo } = useVideoStore();
  
  if (videos.length === 0) return null;
  
  return (
    <section className="space-y-4">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-xl font-bold text-dark-50"
      >
        {category}
      </motion.h2>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videos.map((video, index) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={() => playVideo(video)}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};
