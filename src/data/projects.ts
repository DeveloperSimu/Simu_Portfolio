export type ProjectCategory = 'full-stack' | 'ai' | 'frontend' | 'applications';

export type ProjectAccent = 'violet' | 'cyan' | 'emerald' | 'amber' | 'rose';

export interface Project {
  id: string;
  title: string;
  description: string;
  details: string;
  features: string[];
  category: ProjectCategory;
  stack: string[];
  featured: boolean;
  accent: ProjectAccent;
  image: string | null;
  demoUrl: string | null;
  repoUrl: string | null;
}

export const projectCategories: { id: ProjectCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'full-stack', label: 'Full Stack' },
  { id: 'ai', label: 'AI' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'applications', label: 'Applications' },
];

/*
 * To publish a project, paste its live demo URL into demoUrl and its repository URL into repoUrl.
 * Use a screenshot path (e.g. "/projects/foodie.png") in image to replace the generated preview.
 * Links left as null are shown as "coming soon" and are never guessed.
 */
export const projects: Project[] = [
  {
    id: 'shreevivah',
    title: 'ShreeVivah',
    description:
      'A matrimony platform where people can create profiles, explore potential matches and connect within a structured, trustworthy experience.',
    details:
      'ShreeVivah brings the matrimony journey online with profile creation, browsing and a structured flow for getting in touch. The focus was a calm, trustworthy experience that keeps people in control of what they share.',
    features: ['Profile creation and browsing', 'Structured matchmaking flow', 'Django-powered backend'],
    category: 'full-stack',
    stack: ['Python', 'Django', 'HTML5', 'CSS3', 'JavaScript'],
    featured: true,
    accent: 'violet',
    image: '/projects/shreevivah.png',
    demoUrl: 'https://shreevivah-matrimony-site.onrender.com',
    repoUrl: 'https://github.com/DeveloperSimu/ShreeVivah-Matrimony-Site.git',
  },
  {
    id: 'foodie',
    title: 'Foodie',
    description:
      'A full stack food discovery and ordering platform for browsing dishes, building an order and moving smoothly from craving to checkout.',
    details:
      'Foodie covers the full path from discovering dishes to placing an order. It combines a browsable menu experience with a backend that handles orders, so the whole flow works as one product.',
    features: ['Dish discovery and browsing', 'Order building and placement', 'Responsive ordering interface'],
    category: 'full-stack',
    stack: ['Python', 'Django', 'Tailwind CSS', 'JavaScript'],
    featured: true,
    accent: 'amber',
    image: '/projects/foodie.png',
    demoUrl: 'https://foodie-webapp-kc9z.onrender.com',
    repoUrl: 'https://github.com/DeveloperSimu/Foodie-WebApp.git',
  },
  {
    id: 'realtime-chat',
    title: 'ChatNova Real-Time ChatApp',
    description:
      'A chat application built around instant, real-time messaging so conversations feel live and responsive.',
    details:
      'The Real-Time ChatApp is built around live messaging, so new messages appear for everyone in the conversation without reloading the page. The interface keeps the focus on the conversation itself.',
    features: ['Instant message delivery', 'Live conversation updates', 'Clean chat interface'],
    category: 'full-stack',
    stack: ['JavaScript', 'Python', 'Django'],
    featured: true,
    accent: 'cyan',
    image: '/projects/realtime-chat.png',
    demoUrl: 'https://chatnova-zh2p.onrender.com',
    repoUrl: 'https://github.com/DeveloperSimu/ChatNova.git',
  },
  {
    id: 'ai-translator',
    title: 'AI Universal Translator',
    description:
      'A translation tool powered by AI, built to explore how modern language models can be integrated into everyday applications.',
    details:
      'The AI Universal Translator explores how a language model can be wired into a simple, everyday tool. The emphasis is on a clear input and output experience around the AI features.',
    features: ['Text translation between languages', 'AI-powered responses', 'Simple input and output panels'],
    category: 'ai',
    stack: ['Python', 'AI Integration', 'JavaScript'],
    featured: false,
    accent: 'cyan',
    image: '/projects/translator.png',
    demoUrl: 'https://ai-universal-translator.onrender.com',
    repoUrl: 'https://github.com/DeveloperSimu/AI-Universal-Translator.git',
  },
  {
    id: 'word-counter',
    title: 'WordCounter App',
    description:
      'A simple writing tool that counts words, characters, sentences and paragraphs as you type, with a clear, distraction-free interface.',
    details:
      'WordCounter App helps writers quickly understand the length and structure of their text. Enter or edit text in the writing area to see live word, character, sentence and paragraph counts, along with an estimated reading time.',
    features: ['Live word and character counts', 'Sentence and paragraph totals', 'Estimated reading time', 'Responsive, distraction-free writing area'],
    category: 'frontend',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
    featured: false,
    accent: 'rose',
    image: '/projects/wordcounterapp.png',
    demoUrl: 'https://wordcounterapp-edw9.onrender.com',
    repoUrl: 'https://github.com/DeveloperSimu/WordCounterApp.git',
  },
  {
    id: 'todo-list',
    title: 'Todo List Application',
    description:
      'A focused task manager for adding, completing and organising everyday to-dos with a clean, distraction-free interface.',
    details:
      'The Todo List Application keeps everyday tasks in one focused place. Adding, completing and organising tasks is designed to be quick, with minimal visual noise.',
    features: ['Add and complete tasks', 'Organise daily to-dos', 'Simple, focused interface'],
    category: 'frontend',
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    featured: false,
    accent: 'emerald',
    image: '/projects/Todo.png',
    demoUrl: 'https://todo-list-u4b0.onrender.com',
    repoUrl: 'https://github.com/DeveloperSimu/Todo_List.git',
  },
  {
    id: 'quiz-app',
    title: 'Quiz Application',
    description:
      'An interactive quiz experience with question flow, answer feedback and scoring to keep learners engaged.',
    details:
      'The Quiz Application walks learners through questions one at a time, gives feedback on each answer and finishes with a score summary.',
    features: ['Question-by-question flow', 'Instant answer feedback', 'Score summary'],
    category: 'frontend',
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    featured: false,
    accent: 'amber',
    image: '/projects/quizapp.png',
    demoUrl: 'https://developersimu.github.io/Quiz-App/',
    repoUrl: 'https://github.com/DeveloperSimu/Quiz-App.git',
  },
  {
    id: 'scientific-calculator',
    title: 'Scientific Calculator',
    description:
      'A calculator that handles scientific operations with a clear layout and precise, step-by-step input handling.',
    details:
      'The Scientific Calculator brings advanced operations into a clear, responsive layout. Input handling is built to be precise so calculations stay predictable.',
    features: ['Scientific operations', 'Clear, precise input', 'Responsive layout'],
    category: 'applications',
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    featured: false,
    accent: 'violet',
    image: '/projects/calculator.png',
    demoUrl: 'https://developersimu.github.io/Scientific-Calculator-/',
    repoUrl: 'https://github.com/DeveloperSimu/Scientific-Calculator-.git',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description:
      'The personal brand site you are looking at now, built to showcase my work, skills and journey as a developer.',
    details:
      'This portfolio is the brand site you are browsing now. It showcases projects, skills and certifications, and uses animation and interaction to present them clearly.',
    features: ['Animated hero and transitions', 'Filterable project showcase', 'Live visitor activity and blog'],
    category: 'frontend',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    featured: false,
    accent: 'cyan',
    image: '/projects/portfolio.png',
    demoUrl: 'https://developersimu.github.io/Portfolio-Website/',
    repoUrl: 'https://github.com/DeveloperSimu/Portfolio-Website.git',
  },
];
