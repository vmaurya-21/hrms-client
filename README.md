# Vite React Boilerplate

It's Boilerplate for React application built using Vite.

## Workflow
This project is a React starter template built using Vite, featuring essential functionalities such as user authentication, role-based protected routes, login, and registration capabilities.

## Requirements and Depedencies

- [NodeJS v18](https://nodejs.org/download/release/latest-v18.x/)
- [npm v8](https://www.npmjs.com/package/v8)
- Docker

You can check versions of Node and npm by using the following commands:

- `node -v`
- `npm -v`

## Installation

Make sure to properly install and setup `NodeJS`, `npm` and `Docker`.

## Environment variables

Create a file by name `.env` in your server at package.json level. You can do that manually or by running the following command `touch .env`.

## Running the project

In order to run this application,  go to `Local` or `Docker` section.

### Local

_Make sure you've NodeJS v18 and npm v8_.

- Navigate to the Project Directory `cd your-project-directory`
- Then run `npm install` to install dependencies.
- Run `npm run dev` to run the application.


### Docker

- Make sure you are in the Project directory.
- Run `docker build -t <image-name> .` to build the image.
- Run `docker run -it -p <port-on-which-to-expose>:<container-port> --name <container-name> <image-name>` to run the container.

## Removing Tailwind CSS

If you wish to uninstall Tailwind CSS from this React boilerplate, follow these steps:

 1. Run the following command to remove Tailwind CSS and its related packages:
`npm uninstall tailwindcss autoprefixer`

 2. Delete the Tailwind configuration files if they exist:
`rm tailwind.config.js`

 3. Open your main CSS file `src/index.css` and remove the Tailwind CSS directives:
@tailwind base;
@tailwind components;
@tailwind utilities;

 4. Search through your React components and remove any Tailwind-specific class names. You'll need to replace them with your own CSS classes or styles.

## User Authentication and Login, Register Functionality.

This boilerplate contains a simple authentication flow in a React application, including login and registration functionalities. It uses React hooks, context for state management, and axios for API requests. It also provide role based authentication.

The `Login` component handles user login. It includes form inputs for username/email and password, validation, error handling, and redirection upon successful login.

The `Register` component handles user registration. It includes form inputs for username, email, password, and password confirmation, along with validation and error handling.

The `AuthContext` provides authentication state and methods to manage it. It uses localStorage to persist authentication state across sessions.

### Custom Hooks

The `useAxiosPrivate` hook sets up an axios instance with interceptors to handle private routes and token refresh logic.

## How to Remove Authentication

If you want to remove the authentication functionalities from this project, follow these steps:

1. Remove the Login and Register Components: `rm src/pages/LoginSystem/login.jsx`
`rm src/pages/LoginSystem/register.jsx`

2. Remove the AuthContext: `rm src/contexts/AuthProvider.js`

3. Remove Custom Hooks: Delete any custom hooks related to authentication, such as `useAxiosPrivate` and `useAuth`.

4. Remove any references to the deleted components, context, and hooks from your project files, such as `App.js`.

5. Update your routing logic to remove any protected routes and authentication-related redirects.

6. Remove any axios configurations or interceptors that were specifically set up for authentication purposes.


## Contributors
