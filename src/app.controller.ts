import { Controller, Get } from '@nestjs/common';
import { DynamicModuleService } from './dynamic-module/dynamic-module.service';

@Controller()
export class AppController {
  constructor(private readonly dynamicModuleService: DynamicModuleService) {}

  @Get()
  getHello(): string {
    return this.dynamicModuleService.ping();
  }
}
