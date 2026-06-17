import { ApiProperty } from "@nestjs/swagger";
export class BurmeseAgriculture {
  @ApiProperty() Id: string;
  @ApiProperty() Title: string;
  @ApiProperty() Date: string;
  @ApiProperty() Author: string;
  @ApiProperty() Content: string;
}
