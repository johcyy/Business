# 📁 BucketSwipe Project Structure

Complete overview of the project's file and folder organization.

---

## 🗂️ Root Directory Structure

```
bucketswipe/
├── backend/              # Node.js/Express backend
├── frontend/             # Next.js frontend
├── docs/                 # Documentation
├── prisma/              # Prisma schema (in root for workspace-wide access)
├── .gitignore           # Root gitignore
└── README.md            # Main project README
```

---

## 🔙 Backend Structure

```
backend/
├── src/
│   ├── controllers/         # Route controllers
│   │   ├── auth.controller.ts
│   │   ├── lists.controller.ts
│   │   ├── items.controller.ts
│   │   ├── feed.controller.ts
│   │   ├── swipes.controller.ts
│   │   ├── comments.controller.ts
│   │   └── users.controller.ts
│   │
│   ├── middleware/          # Express middleware
│   │   ├── auth.middleware.ts         # JWT authentication
│   │   ├── error.middleware.ts        # Error handling
│   │   ├── validation.middleware.ts   # Request validation
│   │   ├── upload.middleware.ts       # File upload handling
│   │   └── rateLimit.middleware.ts    # Rate limiting
│   │
│   ├── routes/             # API routes
│   │   ├── index.ts                   # Main router
│   │   ├── auth.routes.ts
│   │   ├── lists.routes.ts
│   │   ├── items.routes.ts
│   │   ├── feed.routes.ts
│   │   ├── swipes.routes.ts
│   │   ├── comments.routes.ts
│   │   └── users.routes.ts
│   │
│   ├── services/           # Business logic
│   │   ├── auth.service.ts
│   │   ├── lists.service.ts
│   │   ├── items.service.ts
│   │   ├── feed.service.ts
│   │   ├── swipes.service.ts
│   │   ├── comments.service.ts
│   │   └── users.service.ts
│   │
│   ├── utils/              # Utility functions
│   │   ├── prisma.ts                  # Prisma client singleton
│   │   ├── jwt.ts                     # JWT utilities
│   │   ├── bcrypt.ts                  # Password hashing
│   │   ├── validators.ts              # Custom validators
│   │   └── constants.ts               # App constants
│   │
│   ├── types/              # TypeScript types
│   │   ├── express.d.ts               # Express type extensions
│   │   ├── auth.types.ts
│   │   └── api.types.ts
│   │
│   ├── config/             # Configuration
│   │   ├── database.ts
│   │   ├── cors.ts
│   │   └── multer.ts
│   │
│   ├── app.ts              # Express app configuration
│   └── server.ts           # Server entry point
│
├── tests/                  # Test files
│   ├── unit/
│   │   ├── services/
│   │   └── utils/
│   └── integration/
│       └── api/
│
├── uploads/                # Uploaded files (gitignored)
├── .env                    # Environment variables (gitignored)
├── .env.example            # Environment template
├── .gitignore
├── package.json
├── tsconfig.json
└── jest.config.js
```

### Backend File Descriptions

#### Controllers (`src/controllers/`)
- Handle HTTP requests and responses
- Validate input using middleware
- Call service functions
- Format and return responses

**Example: `auth.controller.ts`**
```typescript
export const register = async (req: Request, res: Response) => {
  // 1. Extract data from req.body
  // 2. Call authService.register()
  // 3. Return response
};
```

#### Services (`src/services/`)
- Contain business logic
- Interact with database via Prisma
- Can call other services
- Throw errors for controllers to handle

**Example: `auth.service.ts`**
```typescript
export const register = async (email: string, username: string, password: string) => {
  // 1. Check if user exists
  // 2. Hash password
  // 3. Create user in database
  // 4. Return user data
};
```

#### Middleware (`src/middleware/`)
- Process requests before they reach controllers
- Handle authentication, validation, errors
- Can modify req/res objects

#### Routes (`src/routes/`)
- Define API endpoints
- Apply middleware
- Connect to controllers

**Example: `auth.routes.ts`**
```typescript
router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
```

---

## 🎨 Frontend Structure

