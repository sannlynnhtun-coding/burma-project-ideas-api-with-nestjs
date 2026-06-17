import { ApiProperty } from "@nestjs/swagger";
export class Quotlet {
  @ApiProperty() Id: string;
  @ApiProperty() UserId: number;
  @ApiProperty() Quotes: string;
  @ApiProperty() ImageUrl: string;
}
