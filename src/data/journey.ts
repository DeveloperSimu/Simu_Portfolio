export interface JourneyEntry {
  id: string;
  kind: 'education' | 'milestone';
  title: string;
  subtitle: string;
  body: string;
  tags: string[];
}

export const journeyEntries: JourneyEntry[] = [
  {
    id: 'bsc-it',
    kind: 'education',
    title: 'B.Sc. in Information Technology',
    subtitle: 'Global Institute Of Science & Technology',
    body: 'The academic foundation for my work in software: programming, systems thinking and the principles behind reliable applications.',
    tags: ['Education'],
  },
  {
    id: 'web-foundations',
    kind: 'milestone',
    title: 'Web Foundations',
    subtitle: 'Structure, style and interactivity',
    body: 'Learned how the web is built from the ground up with HTML, CSS and JavaScript, and started turning simple ideas into working pages.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    id: 'core-programming',
    kind: 'milestone',
    title: 'Core Programming & Problem Solving',
    subtitle: 'Thinking like an engineer',
    body: 'Worked through C, data structures and algorithms to build the problem-solving habits that every good product depends on.',
    tags: ['C', 'Data Structures', 'Algorithms'],
  },
  {
    id: 'backend-django',
    kind: 'milestone',
    title: 'Backend with Python & Django',
    subtitle: 'Building the engine behind the interface',
    body: 'Moved into server-side development, designing data models, handling requests and connecting interfaces to real application logic.',
    tags: ['Python', 'Django'],
  },
  {
    id: 'full-stack-projects',
    kind: 'milestone',
    title: 'Full Stack Project Work',
    subtitle: 'From idea to working product',
    body: 'Built complete applications such as ShreeVivah, Foodie and a real-time chat app, bringing frontend and backend together end to end.',
    tags: ['Full Stack', 'Projects'],
  },
  {
    id: 'ai-tools',
    kind: 'milestone',
    title: 'AI & Emerging Technologies',
    subtitle: 'Building faster with intelligent tools',
    body: 'Explored AI assistants and platforms to prototype, debug and learn faster, and to understand how AI can be integrated into everyday apps.',
    tags: ['AI Integration', 'Continuous Learning'],
  },
  {
    id: 'next-chapter',
    kind: 'milestone',
    title: 'The Next Chapter',
    subtitle: 'Entrepreneurship and product building',
    body: 'Continuing to learn in public, shipping more projects and developing the skills to turn strong ideas into products of my own.',
    tags: ['Entrepreneurship', 'Continuous Learning'],
  },
];
