import 'reflect-metadata'; // for decorator
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { Route, RouteDecorator } from './router';
import errorMiddleware from './middlewares/error.middleware';
import AuthRoute from './authentication/auth.route';

import vars from './config/vars';
import logger from './config/logger';
import {AuthController} from './authentication/auth.controller';

class App {
  public app: express.Application;
  public port: (string | number);
  public isProduction: boolean;

  constructor(controllers: any[]) {
    this.app = express();
    this.port = vars.port || 3000;
    this.isProduction = vars.env === 'production' ? true : false;

    //routes.push(new AuthRoute());  // Add auth routes as default
    controllers.push(AuthController);// Add auth controller as default

    this.initializeMiddlewares();
    // this.initializeRoutes(routes);
    this.initializeControllers(controllers);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    if (this.isProduction) {
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(morgan('combined'));
      this.app.use(cors({ origin: 'your.domain.com', credentials: true }));
    } else {
      this.app.use(morgan('dev'));
      this.app.use(cors({ origin: true, credentials: true }));
    }

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const swaggerJSDoc = require('swagger-jsdoc');
    const swaggerUi = require('swagger-ui-express');

    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: any[]) {
    // Iterate over all our controllers and register our routes
    controllers.forEach(controller => {
      // This is our instantiated class
      const instance = new controller();
      // The prefix saved to our controller
      const prefix = Reflect.getMetadata('prefix', controller);
      // Our `routes` array containing all our routes for this controller
      const routes: Array<RouteDecorator> = Reflect.getMetadata('routes', controller);

      // Iterate over all routes and register them to our express application 
      routes.forEach((route: RouteDecorator) => {
        // If the route has a middleware,
        if (route.hasOwnProperty("middleware")) {
          // then call the middleware
          this.app[route.requestMethod](prefix + route.path, route.middleware, (req: express.Request, res: express.Response) => {
            // Execute our method for this path and pass our express request and response object.
            instance[route.methodName](req, res);
          });
        } else {

          // It would be a good idea at this point to substitute the `app[route.requestMethod]` with a `switch/case` statement
          // since we can't be sure about the availability of methods on our `app` object. But for the sake of simplicity
          // this should be enough for now.
          this.app[route.requestMethod](prefix + route.path, (req: express.Request, res: express.Response) => {
            // Execute our method for this path and pass our express request and response object.
            instance[route.methodName](req, res);
          });
        }
      });
    });

  }

}

export default App;
