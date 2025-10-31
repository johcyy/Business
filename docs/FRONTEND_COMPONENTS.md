# BucketSwipe Frontend Component Structure

This document outlines the React/Next.js component architecture for BucketSwipe.

## 📁 Project Structure

```
frontend/
├── app/                          # Next.js 13+ App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx        # Login page
│   │   └── register/
│   │       └── page.tsx        # Register page
│   ├── feed/
│   │   └── page.tsx            # Main feed page
│   ├── profile/
│   │   ├── page.tsx            # User profile page
│   │   └── [userId]/
│   │       └── page.tsx        # Other users' profiles
│   ├── lists/
│   │   ├── page.tsx            # My bucket lists overview
│   │   └── [listId]/
│   │       └── page.tsx        # Individual bucket list detail
│   └── items/
│       └── [itemId]/
│           └── page.tsx        # Item detail page
├── components/
│   ├── auth/
│   ├── feed/
│   ├── profile/
│   ├── list/
│   ├── item/
│   ├── common/
│   └── layout/
├── lib/
│   ├── api.ts                  # API client
│   ├── auth.ts                 # Auth utilities
│   └── hooks/                  # Custom React hooks
├── types/
│   └── index.ts                # TypeScript types
└── styles/
    └── globals.css             # Global styles
```

---

## 🔐 Authentication Components

### `components/auth/RegisterForm.tsx`
**Purpose:** User registration form

**Props:**
```typescript
interface RegisterFormProps {
  onSuccess?: () => void;
}
```

**Features:**
- Email, username, and password input fields
- Client-side validation
- Error handling and display
- Calls `POST /auth/register`
- Redirects to login or feed on success

---

### `components/auth/LoginForm.tsx`
**Purpose:** User login form

**Props:**
```typescript
interface LoginFormProps {
  onSuccess?: () => void;
  redirectUrl?: string;
}
```

**Features:**
- Email and password input fields
- "Remember me" checkbox
- "Forgot password?" link
- Calls `POST /auth/login`
- Stores JWT token in local storage/cookies
- Redirects to feed on success

---

### `components/auth/AuthGuard.tsx`
**Purpose:** Protect routes that require authentication

**Props:**
```typescript
interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}
```

**Features:**
- Checks for valid authentication token
- Redirects to login if not authenticated
- Shows loading state during verification

---

## 🔥 Feed Components

### `components/feed/SwipeCard.tsx`
**Purpose:** Individual card displaying a bucket list item with swipe gestures

**Props:**
```typescript
interface SwipeCardProps {
  item: {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
    bucketList: {
      title: string;
      emoji?: string;
    };
    author: {
      username: string;
      profileImageUrl?: string;
    };
  };
  onSwipe: (itemId: string, liked: boolean) => void;
  onCardClick?: (itemId: string) => void;
}
```

**Features:**
- Uses `react-tinder-card` or similar library
- Swipe right (like/support) with green indicator
- Swipe left (skip) with gray indicator
- Click to view full details
- Animated transitions
- Author profile snippet at bottom
- Bucket list context (emoji + title)

---

### `components/feed/FeedView.tsx`
**Purpose:** Main feed container managing the card stack

**Props:**
```typescript
interface FeedViewProps {
  initialItems?: BucketListItem[];
}
```

**Features:**
- Fetches data from `GET /feed`
- Manages stack of SwipeCards
- Infinite scroll/loading more cards
- Empty state when no items available
- Undo last swipe functionality
- Swipe statistics counter

**State Management:**
```typescript
{
  items: BucketListItem[];
  currentIndex: number;
  isLoading: boolean;
  error: string | null;
}
```

---

### `components/feed/SwipeActions.tsx`
**Purpose:** Manual swipe buttons (for non-touch devices)

**Props:**
```typescript
interface SwipeActionsProps {
  onLike: () => void;
  onSkip: () => void;
  disabled?: boolean;
}
```

**Features:**
- Large, accessible buttons
- Keyboard shortcuts (arrow keys)
- Visual feedback on click

---

## 👤 Profile Components

### `components/profile/MyBucketLists.tsx`
**Purpose:** Display the logged-in user's bucket lists

**Props:**
```typescript
interface MyBucketListsProps {
  userId: string;
}
```

**Features:**
- Grid/list view of all bucket lists
- Each card shows: title, emoji, item count, completion percentage
- Create new list button
- Edit and delete actions
- Drag-to-reorder functionality
- Fetches from `GET /lists/me`

---

