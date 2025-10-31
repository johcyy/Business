# 🚀 Getting Started with BucketSwipe

Quick start guide to get BucketSwipe up and running on your local machine.

---

## ⚡ Quick Start (TL;DR)

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd bucketswipe

# 2. Set up the database
psql -U postgres
CREATE DATABASE bucketswipe;
\q

# 3. Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npx prisma generate
npx prisma migrate dev --name init
npm run dev

# 4. Frontend setup (in a new terminal)
cd frontend
npm install
cp .env.local.example .env.local
npm run dev

# 5. Open http://localhost:3000 in your browser
```

---

## 📋 What You'll Build

BucketSwipe is a social platform for achieving life goals with these core features:

✅ **User Authentication** - Secure register/login  
✅ **Bucket Lists** - Organize goals into themed lists  
✅ **List Items** - Create specific, achievable goals  
✅ **Feed** - Discover others' public goals  
✅ **Swipe Interactions** - Tinder-style support system  
✅ **Comments & Tips** - Community engagement  
✅ **Progress Tracking** - Monitor goal completion  

---

## 🎯 Development Roadmap

### Phase 1: Foundation (Week 1-2)
- [x] Database schema
- [x] API documentation
- [x] Component architecture
- [ ] User authentication
- [ ] Basic routing

### Phase 2: Core Features (Week 3-4)
- [ ] Bucket list CRUD
- [ ] Item CRUD
- [ ] Feed algorithm
- [ ] Swipe functionality
- [ ] Basic UI components

### Phase 3: Engagement (Week 5-6)
- [ ] Comment system
- [ ] User profiles
- [ ] Statistics
- [ ] Image uploads
- [ ] Notifications

### Phase 4: Polish (Week 7-8)
- [ ] Search functionality
- [ ] Responsive design
- [ ] Performance optimization
- [ ] Testing
- [ ] Deployment

---

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **PostgreSQL** - Database
- **Prisma** - ORM for type-safe database access
- **JWT** - Authentication tokens
- **TypeScript** - Type safety

### Frontend
- **Next.js 13+** - React framework with App Router
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible components
- **Framer Motion** - Animations
- **Zustand** - State management
- **Axios** - HTTP client

---

## 📚 Key Documentation

Start with these documents in order:

1. **[Setup Guide](./SETUP_GUIDE.md)** - Detailed installation instructions
2. **[API Routes](./API_ROUTES.md)** - Backend API documentation
3. **[Frontend Components](./FRONTEND_COMPONENTS.md)** - Component architecture
4. **[Project Structure](./PROJECT_STRUCTURE.md)** - File organization

---

## 🔑 First Steps After Setup

### 1. Verify Database Connection

```bash
cd backend
npx prisma studio
```

This opens a GUI at `http://localhost:5555` where you can view your database.

### 2. Test the API

```bash
# Test health endpoint
curl http://localhost:3001/api/health

# Expected response:
{
  "status": "ok",
  "message": "BucketSwipe API is running",
  "timestamp": "2025-10-31T..."
}
```

### 3. Explore the Database Schema

Open `prisma/schema.prisma` to see all data models:
- User
- BucketList
- BucketListItem
- Swipe
- Comment

### 4. Start Building Features

Pick a feature to implement from the roadmap above. Recommended order:

1. **Authentication** (Backend + Frontend)
   - Implement register/login endpoints
   - Create auth forms in frontend
   - Set up JWT token handling

2. **Bucket Lists** (Backend + Frontend)
   - CRUD endpoints for lists
   - List management UI
   - List detail page

3. **Feed** (Backend + Frontend)
   - Feed algorithm
   - Swipe card component
   - Swipe interactions

---

## 💡 Development Tips

### Backend Development

1. **Always validate input:**
   ```typescript
   // Use express-validator in routes
   import { body, validationResult } from 'express-validator';
   ```

2. **Use Prisma Client:**
   ```typescript
   import prisma from '@/utils/prisma';
   const user = await prisma.user.findUnique({ where: { id } });
   ```

3. **Handle errors consistently:**
   ```typescript
   try {
     // Your code
   } catch (error) {
     res.status(500).json({ error: { code: 'ERROR_CODE', message: '...' } });
   }
   ```

### Frontend Development

1. **Use TypeScript strictly:**
   ```typescript
   interface Props {
     user: User;
     onSubmit: (data: FormData) => void;
   }
   ```

2. **Create reusable hooks:**
   ```typescript
   const { data, isLoading, error } = useBucketLists();
   ```

3. **Use Tailwind utilities:**
   ```tsx
   <div className="flex items-center gap-4 p-4 rounded-lg bg-primary-50">
   ```

---

## 🧪 Testing Your Implementation

### Backend Tests

```bash
cd backend

# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

### Frontend Tests

```bash
cd frontend

# Run tests
npm test

# Run in watch mode
npm test -- --watch
```

---

## 🐛 Common Issues & Solutions

### Database Connection Failed

**Problem:** Can't connect to PostgreSQL  
**Solution:**
```bash
# Check if PostgreSQL is running
# macOS
brew services list

# Linux
sudo systemctl status postgresql

# Start if not running
brew services start postgresql@14
```

### Port Already in Use

**Problem:** Port 3000 or 3001 already in use  
**Solution:**
```bash
# Find and kill the process
lsof -i :3000
kill -9 <PID>

# Or use different port
PORT=3002 npm run dev
```

### Prisma Client Not Generated

**Problem:** `@prisma/client` errors  
**Solution:**
```bash
cd backend
npx prisma generate
```

---

## 📖 Learning Resources

### Prisma
- [Prisma Docs](https://www.prisma.io/docs)
- [Prisma TypeScript Guide](https://www.prisma.io/docs/concepts/components/prisma-client/type-safety)

### Next.js
- [Next.js Docs](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind Components](https://tailwindui.com/components)

---

## 🤝 Contributing

Want to contribute? Great! Here's how:

1. **Pick an Issue** - Check GitHub issues or create one
2. **Create a Branch** - `git checkout -b feature/your-feature`
3. **Make Changes** - Follow the project structure
4. **Test** - Ensure your code works
5. **Submit PR** - Create a pull request

---

## 🎯 Your First Feature: Authentication

Let's implement the authentication system as your first feature!

### Backend Tasks

1. Create `src/services/auth.service.ts`:
   - `register(email, username, password)`
   - `login(email, password)`
   - `verifyToken(token)`

2. Create `src/controllers/auth.controller.ts`:
   - Handle HTTP requests
   - Call service functions
   - Return responses

3. Create `src/routes/auth.routes.ts`:
   - `POST /auth/register`
   - `POST /auth/login`
   - `GET /auth/me`

### Frontend Tasks

1. Create `components/auth/RegisterForm.tsx`:
   - Form with validation
   - Call register API
   - Redirect on success

2. Create `components/auth/LoginForm.tsx`:
   - Form with validation
   - Call login API
   - Store JWT token

3. Create `lib/hooks/useAuth.ts`:
   - Auth state management
   - Login/logout functions
   - Token storage

---

## 🎉 Next Steps

Once you have authentication working:

1. ✅ Test user registration
2. ✅ Test user login
3. ✅ Verify JWT tokens work
4. 🚀 Move on to Bucket Lists feature
5. 🚀 Then implement the Feed
6. 🚀 Finally add swipe interactions

---

**Ready to build something amazing? Let's go! 🚀**

For detailed setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)

For questions or issues, create a GitHub issue or check the troubleshooting section in the setup guide.
