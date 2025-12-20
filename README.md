# Digital Marketing Website

A full-stack digital marketing website with three modules: Services, Blog, and Lead Management.

## 🚀 Quick Start Guide

### Prerequisites
- Node.js installed
- MongoDB running (local or Atlas)
- `.env` file with `MONGO_URI` (already created)

### Running the Application

You need to run **TWO** terminals - one for the backend and one for the frontend.

#### **Terminal 1: Backend Server** (Port 5000)
```powershell
# Navigate to project root
cd C:\Users\Hello\OneDrive\Desktop\ca2

# Start the backend server
npm run dev
```

You should see:
```
✅ MongoDB Connected successfully
Server running on port 5000
```

#### **Terminal 2: Frontend React App** (Port 5173)
```powershell
# Navigate to frontend folder
cd C:\Users\Hello\OneDrive\Desktop\ca2\digital-marketing-website

# Start the frontend development server
npm run dev
```

You should see:
```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### 📱 Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

### 🗂️ Project Structure

```
ca2/
├── server.js                    # Backend Express server
├── .env                         # Environment variables (MongoDB URI)
├── package.json                 # Backend dependencies
└── digital-marketing-website/   # Frontend React app
    ├── src/
    │   ├── pages/              # Home, Services, Blog, Contact
    │   ├── Components/         # Navbar, Footer
    │   ├── models/             # MongoDB models
    │   ├── controllers/        # API controllers
    │   └── routes/             # API routes
    └── package.json            # Frontend dependencies
```

### 🔧 Available Scripts

#### Backend (Root directory)
- `npm run dev` - Start backend server
- `npm run server` - Same as dev

#### Frontend (digital-marketing-website directory)
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### 📝 API Endpoints

**Public Endpoints:**
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get blog by ID
- `POST /api/leads` - Create lead (contact form - public)
- `POST /api/auth/login` - Login and get JWT token

**Protected Endpoints (Require Authentication):**
- `POST /api/services` - Create service (Admin only)
- `PUT /api/services/:id` - Update service (Admin only)
- `DELETE /api/services/:id` - Delete service (Admin only)
- `POST /api/blogs` - Create blog (Admin only)
- `PUT /api/blogs/:id` - Update blog (Admin only)
- `DELETE /api/blogs/:id` - Delete blog (Admin only)
- `GET /api/leads` - Get all leads (Admin only)
- `GET /api/leads/:id` - Get lead by ID (Admin only)
- `PUT /api/leads/:id` - Update lead (Admin only)
- `DELETE /api/leads/:id` - Delete lead (Admin only)

**Documentation:**
- `GET /api-docs` - Swagger API documentation
- `GET /api/health` - Health check endpoint

### 🗄️ MongoDB Setup

The `.env` file contains:
```
MONGO_URI=mongodb://localhost:27017/digital-marketing
PORT=5000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-super-secret-key-change-in-production
NODE_ENV=development
```

**Make sure MongoDB is running!**

- **Local MongoDB**: Start MongoDB service
- **MongoDB Atlas**: Update `.env` with your Atlas connection string

### 🔐 Authentication

**Demo Users:**
- **Admin**: `admin@marketingpro.com` / `admin123`
- **User**: `user@marketingpro.com` / `user123`

**To get a token:**
```bash
POST /api/auth/login
{
  "email": "admin@marketingpro.com",
  "password": "admin123"
}
```

**Use token in requests:**
```
Authorization: Bearer <your-token-here>
```

### 🐛 Troubleshooting

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check `.env` file exists and has correct `MONGO_URI`

2. **Port Already in Use**
   - Backend (5000): Kill process or change port in `server.js`
   - Frontend (5173): Vite will automatically use next available port

3. **Module Not Found**
   - Run `npm install` in both root and `digital-marketing-website` folders

### ✨ Features

- ✅ Three Modules: Services, Blog, Lead Management
- ✅ Modern UI with Tailwind CSS
- ✅ Responsive Design
- ✅ RESTful API
- ✅ MongoDB Database
- ✅ Form Validation
- ✅ Error Handling
- ✅ **Rate Limiting** - Protection against abuse
- ✅ **Request Logging** - Morgan HTTP logger
- ✅ **API Documentation** - Swagger/OpenAPI docs
- ✅ **Authentication** - JWT-based auth system
- ✅ **Authorization** - Role-based access control
- ✅ **Unit Testing** - Jest test framework setup

### 🚀 New Enhancements

See [ENHANCEMENTS.md](./ENHANCEMENTS.md) for detailed information about:
- Rate limiting configuration
- Authentication system
- API documentation
- Testing setup
- Security improvements


