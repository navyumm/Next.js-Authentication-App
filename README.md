# Next.js Authentication App

This is a full-stack authentication app built with Next.js, MongoDB, and various libraries for handling authentication, email verification, and user management.

## Features
- **Signup** : Users can create an account by providing their username, email and password.
- **Login** : Registered users can log in using their credentials.
- **Verify Email** : Newly registered users receive a verification email with a unique token to confirm their email address.
- **Profile** : Users can view and update their profile information.
- **Logout** : Users can securely log out of their account.

## Technologies Used
### Frontend:
- **Next.js** : A React framework for building server-side rendered and static web applications.
- **React**: A JavaScript library for building user interfaces.
- **React Hooks**: Used for managing state and side effects in functional components.
- **Axios**: A promise-based HTTP client for making AJAX requests.
- **Tailwind CSS** : A utility-first CSS framework for styling.

### Backend:
- **Node.js** : A JavaScript runtime for building server-side applications.
- **Express.js** : A minimalist web framework for Node.js.
- **MongoDB** : A NoSQL database for storing user data.
- **bcrypt** : A library for hashing passwords securely.
- **jsonwebtoken** : A library for generating and verifying JSON Web Tokens (JWT) for user authentication.
- **Nodemailer** : A module for sending emails from Node.js applications.
- **Mailtrap** : An email testing tool for capturing and inspecting sent emails in a development environment.

# Setup Instructions
1. Clone the repository:
```
git clone https://github.com/navyumm/next-authentication-app.git
```

2. Install dependencies for both frontend and backend:
```
cd next-authentication-app
cd frontend && npm install
cd ../backend && npm install
```

3. Configure environment variables:
    * Create a .env file in the backend directory and set the following variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USERNAME=your_mailtrap_username
EMAIL_PASSWORD=your_mailtrap_password
```

4. Start the development server:
```
cd backend && npm run dev
cd ../frontend && npm run dev
```

5. Access the application in your browser at http://localhost:3000.


# Usage
1. Signup for a new account.
2. Verify your email address by clicking on the verification link sent to your email.
3. Log in with your credentials.
4. Update your profile information if needed.
5. Log out securely.

# License
This project is licensed under the MIT License - see the [LICENSE](https://)  file for details.
    
