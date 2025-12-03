# 📚 Library Management System

A full-stack web application for managing library operations including book inventory, user management, and borrowing/returning workflows. Built with the MERN stack (MongoDB, Express.js, React, Node.js) and featuring role-based access control, real-time inventory tracking, and interactive data visualizations.

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen.svg)](https://www.mongodb.com/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.9.1-007FFF.svg)](https://mui.com/)

## 🌟 Features

### For All Users
- **📖 Browse Books**: View complete library catalog with search and pagination
- **📊 View Details**: Access detailed book information including ISBN, category, price, and availability
- **📈 Historical Data**: Visualize price and quantity trends with interactive charts
- **🔐 Secure Authentication**: Session-based login system with role management

### For Library Members
- **📚 Borrow Books**: Request books with real-time availability checking
- **📤 Return Books**: Simple return workflow with automatic inventory updates
- **📋 My Books**: Track your currently borrowed books

### For Administrators
- **➕ Add Books**: Create new book entries with complete metadata
- **✏️ Edit Books**: Update book information including price and quantity
- **🗑️ Delete Books**: Remove books from the system with confirmation
- **📊 Inventory Management**: Track historical changes to pricing and stock levels
- **👥 User Management**: View all registered users

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Material-UI (MUI)** - Comprehensive component library
- **React Router v6** - Client-side routing
- **Context API** - Global state management
- **Highcharts** - Interactive data visualizations
- **React Notifications** - User feedback system

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Express Session** - Session management
- **Morgan** - HTTP request logger
- **Cookie Parser** - Cookie handling

### DevOps
- **Docker & Docker Compose** - Container orchestration for MongoDB
- **Nodemon** - Auto-restart development server
- **Prettier** - Code formatting

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (v4.0 or higher) - Local installation or MongoDB Atlas account
- **Docker** (optional) - For containerized MongoDB setup

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ritik-27/Library-Management-System.git
cd Library-Management-System
```

### 2. Setup Backend

```bash
cd server

# Install dependencies
npm install

# Configure environment variables
# Edit .env file with your MongoDB connection string
# DB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/
# DB_NAME=lms
# SESSION_SECRET=your-secret-key

# Start MongoDB using Docker (optional)
docker-compose up -d

# Start the server
npm start
```

The backend server will run on `http://localhost:8090`

### 3. Setup Frontend

```bash
cd client

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend application will run on `http://localhost:3000`

## 🗄️ Database Schema

### Books Collection
```javascript
{
  name: String,           // Book title
  isbn: String,           // Unique ISBN identifier
  category: String,       // Genre/category
  price: Number,          // Current price
  quantity: Number,       // Total quantity
  borrowedBy: [ObjectId], // Array of user IDs who borrowed
  priceHistory: Array,    // Historical price changes
  quantityHistory: Array  // Historical quantity changes
}
```

### Users Collection
```javascript
{
  username: String,  // Unique username
  password: String,  // User password (Note: Should be hashed in production)
  role: String      // 'admin' or 'guest'
}
```

## 🔑 Default Credentials

The application creates default users on first startup:

**Admin Account:**
- Username: `admin`
- Password: `admin`

**Guest Account:**
- Username: `guest`
- Password: `guest`


## 📁 Project Structure

```
Library-Management-System/
├── client/                    # React frontend
│   ├── public/               # Static files
│   └── src/
│       ├── components/       # React components
│       │   ├── access-control/   # Route protection
│       │   ├── book/            # Book detail view
│       │   ├── book-form/       # Add/Edit book form
│       │   ├── books-list/      # Books listing table
│       │   ├── layout/          # App layout & navigation
│       │   ├── login/           # Login dialog
│       │   └── tabs/            # Tab components
│       ├── client/           # API client
│       │   └── backend-api/  # API service modules
│       ├── context/          # React Context providers
│       ├── App.js           # Root component
│       └── index.js         # Entry point
├── server/                   # Node.js backend
│   ├── src/
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # Express routes
│   │   ├── app.js          # Express app setup
│   │   └── db.js           # Database connection
│   ├── docker-compose.yml  # Docker configuration
│   └── package.json        # Backend dependencies
└── README.md               # Project documentation
```

## 🔌 API Endpoints

### Book Routes (`/v1/book`)
- `GET /` - Get all books
- `GET /:bookIsbn` - Get book by ISBN
- `POST /` - Add new book (Admin only)
- `PATCH /:bookIsbn` - Update book (Admin only)
- `DELETE /:bookIsbn` - Delete book (Admin only)

### User Routes (`/v1/user`)
- `POST /login` - User login
- `GET /logout` - User logout
- `GET /profile` - Get user profile
- `GET /` - Get all users
- `POST /borrow` - Borrow a book
- `POST /return` - Return a book
- `GET /borrowed-books` - Get user's borrowed books

## 🎨 Key Features Implementation

### Role-Based Access Control (RBAC)
- Protected routes using Higher-Order Components (HOCs)
- Admin-only features for book management
- Session-based authentication

### Real-Time Inventory Management
- Automatic availability calculation
- Duplicate borrow prevention
- Accurate stock tracking

### Data Visualization
- Interactive Highcharts for price/quantity history
- Historical trend analysis
- Date-based tracking

### Responsive Design
- Mobile-friendly Material-UI components
- Adaptive layouts
- Consistent theming

## 🧪 Testing

### Frontend
```bash
cd client
npm test
```

### Backend
```bash
cd server
npm test
```

## 🚧 Development

### Frontend Development Server
The React app uses proxy configuration to forward API requests to the backend server. Make sure the backend is running on port 8090.

### Backend Development Server
Nodemon automatically restarts the server when file changes are detected.

## 🐛 Known Issues

- Passwords are stored in plain text (should implement hashing)
- No email verification system
- Limited error handling on frontend
- No image upload for book covers

## 🗺️ Roadmap

- [ ] Add password hashing with bcrypt
- [ ] Implement user registration
- [ ] Add book cover image uploads
- [ ] Email notifications for due dates
- [ ] Search and filter functionality
- [ ] Export reports (PDF/CSV)
- [ ] Fine management system
- [ ] Book recommendations
- [ ] Reading history analytics

---

**Happy Reading! 📚**
