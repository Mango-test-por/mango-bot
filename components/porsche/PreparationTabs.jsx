'use client';

import { useRef, useState } from 'react';
import { entryGroups } from './data.js';
import Arrow from './Arrow.jsx';
import EditorialCard from './EditorialCard.jsx';
import Tabs, { scrollBehavior } from './Tabs.jsx';
import useTrackMetrics from './useTrackMetrics.js';

function PreparationPanel({ group, selected }) {
  const track = useRef(null);
  const { atStart, atEnd } = useTrackMetrics(track);
  const scroll = (direction) => {
    const element = track.current;
    const step = element.firstElementChild.getBoundingClientRect().width + (parseFloat(getComputedStyle(element).columnGap) || 0);
    element.scrollBy({ left: direction * step, behavior: scrollBehavior() });
  };
  const single = group.cards.length === 1;
  const scrollable = group.cards.length > 3;

  return (
    <div id="entry-panel" role="tabpanel" tabIndex={0} aria-labelledby={`entry-tab-${selected}`}>
      {!single && !(atStart && atEnd) && <div className="entry-scroll-controls">
        <button type="button" className="icon-button" aria-label="Previous preparation topic" disabled={atStart} onClick={() => scroll(-1)}><Arrow direction="left" /></button>
        <button type="button" className="icon-button" aria-label="Next preparation topic" disabled={atEnd} onClick={() => scroll(1)}><Arrow /></button>
      </div>}
      <div ref={track} className={`entry-cards card-grid${single ? ' single-card' : ''}${scrollable ? ' scrollable' : ''}`}>
        {group.cards.map((card) => <EditorialCard key={card.asset} card={card} />)}
      </div>
    </div>
  );
}

export default function PreparationTabs() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="container">
      <Tabs groups={entryGroups} prefix="entry" label="Role and interview preparation" className="entry-tabs" selected={selected} onSelect={setSelected} />
      <PreparationPanel key={selected} group={entryGroups[selected]} selected={selected} />
    </div>
  );
}
