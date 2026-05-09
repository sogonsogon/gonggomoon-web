'use client';

import { useEffect, useRef, useState } from 'react';

interface UseRotatingTextOptions {
  interval?: number;
  fadeDuration?: number;
}

const DEFAULT_INTERVAL = 4500;
const DEFAULT_FADE_DURATION = 250;

export default function useRotatingText(texts: string[], options: UseRotatingTextOptions = {}) {
  const { interval = DEFAULT_INTERVAL, fadeDuration = DEFAULT_FADE_DURATION } = options;

  const [textIndex, setTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const fadeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (texts.length <= 1) return;

    const intervalTimer = window.setInterval(() => {
      setIsVisible(false);

      if (fadeTimerRef.current !== null) {
        window.clearTimeout(fadeTimerRef.current);
      }

      fadeTimerRef.current = window.setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % texts.length);
        setIsVisible(true);
        fadeTimerRef.current = null;
      }, fadeDuration);
    }, interval);

    return () => {
      window.clearInterval(intervalTimer);

      if (fadeTimerRef.current !== null) {
        window.clearTimeout(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }
    };
  }, [texts.length, interval, fadeDuration]);

  const safeTextIndex = texts.length > 0 ? textIndex % texts.length : 0;

  return {
    currentText: texts[safeTextIndex] ?? '',
    isVisible,
  };
}
