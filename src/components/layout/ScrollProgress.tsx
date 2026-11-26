import { motion, useScroll } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[90] h-[2px] origin-left bg-gradient-to-r from-violet-strong via-violet-highlight to-cyan-glow"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
