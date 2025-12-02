Task Manager Application (React.js)
A modern React-based implementation

Overview
This project is a Task Management Application fully implemented in React.js

It includes:
JWT-based Authentication (Mock API)
Task CRUD (Add/Edit/View)
Task Completion Logic
Filters, Search, Sorting
Route Protection
API Integration with JSONPlaceholder
Fully modular, scalable React architecture

Tech Stack
Feature -	Technology Used
UI Framework -	React 18 (Vite)
State Management -	React Context API
Routing -	React Router v6
Forms -	React Hook Form + Yup
API Requests - Axios
Styling	Custom - CSS
Mock Auth	Custom - JWT mock service
Bundler	- Vite


Project Structure
src/
  api/
  components/
  context/
  pages/
  routes/
  utils/
  App.jsx
  main.jsx
  index.css



Setup & Installation
1. Clone the Repository
git clone https://github.com/aniket-4950/task-manager-react.git
cd <task-manager-react>

2. Install Dependencies
npm install

3. Start the Development Server
npm run dev

4. Open in Browser
http://localhost:5173/



Login Credentials (Mock Auth)

The app uses a mock authentication layer, so any email and password will work.

Examples:
Email: user@example.com
Password: password

For Admin Mode:
Email containing admin (eg - admin@example.com) gives role "admin".




Features Implemented (Per Assignment)
1. User Authentication (JWT-based)
Mock login using authService.js
Token stored in localStorage
Protected routes using <ProtectedRoute />
Role-specific behavior included (optional)

2. Task List Page
Fetches tasks from JSONPlaceholder API
Each task enriched with:
Description
Random Due Date
Status (Pending / In Progress / Completed)
Features included:
Search
Sorting (Due Date Asc/Desc)
Filter by Status
Mark as Completed
Strict no-edit rule after completion

3. Add/Edit Task Page
Uses React Hook Form + Yup Validation
Required field validation
Prevent edit when task is completed
Mock create/update logic using in-memory storage

4. Task Completion
Button to mark task as complete
Task becomes locked for editing afterward

5. Code Quality & Best Practices
Component-based architecture
Separation of concerns
API layer separated
Context for global states
Reusable UI components
Full error handling