### `components/profile/ProfileHeader.tsx`
**Purpose:** User profile information header

**Props:**
```typescript
interface ProfileHeaderProps {
  user: {
    id: string;
    username: string;
    profileImageUrl?: string;
    bio?: string;
  };
  stats: {
    totalItems: number;
    completedItems: number;
    receivedLikes: number;
  };
  isOwnProfile: boolean;
}
```

**Features:**
- Profile image with upload functionality (if own profile)
- Username and bio
- Edit profile button (if own profile)
- Statistics display
- Follow button (if viewing another user's profile)

---

### `components/profile/ProfileStats.tsx`
**Purpose:** Display user statistics

**Props:**
```typescript
interface ProfileStatsProps {
  stats: {
    totalBucketLists: number;
    totalItems: number;
    completedItems: number;
    receivedLikes: number;
    givenLikes: number;
  };
}
```

---

## 📋 Bucket List Components

### `components/list/BucketListCard.tsx`
**Purpose:** Card displaying a single bucket list in overview

**Props:**
```typescript
interface BucketListCardProps {
  list: {
    id: string;
    title: string;
    description?: string;
    emoji?: string;
    itemCount: number;
    completedCount: number;
  };
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}
```

**Features:**
- Visual representation with emoji
- Progress bar showing completion
- Item count
- Click to view details

---

### `components/list/BucketListDetail.tsx`
**Purpose:** Full view of a bucket list with all its items

**Props:**
```typescript
interface BucketListDetailProps {
  listId: string;
  editable?: boolean;
}
```

**Features:**
- List header (title, emoji, description)
- Add new item button (if editable)
- Grouped items by status (Pending, In Progress, Completed)
- Drag-to-reorder items
- Bulk actions (delete, change privacy)
- Fetches from `GET /lists/:listId`

---

### `components/list/CreateListModal.tsx`
**Purpose:** Modal for creating a new bucket list

**Props:**
```typescript
interface CreateListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newList: BucketList) => void;
}
```

**Features:**
- Title input
- Description textarea
- Emoji picker
- Calls `POST /lists`

---

## ✅ Item Components

### `components/item/ItemCard.tsx`
**Purpose:** Card displaying a single bucket list item

**Props:**
```typescript
interface ItemCardProps {
  item: {
    id: string;
    title: string;
    description?: string;
    imageUrl?: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
    isPublic: boolean;
  };
  editable?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}
```

**Features:**
- Status badge
- Privacy indicator (public/private)
- Image preview
- Quick action buttons (if editable)
- Click to view details

---

### `components/item/ItemDetailModal.tsx`
**Purpose:** Modal showing full item details with comments

**Props:**
```typescript
interface ItemDetailModalProps {
  itemId: string;
  isOpen: boolean;
  onClose: () => void;
}
```

**Features:**
- Full item information
- Image gallery (if multiple images)
- Status with completion date
- Swipe statistics (likes/support count)
- Comment section component
- Share button
- Fetches from `GET /items/:itemId`

---

### `components/item/CreateItemModal.tsx`
**Purpose:** Modal for creating a new item in a list

**Props:**
```typescript
interface CreateItemModalProps {
  listId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newItem: BucketListItem) => void;
}
```

**Features:**
- Title input (required)
- Description textarea
- Image upload
- Public/Private toggle
- Status dropdown
- Calls `POST /lists/:listId/items`

---

### `components/item/ItemForm.tsx`
**Purpose:** Reusable form for creating/editing items

**Props:**
```typescript
interface ItemFormProps {
  initialData?: Partial<BucketListItem>;
  onSubmit: (data: BucketListItem) => void;
  onCancel: () => void;
  isLoading?: boolean;
}
```

---

### `components/item/CommentSection.tsx`
**Purpose:** Display and manage comments on an item

**Props:**
```typescript
interface CommentSectionProps {
  itemId: string;
  allowComments?: boolean;
}
```

**Features:**
- Tabs for filtering: All, Comments, Tips, Suggestions
- Add new comment form with type selector
- Comment list with author info
- Edit/delete own comments
- Like comments functionality
- Fetches from `GET /items/:itemId/comments`
- Posts to `POST /items/:itemId/comments`

---

### `components/item/CommentCard.tsx`
**Purpose:** Individual comment display

**Props:**
```typescript
interface CommentCardProps {
  comment: {
    id: string;
    content: string;
    commentType: 'COMMENT' | 'TIP' | 'SUGGESTION';
    createdAt: string;
    author: {
      username: string;
      profileImageUrl?: string;
    };
  };
  onEdit?: () => void;
  onDelete?: () => void;
  isAuthor: boolean;
}
```

**Features:**
- Type badge (different colors for Comment/Tip/Suggestion)
- Author profile link
- Timestamp
- Edit/delete buttons (if author)

---

## 🎨 Common/Shared Components

### `components/common/Button.tsx`
**Purpose:** Reusable button component

**Props:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}
```

---

### `components/common/Modal.tsx`
**Purpose:** Reusable modal component

**Props:**
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}
```

