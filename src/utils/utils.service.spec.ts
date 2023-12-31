import { Test, TestingModule } from '@nestjs/testing';
import { UtilsService } from './utils.service';
import { promises as fsPromises } from 'fs';
import { Stock } from '../interfaces/stock.interface';
import { Transaction } from '../interfaces/transaction.interface';
import { TRANSACTION_TYPE } from '../interfaces/enums';

describe('HelperService', () => {
  let service: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilsService],
    }).compile();

    service = module.get<UtilsService>(UtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('readJsonFile', () => {
    it('should read and parse JSON file content', async () => {
      const filePath = 'test.json';
      jest
        .spyOn(fsPromises, 'readFile')
        .mockResolvedValue('{"key": "value"}' as any);

      const result = await service.readJsonFile(filePath);

      expect(result).toEqual({ key: 'value' });
    });
  });

  describe('decorateStockLevels', () => {
    it('should convert stock data array to stock levels object', () => {
      const stockData: Stock[] = [
        { sku: 'SKU001', stock: 10 },
        { sku: 'SKU002', stock: 20 },
      ];

      const result = service.getStockLevels(stockData);

      expect(result).toEqual({
        SKU001: 10,
        SKU002: 20,
      });
    });
  });

  describe('applyTransactionToStockLevels', () => {
    it('should update stock levels based on transactions', () => {
      const stockLevels: { [key: string]: number } = {
        SKU001: 50,
        SKU002: 30,
      };
      const transactionsData: Transaction[] = [
        { sku: 'SKU001', type: TRANSACTION_TYPE.ORDER, qty: 5 },
        { sku: 'SKU002', type: TRANSACTION_TYPE.REFUND, qty: 10 },
      ];

      const result = service.applyTransactionToStockLevels(
        stockLevels,
        transactionsData,
      );

      expect(result).toEqual({
        SKU001: 45,
        SKU002: 40,
      });
    });

    it('should add missing SKUs with 0 stock', () => {
      const stockLevels: { [key: string]: number } = {
        SKU001: 50,
      };
      const transactionsData: Transaction[] = [
        { sku: 'SKU001', type: TRANSACTION_TYPE.ORDER, qty: 5 },
        { sku: 'SKU002', type: TRANSACTION_TYPE.REFUND, qty: 10 },
      ];

      const result = service.applyTransactionToStockLevels(
        stockLevels,
        transactionsData,
      );

      expect(result).toEqual({
        SKU001: 45,
        SKU002: 10,
      });
    });
  });
});
