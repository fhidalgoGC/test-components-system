# HeterogeneousList Component

## Overview

Flexible list component for rendering heterogeneous items (different component types) with infinite scroll, lazy loading, and customizable dividers. Perfect for feeds, timelines, chat messages, or any list where items have different visual representations.

## Key Features

- ✅ **Two Rendering Modes**: Registry-based (data-driven) or Elements-based (React elements)
- ✅ **Infinite Scroll**: Built-in intersection observer for lazy loading
- ✅ **Async Data Loading**: Support for paginated API calls
- ✅ **Customizable Dividers**: Line dividers, component dividers, or none
- ✅ **Scroll Preservation**: Maintains scroll position across updates
- ✅ **State Management**: Loading, empty, and error states with custom renderers
- ✅ **CSS Modules + Tailwind**: Flexible styling with CSS variables
- ✅ **Full Accessibility**: ARIA attributes and semantic HTML
- ✅ **Responsive**: Mobile and web versions available

## Installation

```tsx
import { HeterogeneousList } from '@/lib/ui-library/components/HeterogeneousList';
// or for specific version
import { HeterogeneousListMobile } from '@/lib/ui-library/components/HeterogeneousList/mobile';
import { HeterogeneousListWeb } from '@/lib/ui-library/components/HeterogeneousList/web';
```

## Rendering Modes

### Registry Mode (Recommended)

Use this mode when you have **data objects** that need to be rendered as different component types based on a discriminator field.

```tsx
import { HeterogeneousList } from '@/lib/ui-library/components/HeterogeneousList';

// Define your item types
interface TextMessage {
  id: string;
  kindComponent: 'text';
  message: string;
  sender: string;
}

interface ImageMessage {
  id: string;
  kindComponent: 'image';
  url: string;
  caption: string;
}

type ChatMessage = TextMessage | ImageMessage;

// Create component registry
const MessageComponents = {
  text: ({ item }: { item: TextMessage }) => (
    <div className="text-message">
      <strong>{item.sender}:</strong> {item.message}
    </div>
  ),
  image: ({ item }: { item: ImageMessage }) => (
    <div className="image-message">
      <img src={item.url} alt={item.caption} />
      <p>{item.caption}</p>
    </div>
  ),
};

function ChatFeed() {
  const messages: ChatMessage[] = [
    { id: '1', kindComponent: 'text', message: 'Hello!', sender: 'Alice' },
    { id: '2', kindComponent: 'image', url: '/pic.jpg', caption: 'Vacation', sender: 'Bob' },
  ];

  return (
    <HeterogeneousList
      mode="registry"
      items={messages}
      registry={MessageComponents}
      dividerVariant="line"
      gap={16}
    />
  );
}
```

### Elements Mode

Use this mode when you have **pre-rendered React elements** ready to display.

```tsx
import { HeterogeneousList } from '@/lib/ui-library/components/HeterogeneousList';

function MyFeed() {
  const elements = [
    <div key="1">First post</div>,
    <div key="2">Second post</div>,
    <div key="3">Third post</div>,
  ];

  return (
    <HeterogeneousList
      mode="elements"
      elements={elements}
      gap={12}
    />
  );
}
```

## Infinite Scroll with Async Loading

### Registry Mode with Data Loader

```tsx
import { HeterogeneousList } from '@/lib/ui-library/components/HeterogeneousList';

function InfiniteFeed() {
  const loadPosts = async ({ page, limit }) => {
    const response = await fetch(`/api/posts?page=${page}&limit=${limit}`);
    const data = await response.json();
    
    return {
      items: data.posts, // Array of items with 'kindComponent' field
      hasMore: data.hasMore,
    };
  };

  return (
    <HeterogeneousList
      mode="registry"
      registry={PostComponents}
      dataLoader={loadPosts}
      pageSize={20}
      infiniteScroll={true}
      onLoad={(page, received) => console.log(`Loaded page ${page}, ${received} items`)}
      loading={<div>Loading more posts...</div>}
      empty={<div>No posts yet</div>}
    />
  );
}
```

### Elements Mode with Elements Loader

