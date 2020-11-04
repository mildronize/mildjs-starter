import { Module } from '@mildjs/core';
import { IndexController } from './index.controller';

@Module({
  controllers: [IndexController],
})
export class IndexModule {}
