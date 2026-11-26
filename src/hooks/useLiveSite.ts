import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { joinLiveSite, leaveLiveSite, type LiveActivity } from '@/lib/liveChannel';

const VISIT_STORAGE_KEY = 'simu-site-total-visits';
const ACTIVITY_TTL_MS = 10 * 60 * 1000;
const ACTIVITY_LIMIT = 6;
const PRUNE_INTERVAL_MS = 30 * 1000;

export interface LiveSiteState {
  totalVisits: number | null;
  liveVisitors: number | null;
  activity: LiveActivity[];
}

function readStoredVisits(): number | null {
  const parsed = Number(sessionStorage.getItem(VISIT_STORAGE_KEY));
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : null;
}

export function useLiveSite(): LiveSiteState {
  const [totalVisits, setTotalVisits] = useState<number | null>(() => readStoredVisits());
  const [liveVisitors, setLiveVisitors] = useState<number | null>(null);
  const [activity, setActivity] = useState<LiveActivity[]>([]);

  useEffect(() => {
    if (readStoredVisits() !== null) return;

    let cancelled = false;
    supabase.rpc('record_site_visit').then(({ data, error }) => {
      if (cancelled || error || typeof data !== 'number') return;
      sessionStorage.setItem(VISIT_STORAGE_KEY, String(data));
      setTotalVisits(data);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const channel = joinLiveSite({
      onPresenceCount: setLiveVisitors,
      onActivity: (event) => setActivity((previous) => [event, ...previous].slice(0, ACTIVITY_LIMIT)),
    });

    const prune = window.setInterval(() => {
      const cutoff = Date.now() - ACTIVITY_TTL_MS;
      setActivity((previous) => {
        const fresh = previous.filter((event) => event.at > cutoff);
        return fresh.length === previous.length ? previous : fresh;
      });
    }, PRUNE_INTERVAL_MS);

    return () => {
      window.clearInterval(prune);
      leaveLiveSite(channel);
    };
  }, []);

  return { totalVisits, liveVisitors, activity };
}
