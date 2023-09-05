import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
// import { UtilsService } from '../shared/services/utils/utils.service';
import { Transaction } from '../interfaces/transaction.interface';
import { Stock } from '../interfaces/stock.interface';
import { UtilsService } from '../utils/utils.service';
@Injectable()
export class StocksService {
  constructor(private readonly utils: UtilsService) {}

  private readonly logger = new Logger(StocksService.name);

  async getStockData(sku: string) {
    try {
      // Read stock.json and transactions.json
      const stockData: Stock[] = await this.utils.readJsonFile(
        'mockData/stock.json',
      );
      const transactionsData: Transaction[] = await this.utils.readJsonFile(
        'mockData/transactions.json',
      );

      const stockLevelsRaw = this.utils.getStockLevels(stockData);
      const stockLevels = this.utils.applyTransactionToStockLevels(
        stockLevelsRaw,
        transactionsData,
      );
      if (!stockLevels[sku]) {
        throw new NotFoundException(`SKU "${sku}" not found.`);
      }
      return { sku, qty: stockLevels[sku] };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async listStockData() {
    try {
      // Read stock.json and transactions.json
      const stockData: Stock[] = await this.utils.readJsonFile(
        'mockData/stock.json',
      );
      const transactionsData: Transaction[] = await this.utils.readJsonFile(
        'mockData/transactions.json',
      );

      const stockLevelsRaw = this.utils.getStockLevels(stockData);

      const stockLevels = this.utils.applyTransactionToStockLevels(
        stockLevelsRaw,
        transactionsData,
      );

      const data = Object.keys(stockLevels).map((sku) => ({
        sku: sku,
        qty: stockLevels[sku],
      }));

      return data;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
