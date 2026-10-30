# Authenticated Full-Stack Task Management System (Aurex Internship - Month 2 Week 4)

This project is a complete MERN-stack authenticated task management application featuring user authentication, data isolation, and a clean frontend dashboard.

## Features
- **User Authentication:** Secure registration and login using JWT (JSON Web Tokens) and bcrypt password hashing.
- **Data Isolation:** Users can only create, view, and delete their own tasks.
- **Task Management CRUD:** Add, list, and delete tasks dynamically.
- **Frontend Interface:** Responsive HTML/CSS/JS dashboard communicating with REST APIs.

## Project Structure
- `backend/`: Node.js, Express, and MongoDB backend logic (MVC architecture).
- `frontend/`: Vanilla JavaScript, HTML, and CSS client dashboard.

## Getting Started Locally
1. Clone the repository.
2. Navigate to the `backend/` directory and run `npm install`.
3. Create a `.env` file in the `backend/` folder with:
   - `PORT=5000`
   - `MONGODB_URI=your_mongodb_connection_string`
   - `JWT_SECRET=your_jwt_secret_key`
4. Run `npm run dev` to start the server.
5. Open `frontend/index.html` in your browser to use the application.
