# E-Commerce Microservice API

This is a backend API for an e-commerce application built using the microservice design pattern. The following technologies were used in the development of this project:

- #### Technology

  - Node.js
  - Mongodb
  - Docker
  - Nginx

- #### Tool
  - Postman

## This API has several services such as:

### API Gateway:

- Handles different service URLs and redirects them to the appropriate service.

### Auth Service:

- Handles user authentication and uses JSON Web Tokens (JWT) to generate access tokens. This service has several API endpoints such as:
- /register: used to register new users
- /login: used to login existing users
- other route for user update and delete

### Products Service:

- Handles CRUD operations for products, including endpoints for creating, updating, and deleting products, as well as endpoints for retrieving all products or a specific product by ID.

### Orders Service:

- Handles orders and has an endpoint for creating new orders.

To run this application, you will need to have Docker and Nginx installed. Clone the repository and navigate to the root directory, then run docker-compose up in the command line to start the application. The API will be available at http://localhost:8080/.
