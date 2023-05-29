## User Management System

This is a user management system implemented as a REST API with CRUD operations using Node.js and Express.js. The system provides user registration, login functionality, and CRUD operations for managing user data. It also includes role-based access control, with an Admin role having access to all CRUD operations and a User role having access only to their own data (Read operation).

## Prerequisites

- Node.js
- MongoDB

## Local Installation

1.  Clone this repository
2.  Install the dependencies `npm install`
3.  Setup the `.env` file based on your environment
4.  Start the server `npm start`

## API Documentation

Api documentation is available using Postman in the folder `postman_collection`

## Attachments

-   `screenshots` on this folder contains screenshots the kubernetes deployed on local server
-   `diagram` on this folder contains image the flow of the application

## Admin Credentials

In my local server i made the admin credentials
-   Username : admin 
-   Password : admin

## Deployment

-   create the docker image using the following command `docker-compose up --build`
-   make sure the image exists user-management:1.0 and mongodb
-   deploy on kubernetes using the following commands `kubectl deploy -f kubernetes/deployment.yaml` and `kubectl deploy -f kubernetes/service.yaml
