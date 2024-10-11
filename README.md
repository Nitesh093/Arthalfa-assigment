# Product Management API

This project is a simple Product Management API built with Node.js, Express.js, and Sequelize ORM, using PostgreSQL as the database. It provides basic CRUD functionality (Create, Read, Update, Delete) for managing products.

## Features

- Express.js for creating API routes
- Sequelize ORM for database interaction
- PostgreSQL running in a Docker container
- dotenv for managing environment variables
- Basic CRUD functionality for products

## Prerequisites

- Node.js (v14 or higher)
- Docker to run PostgreSQL in a container
- Git to pull the repository

## Installation

1. Clone the repository:

   `git clone https://github.com/Nitesh093/Arthalfa-assigment.git`

2. Navigate to the project directory:

   `cd Arthalfa-assigment`

3. Install the dependencies:

   `npm install`

4. Set up environment variables in a `.env` file:

   ```plaintext
   DB_NAME=product_db
   DB_USER=nitesh
   DB_PASS=nitesh123
   DB_HOST=localhost
   DB_PORT=5432
   DB_DIALECT=postgres



Running PostgreSQL in Docker
Run the following command to start PostgreSQL in a Docker container:

`docker run --name postgres-container -e POSTGRES_USER=nitesh -e POSTGRES_PASSWORD=nitesh123 -e POSTGRES_DB=product_db -p 5432:5432 -d postgres`


## Starting the Application
To start the application with nodemon:

`nodemon app.js`
