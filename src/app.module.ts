import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StocksModule } from './stocks/stocks.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [ConfigModule.forRoot({}), StocksModule, UtilsModule],
})
export class AppModule {}
