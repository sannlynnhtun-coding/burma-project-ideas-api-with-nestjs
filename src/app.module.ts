import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {BirdsController} from './features/birds/birds.controller';
import {BirdsService} from './features/birds/birds.service';
import {join} from 'path';
import {ServeStaticModule} from '@nestjs/serve-static';
import {BaganMapController} from './features/bagan_map/bagan_map.controller';
import {BaganMapService} from './features/bagan_map/bagan_map.service';
import {PickAPileController} from './features/pick_a_pile/pick_a_pile.controller';
import {PickAPileService} from './features/pick_a_pile/pick_a_pile.service';
import {ArtGalleryController} from './features/art_gallery/art_gallery.controller';
import {ArtGalleryService} from './features/art_gallery/art_gallery.service';
import { SnakesController } from './features/snakes/snakes.controller';
import { SnakeService } from './features/snakes/snakes.service';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
    ],
    controllers: [
        AppController,
        BirdsController,
        BaganMapController,
        PickAPileController,
        ArtGalleryController,
        SnakesController,
    ],
    providers: [
        AppService,
        BirdsService,
        BaganMapService,
        PickAPileService,
        ArtGalleryService,
        SnakeService,
    ],
})
export class AppModule {
}
