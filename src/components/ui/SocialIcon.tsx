import { Github, Linkedin, Twitter } from 'lucide-react';
import type { SocialId } from '@/data/portfolio';

const icons = {
  github: Github,
  linkedin: Linkedin,
  x: Twitter,
} satisfies Record<SocialId, typeof Github>;

export function SocialIcon({ id, className }: { id: SocialId; className?: string }) {
  const Icon = icons[id];
  return <Icon className={className} aria-hidden strokeWidth={1.75} />;
}
