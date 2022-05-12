# nodejs-api-image-resizer 🖼️🗜️

A API Rest for logging image processing tasks, resizing them to 1024 and 800px wide and serving them for consumption by front-end applications.

## 1. First time installation 🆕

> ⚠️ Follow this steps in order.

### 1.1 Install Node.js 📦

Install Node "Stable" (right now is `v16.14.0`). Download and install it via the [Node.js official page](https://nodejs.org/en/download/).

If you use `nvm` you can install with `nvm install 16.14.0` and then run `nvm use`.

### 1.2 Install Docker and docker-compose 📜

This project run with docker-compose file in production mode for provide a database to persist data.
To run the container install [Docker](https://docs.docker.com/engine/install) and [docker-compose](https://docs.docker.com/compose/install/)

### 1.3 Create `.env` file 📑

As this repo gets it's environment configuration from a `.env`. You just need to copy [.env.example](./.env.example) in the same root folder and rename it to `.env`.

### 1.4 Bootstrap 📂

Run this command to install and link workspace dependencies:

`npm i`

Once it's done, you can start the project.

## 2. Start the project 👨‍💻

`npm run start`

Everything is running without errors? Great! You're ready to rock.
_"Lights, camera, action!"_ 🎬

The URL to run the app in "LOCAL MODE" are:

- http://localhost:3000/

Also, you can use the [postman collection](./nodejs-api-image-resizer.postman_collection.json) to see all available endpoints.

## 3. Testing 🧪

### 3.1 e2e Tests

To run e2e tests follow this steps in order:

1. Up database executing `npm run db:up`
2. Run Goggle Cloud Function with `npm run start:cfg`
3. Now, in another terminal run the script `npm run test:e2e`

And... Happy testing! 🥳

### 3.2 Unit Tests (TODO)

Unit tests not implemented yet.
