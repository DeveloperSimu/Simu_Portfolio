import type { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export interface LiveActivity {
  id: string;
  kind: 'project' | 'post';
  title: string;
  at: number;
}

interface LiveSiteHandlers {
  onPresenceCount: (count: number) => void;
  onActivity: (activity: LiveActivity) => void;
}

const CHANNEL_NAME = 'site-live';
const ACTIVITY_EVENT = 'activity';

export function joinLiveSite({ onPresenceCount, onActivity }: LiveSiteHandlers): RealtimeChannel {
  const channel = supabase.channel(CHANNEL_NAME, { config: { broadcast: { self: false } } });

  channel
    .on('presence', { event: 'sync' }, () => {
      onPresenceCount(Object.keys(channel.presenceState()).length);
    })
    .on('broadcast', { event: ACTIVITY_EVENT }, ({ payload }) => {
      if (isLiveActivityPayload(payload)) {
        onActivity({ ...payload, id: crypto.randomUUID(), at: Date.now() });
      }
    })
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') void channel.track({ joinedAt: Date.now() });
    });

  return channel;
}

export function leaveLiveSite(channel: RealtimeChannel): void {
  void supabase.removeChannel(channel);
}

export async function publishLiveActivity(kind: LiveActivity['kind'], title: string): Promise<void> {
  const channel = supabase.channel(CHANNEL_NAME);
  await channel.send({ type: 'broadcast', event: ACTIVITY_EVENT, payload: { kind, title } });
  void supabase.removeChannel(channel);
}

function isLiveActivityPayload(value: unknown): value is Pick<LiveActivity, 'kind' | 'title'> {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (candidate.kind === 'project' || candidate.kind === 'post') && typeof candidate.title === 'string' && candidate.title.length <= 120;
}
