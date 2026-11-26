export type SocialId = 'github' | 'linkedin' | 'x';

export interface SocialLink {
  id: SocialId;
  label: string;
  href: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export const personal = {
  name: 'Srimanta Bag',
  nickname: 'Simu',
  initials: 'SB',
  brand: 'SIMU',
  brandTagline: 'Building Digital Experiences',
  title: 'Full Stack Web Developer | Tech Explorer | Creative Problem Solver',
  headline: ['Designing Ideas.', 'Building Digital Futures.'],
  intro:
    "I'm a Full Stack Web Developer passionate about building modern digital experiences, intelligent applications, and innovative solutions that connect creativity with technology.",
  roles: ['Full Stack Web Developer', 'Tech Explorer', 'Creative Problem Solver', 'Aspiring Entrepreneur'],
  availability: 'Available for new projects',
  email: null as string | null,
  resumeUrl: '/resume.pdf',
  profileImage: '/profile.png',
  description:
    'Srimanta Bag (Simu) is a Full Stack Web Developer, tech explorer and aspiring entrepreneur building modern web applications, intelligent tools and digital experiences.',
};

export const socialLinks: SocialLink[] = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/DeveloperSimu' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/srimanta-bag-719793371/' },
  { id: 'x', label: 'X', href: 'https://x.com/Srimant44458507' },
];

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];

export const aboutCards = [
  {
    id: 'philosophy',
    title: 'Development Philosophy',
    body: 'Good software should feel simple to use even when the engineering underneath is complex. I care about clean structure, honest interfaces and code that others can build on.',
  },
  {
    id: 'journey',
    title: 'Learning Journey',
    body: 'I started with the foundations of the web (HTML, CSS and JavaScript), then moved into Python and Django for backend work while exploring C, data structures and algorithms.',
  },
  {
    id: 'problem-solving',
    title: 'Problem-Solving Mindset',
    body: 'I break big problems into small, testable pieces, research the options carefully, and keep iterating until the solution works well for the people using it.',
  },
  {
    id: 'entrepreneurship',
    title: 'Entrepreneurial Interests',
    body: 'I am interested in how technology can turn everyday ideas into products people actually use, and I enjoy thinking about the business side as much as the build.',
  },
  {
    id: 'goals',
    title: 'Professional Goals',
    body: 'I want to build full stack products that solve real problems, deepen my work with AI-powered applications, and grow into a founder who ships.',
  },
];

export const aboutIntro =
  'I enjoy transforming ideas into functional digital products. Every project is a chance to learn something new, from the technical details to the way people experience what I build.';
