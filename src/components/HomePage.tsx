import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Video } from 'lucide-react';
import { useVideoStore } from '@/store/videoStore';
import { CategorySection } from '@/components/CategorySection';
import { CATEGORIES } from '@/constants/videos';

export const HomePage: React.FC = () => {
  const { videos } = useVideoStore();
  
  const videosByCategory = useMemo(() => {
    return CATEGORIES.reduce((acc, category) => {
      acc[category] = videos.filter((video) => video.category === category);
      return acc;
    }, {} as Record<string, typeof videos>);
  }, [videos]);
  
  return (
    <div className="min-h-screen bg-dark-950 pb-safe">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-dark-800 bg-dark-900/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700">
              <Video className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-dark-50">VideoHub</h1>
              <p className="text-xs text-dark-400">Discover amazing content</p>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-10"
        >
          {CATEGORIES.map((category) => (
            <CategorySection
              key={category}
              category={category}
              videos={videosByCategory[category] || []}
            />
          ))}
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer className="mt-16 border-t border-dark-800 bg-dark-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-dark-500">
            Built with React, TypeScript, and Framer Motion
          </p>
          <p className="mt-2 text-xs text-dark-600">
            © 2024 VideoHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
