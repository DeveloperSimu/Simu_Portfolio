import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLiveSite } from '@/hooks/useLiveSite';
import type { LiveActivity } from '@/lib/liveChannel';

const ROTATE_INTERVAL_MS = 4000;

function describe(event: LiveActivity): string {
  return event.kind === 'post' ? `Someone read "${event.title}"` : `Someone viewed ${event.title}`;
}

export function LiveSiteStatus() {
  const { totalVisits, liveVisitors, activity } = useLiveSite();
  const reduceMotion = useReducedMotion();
  const [tickerIndex, setTickerIndex] = useState(0);
  const hasActivity = activity.length > 0;
  const canRotate = activity.length > 1 && !reduceMotion;

  useEffect(() => {
    if (!canRotate) return;
    const timer = window.setInterval(() => {
      setTickerIndex((index) => index + 1);
    }, ROTATE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [canRotate]);

  const current = hasActivity ? activity[tickerIndex % activity.length] : null;

  if (totalVisits === null && liveVisitors === null && !current) return null;

  return (
    <div className="flex flex-col gap-4 pb-8 md:flex-row md:items-center md:justify-between">
      <ul className="flex flex-wrap items-center gap-3 text-xs text-fg-muted">
        {liveVisitors !== null && (
          <li className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-2">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-glow/60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-glow" />
            </span>
            <span className="text-fg">{liveVisitors}</span>
            {liveVisitors === 1 ? 'visitor online now' : 'visitors online now'}
          </li>
        )}
        {totalVisits !== null && (
          <li className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-2">
            <span className="text-fg">{totalVisits.toLocaleString()}</span>
            {totalVisits === 1 ? 'total visit' : 'total visits'}
          </li>
        )}
      </ul>

      {current && (
        <div className="min-w-0 md:max-w-md" role="status" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="truncate text-xs text-fg-muted"
            >
              <span className="mr-2 text-violet-highlight" aria-hidden>
                &#9679;
              </span>
              {describe(current)}
            </motion.p>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
