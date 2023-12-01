# Tech. Edu. - An Educational Platform

Tech. Edu. is a comprehensive educational platform designed for seamless learning experiences. As an admin, you can post courses, and users can purchase and learn from them.

## Key Features

- **User Authentication and Authorization:** Users receive emails during signup, subscription purchase, subscription cancellation, and password reset. The system uses JSON Web Tokens for secure authentication.

- **Password Hashing:** User passwords are securely hashed using bcrypt.js for enhanced security.

- **Payment Integration:** Integration with Razorpay allows users to make secure payments for subscriptions.

- **Admin Functionality:** Admins have the ability to create, update, read, and delete courses or lectures. An admin dashboard provides insights and control.

## Project Structure

### Server (Backend)

#### Models

1. Course Model
2. User Model
3. Payment Model

#### Controllers

- User Controller
- Payment Controller
- Course Controller
- Miscellaneous Controller

#### Routes

- User Routes
- Payment Routes
- Course Routes
- Miscellaneous Routes

#### Middlewares

- Authentication Middleware
- Error Handling Middleware
- Multer Middleware (for file uploads)

#### Backend Dependencies

```json
"dependencies": {
  "bcryptjs": "^2.4.3",
  "cloudinary": "^1.40.0",
  "cookie-parser": "^1.4.6",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "express": "^4.18.2",
  "express-async-handler": "^1.2.0",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^7.5.2",
  "morgan": "^1.10.0",
  "multer": "^1.4.5-lts.1",
  "nodemailer": "^6.9.6",
  "nodemon": "^3.0.1",
  "razorpay": "^2.9.2"
}
```

# Tech. Edu. - Frontend

Welcome to the frontend of Tech. Edu. - An Educational Platform. This section provides information about the client-side of the application.

## Project Overview

The frontend is built using React and leverages various dependencies and technologies to create a seamless educational platform.

## Project Structure

### Pages

The frontend consists of approx 20 various pages designed to cater to different user interfaces. Some key pages include:
- Course
- Admin Dashboard
- Student Dashboard
- Payment
- User
- ... (other specific pages)

### Components

A few selected examples of components used in the project:
- Carousel Slider
- Course Card
- Typing Text
- ... (other components)

### State Management and Styling

- **Redux Toolkit and Async Thunk:** Used for efficient state management.
- **Tailwind CSS:** Provides a utility-first CSS framework for styling.

## Frontend Dependencies

```json
"dependencies": {
  "@reduxjs/toolkit": "^1.9.7",
  "@tailwindcss/line-clamp": "^0.4.4",
  "axios": "^1.5.1",
  "chart.js": "^4.4.0",
  "daisyui": "^3.9.2",
  "react": "^18.2.0",
  "react-chartjs-2": "^5.2.0",
  "react-dom": "^18.2.0",
  "react-hot-toast": "^2.4.1",
  "react-icons": "^4.11.0",
  "react-redux": "^8.1.3",
  "react-router-dom": "^6.16.0",
  "react-super-responsive-table": "^4.3.7",
  "react-type-animation": "^3.2.0"
}
```