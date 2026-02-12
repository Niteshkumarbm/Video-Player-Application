import { create } from 'zustand';
import { Video } from '@/types';
import { SAMPLE_VIDEOS } from '@/constants/videos';

interface VideoStore {
  currentVideo: Video | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  showControls: boolean;
  
  isMinimized: boolean;
  showRelatedList: boolean;
  isPiPActive: boolean;
  
  videos: Video[];
  relatedVideos: Video[];
  
  showCountdown: boolean;
  countdownValue: number;
  
  setCurrentVideo: (video: Video) => void;
  playVideo: (video: Video) => void;
  togglePlay: () => void;
  setPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setShowControls: (show: boolean) => void;
  
  minimizePlayer: () => void;
  maximizePlayer: () => void;
  closePlayer: () => void;
  toggleRelatedList: () => void;
  setShowRelatedList: (show: boolean) => void;
  setIsPiPActive: (active: boolean) => void;
  enterPiP: () => void;
  exitPiP: () => void;
  
  skipForward: () => void;
  skipBackward: () => void;
  playNextVideo: () => void;
  
  startCountdown: () => void;
  cancelCountdown: () => void;
  decrementCountdown: () => void;
  
  getRelatedVideos: (category: string) => Video[];
}

export const useVideoStore = create<VideoStore>((set, get) => ({
  currentVideo: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  showControls: true,
  isMinimized: false,
  showRelatedList: false,
  isPiPActive: false,
  videos: SAMPLE_VIDEOS,
  relatedVideos: [],
  showCountdown: false,
  countdownValue: 3,
  
  setCurrentVideo: (video) => {
    const related = get().getRelatedVideos(video.category);
    set({ 
      currentVideo: video, 
      relatedVideos: related,
      currentTime: 0,
      showCountdown: false,
    });
  },
  
  playVideo: (video) => {
    const related = get().getRelatedVideos(video.category);
    set({ 
      currentVideo: video, 
      relatedVideos: related,
      isPlaying: true,
      isMinimized: false,
      currentTime: 0,
      showRelatedList: false,
      showCountdown: false,
    });
  },
  
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  
  setPlaying: (playing) => set({ isPlaying: playing }),
  
  setCurrentTime: (time) => {
    const state = get();
    if (Math.abs(state.currentTime - time) < 0.1) return;
    set({ currentTime: time });
  },
  
  setDuration: (duration) => set({ duration }),
  
  setVolume: (volume) => set({ volume, isMuted: volume === 0 }),
  
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  
  setShowControls: (show) => set({ showControls: show }),
  
  minimizePlayer: () => set({ isMinimized: true, showRelatedList: false }),
  
  maximizePlayer: () => set({ isMinimized: false }),
  
  closePlayer: () => set({ 
    currentVideo: null, 
    isPlaying: false, 
    isMinimized: false,
    showRelatedList: false,
    currentTime: 0,
  }),
  
  toggleRelatedList: () => set((state) => ({ 
    showRelatedList: !state.showRelatedList 
  })),
  
  setShowRelatedList: (show) => set({ showRelatedList: show }),
  
  setIsPiPActive: (active) => set({ isPiPActive: active }),
  
  enterPiP: () => set({ isPiPActive: true }),
  
  exitPiP: () => set({ isPiPActive: false }),
  
  skipForward: () => {
    const { currentTime, duration } = get();
    const newTime = Math.min(currentTime + 10, duration);
    set({ currentTime: newTime });
  },
  
  skipBackward: () => {
    const { currentTime } = get();
    const newTime = Math.max(currentTime - 10, 0);
    set({ currentTime: newTime });
  },
  
  playNextVideo: () => {
    const { currentVideo, relatedVideos } = get();
    if (!currentVideo || relatedVideos.length === 0) return;
    
    const currentIndex = relatedVideos.findIndex(v => v.id === currentVideo.id);
    const nextIndex = (currentIndex + 1) % relatedVideos.length;
    const nextVideo = relatedVideos[nextIndex];
    
    get().playVideo(nextVideo);
  },
  
  startCountdown: () => set({ showCountdown: true, countdownValue: 3 }),
  
  cancelCountdown: () => set({ showCountdown: false, countdownValue: 3 }),
  
  decrementCountdown: () => {
    const { countdownValue } = get();
    if (countdownValue > 0) {
      set({ countdownValue: countdownValue - 1 });
    } else {
      get().playNextVideo();
      set({ showCountdown: false, countdownValue: 3 });
    }
  },
  
  getRelatedVideos: (category) => {
    const { videos, currentVideo } = get();
    return videos.filter(
      (v) => v.category === category && v.id !== currentVideo?.id
    );
  },
}));