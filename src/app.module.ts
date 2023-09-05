import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { StocksModule } from './stocks/stocks.module';

@Module({
  imports: [ConfigModule.forRoot({}), SharedModule, StocksModule],
})
export class AppModule { }
