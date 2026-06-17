import { ApiProperty } from "@nestjs/swagger";
export class ZodiacSign {
  @ApiProperty() Id: number;
  @ApiProperty() Name: string;
  @ApiProperty() MyanmarMonth: string;
  @ApiProperty() ZodiacSignImageUrl: string;
  @ApiProperty() ZodiacSign2ImageUrl: string;
  @ApiProperty() Dates: string;
  @ApiProperty() Element: string;
  @ApiProperty() ElementImageUrl: string;
  @ApiProperty() LifePurpose: string;
  @ApiProperty() Loyal: string;
  @ApiProperty() RepresentativeFlower: string;
  @ApiProperty() Angry: string;
  @ApiProperty() Character: string;
  @ApiProperty() PrettyFeatures: string;
  @ApiProperty() Traits: any[];
}
