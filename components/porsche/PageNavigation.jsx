'use client';

import { useEffect, useRef, useState } from 'react';

const sections = [
  ['jobs-at-porsche', 'Marketing opportunities'],
  ['entry-opportunities', 'Role & preparation'],
  ['benefits', 'Interview discussion'],
  ['working-for-porsche', 'Your team'],
  ['social-media', 'Next steps'],
];

export default function PageNavigation() {
  const navigation = useRef(null);
  const [active, setActive] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let frame;
    function update() {
      const marker = navigation.current.getBoundingClientRect().height + 140;
      let current = 0;
      sections.forEach(([id], index) => {
        if (document.getElementById(id).getBoundingClientRect().top <= marker) current = index;
      });
      setActive(current);
      setShowTop(window.scrollY > 900);
      frame = null;
    }
    function schedule() { if (frame == null) frame = requestAnimationFrame(update); }
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <>
      <nav ref={navigation} className="content-nav" aria-label="Content navigation">
        <div className="container nav-links">
          {sections.map(([id, label], index) => <a key={id} href={`#${id}`} aria-current={index === active ? 'location' : undefined}>{label}</a>)}
        </div>
      </nav>
      <a className={`back-to-top icon-button${showTop ? ' visible' : ''}`} href="#main-content" aria-label="Scroll to the page top"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20V4M5 11l7-7 7 7" /></svg></a>
    </>
  );
}
