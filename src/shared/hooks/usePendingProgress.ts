'use client';

import { useEffect, useState } from 'react';

interface UsePendingProgressOptions {
  initialProgress?: number;
  maxProgress?: number;
  interval?: number;
}

const DEFAULT_INITIAL_PROGRESS = 18;
const DEFAULT_MAX_PROGRESS = 94;
const DEFAULT_INTERVAL = 900;

export default function usePendingProgress({
  initialProgress = DEFAULT_INITIAL_PROGRESS,
  maxProgress = DEFAULT_MAX_PROGRESS,
  interval = DEFAULT_INTERVAL,
}: UsePendingProgressOptions = {}) {
  const [progress, setProgress] = useState(initialProgress);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= maxProgress) return prev;

        const increment = prev < 50 ? 8 : prev < 75 ? 5 : 2;
        return Math.min(prev + increment, maxProgress);
      });
    }, interval);

    return () => {
      window.clearInterval(timer);
    };
  }, [maxProgress, interval]);

  return progress;
}
