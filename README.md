# VideoHub - Mobile-First Video Player Application

A professional, production-ready video player application built with React, TypeScript, and modern web technologies. Features smooth playback, gesture-based interactions, and a seamless user experience similar to YouTube mobile.

## 🚀 Features

### Core Features
- ✅ **Home Page Video Feed** - Scrollable list of videos grouped by category
- ✅ **Full-Page Video Player** - Immersive playback experience with custom controls
- ✅ **In-Player Video List** - Swipe up to reveal related videos from the same category
- ✅ **Drag-to-Minimize** - Picture-in-App mini player with gesture support
- ✅ **Auto-Play Next** - Automatic playback with 3-second countdown and cancel option
- ✅ **Smooth Animations** - 60fps animations using Framer Motion
- ✅ **Mobile-First Design** - Optimized for touch devices with full desktop support

### Player Controls
- Play/Pause toggle
- Skip forward/backward (±10 seconds with visual feedback)
- Seekable progress bar with drag support
- Volume control with mute toggle
- Current time/total duration display
- Auto-hide controls after 3 seconds of inactivity
- Minimize/maximize controls

### Advanced Features
- **Gesture Support** - Swipe down to minimize, swipe up for related videos
- **Category Filtering** - Related videos filtered by category
- **Responsive Design** - Works seamlessly on mobile and desktop
- **State Management** - Zustand for efficient global state
- **Performance Optimized** - Smooth 60fps animations, lazy loading

## 🏗️ Architecture

### Project Structure
```
videohub/
├── src/
│   ├── components/          # React components
│   │   ├── VideoCard.tsx           # Video card for home feed
│   │   ├── CategorySection.tsx     # Category grouping component
│   │   ├── PlayerControls.tsx      # Video player controls
│   │   ├── RelatedVideosList.tsx   # Related videos list
│   │   ├── MiniPlayer.tsx          # Minimized player
│   │   ├── AutoPlayCountdown.tsx   # Auto-play countdown
│   │   ├── FullscreenPlayer.tsx    # Full video player
│   │   └── HomePage.tsx            # Main home page
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── useVideoPlayer.ts       # Video player logic
│   │   └── useDragGesture.ts       # Drag gesture handling
│   │
│   ├── store/              # State management
│   │   └── videoStore.ts           # Zustand store
│   │
│   ├── types/              # TypeScript types
│   │   └── index.ts               # Type definitions
│   │
│   ├── utils/              # Utility functions
│   │   └── helpers.ts             # Helper functions
│   │
│   ├── constants/          # Constants and data
│   │   └── videos.ts              # Sample video data
│   │
│   ├── App.tsx            # Main App component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
│
├── public/                # Static assets
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── README.md            # Documentation
```

### Technology Stack

#### Core
- **React 18.3** - UI library
- **TypeScript 5.4** - Type safety
- **Vite 5.2** - Build tool and dev server

#### State Management & Routing
- **Zustand 4.5** - Lightweight state management
- **React Router DOM 6.22** - Client-side routing

#### Styling & Animation
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion 11.0** - Animation library
- **Lucide React** - Icon library

#### Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### Key Design Patterns

#### 1. **Custom Hooks Pattern**
Separation of concerns through custom hooks:
- `useVideoPlayer` - Encapsulates all video player logic
- `useDragGesture` - Handles drag gestures and swipe detection

#### 2. **Zustand Store Pattern**
Centralized state management with:
- Derived state for related videos
- Action methods for all state updates
- Minimal re-renders through selective subscriptions

#### 3. **Component Composition**
Modular, reusable components:
- Small, focused components
- Clear prop interfaces
- Separation of presentation and logic

#### 4. **Responsive Design**
Mobile-first approach:
- Touch-optimized interactions
- Adaptive layouts using Tailwind breakpoints
- Safe area insets for iOS devices

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Modern browser with ES2020 support

### Installation

1. **Clone or extract the project**
```bash
cd videohub
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Start development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The optimized build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

## 📱 Usage Guide

### Home Page
1. Browse videos organized by category
2. Click any video card to start playback
3. Videos include thumbnail, title, duration, and category badge

### Video Player
1. **Playback Controls**:
   - Tap/click play/pause button
   - Seek by clicking on progress bar
   - Skip ±10 seconds with dedicated buttons
   - Adjust volume (desktop) or use mute toggle

2. **Gesture Controls**:
   - **Swipe down** - Minimize player to mini-player
   - **Swipe up** - Show related videos list
   - **Tap screen** - Show/hide controls

3. **Related Videos**:
   - Click "Show related videos" button
   - Browse videos from same category
   - Click any video to switch playback immediately

4. **Mini Player**:
   - Persists while browsing home page
   - Shows video thumbnail and title
   - Play/pause control
   - Click to maximize back to fullscreen
   - Close button to stop playback

5. **Auto-Play Next**:
   - 3-second countdown appears when video ends
   - Cancel button to stop auto-play
   - Automatically plays next video in category

## 🎨 Customization

### Adding Your Videos

Edit `src/constants/videos.ts`:

```typescript
export const SAMPLE_VIDEOS: Video[] = [
  {
    id: 'unique-id',
    title: 'Your Video Title',
    thumbnail: 'https://your-thumbnail-url.jpg',
    duration: 300, // in seconds
    category: 'Technology', // or Gaming, Music, Sports, Education, Entertainment
    url: 'https://your-video-url.mp4',
    description: 'Video description',
    views: 10000,
  },
  // ... more videos
];
```

### Theming

Modify `tailwind.config.js` to customize colors:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your brand colors
      },
      dark: {
        // Dark mode colors
      },
    },
  },
}
```

