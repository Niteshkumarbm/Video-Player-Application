// export type Category = 'Technology' | 'Gaming' | 'Music' | 'Sports' | 'Education' | 'Entertainment';

// export interface Video {
//   id: string;
//   title: string;
//   thumbnail: string;
//   duration: number;
//   category: Category;
//   url: string;
//   description?: string;
//   views?: number;
//   uploadedAt?: string;
// }

// export interface VideoState {
//   currentVideo: Video | null;
//   isPlaying: boolean;
//   currentTime: number;
//   duration: number;
//   volume: number;
//   isMuted: boolean;
//   isFullscreen: boolean;
//   isMinimized: boolean;
//   showControls: boolean;
//   relatedVideos: Video[];
// }

// export interface PlayerMode {
//   mode: 'fullscreen' | 'minimized' | 'closed';
// }

// export type GestureDirection = 'up' | 'down' | 'none';

// export interface DragState {
//   isDragging: boolean;
//   startY: number;
//   currentY: number;
//   deltaY: number;
// }


export type Category = 'Social Media AI' | 'AI Income' | 'AI Essentials';

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: number; // in seconds
  category: Category;
  url: string;
  description?: string;
  views?: number;
  uploadedAt?: string;
}

export interface VideoState {
  currentVideo: Video | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  isMinimized: boolean;
  showControls: boolean;
  relatedVideos: Video[];
}

export interface PlayerMode {
  mode: 'fullscreen' | 'minimized' | 'closed';
}

export type GestureDirection = 'up' | 'down' | 'none';

export interface DragState {
  isDragging: boolean;
  startY: number;
  currentY: number;
  deltaY: number;
}