```tsx
import { HeterogeneousList } from '@/lib/ui-library/components/HeterogeneousList';

function InfiniteElements() {
  const loadElements = async ({ page, limit }) => {
    const response = await fetch(`/api/feed?page=${page}&limit=${limit}`);
    const data = await response.json();
    
    // Generate React elements
    const elements = data.items.map(item => 
      <FeedItem key={item.id} {...item} />
    );
    
    return {
      elements,
      hasMore: data.hasMore,
    };
  };

  return (
    <HeterogeneousList
      mode="elements"
      elementsLoader={loadElements}
      pageSize={15}
      infiniteScroll={true}
    />
  );
}
```

## Props

### Common Props (All Modes)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `'registry' \| 'elements'` | - | **Required**: Rendering mode |
| `infiniteScroll` | `boolean` | `true` | Enable infinite scroll with intersection observer |
| `pageSize` | `number` | `10` | Items per page for loaders |
| `preserveScrollPosition` | `boolean` | `true` | Preserve scroll position on updates |
| `className` | `string` | - | Additional CSS classes for container |
| `listClassName` | `string` | - | Additional CSS classes for list |
| `itemClassName` | `string` | - | Additional CSS classes for each item wrapper |
| `itemWrapperProps` | `Record<string, any>` | `{}` | Additional props for item wrapper divs |
| `gap` | `number \| string` | - | Spacing between items (px or CSS value) |
| `paddingStart` | `number \| string` | - | Padding at start of list |
| `paddingEnd` | `number \| string` | - | Padding at end of list |
| `dividerVariant` | `'none' \| 'line' \| 'component'` | `'none'` | Type of divider between items |
| `dividerEvery` | `number` | `1` | Insert divider after every N items |
| `dividerInset` | `number \| string` | - | Horizontal inset for line dividers |
| `renderDivider` | `(index: number) => ReactNode` | - | Custom divider renderer (for `component` variant) |
| `empty` | `ReactNode` | `'No items to display'` | Content to show when list is empty |
| `emptySpacing` | `number \| string` | - | Padding for empty state |
| `endRender` | `ReactNode` | - | Content to show at end of list |
| `endSpacing` | `number \| string` | - | Padding for end render |
| `loading` | `ReactNode` | `'Loading...'` | Loading indicator content |
| `errorRender` | `(error: unknown, retry: () => void) => ReactNode` | - | Error state renderer with retry function |
| `onLoad` | `(page: number, received: number) => void` | - | Callback after successful load |
| `onLoadingStart` | `(page: number) => void` | - | Callback when loading starts |
| `onEnd` | `() => void` | - | Callback when reaching end of list |
| `virtualize` | `boolean` | - | **Future**: Enable virtualization |
| `estimatedItemSize` | `number` | - | **Future**: Estimated item height for virtualization |

### Registry Mode Specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `T[]` | `[]` | Static items to display |
| `registry` | `Record<string, Component>` | - | **Required**: Component registry keyed by `kindComponent` |
| `itemKey` | `(item: T, index: number) => string \| number` | `item.id ?? index` | Custom key function for items |
| `dataLoader` | `(params: LoaderParams) => Promise<DataLoaderResponse<T>>` | - | Async data loader for pagination |
| `initialItems` | `T[]` | - | Initial items before first load |

### Elements Mode Specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `elements` | `ReactElement[]` | `[]` | Static React elements to display |
| `elementsLoader` | `(params: LoaderParams) => Promise<ElementsLoaderResponse>` | - | Async elements loader for pagination |
| `initialElements` | `ReactElement[]` | - | Initial elements before first load |

## Types

### Registry Item Interface

```typescript
interface RegistryItem {
  id: string | number;
  kindComponent: string; // Discriminator for registry lookup
  [key: string]: any;    // Additional properties
}
```

### Loader Types

```typescript
interface LoaderParams {
  page: number;
  limit: number;
}

interface DataLoaderResponse<T = any> {
  items: T[];
  hasMore: boolean;
}

interface ElementsLoaderResponse {
  elements: ReactElement[];
  hasMore: boolean;
}
```

## Dividers

