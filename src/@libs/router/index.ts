import { Router } from 'express';

interface Route {
  path?: string;
  router: Router;
  controller?: any;
}

export default Route;
