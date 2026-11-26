import type { BlogPost } from '@/lib/blog';

export const curatedBlogPosts: BlogPost[] = [
  {
    id: 'curated-react-state',
    slug: 'react-state-where-it-belongs',
    title: 'React State: Put It Where It Belongs',
    excerpt: 'A practical way to decide whether state belongs in a component, a parent, or nowhere at all.',
    category: 'Frontend',
    coverImage: '/blog-covers/react-state.jpg',
    tags: ['React', 'State', 'UI'],
    body: `State is easiest to work with when it lives as close as possible to the UI that owns it. A menu's open state usually belongs in the menu. If two sibling components need the same value, move it to their nearest shared parent rather than introducing a global store immediately.

Before creating state, ask whether the value can be calculated from props or other state. Keeping a second copy of derived data creates synchronization work: both values can change, and they can drift apart. A filtered list, for example, can usually be derived from the source list and the active filter during render.

When state genuinely crosses distant parts of an app, choose a shared store or context based on the problem's size. Clear ownership, small state shapes, and predictable updates make React interfaces easier to debug and test.`,
    readMinutes: 4,
    publishedAt: '2026-11-25T10:00:00.000Z',
  },
  {
    id: 'curated-api-contracts',
    slug: 'designing-api-contracts-that-age-well',
    title: 'Designing API Contracts That Age Well',
    excerpt: 'Consistent responses, validation, and status codes make APIs easier to use and safer to evolve.',
    category: 'Backend',
    coverImage: '/blog-covers/api-design.jpg',
    tags: ['REST', 'API Design', 'Validation'],
    body: `An API is a contract between independently changing pieces of software. Use resource-oriented URLs, predictable HTTP methods, and response shapes that remain consistent across endpoints. Clients should not need a different parsing strategy for every route.

Validate input at the boundary. Treat query parameters, request bodies, and uploaded data as untrusted, even when your own frontend sends them. Return useful validation errors without exposing internal stack traces or implementation details.

Choose status codes deliberately: distinguish a missing resource from invalid input, and distinguish a successful creation from an empty successful response. Document pagination and error formats early. These small conventions reduce surprises as more clients and features depend on the API.`,
    readMinutes: 5,
    publishedAt: '2026-11-23T10:00:00.000Z',
  },
  {
    id: 'curated-postgres-indexes',
    slug: 'postgres-indexes-without-guesswork',
    title: 'Postgres Indexes Without Guesswork',
    excerpt: 'Learn when an index helps, what it costs, and how to verify it with a query plan.',
    category: 'Databases',
    coverImage: '/blog-covers/database-indexes.jpg',
    tags: ['PostgreSQL', 'Indexes', 'Performance'],
    body: `An index can make a lookup much faster, but it is not a free optimization. Every index takes storage and adds work to inserts, updates, and deletes. Start with the queries your application actually runs rather than indexing every column by default.

Look at filtering, joining, and sorting patterns together. A composite index may help when a query repeatedly filters by one column and then another, but column order matters. The best index depends on the query shape and the data distribution.

Use EXPLAIN, and where appropriate EXPLAIN ANALYZE, to compare the planner's choices with the behavior you expect. Test with realistic data volumes: a sequential scan can be the right plan for a small table. Revisit indexes as the application and its access patterns grow.`,
    readMinutes: 5,
    publishedAt: '2026-11-21T10:00:00.000Z',
  },
  {
    id: 'curated-accessible-forms',
    slug: 'accessible-forms-start-with-good-html',
    title: 'Accessible Forms Start with Good HTML',
    excerpt: 'Native labels, clear errors, and keyboard support make forms work for more people.',
    category: 'Accessibility',
    coverImage: '/blog-covers/accessible-forms.jpg',
    tags: ['HTML', 'Accessibility', 'Forms'],
    body: `A usable form begins with semantic HTML. Associate every input with a visible label, choose the correct input type, and group related controls with fieldset and legend when that improves understanding. These choices help screen readers and make the interface easier for everyone to scan.

When validation fails, explain what needs to change in text. Connect the message to its field, mark the invalid control, and move focus thoughtfully when submitting a form with errors. Color alone should never be the only signal that something went wrong.

Test the complete flow with a keyboard: reach every control, understand focus position, and submit without a mouse. Native browser behavior is a strong starting point; custom widgets need extra attention because they also need to recreate the expected keyboard and assistive-technology interactions.`,
    readMinutes: 4,
    publishedAt: '2026-11-19T10:00:00.000Z',
  },
  {
    id: 'curated-web-vitals',
    slug: 'a-practical-guide-to-faster-web-pages',
    title: 'A Practical Guide to Faster Web Pages',
    excerpt: 'Find the bottleneck first, then improve loading, responsiveness, and visual stability.',
    category: 'Performance',
    coverImage: '/blog-covers/web-performance.jpg',
    tags: ['Web Vitals', 'Images', 'Frontend'],
    body: `Performance work is most effective when it starts with measurement. Check real-user data and browser tools to find whether the main problem is a slow initial response, a large hero image, expensive JavaScript, or a layout shift. Optimizing a part users do not wait on may not improve their experience.

Images are common opportunities. Serve a size appropriate to the rendered dimensions, use modern formats where supported, and lazy-load content that starts below the fold. Reserve image space with dimensions or an aspect ratio so the page does not jump as files arrive.

Keep the critical path small: defer nonessential scripts, split large features when it makes sense, and avoid blocking the main thread with excessive work. Re-measure after each focused change. A before-and-after comparison helps ensure the optimization improved the experience rather than just changing a metric.`,
    readMinutes: 5,
    publishedAt: '2026-11-17T10:00:00.000Z',
  },
  {
    id: 'curated-ai-product',
    slug: 'building-useful-ai-features-into-products',
    title: 'Building Useful AI Features into Products',
    excerpt: 'Reliable AI experiences need a clear job, helpful fallbacks, and careful handling of user data.',
    category: 'AI & Machine Learning',
    coverImage: '/blog-covers/ai-product.jpg',
    tags: ['AI', 'Product Design', 'Reliability'],
    body: `Start an AI feature with a user problem, not with a model choice. Define what a good result looks like, when the feature should decline or ask for clarification, and how people will know whether an answer is trustworthy. A narrow, well-defined task is easier to evaluate than a general promise to be helpful.

Treat model output as untrusted input. Validate the structure you need, handle timeouts and rate limits, and provide a graceful path when a request fails. For important decisions, keep a human in the loop and make the system's limitations visible.

Data handling is part of the design. Send only the information the feature needs, explain how user data is used, and avoid placing credentials or private keys in browser code. Evaluate the experience on representative examples before and after changes so quality does not quietly regress.`,
    readMinutes: 5,
    publishedAt: '2026-11-15T10:00:00.000Z',
  },
  {
    id: 'curated-docker',
    slug: 'docker-for-repeatable-development',
    title: 'Docker for Repeatable Development',
    excerpt: 'Use containers to make app setup more consistent without hiding how the system works.',
    category: 'DevOps',
    coverImage: '/blog-covers/docker-dev.jpg',
    tags: ['Docker', 'Containers', 'Development'],
    body: `A container packages an application with the environment it needs, helping reduce the familiar “works on my machine” gap. For local development, a compose file can describe the app and supporting services so teammates can start the same stack with a small number of documented commands.

Keep images focused. Use an appropriate base image, install only required dependencies, and use a lockfile so builds resolve the same package versions. Separate build-time secrets from the image; credentials should be injected at runtime through a secure mechanism, not baked into a layer.

Containers do not remove the need to understand networking, storage, and configuration. Give persistent data an explicit volume, make service readiness clear, and document the expected environment variables. A simple, readable container setup is more valuable than one that adds complexity without improving repeatability.`,
    readMinutes: 5,
    publishedAt: '2026-11-13T10:00:00.000Z',
  },
  {
    id: 'curated-ci',
    slug: 'a-small-ci-pipeline-that-catches-real-bugs',
    title: 'A Small CI Pipeline That Catches Real Bugs',
    excerpt: 'Automate the checks that matter most and give developers clear, fast feedback.',
    category: 'DevOps',
    coverImage: '/blog-covers/ci-pipeline.jpg',
    tags: ['CI/CD', 'Testing', 'Git'],
    body: `Continuous integration is most useful when it answers a simple question quickly: is this change safe to merge? Start with checks that already protect the project, such as dependency installation, type checking, linting, and focused tests. Keep each step repeatable and report failures clearly.

Run inexpensive checks early so obvious problems surface before slower jobs. Cache dependencies carefully to reduce wasted time, but avoid letting a cache become a hidden source of correctness. A clean install should still work when the cache is empty.

A green pipeline is not proof that software has no bugs; it is evidence that the automated checks passed. Choose tests for important user behavior and keep them stable. When a check fails intermittently, investigate the cause rather than simply rerunning it until it passes.`,
    readMinutes: 4,
    publishedAt: '2026-11-11T10:00:00.000Z',
  },
  {
    id: 'curated-browser-cache',
    slug: 'browser-caching-for-faster-repeat-visits',
    title: 'Browser Caching for Faster Repeat Visits',
    excerpt: 'Use cache headers and versioned assets to balance speed with dependable updates.',
    category: 'Web Performance',
    coverImage: '/blog-covers/browser-caching.jpg',
    tags: ['HTTP', 'Caching', 'Web'],
    body: `Caching lets browsers reuse resources instead of downloading them again. Static assets with content-hashed filenames are good candidates for long-lived caching because a changed file gets a new URL. HTML usually needs a shorter lifetime so visitors can discover the latest asset references.

The Cache-Control header expresses how a response may be stored and for how long. Choose policies based on how quickly the content must update and whether it is public or user-specific. Sensitive responses should not accidentally be shared by a public cache.

Test cache behavior in browser developer tools and inspect response headers. A caching strategy should make repeat visits faster without serving stale application code indefinitely. Clear versioning and conservative rules for dynamic content make the trade-off easier to reason about.`,
    readMinutes: 4,
    publishedAt: '2026-11-09T10:00:00.000Z',
  },
  {
    id: 'curated-typescript-boundaries',
    slug: 'typescript-types-and-runtime-boundaries',
    title: 'TypeScript Types Stop at Runtime Boundaries',
    excerpt: 'Static types improve development, but external data still needs runtime validation.',
    category: 'TypeScript',
    coverImage: '/blog-covers/typescript.jpg',
    tags: ['TypeScript', 'Validation', 'Reliability'],
    body: `TypeScript can catch many mistakes while code is being written, but its types are erased when the program runs. A value arriving from an API, local storage, or a form is not proven safe just because it is assigned to a TypeScript interface.

Validate data at the boundary where it enters the application. Check the fields the feature needs, handle missing or malformed values, and convert the result into a trusted internal shape. Small focused guards can be enough; schema libraries can help when many complex payloads need the same treatment.

After validation, keep the rest of the application working with reliable types instead of scattering defensive checks everywhere. This boundary-first approach combines TypeScript's editor and compile-time benefits with explicit handling of real-world data.`,
    readMinutes: 4,
    publishedAt: '2026-11-07T10:00:00.000Z',
  },
  {
    id: 'curated-web-security',
    slug: 'web-security-habits-for-everyday-development',
    title: 'Web Security Habits for Everyday Development',
    excerpt: 'A few consistent habits help protect secrets, user accounts, and application data.',
    category: 'Security',
    coverImage: '/blog-covers/web-security.jpg',
    tags: ['Security', 'Secrets', 'Authorization'],
    body: `Security is easier to maintain when it is built into normal development habits. Keep private keys and service credentials on the server, use environment-specific secret storage, and rotate a credential if it is accidentally exposed. A frontend bundle is public, so anything shipped to the browser must be treated as visible to users.

Authentication answers who a user is; authorization decides what that user may do. Check permissions on the server for every sensitive action rather than relying on hidden buttons or client-side route guards. Validate incoming data and return only the information a caller is allowed to see.

Use established libraries and platform protections instead of inventing custom cryptography or authentication schemes. Keep dependencies current, review error messages for accidental data exposure, and test access controls with accounts that have different roles. Small, repeatable checks help prevent avoidable mistakes.`,
    readMinutes: 5,
    publishedAt: '2026-11-05T10:00:00.000Z',
  },
];
