# Employee Management System

A full-stack Employee Management application built with modern technologies.

## Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB Atlas
- **Auth:** Express Session, bcryptjs

## Features
- Login & Register with session authentication
- Add, Edit, Delete employees
- View employee details in popup card
- Form validation
- Beautiful responsive UI

## Setup

### 1. Clone the repository
git clone https://github.com/AJSabesan/employee-management.git

### 2. Backend setup
cd backend
npm install

Create a .env file inside backend folder:
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
SESSION_SECRET=your_secret_key_here

npm run dev

### 3. Frontend setup
cd frontend
npm install
npm run dev

### 4. Open browser
http://localhost:3000