// import { Test, TestingModule } from '@nestjs/testing';
// import { StocksService } from './stocks.service';
// import { UtilsService } from '../shared/services/utils/utils.service';

// describe('StocksService', () => {
//   let service: StocksService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [StocksService, UtilsService],
//     }).compile();

//     service = module.get<StocksService>(StocksService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });

import { Test, TestingModule } from '@nestjs/testing';
import { StocksService } from './stocks.service';
import { UtilsService } from '../shared/services/utils/utils.service';

describe('StocksService', () => {
  let stocksService: StocksService;
  let utilsService: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StocksService,
        UtilsService, // Provide a mock or stub for UtilsService here if needed
      ],
    }).compile();

    stocksService = module.get<StocksService>(StocksService);
    utilsService = module.get<UtilsService>(UtilsService);
  });

  describe('getStockData', () => {
    it('should return stock data for a valid SKU', async () => {
      // Mock the readJsonFile method using jest.spyOn
      const readJsonFileMock = jest.spyOn(utilsService, 'readJsonFile');
      readJsonFileMock.mockResolvedValueOnce([
        { sku: "XOE089797/10/74", stock: 2226 },
        { sku: "ENN169733/05/69", stock: 9560 }
      ]);
      readJsonFileMock.mockResolvedValueOnce([
        { sku: "KGD740425/40/48", type: "order", qty: 6 },
        { sku: "YGH750695/17/53", type: "order", qty: 9 }
      ]);

      const result = await stocksService.getStockData('XOE089797/10/74');
      expect(result).toEqual({ sku: 'XOE089797/10/74', qty: 2226 });
    });

    // Add more test cases for SKU not found and error scenarios
  });

  describe('listStockData', () => {
    it('should return a list of stock data', async () => {
      // Mock the readJsonFile method using jest.spyOn
      const readJsonFileMock = jest.spyOn(utilsService, 'readJsonFile');
      readJsonFileMock.mockResolvedValueOnce([
        { sku: "XOE089797/10/74", stock: 2226 },
        { sku: "ENN169733/05/69", stock: 9560 }
      ]);
      readJsonFileMock.mockResolvedValueOnce([
        { sku: "XOE089797/10/74", type: "order", qty: 6 },
        { sku: "ENN169733/05/69", type: "refund", qty: 10 }
      ]);

      const result = await stocksService.listStockData();
      expect(result).toEqual([
        { sku: 'XOE089797/10/74', qty: 2220 },
        { sku: 'ENN169733/05/69', qty: 9570 }
      ]);
    });

    // Add more test cases for error scenarios
  });
});
