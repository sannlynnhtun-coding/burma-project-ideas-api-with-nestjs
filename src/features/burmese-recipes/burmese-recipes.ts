import { ApiProperty } from "@nestjs/swagger";
export class BurmeseRecipe {
  @ApiProperty() Guid: string;
  @ApiProperty() Name: string;
  @ApiProperty() Ingredients: string;
  @ApiProperty() CookingInstructions: string;
  @ApiProperty() UserType: string;
}
