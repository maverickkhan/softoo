import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { UtilsService } from '../shared/services/utils/utils.service';

@Module({
  controllers: [StocksController],
  providers: [StocksService, UtilsService],
})
export class StocksModule { }
