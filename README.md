# 👥 Employee Management System

A full-stack Employee Management application with authentication, CRUD operations, and Docker containerization.

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB Atlas |
| Authentication | Express Session, bcryptjs |
| Reverse Proxy | Nginx |
| Containerization | Docker, Docker Compose |

## ✨ Features

- 🔐 Login & Register with session authentication
- 👤 Add, Edit, Delete employees
- 🪪 View employee details in popup card
- ✅ Form validation with error messages
- 🎨 Beautiful responsive UI
- 🐳 Fully containerized with Docker
- 🔀 Nginx reverse proxy routing

## 🏗 Architecture
Browser
↓
Nginx (port 80) ← reverse proxy
↙               ↘
Frontend          Backend
(React/Vite)      (Node.js)
↓
MongoDB Atlas

## 🐳 Run with Docker (Recommended)

### 1. Clone the repository
```bash
git clone https://github.com/AJSabesan/employee-management.git
cd employee-management
```

### 2. Create .env file inside backend folder
```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
SESSION_SECRET=your_secret_key_here
```

### 3. Run with Docker
```bash
docker-compose up --build
```

### 4. Open browser
http://localhost

## 💻 Run without Docker

### 1. Clone the repository
```bash
git clone https://github.com/AJSabesan/employee-management.git
cd employee-management
```

### 2. Create .env file inside backend folder
```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
SESSION_SECRET=your_secret_key_here
```

### 3. Run Backend
```bash
cd backend
npm install
npm run dev
```

### 4. Run Frontend
```bash
cd frontend
npm install
npm run dev
```

### 5. Open browser
http://localhost:3000


## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| POST | /api/auth/logout | Logout user |
| GET | /api/auth/me | Check session |
| GET | /api/employees | Get all employees |
| POST | /api/employees | Create employee |
| PUT | /api/employees/:id | Update employee |
| DELETE | /api/employees/:id | Delete employee |
