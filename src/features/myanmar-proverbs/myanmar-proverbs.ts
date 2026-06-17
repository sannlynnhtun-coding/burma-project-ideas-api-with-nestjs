import { ApiProperty } from "@nestjs/swagger";
export class MyanmarProverb {
  @ApiProperty() TitleId: number;
  @ApiProperty() ProverbId: number;
  @ApiProperty() ProverbName: string;
  @ApiProperty() ProverbDesp: string;
}
