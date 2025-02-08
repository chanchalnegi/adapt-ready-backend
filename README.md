# Indian Food API with Authentication

## Description

This project is a Node.js RESTful API built with Express and TypeScript, designed to manage a collection of Indian dishes. It includes features such as user authentication using JSON Web Tokens (JWT), data validation with Joi, and supports operations like creating, updating, deleting, and retrieving dishes. The API also offers filtering, sorting, and pagination capabilities for efficient data retrieval.

## Features

- User authentication with JWT
- Data validation using Joi
- CRUD operations for managing dishes
- Filtering, sorting, and pagination for dish retrieval

## Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/indian-food-api.git
   cd indian-food-api
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
