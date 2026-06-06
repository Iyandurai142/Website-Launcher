# Website Launcher - Backend API

## Overview
This is the backend API for the Website Launcher application built with Node.js, Express, and MongoDB.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
PORT=5000
```

5. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh-token` - Refresh JWT token

### Websites
- `GET /api/websites` - Get all websites
- `POST /api/websites` - Create new website
- `GET /api/websites/:id` - Get website by ID
- `PUT /api/websites/:id` - Update website
- `DELETE /api/websites/:id` - Delete website
- `POST /api/websites/:id/launch` - Launch website
- `GET /api/websites/search/query?query=...` - Search websites
- `GET /api/websites/export/csv` - Export to CSV
- `GET /api/websites/stats/dashboard` - Get dashboard statistics

### Analytics
- `GET /api/analytics` - Get all analytics
- `GET /api/analytics/website/:websiteId` - Get analytics by website
- `POST /api/analytics/track` - Track visit
- `GET /api/analytics/stats/summary` - Get analytics summary

## Authentication
All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## Error Handling
The API returns consistent error responses:
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Logging
All requests and errors are logged with timestamps.

## Database Models
See DATABASE_SCHEMA.md for detailed schema information.