### Line Divider

```tsx
<HeterogeneousList
  mode="registry"
  items={items}
  registry={registry}
  dividerVariant="line"
  dividerEvery={1}        // After every item
  dividerInset={16}       // 16px horizontal inset
  gap={8}                 // 8px around divider
/>
```

### Component Divider

```tsx
<HeterogeneousList
  mode="registry"
  items={items}
  registry={registry}
  dividerVariant="component"
  dividerEvery={5}        // After every 5 items
  renderDivider={(index) => (
    <div className="custom-divider">
      --- {Math.floor(index / 5) + 1} ---
    </div>
  )}
/>
```

### No Divider (Use Gap)

```tsx
<HeterogeneousList
  mode="registry"
  items={items}
  registry={registry}
  dividerVariant="none"
  gap={12}  // 12px spacing between items
/>
```

## State Renderers

### Empty State

```tsx
<HeterogeneousList
  mode="registry"
  items={[]}
  registry={registry}
  empty={
    <div className="text-center py-8">
      <p className="text-gray-500">No messages yet</p>
      <button>Start conversation</button>
    </div>
  }
  emptySpacing={24}
/>
```

### Loading State

```tsx
<HeterogeneousList
  mode="registry"
  items={items}
  registry={registry}
  dataLoader={loadMore}
  loading={
    <div className="flex justify-center py-4">
      <Spinner />
      <span>Loading more...</span>
    </div>
  }
/>
```

### Error State

```tsx
<HeterogeneousList
  mode="registry"
  items={items}
  registry={registry}
  dataLoader={loadMore}
  errorRender={(error, retry) => (
    <div className="text-center py-4">
      <p className="text-red-500">Failed to load items</p>
      <p className="text-sm text-gray-600">{error.message}</p>
      <button onClick={retry} className="mt-2">
        Retry
      </button>
    </div>
  )}
/>
```

### End State

```tsx
<HeterogeneousList
  mode="registry"
  items={items}
  registry={registry}
  dataLoader={loadMore}
  endRender={
    <div className="text-center text-gray-500">
      You've reached the end 🎉
    </div>
  }
  endSpacing={32}
/>
```

## Advanced Examples

### Chat Application

```tsx
import { HeterogeneousList } from '@/lib/ui-library/components/HeterogeneousList';

interface TextMessage {
  id: string;
  kindComponent: 'text';
  message: string;
  sender: string;
  timestamp: Date;
}

interface ImageMessage {
  id: string;
  kindComponent: 'image';
  url: string;
  sender: string;
  timestamp: Date;
}

interface SystemMessage {
  id: string;
  kindComponent: 'system';
  text: string;
  timestamp: Date;
}

type Message = TextMessage | ImageMessage | SystemMessage;

const MessageRegistry = {
  text: ({ item }: { item: TextMessage }) => (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <strong>{item.sender}</strong>
        <span className="text-xs text-gray-500">
          {item.timestamp.toLocaleTimeString()}
        </span>
      </div>
      <p>{item.message}</p>
    </div>
  ),
  
  image: ({ item }: { item: ImageMessage }) => (
    <div className="flex flex-col">
      <strong>{item.sender}</strong>
      <img src={item.url} alt="Shared image" className="rounded-lg mt-2" />
      <span className="text-xs text-gray-500 mt-1">
        {item.timestamp.toLocaleTimeString()}
      </span>
    </div>
  ),
  
  system: ({ item }: { item: SystemMessage }) => (
    <div className="text-center text-sm text-gray-500 italic">
      {item.text}
    </div>
  ),
};

function ChatView() {
  const loadMessages = async ({ page, limit }) => {
    const response = await fetch(`/api/chat/messages?page=${page}&limit=${limit}`);
    const data = await response.json();
    return {
      items: data.messages,
      hasMore: data.hasMore,
    };
  };

  return (
    <HeterogeneousList
      mode="registry"
      registry={MessageRegistry}
      dataLoader={loadMessages}
      pageSize={50}
      gap={16}
      paddingStart={16}
      paddingEnd={16}
      preserveScrollPosition={true}
      empty={
        <div className="text-center py-8 text-gray-500">
          No messages yet. Say hi! 👋
        </div>
      }
      loading={
        <div className="flex justify-center py-4">
          <div className="animate-spin h-6 w-6 border-2 border-blue-500 rounded-full border-t-transparent" />
        </div>
      }
      errorRender={(error, retry) => (
        <div className="text-center py-4">
          <p className="text-red-500 mb-2">Failed to load messages</p>
          <button
            onClick={retry}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Retry
          </button>
        </div>
      )}
    />
  );
}
```