---

### `components/common/LoadingSpinner.tsx`
**Purpose:** Loading indicator

---

### `components/common/EmptyState.tsx`
**Purpose:** Display when no data is available

**Props:**
```typescript
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

---

### `components/common/ImageUpload.tsx`
**Purpose:** Image upload with preview

**Props:**
```typescript
interface ImageUploadProps {
  onUpload: (file: File) => void;
  currentImageUrl?: string;
  maxSizeMB?: number;
}
```

---

### `components/common/EmojiPicker.tsx`
**Purpose:** Emoji selection component

---

### `components/common/StatusBadge.tsx`
**Purpose:** Visual badge for item status

**Props:**
```typescript
interface StatusBadgeProps {
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}
```

---

## 🧭 Layout Components

### `components/layout/Navigation.tsx`
**Purpose:** Main navigation bar

**Features:**
- Logo/brand
- Navigation links (Feed, My Lists, Profile)
- Search functionality
- Notifications icon
- User menu dropdown

---

### `components/layout/Sidebar.tsx`
**Purpose:** Side navigation (if using desktop layout)

---

### `components/layout/MobileNav.tsx`
**Purpose:** Mobile bottom navigation

**Features:**
- Tab bar with icons
- Active state indicators
- Badge for notifications

---

### `components/layout/PageContainer.tsx`
**Purpose:** Consistent page wrapper

**Props:**
```typescript
interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}
```

---

## 🪝 Custom Hooks

### `lib/hooks/useAuth.ts`
```typescript
export function useAuth() {
  // Returns: user, login, logout, register, isLoading, error
}
```

### `lib/hooks/useFeed.ts`
```typescript
export function useFeed() {
  // Manages feed state, fetching, and swipe actions
}
```

### `lib/hooks/useBucketLists.ts`
```typescript
export function useBucketLists(userId?: string) {
  // Manages bucket lists CRUD operations
}
```

### `lib/hooks/useComments.ts`
```typescript
export function useComments(itemId: string) {
  // Manages comments for an item
}
```

---

## 🎯 TypeScript Types

### `types/index.ts`
```typescript
export interface User {
  id: string;
  email: string;
  username: string;
  profileImageUrl?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BucketList {
  id: string;
  title: string;
  description?: string;
  emoji?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  items?: BucketListItem[];
}

export interface BucketListItem {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  isPublic: boolean;
  bucketListId: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  bucketList?: BucketList;
  author?: User;
  swipeCount?: {
    total: number;
    likes: number;
  };
}

export interface Swipe {
  id: string;
  liked: boolean;
  swiperId: string;
  itemId: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  content: string;
  commentType: 'COMMENT' | 'TIP' | 'SUGGESTION';
  authorId: string;
  itemId: string;
  createdAt: string;
  updatedAt: string;
  author?: User;
}
```

---

## 🎨 Styling Recommendations

- **UI Library:** Consider using Shadcn UI, Radix UI, or Chakra UI for accessible components
- **Styling:** Tailwind CSS for utility-first styling
- **Animations:** Framer Motion for smooth transitions and gestures
- **Icons:** Lucide React or Heroicons
- **Swipe Gestures:** `react-tinder-card` or `react-swipeable`

---

## 📱 Responsive Design Considerations

1. **Feed View:**
   - Mobile: Full-screen swipe cards
   - Tablet: Centered cards with side padding
   - Desktop: Cards with manual buttons visible

2. **Lists View:**
   - Mobile: Single column
   - Tablet: 2-column grid
   - Desktop: 3-column grid

3. **Navigation:**
   - Mobile: Bottom tab bar
   - Desktop: Top navigation bar

---

## 🚀 Next Steps

1. Set up Next.js project with TypeScript
2. Install required dependencies
3. Configure Tailwind CSS
4. Set up API client with Axios/Fetch
5. Implement authentication flow first
6. Build components incrementally, starting with auth
7. Add Storybook for component development (optional)
8. Write tests with Jest and React Testing Library
