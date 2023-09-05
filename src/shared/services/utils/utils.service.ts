import { Injectable, Logger } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { Stock } from '../../../interfaces/stock.interface';
import { Transaction } from '../../../interfaces/transaction.interface';
import { TRANSACTION_TYPE } from '../../../interfaces/enums';
@Injectable()
export class UtilsService {
  constructor() { }
  private readonly logger = new Logger(UtilsService.name);

  async readJsonFile(filePath: string) {
    const content = await readFile(filePath, 'utf-8');
    return JSON.parse(content);
  }

  getStockLevels(stockData: Stock[]): Record<string, number> {
    const stockLevels = {};
    for (const item of stockData) {
      stockLevels[item.sku] = item.stock;
    }
    return stockLevels;
  }

  applyTransactionToStockLevels(
    stockeLevels: Record<string, number>,
    transactionsData: Transaction[],
  ): Record<string, number> {
    // Process transactions from transactions.json
    for (const transaction of transactionsData) {
      const { sku, type, qty } = transaction;
      if (!stockeLevels[sku]) {
        stockeLevels[sku] = 0; // Assuming starting quantity for missing SKUs is 0
      }

      // Update stock levels based on transaction type
      if (type === TRANSACTION_TYPE.ORDER) {
        stockeLevels[sku] -= qty;
      } else if (type === TRANSACTION_TYPE.REFUND) {
        stockeLevels[sku] += qty;
      }
    }

    return stockeLevels;
  }
}
