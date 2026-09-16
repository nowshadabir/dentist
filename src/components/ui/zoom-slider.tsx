'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(SplitText);

const VAULT_IMAGES = [
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
];

const DEFAULT_SLIDER_DATA: ZoomSliderItem[] = [
  { number: "01", src: VAULT_IMAGES[0], title: "PRECISION", desc: "Microscopic dental exam & restorations" },
  { number: "02", src: VAULT_IMAGES[1], title: "3D SCANNING", desc: "Digital impression-free optical scanning" },
  { number: "03", src: VAULT_IMAGES[2], title: "WHITENING", desc: "Cold-blue laser smile brightening" },
  { number: "04", src: VAULT_IMAGES[3], title: "OPERATORY", desc: "Calm & private patient treatment suite" },
  { number: "05", src: VAULT_IMAGES[4], title: "STERILITY", desc: "Hospital-grade Class-B autoclave safety" },
  { number: "06", src: VAULT_IMAGES[5], title: "CONSULTATION", desc: "One-on-one personalized smile mapping" },
  { number: "07", src: VAULT_IMAGES[6], title: "EXPERTISE", desc: "Dhaka Medical College trained consultant" },
  { number: "08", src: VAULT_IMAGES[7], title: "AESTHETICS", desc: "Porcelain veneers & cosmetic crafting" },
  { number: "09", src: VAULT_IMAGES[8], title: "ALIGNMENT", desc: "Clear discreet orthodontic aligners" },
  { number: "10", src: VAULT_IMAGES[9], title: "CARE", desc: "Unhurried, gentle dental wellness" },
];

const SCROLL_PER_PX = 1.0;
const LERP_FACTOR = 0.08;
const DRAG_LERP_FACTOR = 0.22;
const MOMENTUM_FRICTION = 0.92;
const MIN_MOMENTUM = 0.1;
const DESKTOP_BREAKPOINT = 768;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true;

const lerp = (a: number, b: number, n: number): number => a + (b - a) * n;

export interface ZoomSliderItem {
  number: string;
  src: string;
  title: string;
  desc: string;
}

interface ZoomSliderCompProps {
  sliderData: ZoomSliderItem[];
  title?: string;
  subheading?: string;
  scaleOnHover?: boolean;
  textOnHover?: boolean;
  size?: number;
  easeScrollPercentage?: number;
}

/* =========================================================================
   Mobile Touch-Optimized Carousel (Visible text, Swipe gestures, Prev/Next)
   ========================================================================= */
