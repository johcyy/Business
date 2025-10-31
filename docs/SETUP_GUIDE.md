# 🚀 BucketSwipe Setup Guide

Complete step-by-step guide to set up the BucketSwipe application locally.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: v9.0.0 or higher (comes with Node.js)
- **PostgreSQL**: v14.0 or higher ([Download](https://www.postgresql.org/download/))
- **Git**: Latest version ([Download](https://git-scm.com/))

### Verify Installation

```bash
node --version   # Should output v18.x.x or higher
npm --version    # Should output v9.x.x or higher
psql --version   # Should output PostgreSQL 14.x or higher
```

---

## 🗄️ Database Setup

### 1. Install PostgreSQL

**macOS (using Homebrew):**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
- Download installer from [PostgreSQL website](https://www.postgresql.org/download/windows/)
- Follow installation wizard
- Remember the password you set for the postgres user

### 2. Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE bucketswipe;

# Create user (optional, for better security)
CREATE USER bucketswipe_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE bucketswipe TO bucketswipe_user;

# Exit psql
\q
```

### 3. Verify Connection

```bash
psql -U postgres -d bucketswipe -c "SELECT version();"
```

---

## 🔧 Backend Setup

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Express (web framework)
- Prisma (ORM)
- JWT libraries (authentication)
- And more...

### 3. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your settings
nano .env  # or use your preferred editor
```

Update the following variables:

```env
# Update with your actual database credentials
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/bucketswipe?schema=public"

# Generate a secure JWT secret (or use this command to generate one)
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET="your-generated-secret-key"

# Other settings
PORT=3001
NODE_ENV=development
FRONTEND_URL="http://localhost:3000"
```

### 4. Set Up Prisma

```bash
# Generate Prisma Client
npx prisma generate

# Run initial migration
npx prisma migrate dev --name init

# Optional: Open Prisma Studio (database GUI)
npx prisma studio
```

Prisma Studio will open at `http://localhost:5555` where you can view and edit your database.

### 5. Start Development Server

```bash
npm run dev
```

The backend API should now be running at `http://localhost:3001`

### 6. Test the API

```bash
# Test health endpoint
curl http://localhost:3001/api/health

# Or open in browser
open http://localhost:3001/api/health
```

---

## 🎨 Frontend Setup

### 1. Open New Terminal & Navigate to Frontend

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- Next.js (React framework)
- Tailwind CSS (styling)
- Radix UI (components)
- And more...

### 3. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.local.example .env.local

# Edit the .env.local file
nano .env.local  # or use your preferred editor
```

Ensure it contains:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_JWT_STORAGE_KEY=bucketswipe_token
NEXT_PUBLIC_MAX_IMAGE_SIZE=5242880
```

### 4. Start Development Server

```bash
npm run dev
```

The frontend should now be running at `http://localhost:3000`

### 5. Open in Browser

```bash
open http://localhost:3000
```

---

## ✅ Verify Installation

### Backend Checklist

- [ ] PostgreSQL is running
- [ ] Database `bucketswipe` exists
- [ ] `.env` file is configured
- [ ] `npm install` completed successfully
- [ ] `npx prisma generate` ran without errors
- [ ] `npx prisma migrate dev` completed successfully
- [ ] Backend server is running on port 3001
- [ ] Can access `http://localhost:3001/api/health`

### Frontend Checklist

- [ ] `.env.local` file is configured
- [ ] `npm install` completed successfully
- [ ] Frontend server is running on port 3000
- [ ] Can access `http://localhost:3000`
- [ ] No console errors in browser

---

## 🐛 Troubleshooting

### Database Connection Issues

**Error:** "Can't reach database server"

**Solution:**
```bash
# Check if PostgreSQL is running
# macOS
brew services list | grep postgresql

# Linux
sudo systemctl status postgresql

# If not running, start it
brew services start postgresql@14  # macOS
sudo systemctl start postgresql    # Linux
```

**Error:** "Authentication failed"

**Solution:**
- Verify your password in `.env`
- Check PostgreSQL user permissions
- Try connecting with psql to verify credentials

### Port Already in Use

**Error:** "Port 3000/3001 already in use"

**Solution:**
```bash
# Find process using the port
lsof -i :3000  # or :3001

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=3002 npm run dev
```

### Prisma Migration Errors

**Error:** "Migration failed"

**Solution:**
```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Generate client again
npx prisma generate

# Run migrations
npx prisma migrate dev
```

### Module Not Found Errors

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

## 🔄 Common Development Workflows

### Starting the Application

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Viewing the Database

```bash
cd backend
npx prisma studio
```

### Running Database Migrations

```bash
cd backend
npx prisma migrate dev --name description_of_change
```

### Resetting Development Database

```bash
cd backend
npx prisma migrate reset  # Deletes all data and reruns migrations
```

### Adding a New npm Package

```bash
# Backend
cd backend
npm install package-name

# Frontend
cd frontend
npm install package-name
```

---

## 🧪 Testing Your Setup

### 1. Register a New User

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "Password123!"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123!"
  }'
```

Save the returned JWT token for the next steps.

### 3. Create a Bucket List

```bash
curl -X POST http://localhost:3001/api/lists \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "World Travel",
    "description": "Places I want to visit",
    "emoji": "🌍"
  }'
```

---

## 📚 Next Steps

Once your setup is complete:

1. **Read the Documentation:**
   - [API Routes](./API_ROUTES.md)
   - [Frontend Components](./FRONTEND_COMPONENTS.md)

2. **Start Development:**
   - Implement authentication endpoints
   - Build the login/register forms
   - Create the feed view
   - Add swipe functionality

3. **Explore Prisma Studio:**
   - View your data models
   - Manually test data relationships
   - Understand your database structure

4. **Join Development:**
   - Check the GitHub issues
   - Pick a feature to implement
   - Follow the contributing guidelines

---

## 🆘 Getting Help

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review the error messages carefully
3. Search existing GitHub issues
4. Create a new issue with:
   - Error message
   - Steps to reproduce
   - Your environment details
   - Screenshots if applicable

---

## 📝 Environment Variables Reference

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/bucketswipe` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key-here` |
| `JWT_EXPIRES_IN` | Token expiration time | `7d` |
| `PORT` | Backend server port | `3001` |
| `NODE_ENV` | Environment mode | `development` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |

### Frontend (.env.local)

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:3001/api` |
| `NEXT_PUBLIC_JWT_STORAGE_KEY` | LocalStorage key for JWT | `bucketswipe_token` |
| `NEXT_PUBLIC_MAX_IMAGE_SIZE` | Max image upload size | `5242880` |

---

**Happy Coding! 🎉**
