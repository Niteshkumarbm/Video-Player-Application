import { motion } from 'framer-motion';
import { useVideoStore } from '@/store/videoStore';
import { formatDuration, getCategoryColor } from '@/utils/helpers';
import { Play } from 'lucide-react';

const RelatedVideosList: React.FC = () => {
  const { relatedVideos, currentVideo, playVideo } = useVideoStore();
  
  if (!currentVideo || relatedVideos.length === 0) return null;
  
  return (
    <div className="space-y-3 px-4 pb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-dark-50">
          More from {currentVideo.category}
        </h3>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${getCategoryColor(currentVideo.category)}`}>
          {relatedVideos.length} videos
        </span>
      </div>
      
      <div className="space-y-3">
        {relatedVideos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => playVideo(video)}
            className="group flex cursor-pointer gap-3 rounded-lg p-2 transition-colors hover:bg-dark-800"
          >
            <div className="relative aspect-video w-40 flex-shrink-0 overflow-hidden rounded-lg bg-dark-800">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Play className="h-8 w-8 fill-white text-white" />
              </div>
              
              <div className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
                {formatDuration(video.duration)}
              </div>
            </div>
            
            <div className="flex flex-1 flex-col justify-center space-y-1">
              <h4 className="line-clamp-2 text-sm font-semibold text-dark-50 transition-colors group-hover:text-primary-500">
                {video.title}
              </h4>
              {video.description && (
                <p className="line-clamp-1 text-xs text-dark-400">
                  {video.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export {RelatedVideosList}
export default RelatedVideosList;
