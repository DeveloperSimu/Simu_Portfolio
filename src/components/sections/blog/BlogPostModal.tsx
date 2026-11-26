import { Clock } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { formatPublishedDate, getBlogCoverImage, type BlogPost } from '@/lib/blog';

interface BlogPostModalProps {
  post: BlogPost;
  open: boolean;
  onClose: () => void;
}

const TITLE_ID = 'blog-post-title';

function toParagraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);
}

export function BlogPostModal({ post, open, onClose }: BlogPostModalProps) {
  return (
    <Modal open={open} onClose={onClose} titleId={TITLE_ID}>
      <article className="p-6 sm:p-10">
        <div className="-mx-6 -mt-6 mb-8 overflow-hidden sm:-mx-10 sm:-mt-10">
          <img
            src={getBlogCoverImage(post)}
            alt={`${post.title} cover`}
            decoding="async"
            className="aspect-video max-h-[360px] w-full object-cover"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-fg-muted">
          <span className="rounded-full border border-white/10 px-3 py-1 font-medium text-violet-highlight">{post.category}</span>
          <time dateTime={post.publishedAt}>{formatPublishedDate(post.publishedAt)}</time>
          <span aria-hidden>&middot;</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {post.readMinutes} min read
          </span>
        </div>
        <h2 id={TITLE_ID} className="mt-5 pr-12 font-display text-2xl font-semibold leading-[1.2] text-fg sm:text-3xl">
          {post.title}
        </h2>
        <p className="mt-4 text-base leading-[1.5] text-fg-muted">{post.excerpt}</p>

        <div className="mt-8 space-y-5 border-t border-white/10 pt-8 text-[15px] leading-[1.7] text-fg">
          {toParagraphs(post.body).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {post.tags.length > 0 && (
          <ul className="mt-10 flex flex-wrap gap-2 border-t border-white/10 pt-8">
            {post.tags.map((tag) => (
              <li key={tag} className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-fg-muted">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </article>
    </Modal>
  );
}
