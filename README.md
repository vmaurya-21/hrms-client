# Vite React Boilerplate

It's Boilerplate for react application made using Vite.

## Workflow
This application provides a boilerplate for React, consisting of login and signup pages, and protected routes for different types of users.

## Requirements and Depedencies

- [NodeJS v18](https://nodejs.org/download/release/latest-v18.x/)
- [npm v8](https://www.npmjs.com/package/v8)
- Docker

You can check versions of Node and npm by using the following commands:

- `node -v`
- `npm -v`

## Environment variables

Create a file by name `.env` in your server at package.json level. You can do that manually or by running the following command `touch .env`.

### Local

_Make sure you've NodeJS v18 and npm v8_.

- Make sure you've provided all env variables, example, via terminal or using .env file.
- Then run `npm install` to install dependencies without regenerating package-lock.json.
- Run `npm run dev` to run the application.


### Docker

- Run `docker build -t <image-name> .` to build the image.
- Run `docker run -it -p <port-on-which-to-expose>:<container-port> --name <container-name> <image-name>` to run the container.


## Contributors
