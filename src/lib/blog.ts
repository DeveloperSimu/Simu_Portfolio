import { supabase } from '@/lib/supabase';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  body: string;
  readMinutes: number;
  publishedAt: string;
  coverImage?: string;
}

interface BlogPostRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  body: string;
  read_minutes: number;
  published_at: string;
}

const POST_COLUMNS = 'id, slug, title, excerpt, category, tags, body, read_minutes, published_at';

function isBlogPostRow(value: unknown): value is BlogPostRow {
  if (typeof value !== 'object' || value === null) return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.id === 'string' &&
    typeof row.slug === 'string' &&
    typeof row.title === 'string' &&
    typeof row.excerpt === 'string' &&
    typeof row.category === 'string' &&
    Array.isArray(row.tags) &&
    row.tags.every((tag) => typeof tag === 'string') &&
    typeof row.body === 'string' &&
    typeof row.read_minutes === 'number' &&
    typeof row.published_at === 'string'
  );
}

export async function fetchPublishedPosts(): Promise<BlogPost[] | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(POST_COLUMNS)
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error || !Array.isArray(data) || !data.every(isBlogPostRow)) return null;

  return data.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    tags: row.tags,
    body: row.body,
    readMinutes: row.read_minutes,
    publishedAt: row.published_at,
  }));
}

export function mergeBlogPosts(curatedPosts: BlogPost[], publishedPosts: BlogPost[]): BlogPost[] {
  const uniquePosts = new Map([...curatedPosts, ...publishedPosts].map((post) => [post.slug, post]));
  return [...uniquePosts.values()].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function formatPublishedDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

const categoryCoverImages: Record<string, string> = {
  frontend: '/blog-covers/react-state.jpg',
  backend: '/blog-covers/api-design.jpg',
  databases: '/blog-covers/database-indexes.jpg',
  accessibility: '/blog-covers/accessible-forms.jpg',
  performance: '/blog-covers/web-performance.jpg',
  'ai & machine learning': '/blog-covers/ai-product.jpg',
  devops: '/blog-covers/docker-dev.jpg',
  'web performance': '/blog-covers/browser-caching.jpg',
  typescript: '/blog-covers/typescript.jpg',
  security: '/blog-covers/web-security.jpg',
};

export function getBlogCoverImage(post: Pick<BlogPost, 'category' | 'coverImage'>): string {
  return post.coverImage ?? categoryCoverImages[post.category.toLowerCase()] ?? '/blog-covers/react-state.jpg';
}
