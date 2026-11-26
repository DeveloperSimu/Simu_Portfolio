export type ServiceIconId = 'layers' | 'layout' | 'server' | 'sparkles' | 'boxes' | 'palette';

export interface Service {
  id: string;
  icon: ServiceIconId;
  title: string;
  description: string;
  highlights: string[];
}

export const services: Service[] = [
  {
    id: 'full-stack',
    icon: 'layers',
    title: 'Full Stack Web Development',
    description: 'End-to-end web applications, from the interface people see to the data and logic behind it.',
    highlights: ['Frontend and backend', 'Database design', 'Deployment'],
  },
  {
    id: 'responsive',
    icon: 'layout',
    title: 'Responsive Website Development',
    description: 'Clean, fast websites that look and work beautifully on phones, tablets and desktops.',
    highlights: ['Mobile-first build', 'Accessible markup', 'Performance-minded'],
  },
  {
    id: 'django',
    icon: 'server',
    title: 'Django Backend Development',
    description: 'Secure, well-structured Django backends with clear models, APIs and admin workflows.',
    highlights: ['Data models', 'APIs and logic', 'Authentication'],
  },
  {
    id: 'ai',
    icon: 'sparkles',
    title: 'AI Integration',
    description: 'Practical integration of AI features into apps, such as assistants, translation and smart workflows.',
    highlights: ['Prompt-driven features', 'API integration', 'Useful, measured results'],
  },
  {
    id: 'custom-apps',
    icon: 'boxes',
    title: 'Custom Web Applications',
    description: 'Tailored tools built around a specific process, idea or business problem.',
    highlights: ['Requirement planning', 'Iterative delivery', 'Maintainable code'],
  },
  {
    id: 'ui-ux',
    icon: 'palette',
    title: 'Website UI/UX Implementation',
    description: 'Turning design direction into polished, interactive interfaces with careful attention to detail.',
    highlights: ['Pixel-precise layouts', 'Motion and micro-interactions', 'Accessible design'],
  },
];
