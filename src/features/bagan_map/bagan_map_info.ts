import { ApiProperty } from "@nestjs/swagger";

export class BaganMapInfo {
  @ApiProperty()
  Id: string;

  @ApiProperty()
  PagodaMmName: string;

  @ApiProperty()
  PagodaEngName: string;

  @ApiProperty()
  Latitude: number;

  @ApiProperty()
  Longitude: number;
}