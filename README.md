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

project-root/
├── src/
│ ├── controllers/
│ │ ├── AuthController.ts
│ │ └── DishController.ts
│ ├── routes/
│ │ ├── authRoutes.ts
│ │ └── dishRoutes.ts
│ ├── schemas/
│ │ ├── dishSchema.ts
│ │ ├── updateDishSchema.ts
│ │ └── loginSchema.ts
│ ├── models/
│ │ ├── Food.ts
│ │ └── User.ts
│ ├── services/
│ │ └── FoodDatabase.ts
│ ├── middleware/
│ │ └── authMiddleware.ts
│ ├── config/
│ │ └── index.ts
│ ├── app.ts
│ └── server.ts
├── .env
├── package.json
└── tsconfig.json
