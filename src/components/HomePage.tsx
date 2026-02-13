import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Settings } from 'lucide-react';
import { useVideoStore } from '@/store/videoStore';
import { CategorySection } from '@/components/CategorySection';
import { CATEGORIES } from '@/constants/videos';
import VirtualizedCategorySection from './Virtualizedcategorysection';

const HomePage: React.FC = () => {
  const { videos } = useVideoStore();
  const [useVirtualization, setUseVirtualization] = useState(false);
  
  const videosByCategory = useMemo(() => {
    return CATEGORIES.reduce((acc, category) => {
      acc[category] = videos.filter((video) => video.category === category);
      return acc;
    }, {} as Record<string, typeof videos>);
  }, [videos]);
  
  return (
    <div className="min-h-screen bg-dark-950 pb-safe">
      <header className="sticky top-0 z-30 border-b border-dark-800 bg-dark-900/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700">
                <Video className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-dark-50">VideoHub</h1>
                <p className="text-xs text-dark-400">Discover amazing content</p>
              </div>
            </div>
            
            <button
              onClick={() => setUseVirtualization(!useVirtualization)}
              className="flex items-center gap-2 rounded-lg bg-dark-800 px-3 py-2 text-xs text-dark-300 transition-colors hover:bg-dark-700"
              title="Toggle virtual scrolling for better performance with large datasets"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">
                {useVirtualization ? 'Virtualization: ON' : 'Virtualization: OFF'}
              </span>
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-10"
        >
          {CATEGORIES.map((category) => 
            useVirtualization ? (
              <VirtualizedCategorySection
                key={category}
                category={category}
                videos={videosByCategory[category] || []}
              />
            ) : (
              <CategorySection
                key={category}
                category={category}
                videos={videosByCategory[category] || []}
              />
            )
          )}
        </motion.div>
      </main>
      
      <footer className="mt-16 border-t border-dark-800 bg-dark-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mt-2 text-xs text-dark-600">
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export {HomePage}
export default HomePage