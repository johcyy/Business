# BucketSwipe API Routes

This document outlines all REST API endpoints for the BucketSwipe application.

## Base URL
```
http://localhost:3000/api
```

---

## 🔐 Authentication Routes

### Register a new user
```
POST /auth/register
```
**Body:**
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "securePassword123"
}
```

### Login
```
POST /auth/login
```
**Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### Get current user
```
GET /auth/me
```
**Headers:** `Authorization: Bearer <token>`

### Logout
```
POST /auth/logout
```
**Headers:** `Authorization: Bearer <token>`

---

## 📋 Bucket Lists Routes (Main Lists)

### Create a new bucket list
```
POST /lists
```
**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "title": "World Travel",
  "description": "Places I want to visit around the world",
  "emoji": "🌍"
}
```

### Get all my bucket lists
```
GET /lists/me
```
**Headers:** `Authorization: Bearer <token>`

### Get a specific bucket list with items
```
GET /lists/:listId
```
**Headers:** `Authorization: Bearer <token>`

### Update a bucket list
```
PUT /lists/:listId
```
**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description"
}
```

### Delete a bucket list
```
DELETE /lists/:listId
```
**Headers:** `Authorization: Bearer <token>`

---

## ✅ List Items Routes (Sub-items)

### Add a new item to a list
```
POST /lists/:listId/items
```
**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "title": "Visit Japan",
  "description": "Experience cherry blossom season in Tokyo",
  "imageUrl": "https://example.com/image.jpg",
  "isPublic": true
}
```

### Get a specific item (with details)
```
GET /items/:itemId
```
**Headers:** `Authorization: Bearer <token>`

### Update an item
```
PUT /items/:itemId
```
**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "IN_PROGRESS",
  "isPublic": false,
  "imageUrl": "https://example.com/new-image.jpg"
}
```

### Delete an item
```
DELETE /items/:itemId
```
**Headers:** `Authorization: Bearer <token>`

### Mark item as completed
```
POST /items/:itemId/complete
```
**Headers:** `Authorization: Bearer <token>`

---

## 🔥 Feed Routes (The Core Feature)

### Get random public items for the feed
```
GET /feed
```
**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `limit` (optional, default: 20): Number of items to fetch
- `excludeOwnItems` (optional, default: true): Exclude user's own items

**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "title": "Visit Japan",
      "description": "Experience cherry blossom season",
      "imageUrl": "https://example.com/image.jpg",
      "status": "PENDING",
      "bucketList": {
        "id": "uuid",
        "title": "World Travel",
        "emoji": "🌍"
      },
      "author": {
        "id": "uuid",
        "username": "traveler123",
        "profileImageUrl": "https://example.com/profile.jpg"
      }
    }
  ]
}
```

---

## 👆 Interaction Routes

### Swipe on an item
```
POST /items/:itemId/swipe
```
**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "liked": true
}
```

### Get swipe statistics for an item
```
GET /items/:itemId/swipes
```
**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "totalSwipes": 150,
  "likes": 120,
  "skips": 30,
  "likePercentage": 80
}
```

### Get items I've liked
```
GET /swipes/liked
```
**Headers:** `Authorization: Bearer <token>`

---

## 💬 Comment Routes

### Add a comment/tip/suggestion
```
POST /items/:itemId/comments
```
**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "content": "I highly recommend visiting in April!",
  "commentType": "TIP"
}
```

### Get all comments for an item
```
GET /items/:itemId/comments
```
**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `type` (optional): Filter by comment type (COMMENT, TIP, SUGGESTION)
- `limit` (optional, default: 50): Number of comments to fetch
- `offset` (optional, default: 0): Pagination offset

**Response:**
```json
{
  "comments": [
    {
      "id": "uuid",
      "content": "I highly recommend visiting in April!",
      "commentType": "TIP",
      "createdAt": "2025-10-31T10:00:00Z",
      "author": {
        "id": "uuid",
        "username": "traveler123",
        "profileImageUrl": "https://example.com/profile.jpg"
      }
    }
  ],
  "total": 25
}
```

### Update a comment
```
PUT /comments/:commentId
```
**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "content": "Updated comment content"
}
```

### Delete a comment
```
DELETE /comments/:commentId
```
**Headers:** `Authorization: Bearer <token>`

---

## 👤 Profile Routes

### Get user profile
```
GET /users/:userId
```
**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "id": "uuid",
  "username": "traveler123",
  "profileImageUrl": "https://example.com/profile.jpg",
  "bio": "Adventure seeker and travel enthusiast",
  "publicBucketLists": [
    {
      "id": "uuid",
      "title": "World Travel",
      "emoji": "🌍",
      "publicItemsCount": 15
    }
  ]
}
```

### Update my profile
```
PUT /users/me
```
**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "username": "newUsername",
  "bio": "Updated bio",
  "profileImageUrl": "https://example.com/new-profile.jpg"
}
```

---

## 📊 Statistics Routes

### Get my statistics
```
GET /stats/me
```
**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "totalBucketLists": 5,
  "totalItems": 42,
  "completedItems": 8,
  "publicItems": 20,
  "receivedLikes": 156,
  "givenLikes": 89,
  "receivedComments": 34
}
```

---

## Error Responses

All endpoints follow a consistent error response format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error
