'use client';

import React, { useCallback, useLayoutEffect, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}
export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}
export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  isFixed?: boolean;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = ['#1E201E', '#252725', '#161918'], // Theme colors: bg-secondary, surface, bg
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  menuButtonColor = '#F6EAD5', // Theme: text
  openMenuButtonColor = '#F6EAD5',
  changeMenuColorOnOpen = true,
  accentColor = '#FB6339', // Theme: primary
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);

  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);

  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      if (!panel) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[];
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) {
        gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      }

      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position, mounted]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
    const numberEls = Array.from(
      panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
    ) as HTMLElement[];
    const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];

    const offscreen = position === 'left' ? -100 : 100;
    const layerStates = layers.map(el => ({ el, start: offscreen }));
    const panelStart = offscreen;

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 } as gsap.TweenVars);
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;

      tl.to(
        itemEls,
        { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1, from: 'start' } },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          { duration: 0.6, ease: 'power2.out', '--sm-num-opacity': 1, stagger: { each: 0.08, from: 'start' } } as gsap.TweenVars,
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;

      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: 'opacity' });
            }
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all: HTMLElement[] = [...layers, panel];
    closeTweenRef.current?.kill();

    const offscreen = position === 'left' ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

        const numberEls = Array.from(
          panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
        ) as HTMLElement[];
        if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 } as gsap.TweenVars);

        const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

        busyRef.current = false;
      }
    });
  }, [position]);


  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, { color: targetColor, delay: 0.18, duration: 0.3, ease: 'power2.out' });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);


  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateColor(target);
  }, [playOpen, playClose, animateColor, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateColor(false);
    }
  }, [playClose, animateColor, onMenuClose]);

  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  return (
    <div className={`sm-scope z-50 ${isFixed ? 'fixed top-0 left-0 w-screen h-screen overflow-hidden pointer-events-none' : 'w-auto h-auto'}`}>
      <div
        className={(className ? className + ' ' : '') + 'staggered-menu-wrapper relative z-40'}
        style={accentColor ? ({ '--sm-accent': accentColor } as React.CSSProperties) : undefined}
        data-position={position}
        data-open={open || undefined}
      >
        <button
          ref={toggleBtnRef}
          className={`sm-toggle relative flex flex-col gap-1.5 bg-transparent border-0 cursor-pointer p-2 overflow-visible pointer-events-auto z-[60]`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
        >
          <span className={`w-6 h-[2px] bg-current transition-all duration-300 ${open ? 'rotate-45 translate-y-[8px]' : ''}`} />
          <span className={`w-6 h-[2px] bg-current transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-[2px] bg-current transition-all duration-300 ${open ? '-rotate-45 -translate-y-[8px]' : ''}`} />
        </button>

        {mounted ? createPortal(
          <div className="sm-scope">
            <div className={`fixed inset-0 pointer-events-none z-[40] ${open ? 'pointer-events-auto' : ''}`} style={accentColor ? ({ '--sm-accent': accentColor } as React.CSSProperties) : undefined}>
              <div
                ref={preLayersRef}
                className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-[51]"
                aria-hidden="true"
              >
                {(() => {
                  const raw = colors && colors.length ? colors.slice(0, 4) : ['#1E201E', '#252725'];
                  const arr = [...raw];
                  if (arr.length >= 3) {
                    const mid = Math.floor(arr.length / 2);
                    arr.splice(mid, 1);
                  }
                  return arr.map((c, i) => (
                    <div
                      key={i}
                      className="sm-prelayer absolute top-0 right-0 h-full w-full translate-x-0"
                      style={{ background: c }}
                    />
                  ));
                })()}
              </div>

              <aside
                id="staggered-menu-panel"
                ref={panelRef}
                className="staggered-menu-panel absolute top-0 right-0 h-full bg-[#161918] flex flex-col p-[6em_2em_2em_2em] md:p-[8em_4em_4em_4em] overflow-y-auto z-[52] backdrop-blur-[12px] pointer-events-auto border-l border-border/50"
                style={{ WebkitBackdropFilter: 'blur(12px)' }}
                aria-hidden={!open}
              >
                <div className="sm-panel-inner py-10 flex-1 flex flex-col gap-5 justify-center items-center text-center">
                  <ul
                    className="sm-panel-list list-none m-0 p-0 flex flex-col items-center gap-6"
                    role="list"
                    data-numbering={displayItemNumbering || undefined}
                  >
                    {items && items.length ? (
                      items.map((it, idx) => (
                        <li className="sm-panel-itemWrap relative overflow-hidden leading-none" key={it.label + idx}>
                          <a
                            className="sm-panel-item relative text-text hover:text-primary font-display-2xl text-[3.5rem] md:text-[5rem] cursor-pointer leading-none tracking-tighter transition-[color] duration-300 ease-linear inline-block no-underline pr-[1.4em] magnetic-target"
                            href={it.link}
                            aria-label={it.ariaLabel}
                            data-index={idx + 1}
                            onClick={closeMenu}
                          >
                            <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                              {it.label}
                            </span>
                          </a>
                        </li>
                      ))
                    ) : null}
                    
                    {/* Hire Me Button inside menu */}
                    <li className="sm-panel-itemWrap relative overflow-hidden leading-none mt-8">
                      <div className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                        <a
                          href="#contact"
                          onClick={closeMenu}
                          className="bg-primary text-bg px-8 py-4 rounded-full font-body-lg font-bold hover:bg-primary-light hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer inline-block uppercase tracking-widest magnetic-target"
                        >
                          Hire Me
                        </a>
                      </div>
                    </li>
                  </ul>

                  {displaySocials && socialItems && socialItems.length > 0 && (
                    <div className="sm-socials mt-auto pt-12 flex flex-col items-center gap-4 border-t border-border/50" aria-label="Social links">
                      <h3 className="sm-socials-title m-0 text-label-sm tracking-widest uppercase font-bold text-text-secondary">Socials</h3>
                      <ul
                        className="sm-socials-list list-none m-0 p-0 flex flex-row items-center justify-center gap-6 flex-wrap"
                        role="list"
                      >
                        {socialItems.map((s, i) => (
                          <li key={s.label + i} className="sm-socials-item">
                            <a
                              href={s.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="sm-socials-link text-body-lg font-medium text-text no-underline relative inline-block py-[2px] transition-[color,opacity] duration-300 ease-linear hover:text-primary magnetic-target"
                            >
                              {s.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </div>,
          document.body
        ) : null}
      </div>

      <style>{`
.sm-scope .staggered-menu-wrapper { display: inline-flex; }
.sm-scope .sm-toggle { outline: none; }
.sm-scope .sm-toggle-textWrap { position: relative; margin-right: 0.5em; display: inline-block; height: 1em; overflow: hidden; white-space: nowrap; width: var(--sm-toggle-width, auto); min-width: var(--sm-toggle-width, auto); }
.sm-scope .sm-toggle-textInner { display: flex; flex-direction: column; line-height: 1; }
.sm-scope .sm-toggle-line { display: block; height: 1em; line-height: 1; }
.sm-scope .sm-icon { position: relative; width: 14px; height: 14px; flex: 0 0 14px; display: inline-flex; align-items: center; justify-content: center; will-change: transform; }
.sm-scope .sm-icon-line { position: absolute; left: 50%; top: 50%; width: 100%; height: 2px; background: currentColor; border-radius: 2px; transform: translate(-50%, -50%); will-change: transform; }
.sm-scope .sm-panel-itemWrap { position: relative; overflow: hidden; line-height: 1; }
.sm-scope .staggered-menu-panel { width: clamp(320px, 100vw, 100vw); }
.sm-scope .sm-prelayers { width: clamp(320px, 100vw, 100vw); }
.sm-scope .sm-prelayer { position: absolute; top: 0; right: 0; height: 100%; width: 100%; transform: translateX(0); }
.sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { counter-increment: smItem; content: counter(smItem, decimal-leading-zero); position: absolute; top: 0.2em; right: 0; font-size: 1.5rem; font-weight: 500; color: var(--sm-accent, #FB6339); opacity: var(--sm-num-opacity, 0); font-family: monospace; }
@media (min-width: 768px) {
  .sm-scope .staggered-menu-panel { width: clamp(400px, 45vw, 600px); }
  .sm-scope .sm-prelayers { width: clamp(400px, 45vw, 600px); }
}
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
