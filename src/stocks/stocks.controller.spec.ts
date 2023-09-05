import { Test, TestingModule } from '@nestjs/testing';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import { UtilsService } from '../shared/services/utils/utils.service';
import { NotFoundException } from '@nestjs/common';

describe('AppController', () => {
  let appController: StocksController;
  let appService: StocksService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StocksController],
      providers: [StocksService, UtilsService],
    }).compile();

    appController = app.get<StocksController>(StocksController);
    appService = app.get<StocksService>(StocksService);
  });

  describe('stockDataGet', () => {
    it('should return stock data for a specific SKU', async () => {
      const mockStockData = {
        'DTW874360/97/81': 100,
        'ABC123456/78/90': 50,
        'XYZ987654/32/10': 200,
      };

      const mockAppService = {
        getStockData: jest.fn().mockImplementation((sku) => {
          if (mockStockData[sku]) {
            return Promise.resolve({
              sku: sku,
              qty: mockStockData[sku],
            });
          } else {
            throw new NotFoundException(`SKU "${sku}" not found.`);
          }
        }),
      };

      jest
        .spyOn(appService, 'getStockData')
        .mockImplementation(mockAppService.getStockData);

      const sku = 'DTW874360/97/81';

      const result = await appController.getStockData({ sku });

      expect(result).toEqual({ sku: sku, qty: mockStockData[sku] });
      expect(appService.getStockData).toHaveBeenCalledWith(sku);
    });

    it('should handle not found for an unknown SKU', async () => {
      const unknownSku = 'UNKNOWN_SKU';

      const mockAppService = {
        getStockData: jest
          .fn()
          .mockRejectedValue(
            new NotFoundException(`SKU "${unknownSku}" not found.`),
          ),
      };

      jest
        .spyOn(appService, 'getStockData')
        .mockImplementation(mockAppService.getStockData);

      try {
        await appController.getStockData({ sku: unknownSku });
      } catch (error) {
        expect(error.message).toBe(`SKU "${unknownSku}" not found.`);
        expect(error).toBeInstanceOf(NotFoundException);
      }

      expect(appService.getStockData).toHaveBeenCalledWith(unknownSku);
    });
  });
});
