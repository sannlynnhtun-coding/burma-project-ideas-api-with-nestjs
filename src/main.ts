import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApiDocumentation } from './docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupApiDocumentation(app);
  await app.listen(3000);
}
bootstrap();