```
frontend/
├── app/                           # Next.js 13+ App Router
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Landing page (/)
│   ├── globals.css               # Global styles
│   │
│   ├── (auth)/                   # Auth route group
│   │   ├── login/
│   │   │   └── page.tsx         # Login page
│   │   └── register/
│   │       └── page.tsx         # Register page
│   │
│   ├── (protected)/              # Protected route group
│   │   ├── layout.tsx           # Auth guard layout
│   │   │
│   │   ├── feed/
│   │   │   └── page.tsx         # Main feed
│   │   │
│   │   ├── profile/
│   │   │   └── page.tsx         # Own profile
│   │   │
│   │   ├── lists/
│   │   │   ├── page.tsx         # Bucket lists overview
│   │   │   └── [listId]/
│   │   │       └── page.tsx     # Individual list detail
│   │   │
│   │   └── settings/
│   │       └── page.tsx         # User settings
│   │
│   ├── users/
│   │   └── [userId]/
│   │       └── page.tsx         # Public user profile
│   │
│   └── items/
│       └── [itemId]/
│           └── page.tsx         # Item detail page
│
├── components/
│   ├── auth/
│   │   ├── RegisterForm.tsx
│   │   ├── LoginForm.tsx
│   │   ├── AuthGuard.tsx
│   │   └── PasswordStrength.tsx
│   │
│   ├── feed/
│   │   ├── FeedView.tsx
│   │   ├── SwipeCard.tsx
│   │   ├── SwipeActions.tsx
│   │   └── FeedEmptyState.tsx
│   │
│   ├── profile/
│   │   ├── ProfileHeader.tsx
│   │   ├── ProfileStats.tsx
│   │   ├── MyBucketLists.tsx
│   │   └── EditProfileModal.tsx
│   │
│   ├── list/
│   │   ├── BucketListCard.tsx
│   │   ├── BucketListDetail.tsx
│   │   ├── CreateListModal.tsx
│   │   └── ListItemsList.tsx
│   │
│   ├── item/
│   │   ├── ItemCard.tsx
│   │   ├── ItemDetailModal.tsx
│   │   ├── CreateItemModal.tsx
│   │   ├── EditItemModal.tsx
│   │   ├── ItemForm.tsx
│   │   ├── CommentSection.tsx
│   │   ├── CommentCard.tsx
│   │   └── AddCommentForm.tsx
│   │
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Modal.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ImageUpload.tsx
│   │   ├── EmojiPicker.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── Avatar.tsx
│   │   ├── Card.tsx
│   │   └── Toast.tsx
│   │
│   └── layout/
│       ├── Navigation.tsx
│       ├── MobileNav.tsx
│       ├── Sidebar.tsx
│       ├── PageContainer.tsx
│       └── Footer.tsx
│
├── lib/
│   ├── api/
│   │   ├── client.ts              # Axios instance with interceptors
│   │   ├── auth.api.ts            # Auth API calls
│   │   ├── lists.api.ts           # Lists API calls
│   │   ├── items.api.ts           # Items API calls
│   │   ├── feed.api.ts            # Feed API calls
│   │   ├── swipes.api.ts          # Swipes API calls
│   │   └── comments.api.ts        # Comments API calls
│   │
│   ├── hooks/
│   │   ├── useAuth.ts             # Authentication hook
│   │   ├── useFeed.ts             # Feed management hook
│   │   ├── useBucketLists.ts      # Lists management hook
│   │   ├── useComments.ts         # Comments hook
│   │   ├── useImageUpload.ts      # Image upload hook
│   │   └── useDebounce.ts         # Debounce utility hook
│   │
│   ├── store/
│   │   ├── auth.store.ts          # Zustand auth store
│   │   ├── feed.store.ts          # Zustand feed store
│   │   └── ui.store.ts            # Zustand UI store
│   │
│   ├── utils/
│   │   ├── cn.ts                  # className utility
│   │   ├── formatters.ts          # Date/number formatters
│   │   ├── validators.ts          # Form validators
│   │   └── constants.ts           # App constants
│   │
│   └── auth.ts                    # Auth utilities
│
├── types/
│   ├── index.ts                   # Main types export
│   ├── models.ts                  # Data models
│   ├── api.ts                     # API types
│   └── components.ts              # Component prop types
│
├── styles/
│   └── globals.css                # Tailwind imports & custom styles
│
├── public/
│   ├── images/
│   ├── icons/
│   └── favicon.ico
│
├── .env.local                     # Environment variables (gitignored)
├── .env.local.example             # Environment template
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
└── jest.config.js
```

