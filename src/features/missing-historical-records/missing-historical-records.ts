import { ApiProperty } from '@nestjs/swagger';

export class MissingHistoricalRecordBook {
  @ApiProperty() BookId: number;
  @ApiProperty() BookTitle: string;
  @ApiProperty() BookAuthor: string;
  @ApiProperty() BookCover: string;
  @ApiProperty() BookCategory: string;
  @ApiProperty() BookDescription: string;
}

export class MissingHistoricalRecordPage {
  @ApiProperty() PageNo: number;
  @ApiProperty() Content: string;
}
