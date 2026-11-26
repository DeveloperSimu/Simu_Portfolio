export type SkillCategoryId = 'frontend' | 'backend' | 'fundamentals' | 'tools' | 'ai';

export interface SkillCategory {
  id: SkillCategoryId;
  title: string;
  description: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'Interfaces that are responsive, accessible and crafted to feel good to use.',
    skills: ['HTML5', 'CSS3', 'Bootstrap', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    title: 'Backend',
    description: 'Server logic, data handling and the frameworks that hold a product together.',
    skills: ['Python', 'Django'],
  },
  {
    id: 'fundamentals',
    title: 'Programming & Fundamentals',
    description: 'The core computer science that makes software reliable and efficient.',
    skills: ['Responsive Web Design', 'Problem Solving'],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    description: 'The everyday tools for version control, editing and shipping projects.',
    skills: ['Git', 'GitHub', 'Antigravity', 'VS Code', 'Vercel', 'Render', 'Replit', 'Bolt', 'Stich', 'Flow', 'Canva', 'MS Office'],
  },
  {
    id: 'ai',
    title: 'AI & Emerging Tech',
    description: 'Modern AI assistants and platforms used to build, explore and iterate faster.',
    skills: ['ChatGPT', 'Google AI Studio', 'Blackbox AI', 'Claude', 'Gemini', 'Perplexity', 'Gamma', 'GitHub Copilot', 'NotebookLM', 'Arena'],
  },  
];
