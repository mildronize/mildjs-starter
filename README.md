# Mali Server

Express + Typescript

## Features

- Express Route Decorator [route-controller](https://github.com/mildronize/route-controller)), special thanks for very good blog from [Kevin](https://nehalist.io/routing-with-typescript-decorators/) (Inspired by [nestjs](https://nestjs.com/), alternatively by [routing-controllers](https://github.com/typestack/routing-controllers))
  - Supported decorator: `Get`, `Post`, `Put`, `Delete` , `Middleware`
- Use [typeorm-di](https://github.com/mildronize/typeorm-di) it wraps the module:
  - [TypeORM](https://typeorm.io/)
  - [TypeDI](https://github.com/typestack/typedi)
  - [typeorm-typedi-extensions](https://github.com/typeorm/typeorm-typedi-extensions): This extension for `TypeORM` provides handy decorators that can be used with `TypeDI`.
- Logger by [winston](https://github.com/winstonjs/winston) (Inspired from [danielfsousa](https://github.com/danielfsousa/express-rest-boilerplate/blob/master/src/config/logger.js))
- **Helper libraries:**
  - [reflect-metadata](https://github.com/rbuckton/reflect-metadata) for class and method decorators
  - **Smart Validation** thanks to [class-validator](https://github.com/typestack/class-validator) with some nice annotations.


## Doc

It's available on `/docs`

## The starter boilerplate
This project is based on the starter: 
https://github.com/ljlm0402/typescript-express-starter, which provides features:
  - ES6 Module import style
  - All classes based
  - No database, just mocking the data in vars.
  - [Swagger](https://swagger.io/) API doc
  - Basic features of API: 
    - **Authentication**: login, sign up, logout (using JWT)
    - **User**: CRUD Operation
  - Express Setup:
    - Define a class for instance of Express app `app.ts` (for testing)
    - Route, Middleware ( for request validation and authentication)
  - Project Structure
    - Controller
    - DTO (Data transfer object) -> (for request validation)
    - Exception: for handling error request
    - Interfaces: All data type (Interfaces) for Typescript
    - Middleware: Express middleware
    - Models: For mocking data (used by the service)
    - Routes: Express route
    - Test: all test (user, authentication)


## My boilerplate 
- [Express with Typescript (v1)](https://github.com/mildronize/mali-server/tree/ts-express-boilerplate): 
  - Refactor the whole project structure
  - Using context-based approach:
    - `users`: (including services, controller, model, interface, route, test, etc.)
    - `index`: (including services, controller, model, interface, route, test, etc.)
    - `@lib`: All files that not involves in the previous section (e.g. exception, middleware, route helper, `app.ts` (Express App))
  - Modify JWT authentication for attaching the JWT token in the HTTP header of `authorization` instead of cookie
  - Setup the global variables such as `dotenv-safe` for loading `.env` to the vars using globally.


- [Express with Typescript (Router Decorator) (v2)](https://github.com/mildronize/mali-server/tree/ts-express-boilerplate-route-decorator): 
  - **Features**:
    - Logger by [winston](https://github.com/winstonjs/winston) (Inspired from [danielfsousa](https://github.com/danielfsousa/express-rest-boilerplate/blob/master/src/config/logger.js))
    - Express Route Decorator (`route-controller`), special thanks for very good blog from [Kevin](https://nehalist.io/routing-with-typescript-decorators/) (Inspired by [nestjs](https://nestjs.com/), alternatively by [routing-controllers(https://github.com/typestack/routing-controllers))
      - Supported decorator: `Get`, `Post`, `Put`, `Delete` , `Middleware`

  - **Changelog**: 
    - Move the `authentication` to `./src`, (I think, it's better place, because this module is very close with `user`) 
    - Define the decorator router for Express route using `reflect-metadata` for decorator (Thanks [Kevin](https://nehalist.io/routing-with-typescript-decorators/) )


## Inspiration

- https://github.com/w3tecch/express-typescript-boilerplate
- https://github.com/danielfsousa/express-rest-boilerplate
- https://github.com/microsoft/TypeScript-Node-Starter
