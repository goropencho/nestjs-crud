import { EnvKeys } from '@lib/enums';
import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          pinoHttp: {
            transport: {
              target: 'pino-pretty',
              options: {
                singleLine:
                  configService.get(EnvKeys.NODE_ENV) !== 'development'
                    ? true
                    : false,
              },
              level: configService.get(EnvKeys.LOG_LEVEL),
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class LoggerModule {}
