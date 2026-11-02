'use client';

import { useEffect, useRef } from 'react';

export function scrollBehavior() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
}

export default function Tabs({ groups, prefix, label, className, selected, onSelect }) {
  const tablist = useRef(null);

  useEffect(() => {
    const list = tablist.current;
    const bounds = list.children[selected].getBoundingClientRect();
    const parent = list.getBoundingClientRect();
    if (bounds.left < parent.left || bounds.right > parent.right) {
      list.scrollBy({ left: bounds.left - parent.left - 8, behavior: scrollBehavior() });
    }
  }, [selected]);

  function handleKeyDown(event, index) {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % groups.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + groups.length) % groups.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = groups.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    onSelect(next);
    const list = tablist.current;
    const button = list.children[next];
    button.focus({ preventScroll: true });
  }

  return (
    <div ref={tablist} className={`tabs ${className}`} role="tablist" aria-label={label}>
      {groups.map((group, index) => (
        <button key={group.name} type="button" role="tab" id={`${prefix}-tab-${index}`} aria-controls={`${prefix}-panel`} aria-selected={index === selected} tabIndex={index === selected ? 0 : -1} onClick={() => onSelect(index)} onKeyDown={(event) => handleKeyDown(event, index)}>{group.name}</button>
      ))}
    </div>
  );
}
