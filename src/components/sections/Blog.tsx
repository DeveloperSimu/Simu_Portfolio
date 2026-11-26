import { useCallback, useEffect, useState } from 'react';
import { ArrowUpRight, Clock, RotateCw } from 'lucide-react';
import { fetchPublishedPosts, formatPublishedDate, getBlogCoverImage, mergeBlogPosts, type BlogPost } from '@/lib/blog';
import { publishLiveActivity } from '@/lib/liveChannel';
import { curatedBlogPosts } from '@/data/blogPosts';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { buttonStyles } from '@/components/ui/buttonStyles';
import { BlogPostModal } from './blog/BlogPostModal';

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; posts: BlogPost[] }
  | { status: 'ready'; posts: BlogPost[] };

const SKELETON_COUNT = 3;
const FEATURED_POSTS_COUNT = 3;

export function Blog() {
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);
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

  const openPost = useCallback((post: BlogPost) => {
    setSelectedPost(post);
    setDetailOpen(true);
    void publishLiveActivity('post', post.title);
  }, []);
  const closePost = useCallback(() => setDetailOpen(false), []);

  const retry = () => {
    setState({ status: 'loading' });
    setAttempt((value) => value + 1);
  };

  return (
    <section id="blog" className="relative px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Blog"
            title="Notes on full stack building and emerging tech."
            description="Technical articles, tutorials and insights from the things I build and learn along the way."
          />
        </Reveal>

        <div className="mt-14">
          {state.status === 'loading' && (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading articles">
              {Array.from({ length: SKELETON_COUNT }, (_, index) => (
                <li key={index} className="glass h-64 animate-pulse rounded-3xl motion-reduce:animate-none" />
              ))}
            </ul>
          )}

          {state.status === 'error' && (
            <div className="glass mx-auto mb-6 flex max-w-xl flex-wrap items-center justify-center gap-3 rounded-2xl p-4 text-center text-sm" role="alert">
              <p className="text-fg-muted">Online articles are unavailable; showing featured articles instead.</p>
              <button type="button" onClick={retry} className={buttonStyles('ghost', '!px-3 !py-1.5')}>
                <RotateCw className="h-4 w-4" aria-hidden />
                Try again
              </button>
            </div>
          )}

          {state.status === 'ready' && state.posts.length === 0 && (
            <div className="glass mx-auto max-w-xl rounded-3xl p-10 text-center">
              <p className="font-heading text-lg text-fg">No articles are published yet.</p>
              <p className="mt-3 text-sm text-fg-muted">New articles on full stack development and emerging tech will appear here.</p>
            </div>
          )}

          {state.status !== 'loading' && state.posts.length > 0 && (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {state.posts.slice(0, FEATURED_POSTS_COUNT).map((post) => (
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
                      <h3 className="mt-4 font-display text-xl font-semibold leading-[1.25] text-fg">
                        <button
                          type="button"
                          onClick={() => openPost(post)}
                          className="text-left focus-visible:outline-none after:absolute after:inset-0 after:rounded-3xl after:content-['']"
                        >
                          {post.title}
                        </button>
                      </h3>
                      <p className="mt-3 text-sm leading-[1.5] text-fg-muted">{post.excerpt}</p>
                      <div className="mt-auto flex items-center justify-between gap-4 pt-7">
                        <time dateTime={post.publishedAt} className="text-xs text-fg-muted">
                          {formatPublishedDate(post.publishedAt)}
                        </time>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-violet-highlight transition-colors group-hover:text-fg">
                          Read article
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                        </span>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <a href="/#blogs" className={buttonStyles('secondary')}>
            Explore all blogs
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>

      {selectedPost && <BlogPostModal post={selectedPost} open={detailOpen} onClose={closePost} />}
    </section>
  );
}
