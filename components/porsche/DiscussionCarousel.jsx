'use client';

import { useRef, useState } from 'react';
import { benefitGroups } from './data.js';
import Arrow from './Arrow.jsx';
import EditorialCard from './EditorialCard.jsx';
import Tabs, { scrollBehavior } from './Tabs.jsx';
import useTrackMetrics from './useTrackMetrics.js';

function DiscussionGroup({ selected, onSelect }) {
  const track = useRef(null);
  const { index, visible } = useTrackMetrics(track, selected);
  const group = benefitGroups[selected];
  const maximum = Math.max(0, group.cards.length - visible);
  const current = Math.min(index, maximum);

  function moveTo(target) {
    const element = track.current;
    const step = element.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(element).columnGap);
    element.scrollTo({ left: Math.max(0, Math.min(target, maximum)) * step, behavior: scrollBehavior() });
  }

  function handleKeyDown(event) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    moveTo(event.key === 'Home' ? 0 : event.key === 'End' ? maximum : current + (event.key === 'ArrowRight' ? 1 : -1));
  }

  return (
    <>
      <div className="benefits-toolbar">
        <Tabs groups={benefitGroups} prefix="benefits" label="Interview discussion topics" className="benefits-tabs" selected={selected} onSelect={onSelect} />
        <div className="carousel-arrows">
          <button type="button" className="icon-button" id="benefit-previous" aria-label="Previous discussion topic" disabled={current === 0} onClick={() => moveTo(current - 1)}><Arrow direction="left" /></button>
          <button type="button" className="icon-button" id="benefit-next" aria-label="Next discussion topic" disabled={current === maximum} onClick={() => moveTo(current + 1)}><Arrow /></button>
        </div>
      </div>
      <div id="benefits-panel" role="tabpanel" tabIndex={0} aria-labelledby={`benefits-tab-${selected}`} onKeyDown={handleKeyDown}>
        <div ref={track} className="benefit-track" aria-label="Interview discussion cards">
          {group.cards.map((card) => <EditorialCard key={card.asset} card={card} />)}
        </div>
      </div>
      <div className="benefit-dots dots" aria-label="Choose a discussion slide" hidden={maximum === 0}>
        {Array.from({ length: maximum + 1 }, (_, i) => <button key={i} type="button" aria-label={`Go to discussion slide ${i + 1}`} data-slide={i} aria-current={String(i === current)} onClick={() => moveTo(i)} />)}
      </div>
      <p id="benefit-status" className="sr-only" aria-live="polite">Showing discussion topics {current + 1} to {Math.min(group.cards.length, current + visible)} of {group.cards.length}</p>
    </>
  );
}

export default function DiscussionCarousel() {
  const [selected, setSelected] = useState(0);
  return <div className="container"><DiscussionGroup selected={selected} onSelect={setSelected} /></div>;
}
