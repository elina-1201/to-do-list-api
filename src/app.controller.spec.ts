import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return API information', () => {
      const info = appController.getInfo();
      expect(info.name).toBe('To-Do List API');
      expect(Array.isArray(info.endpoints)).toBe(true);
    });
  });

  describe('health', () => {
    it('should return ok status', () => {
      expect(appController.getHealth()).toEqual({ status: 'ok' });
    });
  });
});
