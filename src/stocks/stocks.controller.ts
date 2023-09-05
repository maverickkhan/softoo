import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) { }

  @Get('/list-stocks')
  listStocks(): Promise<
    {
      sku: string;
      qty: number;
    }[]
  > {
    return this.stocksService.listStockData();
  }

  @Get('/:sku')
  @ApiParam({
    name: 'sku',
    type: String,
    required: true,
    example: 'DTW874360/97/81',
  })
  getStockData(@Param() params: { sku: string }): Promise<{
    sku: string;
    qty: number;
  }> {
    const { sku } = params;
    return this.stocksService.getStockData(sku);
  }
}