function MobileGalleryCarousel({ items }: { items: ZoomSliderItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const isSwipingHorizontallyRef = useRef<boolean | null>(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    isSwipingHorizontallyRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isSwipingHorizontallyRef.current === null) {
      const dx = Math.abs(e.touches[0].clientX - touchStartXRef.current);
      const dy = Math.abs(e.touches[0].clientY - touchStartYRef.current);
      // Determine if the user is swiping horizontally or scrolling vertically
      if (dx > 8 || dy > 8) {
        isSwipingHorizontallyRef.current = dx > dy;
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isSwipingHorizontallyRef.current) {
      const endX = e.changedTouches[0].clientX;
      const diffX = endX - touchStartXRef.current;
      if (diffX < -40) {
        nextSlide();
      } else if (diffX > 40) {
        prevSlide();
      }
    }
    isSwipingHorizontallyRef.current = null;
  };

  const active = items[currentIndex];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Active Card Frame */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full relative rounded-3xl overflow-hidden shadow-lg border border-slate-200/90 bg-slate-900 group select-none"
        style={{ touchAction: 'pan-y' }}
      >
        {/* Main Photo */}
        <div className="relative w-full aspect-[4/3] xs:aspect-[16/11] bg-slate-800 overflow-hidden">
          <img
            key={active.src}
            src={active.src}
            alt={active.title}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          {/* Subtle vignette gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

          {/* Top Pill Badges */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
            <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[11px] font-extrabold px-3 py-1 rounded-full border border-white/40 shadow-xs font-mono">
              {active.number} / {items.length.toString().padStart(2, '0')}
            </span>

            <span className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
              <Sparkles className="w-3 h-3" />
              Clinical Suite
            </span>
          </div>

          {/* Bottom Title & Description Overlay on Card */}
          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 text-white">
            <h3 className="text-lg sm:text-xl font-extrabold tracking-tight uppercase text-white drop-shadow-sm">
              {active.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 line-clamp-2 leading-relaxed font-medium">
              {active.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Controls & Dot Indicators */}
      <div className="w-full mt-4 flex items-center justify-between px-1">
        {/* Prev Button */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous clinical photo"
          className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 flex items-center justify-center text-slate-800 transition-all border border-slate-200/80 shadow-xs cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Indicator Dots */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-[180px] px-2 py-1 no-scrollbar">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-6 bg-blue-600"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next clinical photo"
          className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 flex items-center justify-center text-slate-800 transition-all border border-slate-200/80 shadow-xs cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Touch Swipe Tip */}
      <p className="text-[11px] text-slate-400 mt-3 font-medium flex items-center gap-1.5">
        <span>← Swipe horizontally to browse images →</span>
      </p>
    </div>
  );
}

/* =========================================================================
   Desktop GSAP Zoom Slider Component
   ========================================================================= */
export function ZoomSliderComp({
  sliderData,
  title,
  subheading,
  scaleOnHover = true,
  textOnHover = true,
  size = 1,
  easeScrollPercentage = 100,
}: ZoomSliderCompProps) {
  const images = sliderData;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [isClient, setIsClient] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1440);
  const [reduceMotion, setReduceMotion] = useState(false);

  const resolvedSize = Math.max(0.5, Number(size) || 1);
  const resolvedEaseScrollPercentage = Math.max(20, Number(easeScrollPercentage) || 100);

  const isMobile = isClient && viewportWidth < DESKTOP_BREAKPOINT;

  // Well-proportioned card dimensions for desktop / tablet viewports
  const cardWidthMin = 160 * resolvedSize;
  const cardWidthMax = 520 * resolvedSize;
  const cardHeightMax = 440 * resolvedSize;
  const cardHeightMin = 160 * resolvedSize;
  const cardStep = cardWidthMax;

  const stateRef = useRef({
    current: 0,
    target: 0,
    raf: null as number | null,
    isDragging: false,
    lastX: 0,
    lastY: 0,
    velocity: 0,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const announcedIndexRef = useRef(0);

  useEffect(() => {
    setIsClient(true);
    const onResize = () => {
      setViewportWidth(window.innerWidth);
    };

    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const syncReducedMotion = (event: MediaQueryList | MediaQueryListEvent) => {
      setReduceMotion('matches' in event ? event.matches : prefersReducedMotion());
    };

    if (!mediaQuery) return;
    syncReducedMotion(mediaQuery);
    mediaQuery.addEventListener('change', syncReducedMotion);
    return () => mediaQuery.removeEventListener('change', syncReducedMotion);
  }, []);

  const positionCards = useCallback(
    (offset: number) => {
      if (!stripRef.current || isMobile) return;

      const cards = Array.from(stripRef.current.children) as HTMLElement[];
      const count = images.length;
      if (!count) return;

      const loopWidth = count * cardStep;
      const viewportWidthValue = stripRef.current.clientWidth || 1200;
      const containerHeightValue = stripRef.current.clientHeight || 580;

      const bottom = containerHeightValue - 20;
      const easingDistance = 2 * viewportWidthValue * (resolvedEaseScrollPercentage / 100);

      const mapVtoX = (value: number) => {
        if (value <= 0) return 0;
        if (value >= easingDistance) return value - easingDistance / 2;
        return (value * value) / (2 * easingDistance);
      };

      const normalizedOffset = ((offset % loopWidth) + loopWidth) % loopWidth;
      const startIndex = Math.floor(normalizedOffset / cardStep);
      const fractionalOffset = (normalizedOffset % cardStep) / cardStep;

      for (let index = 0; index < count; index += 1) {
        const cardIndex = (startIndex + index) % count;
        const visualOffset = (index - fractionalOffset) * cardStep;
        const currentX = mapVtoX(visualOffset);
        const nextX = mapVtoX(visualOffset + cardStep);
        const visualWidth = nextX - currentX;
        const scale = visualWidth / cardWidthMax;
        const cardHeight = cardHeightMin + scale * (cardHeightMax - cardHeightMin);
        const y = bottom - cardHeight;

        if (!cards[cardIndex]) continue;
        cards[cardIndex].style.transform = `translate(${currentX}px, ${y}px)`;

        const imageWrap = imageWrapRefs.current[cardIndex];
        if (!imageWrap) continue;

        imageWrap.style.width = `${visualWidth}px`;
        imageWrap.style.height = `${cardHeight}px`;
      }
    },
    [cardHeightMax, cardHeightMin, cardStep, cardWidthMax, images.length, isMobile, resolvedEaseScrollPercentage]
  );

  useEffect(() => {
    if (isMobile || !images.length) return;

    const state = stateRef.current;
    const loopWidth = images.length * cardStep;
    const container = containerRef.current;

    const tick = () => {
      if (!reduceMotion && !state.isDragging && Math.abs(state.velocity) > MIN_MOMENTUM) {
        state.target += state.velocity;
        state.velocity *= MOMENTUM_FRICTION;
      } else if (!state.isDragging) {
        state.velocity = 0;
      }

      const lerpFactor = reduceMotion ? 1 : state.isDragging ? DRAG_LERP_FACTOR : LERP_FACTOR;
      state.current = lerp(state.current, state.target, lerpFactor);

      if (Math.abs(state.current - state.target) < 0.01) {
        const shift = Math.round(state.current / loopWidth) * loopWidth;
        state.current -= shift;
        state.target -= shift;
      }

      positionCards(state.current);

      if (images.length) {
        const normalizedOffset = ((state.current % loopWidth) + loopWidth) % loopWidth;
        const nextIndex = Math.floor(normalizedOffset / cardStep) % images.length;
        if (nextIndex !== announcedIndexRef.current) {
          announcedIndexRef.current = nextIndex;
          setActiveIndex(nextIndex);
        }
      }

      state.raf = requestAnimationFrame(tick);
    };

    // Scoped drag listeners for mouse interactions
    const beginDrag = (clientX: number, clientY: number) => {
      state.isDragging = true;
      state.lastX = clientX;
      state.lastY = clientY;
      state.velocity = 0;
    };

    const moveDrag = (clientX: number, clientY: number, direction: number = 1) => {
      if (!state.isDragging) return;
      const deltaX = clientX - state.lastX;
      const deltaY = clientY - state.lastY;
      const rawDelta = Math.abs(deltaX) >= Math.abs(deltaY) ? -deltaX : -deltaY;
      const delta = rawDelta * direction;

      state.target += delta;
      state.velocity = lerp(state.velocity, delta, 0.5);
      state.lastX = clientX;
      state.lastY = clientY;
    };

    const endDrag = () => {
      state.isDragging = false;
    };

    const onMouseDown = (e: MouseEvent) => beginDrag(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => moveDrag(e.clientX, e.clientY);
    const onMouseUp = endDrag;

    // Scoped wheel listener
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        state.target -= e.deltaX * SCROLL_PER_PX;
      }
    };

    if (container) {
      container.addEventListener('mousedown', onMouseDown);
      container.addEventListener('wheel', onWheel, { passive: true });
    }
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    state.raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(state.raf as number);
      if (container) {
        container.removeEventListener('mousedown', onMouseDown);
        container.removeEventListener('wheel', onWheel);
      }
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [cardStep, images.length, isMobile, positionCards, reduceMotion]);

  // Desktop Hover split-text and image scale animations
  useEffect(() => {
    if (isMobile || !images.length) return;

    const cleanups: (() => void)[] = [];

    cardRefs.current.forEach((card, index) => {
      const textElement = textRefs.current[index];
      const imageWrap = imageWrapRefs.current[index];

      if (!card || !textElement || !imageWrap) return;

      const numberElement = textElement.querySelector('[data-number]');
      const titleElement = textElement.querySelector('[data-title]');
      const descElement = textElement.querySelector('[data-desc]');

      if (!numberElement || !titleElement || !descElement) return;

      const split = SplitText.create([numberElement, titleElement, descElement], {
        type: 'lines',
        mask: 'lines',
      });

      gsap.set(split.lines, { yPercent: 100 });
      gsap.set(textElement, { autoAlpha: 0 });

      const imageElement = imageWrap.querySelector('img');
      if (imageElement) {
        gsap.set(imageElement, { opacity: 1 });
      }

      const onEnter = () => {
        if (textOnHover) {
          gsap
            .timeline()
            .set(textElement, { autoAlpha: 1 })
            .to(split.lines, {
              yPercent: 0,
              duration: 0.5,
              stagger: 0.04,
              ease: 'power3.out',
            });
        }

        if (imageElement && scaleOnHover && !reduceMotion) {
          gsap.to(imageElement, {
            scale: 1.05,
            duration: 0.6,
            ease: 'power2.out',
          });
        }
      };

      const onLeave = () => {
        if (textOnHover) {
          gsap.to(split.lines, {
            yPercent: 100,
            duration: 0.25,
            stagger: 0.02,
            ease: 'power2.in',
            onComplete: () => gsap.set(textElement, { autoAlpha: 0 }),
          });
        }

        if (imageElement && scaleOnHover) {
          gsap.to(imageElement, {
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
          });
        }
      };

      imageWrap.addEventListener('mouseenter', onEnter);
      imageWrap.addEventListener('mouseleave', onLeave);

      cleanups.push(() => {
        imageWrap.removeEventListener('mouseenter', onEnter);
        imageWrap.removeEventListener('mouseleave', onLeave);
        split.revert();
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [images, isMobile, reduceMotion, scaleOnHover, textOnHover]);

  const stepForward = () => {
    stateRef.current.target += cardStep * 0.8;
  };

  const stepBackward = () => {
    stateRef.current.target -= cardStep * 0.8;
  };

  // If on mobile viewport, render the mobile-optimized carousel
  if (isMobile) {
    return <MobileGalleryCarousel items={images} />;
  }

  // Otherwise render the Desktop 3D ZoomSlider
  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        data-cursor="drag"
        className="relative w-full overflow-hidden bg-transparent cursor-grab active:cursor-grabbing select-none"
        style={{ height: '580px', touchAction: 'pan-y' }}
      >
        {title ? (
          <div className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h2>
            {subheading ? (
              <p className="mt-1 text-xs sm:text-sm tracking-[0.12em] uppercase font-semibold text-slate-500">
                {subheading}
              </p>
            ) : null}
          </div>
        ) : null}

        <div ref={stripRef} className="absolute inset-0">
          {images.map((item, index) => (
            <div
              key={index}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className="absolute left-0 top-0"
              style={{ willChange: 'transform' }}
            >
              <div
                ref={(element) => {
                  textRefs.current[index] = element;
                }}
                className="absolute z-10 flex w-full flex-col gap-1.25"
                style={{
                  bottom: 'calc(100% + 12px)',
                  left: 0,
                  padding: '0 0 4px',
                  visibility: 'hidden',
                }}
              >
                <p
                  data-number
                  className="overflow-hidden select-none text-[11px] font-bold uppercase leading-none tracking-[0.18em] text-blue-600"
                >
                  {item.number}
                </p>

                <p
                  data-title
                  className="overflow-hidden select-none text-[15px] font-extrabold uppercase leading-[1.15] tracking-[0.08em] text-slate-900"
                >
                  {item.title}
                </p>

                <p
                  data-desc
                  className="overflow-hidden text-[12px] select-none font-medium leading-normal tracking-[0.02em] text-slate-500"
                >
                  {item.desc}
                </p>
              </div>

              <div
                ref={(element) => {
                  imageWrapRefs.current[index] = element;
                }}
                className="relative overflow-hidden rounded-3xl shadow-lg border border-slate-200/90 bg-slate-100"
                style={{
                  width: cardWidthMin,
                  height: cardHeightMax,
                  willChange: 'width, height',
                }}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  draggable={false}
                  className="pointer-events-none absolute inset-0 select-none object-cover opacity-100 w-full h-full"
                  style={{
                    transform: 'none',
                    objectPosition: 'center center',
                    transition: 'none',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Navigation Helper Arrows */}
      <div className="hidden md:flex items-center justify-center gap-3 mt-4">
        <button
          type="button"
          onClick={stepBackward}
          aria-label="Scroll gallery left"
          className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-blue-600 active:scale-95 transition-all shadow-2xs border border-slate-200 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-xs text-slate-400 font-medium select-none">
          Drag horizontally or click arrows to explore
        </span>
        <button
          type="button"
          onClick={stepForward}
          aria-label="Scroll gallery right"
          className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-blue-600 active:scale-95 transition-all shadow-2xs border border-slate-200 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

const ZoomSlider = ({
  title,
  subheading,
  scaleOnHover = true,
  textOnHover = true,
  size = 1,
  easeScrollPercentage = 100,
}: {
  title?: string;
  subheading?: string;
  scaleOnHover?: boolean;
  textOnHover?: boolean;
  size?: number;
  easeScrollPercentage?: number;
} = {}) => (
  <ZoomSliderComp
    title={title}
    subheading={subheading}
    sliderData={DEFAULT_SLIDER_DATA}
    scaleOnHover={scaleOnHover}
    textOnHover={textOnHover}
    size={size}
    easeScrollPercentage={easeScrollPercentage}
  />
);

export default ZoomSlider;
