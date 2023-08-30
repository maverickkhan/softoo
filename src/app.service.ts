import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { HelperService } from './shared/services/helper/helper.service';
import { Transaction } from './interfaces/transaction.interface';
import { Stock } from './interfaces/stock.interface';

@Injectable()
export class AppService {
  constructor(private readonly helper: HelperService) {}

  private readonly logger = new Logger(AppService.name);

  async getStockData(sku: string) {
    try {
      // Read stock.json and transactions.json
      const stockData: Stock[] = await this.helper.readJsonFile('stock.json');
      const transactionsData: Transaction[] =
        await this.helper.readJsonFile('transactions.json');

      const stockLevelsRaw = this.helper.decorateStockLevels(stockData);

      const stockLevels = this.helper.applyTransactionToStockLevels(
        stockLevelsRaw,
        transactionsData,
      );
      if (stockLevels[sku] === undefined) {
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
      const stockData: Stock[] = await this.helper.readJsonFile('stock.json');
      const transactionsData: Transaction[] =
        await this.helper.readJsonFile('transactions.json');

      const stockLevelsRaw = this.helper.decorateStockLevels(stockData);

      const stockLevels = this.helper.applyTransactionToStockLevels(
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
