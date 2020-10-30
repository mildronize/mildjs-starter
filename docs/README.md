# Usage

Note: `typeorm-di` is just the wrapper library of `typeorm`


1.  Create the connection using `createConnection` from `typeorm`
    ```typescript
    import { Connection, createConnection, useContainer, Container } from "typeorm-di";

    useContainer(Container);
    const connection = createConnection({
        name: 'default',
        type: "sqlite",
        database: "./app.sqlite",
        synchronize: true,
        entities: [
            "**/*.entity.ts"
        ]
    });
    ```

2. setup the entity 

    ```typescript
    import { Entity, PrimaryGeneratedColumn, Column} from "typeorm-di";

    @Entity()
    export class User {
        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        email: string;
    }
    ```

3. setup the service

    ```typescript
    import { Service, Repository, InjectRepository } from "typeorm-di";
    import { User } from "./users.entity";

    @Service()
    class UserService {

        @InjectRepository(User) 
        private repository: Repository<User>;

        public findAllUser(): Promise<User[]> {
            return this.repository.find();
        }
    }
    ```

4. setup the controller

    ```typescript
    import { Controller, Container } from "typeorm-di";
    import UserService from './users.service';

    @Controller('/users')
    export class UsersController {

        public userService: UserService = Container.get(UserService);

        @Get('/')
        public async getUsers(req: any, res: any, next: any) {
            const data: User[] = await this.userService.findAllUser();
            res.status(200).json({ data });
        }

    }
    ```

5. Inject the controller to Express using `addExpressController`

    ```typescript
    import express from 'express';
    import { addExpressController } from 'route-controller';
    import { UsersController } from './users.controller';

    app = express();
    addExpressController(app, [
        UsersController
    ]);
    ```


## Q&A 

1. Why we don't need to catch the error in the controller?

    **Answer**: `addExpressController` and the router decorator. It works because `reflect-metadata` for using  save the extra the data to the function, class , method or property.

    If you see the code...

    ```typescript
    @Get('/')    // get method and path `/`
    public async getUsers(req: any, res: any, next: any) {
        const data: User[] = await this.userService.findAllUser();
        res.status(200).json({ data });
    }
    ```

    It will be transform to 

    ```typescript
    app.get('/', getUsers);
    ```

    but we don't handle the error yet, thanks for https://www.positronx.io/express-js-error-handling-tutorial-with-best-example/
    for example of using Express error handling.

    Lastly, it it will be

    ```typescript
    const asyncHelper = (fn: any) => (
        function(req: Request, res: Response, next: NextFunction){
            fn(req, res, next).catch(next);
        }
    );

    app.get('/', asyncHelper( async (req, res, next ) => {
        getUsers
    }) );
    ```

    So, the `asyncHelper` will help to catch the error, and pass it to the error handling middle of Express app.

    Finally, the error will be passing to the error handling middle of Express app. 

    ```typescript
    aap.use( (error, req, res, next ) => {
        res.send(error.message);
    })
    ```


