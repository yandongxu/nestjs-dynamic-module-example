import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export interface DynamicModuleOptions {
  name: string;
}

export interface DynamicModuleModuleFactory {
  createDynamicModuleOptions():
    | Promise<DynamicModuleOptions>
    | DynamicModuleOptions;
}

export interface DynamicModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<DynamicModuleModuleFactory>;
  useClass?: Type<DynamicModuleModuleFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<DynamicModuleOptions> | DynamicModuleOptions;
  inject?: any[];
}
