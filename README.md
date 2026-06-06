# Website Launcher

A full-stack web application for managing, launching, and analyzing websites with user authentication, analytics tracking, and dashboard statistics.

## 🚀 Features

- **User Authentication**: Registration, login, and JWT-based authentication
- **Dashboard**: View all your websites with real-time statistics
- **Website Management**: Create, read, update, and delete websites
- **Launch Websites**: Open websites in new tab with launch tracking
- **Search & Filter**: Find websites by name, category, and status
- **Analytics**: Track website visits and view analytics
- **Dark Mode**: Comfortable dark mode support
- **CSV Export**: Export website list as CSV
- **Role-based Access**: Admin and User roles
- **Responsive Design**: Works on desktop, tablet, and mobile

## 📋 Prerequisites

- Node.js v14+
- MongoDB (local or Atlas)
- npm or yarn
- Git

## 🔧 Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/Iyandurai142/Website-Launcher.git
cd Website-Launcher
```

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and secrets
npm install
npm run dev
```

Backend will run at `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend will run at `http://localhost:3000`

## 📚 Documentation

- [API Documentation](./docs/API_DOCUMENTATION.md)
- [Database Schema](./docs/DATABASE_SCHEMA.md)
- [Deployment Guide](./docs/DEPLOYMENT_GUIDE.md)

## 🏗️ Project Structure

```
Website-Launcher/
├── backend/              # Node.js/Express API
│   ├── config/          # Database configuration
│   ├── controllers/      # Business logic
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/       # Auth & validation
│   ├── utils/           # Helper functions
│   └── server.js        # Entry point
├── frontend/            # React application
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service
│   │   ├── context/     # React context
│   │   └── App.jsx      # Main app
│   └── vite.config.js   # Vite configuration
└── docs/               # Documentation
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication with the following flow:

1. User registers with email and password
2. Password is hashed with bcrypt
3. User logs in to receive JWT token
4. Token is sent with every API request in Authorization header
5. Token automatically refreshed on expiry

## 💾 Database

MongoDB collections:
- **Users**: User accounts with hashed passwords and roles
- **Websites**: Website entries with metadata
- **Analytics**: Visit tracking data

## 🚀 Usage

1. **Register**: Create new account on `/register`
2. **Login**: Sign in with credentials
3. **Dashboard**: View all websites and statistics
4. **Add Website**: Click "Add Website" and fill form
5. **Launch**: Click "🚀 Launch" to open website
6. **Search**: Use filters to find websites
7. **Analytics**: View visit statistics
8. **Export**: Download website list as CSV
9. **Dark Mode**: Toggle theme in navbar

## 🛠️ Technologies

### Backend
- Node.js
- Express.js
- MongoDB
- JWT (jsonwebtoken)
- bcrypt
- Joi (validation)

### Frontend
- React 18
- React Router v6
- Bootstrap 5
- Axios
- Vite

## 📦 API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh-token` - Refresh token

### Websites
- `GET /api/websites` - Get all websites
- `POST /api/websites` - Create website
- `PUT /api/websites/:id` - Update website
- `DELETE /api/websites/:id` - Delete website
- `POST /api/websites/:id/launch` - Launch website
- `GET /api/websites/search/query` - Search websites
- `GET /api/websites/stats/dashboard` - Get stats
- `GET /api/websites/export/csv` - Export to CSV

### Analytics
- `GET /api/analytics` - Get all analytics
- `GET /api/analytics/website/:id` - Website analytics
- `GET /api/analytics/stats/summary` - Analytics summary
- `POST /api/analytics/track` - Track visit

## 🔒 Environment Variables

Create `.env` files in both backend and frontend directories.

### Backend `.env`
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/website-launcher
JWT_SECRET=your-super-secret-key
REFRESH_TOKEN_SECRET=your-refresh-secret-key
NODE_ENV=development
```

### Frontend `.env`
```
VITE_API_URL=http://localhost:5000/api
```

## 📤 Deployment

See [DEPLOYMENT_GUIDE.md](./docs/DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

Quick options:
- **Backend**: Heroku, Railway, Render
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Database**: MongoDB Atlas

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check MongoDB is running
- Verify MONGODB_URI in `.env`
- Check firewall/network settings

### CORS Error
- Verify backend URL in frontend `.env`
- Check CORS enabled in Express
- Check API request headers

### Token Expiry
- Tokens expire after 24 hours
- Refresh token automatically handles renewal
- Clear localStorage if issues persist

## 📄 License

MIT License - feel free to use for personal or commercial projects

## 🤝 Contributing

Contributions welcome! Please fork and create pull request.

## 📧 Support

For issues and questions, please open GitHub issue.

---

**Built with ❤️ using React, Node.js, and MongoDB**