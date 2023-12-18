import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger()
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(port, () => {
    logger.log(`Server is running on port ${port}`)
  });
}
bootstrap();
