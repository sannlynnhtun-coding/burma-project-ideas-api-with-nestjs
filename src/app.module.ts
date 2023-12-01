import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BirdsController } from './features/birds/birds.controller';
import { BirdsService } from './features/birds/birds.service';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { BaganMapController } from './features/bagan_map/bagan_map.controller';
import { BaganMapService } from './features/bagan_map/bagan_map.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController, BirdsController, BaganMapController],
  providers: [AppService, BirdsService, BaganMapService],
})
export class AppModule {}
