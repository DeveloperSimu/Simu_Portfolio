import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { Footer } from '@/components/layout/Footer';
import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { CustomCursor } from '@/components/layout/CustomCursor';
import { Navbar } from '@/components/layout/Navbar';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { Achievements } from '@/components/sections/Achievements';
import { About } from '@/components/sections/About';
import { Blog } from '@/components/sections/Blog';
import { BlogsPage } from '@/components/pages/BlogsPage';
import { Contact } from '@/components/sections/Contact';
import { Experience } from '@/components/sections/Experience';
import { Hero } from '@/components/sections/Hero';
import { Newsletter } from '@/components/sections/Newsletter';
import { Projects } from '@/components/sections/Projects';
import { Services } from '@/components/sections/Services';
import { Skills } from '@/components/sections/Skills';

function isBlogsRoute(): boolean {
  return window.location.pathname.replace(/\/+$/, '') === '/blogs' || window.location.hash === '#blogs';
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isBlogsPage, setIsBlogsPage] = useState(isBlogsRoute);
  const finishLoading = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    const updateRoute = () => setIsBlogsPage(isBlogsRoute());
    window.addEventListener('hashchange', updateRoute);
    window.addEventListener('popstate', updateRoute);
    return () => {
      window.removeEventListener('hashchange', updateRoute);
      window.removeEventListener('popstate', updateRoute);
    };
  }, []);

  if (isBlogsPage) {
    return (
      <MotionConfig reducedMotion="user">
        <ScrollProgress />
        <CustomCursor />
        <BlogsPage />
      </MotionConfig>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="fixed left-4 top-4 z-[300] -translate-y-24 rounded-full bg-violet-highlight px-4 py-2 font-heading text-sm font-medium text-ink transition-transform duration-300 focus:translate-y-0"
      >
        Skip to content
      </a>

      <AnimatePresence>{isLoading && <LoadingScreen onFinish={finishLoading} />}</AnimatePresence>

      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Achievements />
        <Services />
        <Blog />
        <Newsletter />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  );
}

export default App;
