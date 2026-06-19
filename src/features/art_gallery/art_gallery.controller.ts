import { Controller, Get, Param, Req } from '@nestjs/common';
import type { Request } from 'express';
import {ApiParam, ApiTags} from "@nestjs/swagger";
import {ArtGalleryService} from "./art_gallery.service";
import { buildAssetUrl } from '../../common/asset-url';

@ApiTags('art-gallery')
@Controller('art-gallery')
export class ArtGalleryController {
    constructor(private readonly artGalleryService: ArtGalleryService) {
    }

    @Get()
    getArtGallery(@Req() request: Request): object {
        return this.artGalleryService
            .getArt()
            .map((x) => ({
                ArtId: x.ArtId,
                ArtName: x.ArtName,
                ArtDescription: x.ArtDescription,
                ArtImageUrl: buildAssetUrl(request, `img/art-gallery/${x.ArtId}.jpg`)
            }));
    }

    @Get('/:id')
    @ApiParam({name: 'id'})
    getArtist(@Req() request: Request, @Param('id') id): object {
        let item = this.artGalleryService
            .getArt()
            .filter((x) => x.ArtId == id)[0];
        if (item === null) return null;

        let gallery = this.artGalleryService.getGallery().filter(x => x.ArtId == item.ArtId)[0];
        if (gallery === null) return null;

        let galleryList = this.artGalleryService.getGallery().filter(x => x.ArtistId == gallery.ArtistId);

        let artist = this.artGalleryService.getArtist().filter(x => x.ArtistId == gallery.ArtistId)[0];
        let artistArts = [];
        galleryList.map(x => {
            artistArts.push(this.artGalleryService.getArt().filter(y => x.ArtId == y.ArtId)[0]);
        });
        return {
            Artist: {
                ArtistId: artist.ArtistId,
                ArtistName: artist.ArtistName,
                Social: artist.Social,
                ArtistImageUrl: buildAssetUrl(request, `img/art-gallery/profile/${artist.ArtistId}.jpg`)
            },
            Arts: artistArts.map((x) => ({
                ArtId: x.ArtId,
                ArtName: x.ArtName,
                ArtDescription: x.ArtDescription,
                ArtImageUrl: buildAssetUrl(request, `img/art-gallery/${x.ArtId}.jpg`)
            }))
        };
    }
}
