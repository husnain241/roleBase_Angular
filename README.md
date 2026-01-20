# RoleBase

This Angular application implements a role-based access control (RBAC) system. It provides user authentication, authorization, and different user interfaces based on assigned roles. Currently, it uses JSON Server as a mock backend for demonstration purposes.

## Features

- **Authentication**: User login and registration components
- **Authorization**: Role-based guards to restrict access to certain routes
- **Admin Dashboard**: Exclusive dashboard for users with admin role, including user management (view, search, create, delete users)
- **User Profile**: Profile management for regular users
- **Shared Components**: Navigation bar and loading spinner for better user experience
- **Core Services**: Authentication service, HTTP interceptor for token handling, and data models for users and roles

## Next Steps

- Add comprehensive error handling and user feedback messages
- Replace JSON server with a real backend API (e.g., Node.js/Express or ASP.NET)
- Enhance security with password hashing and JWT token validation
- Add more user roles and granular permissions
- Implement unit tests and integration tests for components and services
- Improve UI/UX with responsive design and better styling
- Add form validation feedback and accessibility features

## Prerequisites

- Node.js and npm installed
- Angular CLI installed globally (`npm install -g @angular/cli`)
- JSON Server for mock backend (`npm install -g json-server`)

## Backend Setup

This application uses JSON Server as a mock backend. To set up the mock API:

1. Create a `db.json` file in the project root with initial user data:

```json
{
  "users": [
    {
      "id": "1",
      "username": "admin",
      "email": "admin@example.com",
      "role": "ADMIN",
      "password": "admin123"
    },
    {
      "id": "2",
      "username": "user",
      "email": "user@example.com",
      "role": "USER",
      "password": "user123"
    }
  ]
}
```

2. Start the JSON Server:

```bash
json-server --watch db.json --port 3000
```

This will start the mock API at `http://localhost:3000`.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
