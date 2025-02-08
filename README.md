# Indian Food API with Authentication

## Description

This project is a Node.js RESTful API built with Express and TypeScript, designed to manage a collection of Indian dishes. It includes features such as user authentication using JSON Web Tokens (JWT), data validation with Joi, and supports operations like creating, updating, deleting, and retrieving dishes. The API also offers filtering, sorting, and pagination capabilities for efficient data retrieval.

## Features

- User authentication with JWT
- Data validation using Joi
- CRUD operations for managing dishes
- Filtering, sorting, and pagination for dish retrieval

## Prerequisites

- Node.js (version 18.17 or higher)
- npm (version 6 or higher)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/chanchalnegi/adapt-ready-backend.git
   cd adapt-ready-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

- Create a .env file in the root directory
- Add the following variables:

  ```ini
  USERNAME=yourUsername
  PASSWORD=yourPassword
  JWT_SECRET=yourJWTSecret
  ```

  Replace yourUsername, yourPassword, and yourJWTSecret with your desired credentials and a secure JWT secret.

## Project Structure

```plsql
  .
  ├── README.md
  ├── package-lock.json
  ├── package.json
  ├── src
  │   ├── config.ts
  │   ├── controllers
  │   │   ├── authController.ts
  │   │   └── foodController.ts
  │   ├── data
  │   │   └── indian_food.json
  │   ├── database
  │   │   └── foodDatabase.ts
  │   ├── index.ts
  │   ├── middleware
  │   │   └── authMiddleware.ts
  │   ├── models
  │   │   └── foodModel.ts
  │   ├── routes
  │   │   ├── authRoutes.ts
  │   │   └── foodRoutes.ts
  │   └── schemas
  │   ├── dishSchema.ts
  │   ├── loginSchema.ts
  │   └── updateDishSchema.ts
  ├── structure.txt
  └── tsconfig.json
```

- **controllers/:** Contains the application's route handlers.
- **routes/:** Defines the application's endpoints.
- **schemas/:** Holds Joi validation schemas.
- **models/:** Defines TypeScript interfaces for data models.
- **services/:** Contains service classes for data access and business logic.
- **middleware/:** Includes custom middleware functions.
- **config/:** Stores configuration settings.

## Usage

1. **Start the server:**

   ```bash
   npm start
   ```

2. **API Endpoints:**

- **Authentication:**

  - POST /auth/login: Authenticate a user and receive a JWT.

- **Dishes:**
  - GET /dishes: Retrieve all dishes with optional filtering, sorting, and pagination.
  - GET /dishes/:id: Retrieve a specific dish by ID.
  - POST /dishes: Create a new dish.
  - PUT /dishes/:id: Update an existing dish by ID.
  - DELETE /dishes/:id: Delete a dish by ID.

3. **Authentication Flow:**

To access protected routes (e.g., creating, updating, or deleting dishes), authenticate using the /auth/login endpoint to receive a JWT.

```http
Authorization: Bearer yourJWT
```

## Validation

The API uses Joi for request validation. Validation schemas are defined in the schemas/ directory and are applied in the controllers to ensure that incoming requests meet the expected structure and constraints.

## Error Handling

The application includes basic error handling to return appropriate HTTP status codes and messages for various error scenarios, such as validation failures or unauthorized access attempts.

## Security Considerations

- **Environment Variables:** Ensure that your .env file is not committed to version control. It's recommended to add .env to your .gitignore file.
- **JWT Secret:** Use a strong, unpredictable secret for signing JWTs.
- **Password Storage:** If implementing user registration, ensure that passwords are hashed securely before storage.

## Dependencies

- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **Joi**: Schema description language and data validator for JavaScript.
- **jsonwebtoken**: Implementation of JSON Web Tokens.
- **dotenv**: Loads environment variables from a .env file into process.env
