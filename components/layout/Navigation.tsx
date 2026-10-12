"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { navItems, secondaryNavItems, type NavItem } from "@/data/sections";
import { openManagerMode } from "@/lib/events";

const MANAGER_CLICKS = 5;
const MANAGER_WINDOW_MS = 2400;

// Persistent header: logo, live section indicator and the full-screen MENU.
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("home");
  const closeRef = useRef<HTMLButtonElement>(null);
  const logoClicks = useRef<{ count: number; timer?: number }>({ count: 0 });

  // Track which section is in the middle of the screen.
  useEffect(() => {
    const ids = [...navItems, ...secondaryNavItems].map((item) => item.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock page scroll and handle Escape while the menu is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const goTo = useCallback((id: string) => {
    setOpen(false);
    // Let the overlay start closing before the page scrolls.
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 260);
  }, []);

  // Five quick clicks on the logo open Manager Mode. Otherwise it goes home.
  const onLogoClick = () => {
    const state = logoClicks.current;
    state.count += 1;
    window.clearTimeout(state.timer);
    state.timer = window.setTimeout(() => {
      state.count = 0;
    }, MANAGER_WINDOW_MS);

    if (state.count >= MANAGER_CLICKS) {
      state.count = 0;
      openManagerMode();
      return;
    }
    goTo("home");
  };

  const active = [...navItems, ...secondaryNavItems].find((item) => item.id === activeId);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-line bg-ink/70 px-5 backdrop-blur-sm md:px-10">
        <button
          type="button"
          onClick={onLogoClick}
          className="display flex items-baseline gap-2 text-2xl tracking-wide text-chalk"
          aria-label="DHRITISMAN FC, back to the top"
        >
          <span>DHRITISMAN</span>
          <span className="text-red">FC</span>
        </button>

        <p className="label hidden min-w-0 items-center gap-3 truncate md:flex" aria-live="polite">
          {active ? (
            <>
              <span className="text-red">{active.number}</span>
              <span className="truncate">{active.footballLabel}</span>
            </>
          ) : null}
        </p>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="site-menu"
          className="label flex min-h-11 items-center gap-3 border border-line-strong px-4 text-chalk transition-colors hover:border-red hover:text-red"
          data-cursor="VIEW"
        >
          <span className="flex flex-col gap-1.5" aria-hidden="true">
            <span className="block h-px w-5 bg-current" />
            <span className="block h-px w-5 bg-current" />
          </span>
          MENU
        </button>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="site-menu"
            aria-label="Site navigation"
            className="fixed inset-0 z-[70] overflow-y-auto bg-ink"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pitch-lines pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
            <div className="relative mx-auto flex min-h-full max-w-6xl flex-col px-5 pb-12 pt-6 md:px-10">
              <div className="flex h-12 items-center justify-between">
                <span className="label">DHRITISMAN FC · 2027 SEASON</span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  className="label flex min-h-11 items-center gap-2 border border-line-strong px-4 text-chalk hover:border-red hover:text-red"
                >
                  CLOSE
                  <X size={16} aria-hidden="true" />
                </button>
              </div>

              <ul className="mt-10 flex flex-col">
                {navItems.map((item, index) => (
                  <MenuItem key={item.id} item={item} index={index} onSelect={goTo} />
                ))}
              </ul>

              <div className="mt-12 border-t border-line pt-6">
                <p className="label mb-4">ALSO ON THE PITCH</p>
                <ul className="flex flex-wrap gap-3">
                  {secondaryNavItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(event) => {
                          event.preventDefault();
                          goTo(item.id);
                        }}
                        className="label inline-flex min-h-11 items-center gap-3 border border-line-strong px-4 text-chalk hover:border-red hover:text-red"
                      >
                        <span className="text-red">{item.number}</span>
                        {item.footballLabel}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function MenuItem({
  item,
  index,
  onSelect,
}: {
  item: NavItem;
  index: number;
  onSelect: (id: string) => void;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 + index * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-line"
    >
      <a
        href={`#${item.id}`}
        onClick={(event) => {
          event.preventDefault();
          onSelect(item.id);
        }}
        className="group flex items-baseline justify-between gap-4 py-3 md:py-4"
      >
        <span className="flex items-baseline gap-4 md:gap-8">
          <span className="label w-8 text-red">{item.number}</span>
          <span className="display text-[clamp(2.5rem,8vw,6rem)] text-chalk transition-colors group-hover:text-red">
            {item.footballLabel}
          </span>
        </span>
        <span className="label hidden text-mist md:block">{item.label}</span>
      </a>
    </motion.li>
  );
}
