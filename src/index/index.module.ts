import { Module } from 'route-controller';
import { IndexController } from './index.controller';

@Module({
  controllers: [IndexController],
})
export class IndexModule {}
