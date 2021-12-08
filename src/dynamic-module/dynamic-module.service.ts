import { Injectable, Inject, Optional } from '@nestjs/common';
import { DynamicModuleOptions } from './interfaces/dynamic-module-options.interface';
import { DYNAMIC_MODULE_OPTIONS } from './dynamic-module.constants';

@Injectable()
export class DynamicModuleService {
  constructor(
    /**
     * Inject the DynamicModuleOptions
     */
    @Optional()
    @Inject(DYNAMIC_MODULE_OPTIONS)
    private readonly options: DynamicModuleOptions,
  ) {}

  ping(): string {
    return `[${this.options.name}] is running!`;
  }
}
