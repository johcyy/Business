# 🪣 BucketSwipe

> A social media platform where users support each other in achieving their life goals through Tinder-style interactions.

BucketSwipe combines the concept of bucket lists with social engagement, allowing users to discover, support, and get inspired by others' life goals.

---

## 🎯 Core Concept

- **Create Bucket Lists:** Users organize their life goals into themed lists (e.g., "World Travel," "Learn Skills")
- **Add List Items:** Each bucket list contains specific, achievable goals
- **Public Feed:** Users can make their goals public and appear in a swipeable feed
- **Swipe to Support:** Tinder-style interactions - swipe right to support, left to skip
- **Community Engagement:** Comment, give tips, and provide suggestions on public goals
- **Track Progress:** Mark goals as pending, in progress, or completed

---

## 🏗️ Technology Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js or NestJS
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT tokens

### Frontend
- **Framework:** Next.js 13+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI / Radix UI
- **Animations:** Framer Motion
- **Swipe Gestures:** react-tinder-card

---

## 📁 Project Structure

```
bucketswipe/
├── backend/                    # Node.js backend
│   ├── src/
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Auth, validation, etc.
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   └── utils/             # Helper functions
│   ├── prisma/
│   │   └── schema.prisma      # Database schema
│   └── package.json
│
├── frontend/                   # Next.js frontend
│   ├── app/                   # Next.js app router
│   ├── components/            # React components
│   ├── lib/                   # Utilities and hooks
│   ├── types/                 # TypeScript types
│   └── package.json
│
└── docs/                       # Documentation
    ├── API_ROUTES.md          # API endpoint documentation
    └── FRONTEND_COMPONENTS.md # Component architecture
```

---

## 🗄️ Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:

### Models
- **User:** Authentication and profile information
- **BucketList:** Main container for grouped goals
- **BucketListItem:** Individual, achievable goals
- **Swipe:** Feed interactions (like/skip)
- **Comment:** User feedback (comments, tips, suggestions)

See [`prisma/schema.prisma`](./prisma/schema.prisma) for the complete schema.

---

## 🔌 API Endpoints

### Authentication
- `POST /auth/register` - Create new account
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user

### Bucket Lists
- `POST /lists` - Create bucket list
- `GET /lists/me` - Get my lists
- `GET /lists/:listId` - Get specific list
- `PUT /lists/:listId` - Update list
- `DELETE /lists/:listId` - Delete list

### List Items
- `POST /lists/:listId/items` - Add item to list
- `GET /items/:itemId` - Get item details
- `PUT /items/:itemId` - Update item
- `DELETE /items/:itemId` - Delete item

### Feed (Core Feature)
- `GET /feed` - Get random public items for swiping

### Interactions
- `POST /items/:itemId/swipe` - Swipe on item
- `POST /items/:itemId/comments` - Add comment/tip
- `GET /items/:itemId/comments` - Get comments

See [`docs/API_ROUTES.md`](./docs/API_ROUTES.md) for complete API documentation.

---

## 🎨 Frontend Components

### Key Components
- **SwipeCard:** Displays bucket list items with swipe gestures
- **FeedView:** Main feed container managing card stack
- **MyBucketLists:** User's bucket list overview
- **BucketListDetail:** Individual list with all items
- **ItemDetailModal:** Full item view with comments
- **CommentSection:** Community engagement interface

See [`docs/FRONTEND_COMPONENTS.md`](./docs/FRONTEND_COMPONENTS.md) for complete component documentation.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run Prisma migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Start development server
npm run dev
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your API URL

# Start development server
npm run dev
```

### Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api

---

## 🔐 Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/bucketswipe"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3001
NODE_ENV=development
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

---

## 📊 Database Migrations

```bash
# Create a new migration
npx prisma migrate dev --name description_of_changes

# Apply migrations
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset

# Open Prisma Studio (database GUI)
npx prisma studio
```

---

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

---

## 🎯 Core Features

### ✅ Implemented
- [x] Database schema design
- [x] API endpoint documentation
- [x] Frontend component architecture

### 🚧 To Be Implemented
- [ ] User authentication (register, login, JWT)
- [ ] Bucket list CRUD operations
- [ ] Bucket list item CRUD operations
- [ ] Feed algorithm (random public items, excluding swiped)
- [ ] Swipe functionality
- [ ] Comment system (comments, tips, suggestions)
- [ ] User profiles
- [ ] Image upload functionality
- [ ] Statistics and analytics
- [ ] Notifications
- [ ] Search functionality
- [ ] Follow system
- [ ] Privacy settings

---

## 🌟 Future Enhancements

- **Social Features:**
  - Follow users
  - Direct messaging
  - Collaborative bucket lists
  - Achievement badges

- **Gamification:**
  - Streak tracking
  - Leaderboards
  - Milestone celebrations

- **Discovery:**
  - Trending goals
  - Category-based browsing
  - Hashtags

- **Content:**
  - Video support
  - Multiple images per item
  - Rich text descriptions

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👥 Team

Created as a technical foundation for BucketSwipe - a social platform for goal achievement.

---

## 📞 Support

For questions or issues:
- Create an issue in the repository
- Check the documentation in the `/docs` folder

---

## 🎉 Acknowledgments

- Inspired by the combination of bucket list apps and social engagement platforms
- Built with modern web technologies and best practices
- Designed for scalability and user experience

---

**Happy Goal Setting! 🎯✨**
