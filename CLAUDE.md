# Sheldon Roth Fine Art - Development Guidelines

## Project Overview

Fine art photography e-commerce website built with:
- **Next.js 16** with App Router
- **Payload CMS 3.x** for content management
- **PostgreSQL** (Neon) for database
- **Vercel Blob** for media storage
- **Stripe** for payments
- **TailwindCSS** for styling

## Project Structure

```
src/
├── app/
│   ├── (frontend)/     # Public-facing pages
│   ├── (payload)/      # CMS admin routes
│   └── api/            # API routes
├── collections/        # Payload CMS collections
├── components/         # Shared React components
├── context/            # React context providers
└── lib/                # Utilities and helpers
```

## Key Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run payload      # Payload CMS commands
```

---

# React Best Practices

Based on [Vercel Labs React Best Practices](https://github.com/vercel-labs/agent-skills/tree/react-best-practices).

## Critical Impact Rules

### 1. Dynamic Imports for Heavy Components
**Impact: CRITICAL** - Affects Time to Interactive (TTI) and Largest Contentful Paint (LCP)

Use `next/dynamic` to defer loading of large components:

```tsx
// BAD: Bundles Monaco (~300KB) into main chunk
import { MonacoEditor } from '@monaco-editor/react';

// GOOD: Load asynchronously when needed
import dynamic from 'next/dynamic';
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => <div className="shimmer h-96" />
});
```

### 2. Avoid Barrel File Imports
**Impact: CRITICAL** - 200-800ms import cost, slow builds

Import from specific module paths, not barrel files:

```tsx
// BAD: Imports all icons (10,000+ re-exports)
import { ShoppingCart, Heart } from 'lucide-react';

// GOOD: Direct imports
import ShoppingCart from 'lucide-react/dist/esm/icons/shopping-cart';
import Heart from 'lucide-react/dist/esm/icons/heart';
```

Or use `optimizePackageImports` in `next.config.ts`:
```ts
const config = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-*']
  }
};
```

### 3. Parallel Data Fetching with Server Components
**Impact: HIGH** - Eliminates server-side waterfalls

```tsx
// BAD: Sequential fetching (waterfall)
async function Page() {
  const user = await getUser();
  const products = await getProducts(); // Waits for user
  return <Layout user={user}><Products data={products} /></Layout>;
}

// GOOD: Parallel fetching with composition
async function Page() {
  return (
    <Layout>
      <UserSection />      {/* Fetches independently */}
      <ProductSection />   {/* Fetches independently */}
    </Layout>
  );
}

async function UserSection() {
  const user = await getUser();
  return <UserProfile user={user} />;
}

async function ProductSection() {
  const products = await getProducts();
  return <Products data={products} />;
}
```

### 4. Strategic Suspense Boundaries
**Impact: HIGH** - Faster initial paint

```tsx
// BAD: Entire layout waits for data
async function Page() {
  const data = await fetchSlowData();
  return (
    <Layout>
      <Sidebar />
      <DataDisplay data={data} />
      <Footer />
    </Layout>
  );
}

// GOOD: Only data-dependent section waits
function Page() {
  return (
    <Layout>
      <Sidebar />
      <Suspense fallback={<LoadingSkeleton />}>
        <DataDisplayAsync />
      </Suspense>
      <Footer />
    </Layout>
  );
}
```

**When to avoid:** Layout depends on data, SEO-critical content, fast queries, or avoiding layout shift is priority.

## Medium Impact Rules

### 5. Extract to Memoized Components
**Impact: MEDIUM** - Enables early returns, prevents unnecessary re-renders

```tsx
// BAD: Computes avatar even when loading
function UserCard({ loading, userId }) {
  const avatarId = computeAvatarId(userId); // Runs even if loading
  const avatar = <Avatar id={avatarId} />;

  if (loading) return <Skeleton />;
  return <Card>{avatar}</Card>;
}