### Categories

Add or modify categories in `src/constants/videos.ts`:

```typescript
export const CATEGORIES = [
  'Technology',
  'Gaming',
  'YourNewCategory',
  // ...
] as const;
```

## 🔧 Configuration

### Environment Variables

Create `.env` file for environment-specific settings:

```env
VITE_API_URL=https://your-api.com
VITE_CDN_URL=https://your-cdn.com
```

### Path Aliases

Configured in `vite.config.ts` and `tsconfig.json`:

```typescript
import { Component } from '@/components/Component';
import { useHook } from '@/hooks/useHook';
import { helper } from '@/utils/helpers';
```

## 📊 Performance

- **Lazy Loading** - Images load on demand
- **Optimized Animations** - GPU-accelerated with Framer Motion
- **Efficient State** - Minimal re-renders with Zustand
- **Code Splitting** - Dynamic imports for routes (when implemented)
- **60fps Target** - Smooth animations on all devices

## 🎯 Best Practices Implemented

### Code Quality
- ✅ TypeScript for type safety
- ✅ ESLint for code consistency
- ✅ Semantic HTML
- ✅ Accessible components (ARIA labels)
- ✅ Mobile-first responsive design

### State Management
- ✅ Centralized store with Zustand
- ✅ Derived state calculations
- ✅ Immutable state updates
- ✅ Action methods pattern

### Performance
- ✅ useCallback for event handlers
- ✅ useMemo for expensive computations
- ✅ Debounced/throttled events
- ✅ Lazy loading images

### User Experience
- ✅ Smooth 60fps animations
- ✅ Touch-optimized controls
- ✅ Visual feedback for interactions
- ✅ Loading states
- ✅ Error boundaries (ready to implement)

## 🔜 Future Enhancements

### Recommended Features
- [ ] Virtual scrolling for large video lists
- [ ] Browser Picture-in-Picture API support
- [ ] Video quality selection
- [ ] Playback speed control
- [ ] Fullscreen mode
- [ ] Keyboard shortcuts
- [ ] Video bookmarks/favorites
- [ ] Search functionality
- [ ] Video playlists
- [ ] Share functionality
- [ ] Comments section
- [ ] Like/dislike system
- [ ] User authentication
- [ ] Video upload capability
- [ ] Analytics dashboard

### Technical Improvements
- [ ] Service Worker for offline support
- [ ] WebSocket for real-time updates
- [ ] CDN integration for video delivery
- [ ] HLS/DASH adaptive streaming
- [ ] Video thumbnails preview on hover
- [ ] Captions/subtitles support
- [ ] Multiple audio tracks
- [ ] DRM integration
- [ ] Error boundary implementation
- [ ] Unit tests (Jest + React Testing Library)
- [ ] E2E tests (Playwright/Cypress)
- [ ] Storybook for component documentation

## 📝 Code Style Guide

### Component Structure
```typescript
// 1. Imports
import { useState } from 'react';
import { ComponentProps } from './types';

// 2. Interface/Type definitions
interface Props {
  // ...
}

// 3. Component
export const Component: React.FC<Props> = ({ prop }) => {
  // 3a. Hooks
  const [state, setState] = useState();
  
  // 3b. Derived state
  const derived = useMemo(() => {}, []);
  
  // 3c. Event handlers
  const handleEvent = useCallback(() => {}, []);
  
  // 3d. Effects
  useEffect(() => {}, []);
  
  // 3e. Render
  return (
    <div>Content</div>
  );
};
```

### Naming Conventions
- **Components**: PascalCase (`VideoCard`, `PlayerControls`)
- **Files**: Match component name (`VideoCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`useVideoPlayer`)
- **Utils**: camelCase (`formatDuration`)
- **Constants**: UPPER_SNAKE_CASE (`SAMPLE_VIDEOS`)
- **Types**: PascalCase (`Video`, `Category`)

## 🐛 Troubleshooting

### Videos Not Playing
- Check video URL is accessible
- Verify video format is MP4
- Check browser console for errors
- Ensure CORS headers are set on video host

### Controls Not Showing
- Try tapping/clicking the video
- Check if `showControls` is true in store
- Verify auto-hide timeout isn't too short

### Gestures Not Working
- Ensure touch events are enabled
- Check if `touchAction: 'none'` is set
- Verify gesture threshold values

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf .vite
npm run dev
```

## 📄 License

This project is provided as-is for educational and commercial use.

## 🤝 Contributing

Contributions are welcome! Please follow:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Support

For issues or questions:
- Open an issue on GitHub
- Check existing documentation
- Review code comments

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
