# Student Management System

A full-stack web application for managing students, courses, and grades. Built with React (frontend), Node.js/Express (backend), and MongoDB (database).

## Features
- Student registration and login
- Add, update, delete student details
- Course and marks management
- Role-based access (Admin / Student)
- Modern, responsive UI with Tailwind CSS

## Project Structure
```
student-management-system/
├── frontend/      # React app
├── backend/       # Node.js/Express API
└── README.md
```

## Getting Started

### 1. Backend Setup
```
cd backend
npm install
```
- Configure your MongoDB URI and JWT secret in `.env` (already set up).
- Start the server:
```
npm run dev
```

### 2. Frontend Setup
```
cd frontend
npm install
npm start
```

### 3. Access the App
- Open [http://localhost:3000](http://localhost:3000) in your browser.

## Security
- Never commit real credentials to public repositories.
- Use environment variables for secrets.

---

For more details, see the code in each folder. If you need the full implementation for any file, let me know!
