import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DynamicModuleModule } from './dynamic-module/dynamic-module.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    /**
     * Synconous module registration
     */
    // DynamicModuleModule.register({
    //   name: 'MY-DYNAMIC-MODULE',
    // }),

    /**
     * Asynchronous module registration
     */
    DynamicModuleModule.registerAsync({
      // Read configuration from injected configService
      useFactory: async (configService: ConfigService) => {
        return {
          name: configService.get('dynamicModuleName'),
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),

    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
