import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { DynamicModuleModule } from './dynamic-module/dynamic-module.module';

describe('AppController', () => {
  const DYNAMIC_MODULE_NAME = 'SAY_HELLO';
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        DynamicModuleModule.register({
          name: DYNAMIC_MODULE_NAME,
        }),
      ],
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return `ping` result', () => {
      expect(appController.getHello()).toBe(
        `[${DYNAMIC_MODULE_NAME}] is running!`,
      );
    });
  });
});