### Frontend File Descriptions

#### App Router (`app/`)
- Next.js 13+ file-based routing
- Each `page.tsx` is a route
- `layout.tsx` wraps child routes
- Route groups `()` for organization without affecting URL

#### Components (`components/`)
- Reusable React components
- Organized by feature
- Self-contained with props interface

#### API Layer (`lib/api/`)
- Centralized API calls
- Axios interceptors for auth
- Error handling
- Type-safe responses

#### Hooks (`lib/hooks/`)
- Custom React hooks
- Reusable stateful logic
- Server state management

#### Store (`lib/store/`)
- Zustand state management
- Global app state
- Auth state, UI state, etc.

#### Types (`types/`)
- TypeScript type definitions
- Shared across application
- Matches backend models

---

## 📄 Prisma Location

```
prisma/
└── schema.prisma              # Database schema
```

Located in root for easy access from both backend and frontend projects.

---

## 📚 Documentation Structure

```
docs/
├── API_ROUTES.md              # API endpoint documentation
├── FRONTEND_COMPONENTS.md     # Component architecture
├── SETUP_GUIDE.md            # Installation & setup
├── PROJECT_STRUCTURE.md      # This file
└── CONTRIBUTING.md           # Contributing guidelines
```

---

## 🔑 Key Files Explained

### Backend

**`src/server.ts`**
- Entry point for the backend
- Starts Express server
- Connects to database

**`src/app.ts`**
- Configures Express application
- Sets up middleware
- Registers routes

**`src/utils/prisma.ts`**
- Prisma client singleton
- Ensures single database connection

### Frontend

**`app/layout.tsx`**
- Root layout component
- Providers (Auth, Toast, etc.)
- Metadata configuration

**`lib/api/client.ts`**
- Axios instance
- Request/response interceptors
- Error handling

**`lib/store/auth.store.ts`**
- Auth state management
- User data storage
- Token management

---

## 🎯 Best Practices

### Backend

1. **Separation of Concerns:**
   - Controllers handle HTTP
   - Services handle business logic
   - Routes connect everything

2. **Error Handling:**
   - Throw errors in services
   - Catch in error middleware
   - Return consistent error format

3. **Validation:**
   - Validate in middleware
   - Use express-validator
   - Check before service calls

### Frontend

1. **Component Organization:**
   - Small, focused components
   - Reusable across features
   - Props over state when possible

2. **State Management:**
   - Local state for UI
   - Zustand for global state
   - Server state with hooks

3. **Type Safety:**
   - Define all prop types
   - Use TypeScript strictly
   - Avoid `any` type

---

## 📦 Module Boundaries

### Backend Dependencies
```
Controller → Service → Prisma Client → Database
     ↓          ↓
  Routes    Middleware
```

### Frontend Dependencies
```
Page → Component → Hook → API Client → Backend
  ↓         ↓        ↓
Layout   Types    Store
```

---

## 🔄 Data Flow

### Creating a Bucket List Item

**Frontend:**
```
ItemForm.tsx → useBucketLists() → items.api.ts → API
```

**Backend:**
```
API → items.routes.ts → items.controller.ts → items.service.ts → Prisma → DB
```

**Response:**
```
DB → Prisma → items.service.ts → items.controller.ts → API → Frontend
```

---

## 📝 File Naming Conventions

- **Backend:**
  - Controllers: `*.controller.ts`
  - Services: `*.service.ts`
  - Routes: `*.routes.ts`
  - Middleware: `*.middleware.ts`

- **Frontend:**
  - Components: `PascalCase.tsx`
  - Pages: `page.tsx`
  - Hooks: `use*.ts`
  - Types: `*.types.ts`
  - Stores: `*.store.ts`

---

This structure provides a solid foundation for the BucketSwipe application, with clear separation of concerns and organized code that scales well as the application grows.
