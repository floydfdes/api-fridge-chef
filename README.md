# Fridge Chef API

## Description

Fridge Chef API is a backend service for a React Native app that helps users find recipes based on the ingredients they have in their fridge. This API provides endpoints for user authentication, recipe management, ingredient listing, and image upload functionality.

## Features

- User authentication (login, signup, logout, password reset)
- Recipe management (get all recipes, get recipes by ingredients, get specific recipe)
- User profile management
- Ingredient listing
- Fridge image upload

## Technologies Used

- Node.js
- Express.js
- TypeScript
- dotenv for environment variable management
- ngrok for tunneling (development purposes)
- Nodemailer for sending emails

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your environment variables in a `.env` file. Make sure to include:
   ```
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   CONNECTION_URL=your_mongodb_connection_string
   ```
4. Run the development server:
   ```
   npm start
   ```

## Scripts

- `npm start`: Start the development server with hot-reloading
- `npm run build`: Compile TypeScript to JavaScript
- `npm run start-prod`: Build and start the production server
- `npm run tunnel`: Start an ngrok tunnel for exposing the local server

## API Documentation

### User Authentication

1. **Login**
   - URL: `/auth/login`
   - Method: POST
   - Request Body:
     ```json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     ```
   - Response:
     ```json
     {
       "id": "123",
       "name": "John Doe",
       "email": "user@example.com",
       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
     }
     ```

2. **Signup**
   - URL: `/auth/signup`
   - Method: POST
   - Request Body:
     ```json
     {
       "fullName": "John Doe",
       "email": "user@example.com",
       "password": "password123"
     }
     ```
   - Response:
     ```json
     {
       "id": "124",
       "name": "John Doe",
       "email": "user@example.com",
       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
     }
     ```

3. **Logout**
   - URL: `/auth/logout`
   - Method: POST
   - Headers: Authorization (Bearer Token)
   - Response:
     ```json
     {
       "message": "Logged out successfully"
     }
     ```

4. **Request Password Reset**
   - URL: `/auth/request-password-reset`
   - Method: POST
   - Request Body:
     ```json
     {
       "email": "user@example.com"
     }
     ```
   - Response:
     ```json
     {
       "message": "Password reset link sent to your email"
     }
     ```

5. **Reset Password**
   - URL: `/auth/reset-password`
   - Method: POST
   - Request Body:
     ```json
     {
       "token": "reset_token",
       "newPassword": "new_password123"
     }
     ```
   - Response:
     ```json
     {
       "message": "Password has been reset successfully"
     }
     ```

### Recipes

- **Get All Recipes**
  - URL: `/recipes`
  - Method: GET
  - Headers: Authorization (Bearer Token)
  - Response:
    ```json
    {
      "recipes": [...],
      "totalCount": 100,
      "currentPage": 1,
      "totalPages": 10
    }
    ```

### Ingredients

- **Get List of Ingredients**
  - URL: `/ingredients`
  - Method: GET
  - Headers: Authorization (Bearer Token)
  - Response:
    ```json
    {
      "ingredients": ["Tomato", "Cheese", "Pasta", ...]
    }
    ```

### Image Upload

- **Upload Fridge Image**
  - URL: `/upload`
  - Method: POST
  - Headers: Authorization (Bearer Token)
  - Request Body: multipart/form-data
  - Response:
    ```json
    {
      "image": "data:image/jpeg;base64,...",
      "message": "Image uploaded successfully"
    }
    ```

## Conclusion

This API provides a comprehensive backend solution for managing user authentication, recipes, and ingredients, along with image upload capabilities. The addition of password reset functionality enhances user experience and security.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.
