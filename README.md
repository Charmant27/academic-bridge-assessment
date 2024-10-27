
# Simple employee management system
This is a simple employee management system which was built in NestJS as a microservice this is an introduction of the platform which i.e it's an application which will be updated later. the application has three applications:
### Auth
for managing authentication
### notifications
For sending email notifications to users
### employee
for managing employees
### attendance
For recording the attendance of the employees

Docker was used for containerization and managing all the three apps smoothly

# REQUIREMENTS
Node version 18.0 to latest version.
INSTALLATION PROCESS

This application is using npm package manager do not use yarn since all the dependencies and the application itself is running using npm. after cloning the repository run the following commands to successfully test the application and navigate through it.

To install dependencies and packages run: npm i or npm install
To run application: npm run start:dev && docker-compose up 

# .env variables
MONGO_URI
JWT_SECRET
JWT_EXPIRATION
PORT
MICROSERVICES_PORT
NOTIFICATIONS_HOST
NOTIFICATIONS_PORT

