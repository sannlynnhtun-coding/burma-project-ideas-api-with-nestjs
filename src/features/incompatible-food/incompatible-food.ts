import { ApiProperty } from "@nestjs/swagger";
export class IncompatibleFood {
  @ApiProperty() Id: number;
  @ApiProperty() FoodA: string;
  @ApiProperty() FoodB: string;
  @ApiProperty() Description: string;
}
