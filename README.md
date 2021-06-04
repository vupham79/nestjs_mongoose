<div align="center">
  <img width="250" src="https://camo.githubusercontent.com/18fe3feea5e3593c593e12e552494a3995eceacf/687474703a2f2f6b616d696c6d79736c69776965632e636f6d2f7075626c69632f6e6573742d6c6f676f2e706e672331" alt="Awesome">
  <br>
  <h3>Dedoco Test - Backend</h3>
  <hr>
</div>

# Start guide

## Installation

Install dependencies

### `npm install`

---

## Environment

Create a .env file and write as .env.example

---

## Database

### `docker-compose up -d`

The example codebase uses [Mongoose](https://mongoosejs.com/).

---

## Run

### `npm run start:dev`

Application will be available on http://localhost:[PORT]

# Other informations

# Authentication

This applications uses JSON Web Token (JWT) to handle authentication.
This app uses <strong>refresh-Token</strong> mechanism to refresh jsonwebtoken after 30 minutes.

---

# Swagger API docs

Visit http://127.0.0.1:[PORT]/api in your browser

This example repo uses the NestJS swagger module for API documentation. [NestJS Swagger](https://github.com/nestjs/swagger) - [www.swagger.io](https://swagger.io/)
