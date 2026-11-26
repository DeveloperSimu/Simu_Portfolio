import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const INTERACTIVE_SELECTOR = 'a, button, [data-cursor]';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const ringX = useSpring(pointerX, { stiffness: 300, damping: 28, mass: 0.5 });
  const ringY = useSpring(pointerY, { stiffness: 300, damping: 28, mass: 0.5 });
  const dotX = useTransform(pointerX, (v) => v - 3);
  const dotY = useTransform(pointerY, (v) => v - 3);
  const cursorRingX = useTransform(ringX, (v) => v - 20);
  const cursorRingY = useTransform(ringY, (v) => v - 20);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine) and (min-width: 1024px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const sync = () => {
      const on = finePointer.matches && !reducedMotion.matches;
      setEnabled(on);
      document.documentElement.classList.toggle('has-custom-cursor', on);
    };

    sync();
    finePointer.addEventListener('change', sync);
    reducedMotion.addEventListener('change', sync);
    return () => {
      finePointer.removeEventListener('change', sync);
      reducedMotion.removeEventListener('change', sync);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target?.closest(INTERACTIVE_SELECTOR)));
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, [enabled, pointerX, pointerY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[150] h-1.5 w-1.5 rounded-full bg-violet-highlight"
        style={{ x: dotX, y: dotY }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[150] h-10 w-10 rounded-full border border-violet/70 bg-violet/10 mix-blend-screen"
        style={{ x: cursorRingX, y: cursorRingY }}
        animate={{ scale: hovering ? 1.7 : 1, opacity: hovering ? 0.9 : 0.6 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      />
    </>
  );
}