### Social Media Feed

```tsx
import { HeterogeneousList } from '@/lib/ui-library/components/HeterogeneousList';

interface TextPost {
  id: string;
  kindComponent: 'text-post';
  author: string;
  content: string;
  likes: number;
}

interface PhotoPost {
  id: string;
  kindComponent: 'photo-post';
  author: string;
  caption: string;
  photoUrl: string;
  likes: number;
}

interface AdCard {
  id: string;
  kindComponent: 'ad';
  title: string;
  imageUrl: string;
  link: string;
}

type FeedItem = TextPost | PhotoPost | AdCard;

const FeedRegistry = {
  'text-post': ({ item }: { item: TextPost }) => (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold">{item.author}</h3>
      <p className="mt-2">{item.content}</p>
      <div className="mt-2 text-sm text-gray-500">{item.likes} likes</div>
    </div>
  ),
  
  'photo-post': ({ item }: { item: PhotoPost }) => (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold">{item.author}</h3>
      <img src={item.photoUrl} alt="" className="mt-2 rounded" />
      <p className="mt-2">{item.caption}</p>
      <div className="mt-2 text-sm text-gray-500">{item.likes} likes</div>
    </div>
  ),
  
  'ad': ({ item }: { item: AdCard }) => (
    <a
      href={item.link}
      className="block bg-blue-50 p-4 rounded-lg border border-blue-200"
    >
      <div className="text-xs text-blue-600 mb-1">Sponsored</div>
      <h3 className="font-bold">{item.title}</h3>
      <img src={item.imageUrl} alt="" className="mt-2 rounded" />
    </a>
  ),
};

function SocialFeed() {
  const loadFeed = async ({ page, limit }) => {
    const response = await fetch(`/api/feed?page=${page}&limit=${limit}`);
    const data = await response.json();
    return {
      items: data.posts,
      hasMore: data.hasMore,
    };
  };

  return (
    <HeterogeneousList
      mode="registry"
      registry={FeedRegistry}
      dataLoader={loadFeed}
      pageSize={10}
      gap={16}
      dividerVariant="none"
      endRender={
        <div className="text-center text-gray-500 py-8">
          You're all caught up! 🎉
        </div>
      }
    />
  );
}
```

## Accessibility

The component includes comprehensive accessibility features:

```html
<!-- Container -->
<div role="list" aria-busy="true">
  <!-- Items -->
  <div data-testid="list-item-0">...</div>
  <div data-testid="list-item-1">...</div>
  
  <!-- States -->
  <div data-testid="loading-indicator" aria-live="polite">Loading...</div>
  <div data-testid="empty-state">No items</div>
  <div data-testid="error-state">Error occurred</div>
  <div data-testid="end-render" aria-live="polite">End of list</div>
  
  <!-- Dividers -->
  <div data-testid="divider-0" aria-hidden="true"></div>
</div>
```

## Styling

### CSS Modules

The component uses CSS modules with customizable classes:

```tsx
<HeterogeneousList
  mode="registry"
  items={items}
  registry={registry}
  className="my-custom-container"
  listClassName="my-custom-list"
  itemClassName="my-custom-item"
/>
```

### Gap and Spacing

```tsx
<HeterogeneousList
  mode="registry"
  items={items}
  registry={registry}
  gap={16}              // 16px between items
  paddingStart={24}     // 24px top padding
  paddingEnd={24}       // 24px bottom padding
/>
```

### Item Wrapper Props

```tsx
<HeterogeneousList
  mode="registry"
  items={items}
  registry={registry}
  itemWrapperProps={{
    className: 'hover:bg-gray-50 transition-colors',
    'data-custom': 'value',
  }}
/>
```

