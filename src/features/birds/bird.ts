import { ApiProperty } from "@nestjs/swagger";

export class Bird {
  @ApiProperty()
  Id: number;
  
  @ApiProperty()
  BirdMyanmarName: string;

  @ApiProperty()
  BirdEnglishName: string;

  @ApiProperty()
  Description: string;

  @ApiProperty()
  ImagePath: string;
}
