import { useState, useEffect, useRef, useMemo } from 'react';

interface UseVirtualScrollOptions {
  itemHeight: number;
  containerHeight: number;
  items: any[];
  overscan?: number;
}

export const useVirtualScroll = ({
  itemHeight,
  containerHeight,
  items,
  overscan = 3,
}: UseVirtualScrollOptions) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const totalHeight = items.length * itemHeight;
  
  const startIndex = useMemo(() => {
    return Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  }, [scrollTop, itemHeight, overscan]);
  
  const endIndex = useMemo(() => {
    return Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );
  }, [scrollTop, containerHeight, itemHeight, items.length, overscan]);
  
  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex + 1).map((item, index) => ({
      item,
      index: startIndex + index,
      top: (startIndex + index) * itemHeight,
    }));
  }, [items, startIndex, endIndex, itemHeight]);
  
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };
  
  return {
    totalHeight,
    visibleItems,
    handleScroll,
  };
};

export const useInfiniteScroll = (callback: () => void, threshold = 200) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: `${threshold}px`,
      threshold: 0.1,
    };
    
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    }, options);
    
    const currentTrigger = triggerRef.current;
    if (currentTrigger) {
      observerRef.current.observe(currentTrigger);
    }
    
    return () => {
      if (observerRef.current && currentTrigger) {
        observerRef.current.unobserve(currentTrigger);
      }
    };
  }, [callback, threshold]);
  
  return triggerRef;
};