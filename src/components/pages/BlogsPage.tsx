import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Clock, RotateCw } from 'lucide-react';
import { BlogPostModal } from '@/components/sections/blog/BlogPostModal';
import { curatedBlogPosts } from '@/data/blogPosts';
import { FilterTabs } from '@/components/ui/FilterTabs';
import { Logo } from '@/components/ui/Logo';
import { buttonStyles } from '@/components/ui/buttonStyles';
import { fetchPublishedPosts, formatPublishedDate, getBlogCoverImage, mergeBlogPosts, type BlogPost } from '@/lib/blog';
import { publishLiveActivity } from '@/lib/liveChannel';

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; posts: BlogPost[] }
  | { status: 'ready'; posts: BlogPost[] };

export function BlogsPage() {
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchPublishedPosts().then((posts) => {
      if (cancelled) return;
      if (!posts) {
        setState({ status: 'error', posts: curatedBlogPosts });
        return;
      }

      setState({ status: 'ready', posts: mergeBlogPosts(curatedBlogPosts, posts) });
    });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const categories = useMemo(() => {
    if (state.status === 'loading') return [];
    return [...new Set(state.posts.map((post) => post.category))].sort((a, b) => a.localeCompare(b));
  }, [state]);

  const visiblePosts =
    state.status !== 'loading' && activeCategory !== 'all'
      ? state.posts.filter((post) => post.category === activeCategory)
      : state.status !== 'loading'
        ? state.posts
        : [];

  const openPost = useCallback((post: BlogPost) => {
    setSelectedPost(post);
    setDetailOpen(true);
    void publishLiveActivity('post', post.title);
  }, []);

  const retry = () => {
    setState({ status: 'loading' });
    setActiveCategory('all');
    setAttempt((value) => value + 1);
  };

  return (
    <main className="min-h-screen px-5 pb-24 pt-8 sm:px-8 sm:pt-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between">
          <a href="/" aria-label="Go to home">
            <Logo />
          </a>
          <a href="/" className={buttonStyles('secondary', '!px-4 !py-2.5 text-xs sm:!px-6 sm:!py-3.5 sm:text-sm')}>
            <ArrowLeft className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Back to home</span>
            <span className="sm:hidden">Home</span>
          </a>
        </header>

        <section className="pt-24 sm:pt-32" aria-labelledby="blogs-title">
          <p className="eyebrow">Writing & ideas</p>
          <h1 id="blogs-title" className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.1] text-fg sm:text-6xl">
            All blogs, <span className="gradient-text">all topics.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
            Browse articles across development, technology, data, and the ideas I explore along the way.
          </p>

          {state.status !== 'loading' && state.posts.length > 0 && (
            <div className="mt-10">
              <FilterTabs
                options={[
                  { id: 'all', label: 'All topics' },
                  ...categories.map((category) => ({ id: category, label: category })),
                ]}
                value={activeCategory}
                onChange={setActiveCategory}
                groupLabel="Filter blogs by topic"
                indicatorId="blog-category-filter"
              />
            </div>
          )}

          <div className="mt-10">
            {state.status === 'loading' && (
              <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading blogs">
                {Array.from({ length: 6 }, (_, index) => (
                  <li key={index} className="glass h-64 animate-pulse rounded-3xl motion-reduce:animate-none" />
                ))}
              </ul>
            )}

            {state.status === 'error' && (
              <div className="glass mx-auto flex max-w-xl flex-col items-center gap-5 rounded-3xl p-10 text-center" role="alert">
                <p className="font-heading text-lg text-fg">Online blogs could not be loaded right now.</p>
                <p className="text-sm text-fg-muted">Showing the curated articles for now. Check your connection and try again to load online posts.</p>
                <button type="button" onClick={retry} className={buttonStyles('secondary')}>
                  <RotateCw className="h-4 w-4" aria-hidden />
                  Try again
                </button>
              </div>
            )}

            {state.status === 'ready' && state.posts.length === 0 && (
              <div className="glass mx-auto max-w-xl rounded-3xl p-10 text-center">
                <p className="font-heading text-lg text-fg">No blogs are published yet.</p>
                <p className="mt-3 text-sm text-fg-muted">New articles across different topics will appear here.</p>
              </div>
            )}

            {state.status !== 'loading' && state.posts.length > 0 && (
              <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {visiblePosts.map((post) => (
                  <li key={post.id}>
                    <article className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl transition-colors duration-500 hover:border-violet/40 focus-within:border-violet/40">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <img
                          src={getBlogCoverImage(post)}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                        <span className="absolute bottom-4 left-5 rounded-full border border-white/20 bg-ink/60 px-3 py-1 text-[11px] font-medium text-violet-highlight backdrop-blur-md">
                          {post.category}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-7">
                        <span className="inline-flex items-center gap-1.5 text-xs text-fg-muted">
                          <Clock className="h-3.5 w-3.5" aria-hidden />
                          {post.readMinutes} min read
                        </span>
                        <h2 className="mt-4 font-display text-xl font-semibold leading-[1.25] text-fg">
                          <button
                            type="button"
                            onClick={() => openPost(post)}
                            className="text-left focus-visible:outline-none after:absolute after:inset-0 after:rounded-3xl after:content-['']"
                          >
                            {post.title}
                          </button>
                        </h2>
                        <p className="mt-3 text-sm leading-[1.5] text-fg-muted">{post.excerpt}</p>
                        <div className="mt-auto flex items-center justify-between gap-4 pt-7">
                          <time dateTime={post.publishedAt} className="text-xs text-fg-muted">
                            {formatPublishedDate(post.publishedAt)}
                          </time>
                          <span className="inline-flex items-center gap-1 text-sm font-medium text-violet-highlight transition-colors group-hover:text-fg">
                            Read article
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                          </span>
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>

      {selectedPost && (
        <BlogPostModal post={selectedPost} open={detailOpen} onClose={() => setDetailOpen(false)} />
      )}
    </main>
  );
}