// GOOD: Early return before expensive work
const MemoizedAvatar = memo(function AvatarWrapper({ userId }) {
  const avatarId = computeAvatarId(userId);
  return <Avatar id={avatarId} />;
});

function UserCard({ loading, userId }) {
  if (loading) return <Skeleton />;
  return <Card><MemoizedAvatar userId={userId} /></Card>;
}
```

### 6. Hoist Static JSX Elements
**Impact: MEDIUM** - Avoids re-creation on each render

```tsx
// BAD: Skeleton recreated every render
function Container({ loading, children }) {
  if (loading) {
    return <div className="skeleton h-48 w-full animate-pulse" />;
  }
  return <div>{children}</div>;
}

// GOOD: Static JSX defined once
const LoadingSkeleton = <div className="skeleton h-48 w-full animate-pulse" />;

function Container({ loading, children }) {
  if (loading) return LoadingSkeleton;
  return <div>{children}</div>;
}
```

### 7. Deduplicate Global Event Listeners
**Impact: MEDIUM-HIGH** - Single listener for N components

```tsx
// BAD: Each component creates own listener
function useKeyboardShortcut(key, callback) {
  useEffect(() => {
    const handler = (e) => e.key === key && callback();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [key, callback]);
}

// GOOD: Use SWR subscription to deduplicate
import useSWRSubscription from 'swr/subscription';

const callbacks = new Map<string, Set<Function>>();

function useKeyboardShortcut(key, callback) {
  useSWRSubscription(`keyboard-${key}`, (_, { next }) => {
    // Single listener shared across all subscribers
    if (!callbacks.has(key)) {
      callbacks.set(key, new Set());
      window.addEventListener('keydown', (e) => {
        if (e.key === key) callbacks.get(key)?.forEach(cb => cb());
      });
    }
    callbacks.get(key)?.add(callback);
    return () => callbacks.get(key)?.delete(callback);
  });
}
```

## Low-Medium Impact Rules

### 8. Early Return from Functions
**Impact: LOW-MEDIUM** - Avoids unnecessary computation

```tsx
// BAD: Continues checking after finding error
function validateItems(items) {
  let hasError = false;
  let errorMessage = '';

  items.forEach(item => {
    if (!item.valid) {
      hasError = true;
      errorMessage = item.error;
    }
  });

  return { hasError, errorMessage };
}

// GOOD: Return immediately on first error
function validateItems(items) {
  for (const item of items) {
    if (!item.valid) {
      return { hasError: true, errorMessage: item.error };
    }
  }
  return { hasError: false, errorMessage: '' };
}
```

---

## Project-Specific Guidelines

### Image Handling
- All product images are stored in Vercel Blob
- Use `getImageUrl()` from `@/lib/utils` to resolve image URLs
- Configure allowed image domains in `next.config.ts`

### Cart Context
- Cart state is managed via `CartContext` in `@/context/CartContext`
- Persists to localStorage under key `sheldonroth-cart`
- Always use `useCart()` hook to access cart functionality

### Payload CMS
- Collections are defined in `src/collections/`
- Access admin at `/admin`
- Use `getPayloadClient()` for server-side CMS access

### Styling Conventions
- Use Tailwind utility classes
- Brand color: `#88744a` (golden/bronze accent)
- Background colors: `bg-white`, `bg-[#f8f8f6]`, `bg-[#1a1a1a]`
- Typography: Light weights (200-300), wide tracking for headings

### Print Details
All prints use TruLife acrylic face mount exclusively:
- Gallery: 30" x 20" - $2,800
- Signature: 45" x 30" - $4,900
- Masterwork: 60" x 40" - $8,500

---

## Performance Checklist

Before deploying, verify:
- [ ] Heavy components use dynamic imports
- [ ] No barrel file imports from large libraries
- [ ] Server components fetch data in parallel where possible
- [ ] Suspense boundaries wrap slow-loading sections
- [ ] Static JSX elements are hoisted outside components
- [ ] Event listeners are deduplicated
- [ ] Images use proper `sizes` attributes
- [ ] Fonts use `display: swap`