## Performance

### Scroll Preservation

The component automatically preserves scroll position when new items are added (useful for chat applications):

```tsx
<HeterogeneousList
  mode="registry"
  items={messages}
  registry={MessageRegistry}
  preserveScrollPosition={true}  // Default
/>
```

### Pagination Strategy

```tsx
<HeterogeneousList
  mode="registry"
  registry={registry}
  dataLoader={loadData}
  pageSize={20}           // Load 20 items per page
  infiniteScroll={true}   // Auto-load when scrolling
  onLoad={(page, count) => {
    console.log(`Loaded page ${page} with ${count} items`);
  }}
/>
```

## Testing

### Data Test IDs

```tsx
// Container
screen.getByTestId('heterogeneous-list-mobile')

// Items
screen.getByTestId('list-item-0')
screen.getByTestId('list-item-1')

// States
screen.getByTestId('loading-indicator')
screen.getByTestId('empty-state')
screen.getByTestId('error-state')
screen.getByTestId('end-render')

// Dividers
screen.getByTestId('divider-0')

// Intersection observer sentinel
screen.getByTestId('scroll-sentinel')
```

## Architecture

### File Structure

```
HeterogeneousList/
├── mobile/
│   ├── hooks/
│   │   ├── useHeterogeneousList.hook.ts     # Main list logic
│   │   ├── useIntersectionObserver.hook.ts  # Infinite scroll
│   │   └── useScrollPreservation.hook.ts    # Scroll position
│   ├── types/
│   │   └── HeterogeneousList.type.ts        # TypeScript types
│   ├── utils/
│   │   └── validators.util.ts               # Props validation
│   ├── views/
│   │   └── HeterogeneousList.view.tsx       # UI component
│   ├── css/
│   │   ├── HeterogeneousList.module.css     # Styles
│   │   └── HeterogeneousList.module.ts      # Class exports
│   └── index.tsx                            # Public exports
├── web/                                      # Web version
└── index.tsx                                 # Main exports
```

## Common Patterns

### Chat Messages (Newest First)

```tsx
const loadMessages = async ({ page, limit }) => {
  const response = await fetch(`/api/messages?page=${page}&limit=${limit}&order=desc`);
  const data = await response.json();
  return {
    items: data.messages.reverse(), // Reverse for bottom-up display
    hasMore: data.hasMore,
  };
};

<HeterogeneousList
  mode="registry"
  registry={MessageRegistry}
  dataLoader={loadMessages}
  preserveScrollPosition={true}
/>
```

### Feed with Ads Every 5 Items

```tsx
const loadFeed = async ({ page, limit }) => {
  const posts = await fetchPosts(page, limit);
  const postsWithAds = insertAdsEvery(posts, 5);
  return {
    items: postsWithAds,
    hasMore: posts.length === limit,
  };
};
```

### Grouped Items with Section Dividers

```tsx
<HeterogeneousList
  mode="registry"
  registry={registry}
  items={groupedItems}
  dividerVariant="component"
  dividerEvery={1}
  renderDivider={(index) => {
    const item = groupedItems[index];
    if (item.kindComponent === 'section-header') return null;
    return <div className="h-px bg-gray-200 my-4" />;
  }}
/>
```

## Troubleshooting

### Items Not Rendering

- **Check `kindComponent`**: Ensure all items have a valid `kindComponent` field
- **Check registry**: Verify registry has component for each `kindComponent`
- **Console errors**: Check browser console for missing component warnings

### Infinite Scroll Not Working

- **Check `hasMore`**: Loader must return `hasMore: true` to continue
- **Check visibility**: Ensure sentinel element is visible in viewport
- **Check `infiniteScroll`**: Must be `true` (default)

### Scroll Position Not Preserved

- **Enable preservation**: Set `preserveScrollPosition={true}`
- **Check container**: Ensure list is in a scrollable container

## Related Components

- **TagSelector**: Multi-select component with tags
- **BottomNavigationBar**: Mobile navigation component

## License

Part of the UI Library - Internal use only
