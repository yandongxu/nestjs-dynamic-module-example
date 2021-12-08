import { DynamicModule, Module, Provider } from '@nestjs/common';
import { DYNAMIC_MODULE_OPTIONS } from './dynamic-module.constants';
import { DynamicModuleService } from './dynamic-module.service';
import {
  DynamicModuleAsyncOptions,
  DynamicModuleOptions,
  DynamicModuleModuleFactory,
} from './interfaces/dynamic-module-options.interface';

@Module({
  exports: [DynamicModuleService],
  providers: [DynamicModuleService],
})
export class DynamicModuleModule {
  static register(options: DynamicModuleOptions): DynamicModule {
    return {
      module: DynamicModuleModule,
      providers: [
        {
          provide: DYNAMIC_MODULE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }

  static registerAsync(options: DynamicModuleAsyncOptions): DynamicModule {
    return {
      module: DynamicModuleModule,
      imports: options.imports || [],
      providers: [...this.createAsyncProviders(options)],
    };
  }

  private static createAsyncProviders(
    options: DynamicModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: DynamicModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: DYNAMIC_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: DYNAMIC_MODULE_OPTIONS,
      useFactory: async (optionsFactory: DynamicModuleModuleFactory) =>
        await optionsFactory.createDynamicModuleOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
