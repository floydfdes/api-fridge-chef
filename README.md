# Fridge Chef API

## Description

Fridge Chef API is a backend service for a React Native app that helps users find recipes based on the ingredients they have in their fridge. This API provides endpoints for user authentication, recipe management, ingredient listing, and image upload functionality.

## Features

- User authentication (login, signup, logout)
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

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your environment variables in a `.env` file
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

For detailed API endpoint documentation, please refer to the `apdoc.txt` file in the project root.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.
