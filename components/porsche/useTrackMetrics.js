'use client';

import { useEffect, useState } from 'react';

export default function useTrackMetrics(trackRef, resetKey) {
  const [metrics, setMetrics] = useState({ index: 0, visible: 3, atStart: true, atEnd: false });

  useEffect(() => {
    const track = trackRef.current;
    track.scrollTo({ left: 0, behavior: 'instant' });
    function measure() {
      const style = getComputedStyle(track);
      const step = (track.firstElementChild?.getBoundingClientRect().width || 0) + (parseFloat(style.columnGap) || 0);
      const next = {
        index: step ? Math.max(0, Math.round(track.scrollLeft / step)) : 0,
        visible: Number(style.getPropertyValue('--visible')) || 3,
        atStart: track.scrollLeft < 2,
        atEnd: track.scrollLeft >= track.scrollWidth - track.clientWidth - 2,
      };
      setMetrics((current) => Object.keys(next).every((key) => current[key] === next[key]) ? current : next);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    track.addEventListener('scroll', measure, { passive: true });
    const frame = requestAnimationFrame(measure);
    return () => {
      observer.disconnect();
      track.removeEventListener('scroll', measure);
      cancelAnimationFrame(frame);
    };
  }, [trackRef, resetKey]);

  return metrics;
}
