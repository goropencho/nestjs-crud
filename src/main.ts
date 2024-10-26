import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AllExceptionFilters } from '@lib/filters';
import { ResponseInterceptor } from '@lib/interceptors';
import { ConfigService } from '@nestjs/config';
import { env } from '@lib/enums';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionFilters());
  await app.listen(configService.get(env.PORT), () => {
    logger.log(`Server is running on port ${port}`);
  });
}
bootstrap();
