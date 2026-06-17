import { ApiProperty } from "@nestjs/swagger";
export class MyanmarMonth {
  @ApiProperty() Id: number;
  @ApiProperty() MonthMm: string;
  @ApiProperty() MonthEn: string;
  @ApiProperty() FestivalMm: string;
  @ApiProperty() FestivalEn: string;
  @ApiProperty() Description: string;
  @ApiProperty() Detail: string;
}
