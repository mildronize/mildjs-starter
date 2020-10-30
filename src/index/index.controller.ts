import { NextFunction, Request, Response } from 'express';
import { Get, Controller } from 'route-controller';

@Controller()
export class IndexController {
  @Get('/')
  public index(req: Request, res: Response, next: NextFunction) {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}
