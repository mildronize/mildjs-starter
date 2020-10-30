import express from 'express';
import { RouteDecorator } from '.';
import { Logger } from 'winston';

export function addExpressController(app: express.Application, controllers: any[], logger?: Logger) {

    // Iterate over all our controllers and register our routes
    controllers.forEach(controller => {
        // This is our instantiated class
        const instance = new controller();
        if (logger) logger.info(`Added controller: ${instance.constructor.name}`);

        // The prefix saved to our controller
        const prefix = Reflect.getMetadata('prefix', controller);
        // Our `routes` array containing all our routes for this controller
        const routes: Array<RouteDecorator> = Reflect.getMetadata('routes', controller);

        const callInstance = (route: RouteDecorator) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
            instance[route.methodName](req, res, next);
        }

        // Iterate over all routes and register them to our express application 
        routes.forEach((route: RouteDecorator) => {

            if (route.hasOwnProperty("middleware")) {
                // Call the middleware
                app[route.requestMethod](prefix + route.path, route.middleware, callInstance(route));
            } else {
                app[route.requestMethod](prefix + route.path, callInstance(route));
            }
            if (logger) logger.info(`Mapped route: [${route.requestMethod}] '${prefix}${route.path}'`);

        });

    });

}