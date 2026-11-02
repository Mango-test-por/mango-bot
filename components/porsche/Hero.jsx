import { useRef, useState } from 'react';
import { highlights, image } from './data.js';
import Arrow from './Arrow.jsx';

export default function Hero() {
  const [active, setActive] = useState(1);
  const touchStart = useRef(null);
  const show = (index) => setActive((index + highlights.length) % highlights.length);

  function handleKeyDown(event) {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    show(active + (event.key === 'ArrowRight' ? 1 : -1));
  }

  function handleTouchEnd(event) {
    if (!touchStart.current) return;
    const dx = event.changedTouches[0].clientX - touchStart.current.x;
    const dy = event.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) show(active + (dx < 0 ? 1 : -1));
    touchStart.current = null;
  }

  return (
    <section className="hero-section" aria-label="Careers at Porsche">
      <div className="hero" aria-roledescription="carousel" aria-label="Porsche careers highlights"
        onKeyDown={handleKeyDown}
        onTouchStart={(event) => { touchStart.current = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null; }}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => { touchStart.current = null; }}>
        <div id="hero-slides">
          {highlights.map((slide, index) => {
            return (
              <div key={index} className={`hero-slide${index === active ? ' active' : ''}`} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${highlights.length}`} aria-hidden={index !== active}>
                <a className="hero-image-link" href={slide.href} aria-labelledby={`hero-title-${index}`} aria-describedby={`hero-description-${index}`} tabIndex={index === active ? 0 : -1}>
                  <picture>
                    <source media="(max-width: 600px)" srcSet={`${image(slide.mobileAsset, 480, '1:1')} 480w, ${image(slide.mobileAsset, 768, '1:1')} 768w, ${image(slide.mobileAsset, 1200, '1:1')} 1200w`} sizes="100vw" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image(slide.asset, 2400, '7:3')} srcSet={`${image(slide.asset, 1200, '7:3')} 1200w, ${image(slide.asset, 1920, '7:3')} 1920w, ${image(slide.asset, 2560, '7:3')} 2560w`} sizes="100vw" alt={slide.alt} fetchpriority={index === 1 ? 'high' : 'auto'} loading={index === active ? 'eager' : 'lazy'} decoding="async" width={1920} height={816} onError={(event) => event.currentTarget.classList.add('image-unavailable')} />
                  </picture>
                  <div className="hero-copy">
                    <h1 className="hero-heading" id={`hero-title-${index}`}>
                      <span className="hero-title"><span>{slide.title}</span><Arrow /></span>
                    </h1>
                    <p id={`hero-description-${index}`}>{slide.description}</p>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
        <div className="hero-dots dots" aria-label="Choose a highlight">
          {highlights.map((_, index) => <button key={index} type="button" aria-label={`Go to slide ${index + 1}`} aria-current={String(index === active)} data-slide={index} onClick={() => show(index)} />)}
        </div>
        <div className="hero-arrows">
          <button type="button" className="icon-button" id="hero-previous" aria-label="Previous highlight" onClick={() => show(active - 1)}><Arrow direction="left" /></button>
          <button type="button" className="icon-button" id="hero-next" aria-label="Next highlight" onClick={() => show(active + 1)}><Arrow /></button>
        </div>
      </div>
    </section>
  );
}
