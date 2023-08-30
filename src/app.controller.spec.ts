import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelperService } from './shared/services/helper/helper.service';
import { NotFoundException } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, HelperService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
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

      const result = await appController.stockDataGet({ sku });

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
        await appController.stockDataGet({ sku: unknownSku });
      } catch (error) {
        expect(error.message).toBe(`SKU "${unknownSku}" not found.`);
        expect(error).toBeInstanceOf(NotFoundException);
      }

      expect(appService.getStockData).toHaveBeenCalledWith(unknownSku);
    });
  });
});
