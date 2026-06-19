import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApiDocumentation } from './docs';
import { usePublicStaticAssets } from './static-assets';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  usePublicStaticAssets(app);
  setupApiDocumentation(app);
  await app.listen(3000);
}
bootstrap();
