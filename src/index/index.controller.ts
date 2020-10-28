import { NextFunction, Request, Response } from 'express';
import { Get , Controller } from '../@libs/router';

@Controller()
export class IndexController {

  @Get('/')
  public index(req: Request, res: Response, next: NextFunction){
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  // @Get('/:name')
  // public details(req: Request, res: Response) {
  //   return res.send(`You are looking at the profile of ${req.params.name}`);
  // }
}