import { motion } from 'framer-motion';
import { Video } from '@/types';
import { formatDuration, formatViews, getCategoryColor } from '@/utils/helpers';
import { Play } from 'lucide-react';

interface VideoCardProps {
  video: Video;
  onClick: () => void;
  index: number;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onClick, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative aspect-video overflow-hidden rounded-xl bg-dark-800">
        {/* Thumbnail */}
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Play icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Play className="h-8 w-8 fill-white text-white" />
          </div>
        </div>
        
        {/* Duration */}
        <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
          {formatDuration(video.duration)}
        </div>
        
        {/* Category badge */}
        <div className={`absolute left-2 top-2 rounded-full px-3 py-1 text-xs font-semibold text-white ${getCategoryColor(video.category)}`}>
          {video.category}
        </div>
      </div>
      
      {/* Video info */}
      <div className="mt-3 space-y-1">
        <h3 className="line-clamp-2 text-sm font-semibold text-dark-50 transition-colors group-hover:text-primary-500">
          {video.title}
        </h3>
        {video.views && (
          <p className="text-xs text-dark-400">
            {formatViews(video.views)} views
          </p>
        )}
      </div>
    </motion.div>
  );
};
