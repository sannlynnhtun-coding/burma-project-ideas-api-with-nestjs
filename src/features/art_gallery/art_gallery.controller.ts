import {Controller, Get, Param} from '@nestjs/common';
import {BaganMapService} from "../bagan_map/bagan_map.service";
import {ApiParam, ApiTags} from "@nestjs/swagger";
import {TravelRoute} from "../bagan_map/travel_route";
import {BaganMapInfoDetail} from "../bagan_map/bagan_map_info_detail";
import {ArtGalleryService} from "./art_gallery.service";
import {ArtDto} from "./art_dto";
import {SocialDto} from "./social_dto";

@ApiTags('art-gallery')
@Controller('art-gallery')
export class ArtGalleryController {
    constructor(private readonly artGalleryService: ArtGalleryService) {
    }

    @Get()
    getArtGallery(): object {
        return this.artGalleryService
            .getArt()
            .map((x) => ({
                ArtId: x.ArtId,
                ArtName: x.ArtName,
                ArtDescription: x.ArtDescription,
                ArtImageUrl: `img/art-gallery/${x.ArtId}.jpg`
            }));
    }

    @Get('/:id')
    @ApiParam({name: 'id'})
    getArtist(@Param('id') id): object {
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
                ArtistImageUrl: `img/art-gallery/profile/${artist.ArtistId}.jpg`
            },
            Arts: artistArts.map((x) => ({
                ArtId: x.ArtId,
                ArtName: x.ArtName,
                ArtDescription: x.ArtDescription,
                ArtImageUrl: `img/art-gallery/${x.ArtId}.jpg`
            }))
        };
    }
}
