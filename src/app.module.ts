import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BirdsController } from './features/birds/birds.controller';
import { BirdsService } from './features/birds/birds.service';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
        // rootPath: join(__dirname, '..', 'public'),
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }),
],
  controllers: [AppController, BirdsController],
  providers: [AppService, BirdsService],
})
export class AppModule {}
