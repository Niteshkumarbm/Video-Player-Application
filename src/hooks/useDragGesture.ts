import { useState, useCallback, useRef, useEffect } from 'react';
import { useVideoStore } from '@/store/videoStore';

interface DragGestureOptions {
  onDragStart?: () => void;
  onDragEnd?: (direction: 'up' | 'down' | 'none') => void;
  threshold?: number;
}

export const useDragGesture = (options: DragGestureOptions = {}) => {
  const { threshold = 100, onDragStart, onDragEnd } = options;
  const { minimizePlayer, toggleRelatedList, showRelatedList } = useVideoStore();
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const startYRef = useRef(0);
  const currentYRef = useRef(0);
  
  const handleDragStart = useCallback((clientY: number) => {
    setIsDragging(true);
    startYRef.current = clientY;
    currentYRef.current = clientY;
    setDragY(0);
    onDragStart?.();
  }, [onDragStart]);
  
  const handleDragMove = useCallback((clientY: number) => {
    if (!isDragging) return;
    
    currentYRef.current = clientY;
    const deltaY = clientY - startYRef.current;
    setDragY(deltaY);
  }, [isDragging]);
  
  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    
    const deltaY = currentYRef.current - startYRef.current;
    let direction: 'up' | 'down' | 'none' = 'none';
    
    if (Math.abs(deltaY) > threshold) {
      direction = deltaY > 0 ? 'down' : 'up';
      
      if (direction === 'down') {
        // Dragging down - minimize player
        minimizePlayer();
      } else if (direction === 'up') {
        // Dragging up - show related list
        if (!showRelatedList) {
          toggleRelatedList();
        }
      }
    }
    
    setIsDragging(false);
    setDragY(0);
    onDragEnd?.(direction);
  }, [isDragging, threshold, minimizePlayer, toggleRelatedList, showRelatedList, onDragEnd]);
  
  // Mouse events
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    handleDragStart(e.clientY);
  }, [handleDragStart]);
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    handleDragMove(e.clientY);
  }, [handleDragMove]);
  
  const handleMouseUp = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);
  
  // Touch events
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleDragStart(e.touches[0].clientY);
    }
  }, [handleDragStart]);
  
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length === 1) {
      handleDragMove(e.touches[0].clientY);
    }
  }, [handleDragMove]);
  
  const handleTouchEnd = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);
  
  // Add/remove event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);
  
  return {
    isDragging,
    dragY,
    handlers: {
      onMouseDown: handleMouseDown,
      onTouchStart: handleTouchStart,
    },
  };
};
