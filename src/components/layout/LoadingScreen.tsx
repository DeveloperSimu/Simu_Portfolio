import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';

interface LoadingScreenProps {
  onFinish: () => void;
}

const LOAD_DURATION_MS = 1700;

export function LoadingScreen({ onFinish }: LoadingScreenProps) {
  useEffect(() => {
    const timer = window.setTimeout(onFinish, LOAD_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink"
      exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] } }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Logo />
      </motion.div>
      <div className="mt-10 h-px w-48 overflow-hidden rounded-full bg-white/10 sm:w-64">
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-violet-strong via-violet-highlight to-cyan-glow"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: LOAD_DURATION_MS / 1000, ease: [0.65, 0, 0.35, 1] }}
        />
      </div>
      <p className="mt-5 font-heading text-xs uppercase tracking-[0.3em] text-fg-muted">
        Loading experience
      </p>
    </motion.div>
  );
}
