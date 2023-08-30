import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiParam } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  listStocks(): Promise<
    {
      sku: string;
      qty: number;
    }[]
  > {
    return this.appService.listStockData();
  }

  @Get('/:sku')
  @ApiParam({
    name: 'sku',
    type: String,
    required: true,
    example: 'DTW874360/97/81',
  })
  stockDataGet(@Param() params: { sku: string }): Promise<{
    sku: string;
    qty: number;
  }> {
    return this.appService.getStockData(params?.sku);
  }
}
